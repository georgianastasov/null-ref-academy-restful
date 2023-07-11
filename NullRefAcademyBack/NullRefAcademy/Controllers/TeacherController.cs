using NullRefAcademy.Cryptography;
using NullRefAcademy.Data;
using NullRefAcademy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace NullRefAcademy.Controllers
{
    [Route("api/[controller]/[action]")]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ApplicationDataContext _dataBase;

        public TeacherController(ApplicationDataContext dataBase)
        {
            _dataBase = dataBase;
        }

        /// <summary>
        /// Get all teachers.
        /// </summary>
        /// <remarks>
        /// Return all teachers from database.
        /// </remarks>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllTeachers()
        {
            var teachers = _dataBase.Teachers.ToArray();

            if (!teachers.Any())
            {
                return NotFound();
            }

            foreach (var teacher in teachers)
            {
                teacher.Password = Crypting.DeCrypt(teacher.Password);
            }

            return Ok(teachers);
        }

        /// <summary>
        /// Get teacher by id.
        /// </summary>
        /// <remarks>
        /// Enter id and recive teacher by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTeacher(int id)
        {
            var teacher = _dataBase.Teachers.FirstOrDefault(x => x.Id.Equals(id));

            if (teacher == null)
            {
                return NotFound("No teacher with this id..");
            }

            teacher.Password = Crypting.DeCrypt(teacher.Password);
            teacher.ConfirmPassword = Crypting.DeCrypt(teacher.ConfirmPassword);

            return Ok(teacher);
        }

        /// <summary>
        /// Create a teacher.
        /// </summary>
        /// <remarks>
        /// Give the information and create a teacher.
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddTeacher([FromBody] Teacher teacher)
        {
            DateTime date = DateTime.Now;
            teacher.CreatedDate = date.ToString("dd/MM/yyyy");
            teacher.AccountType = "Teacher";

            if (ModelState.IsValid)
            {
                var check = _dataBase.Teachers.FirstOrDefault(s => s.Email == teacher.Email);

                if (check == null)
                {
                    teacher.Password = Crypting.Crypt(teacher.Password);
                    teacher.ConfirmPassword = Crypting.Crypt(teacher.ConfirmPassword);
                    _dataBase.Teachers.Add(teacher);
                    _dataBase.SaveChanges();

                    User user = new User();
                    user.FirstName = teacher.FirstName;
                    user.LastName = teacher.LastName;
                    user.Username = teacher.Username;
                    user.Email = teacher.Email;
                    user.AccountType = "Teacher";
                    user.Password = teacher.Password;
                    user.ConfirmPassword = teacher.ConfirmPassword;
                    user.CreatedDate = teacher.CreatedDate;
                    _dataBase.Users.Add(user);
                    _dataBase.SaveChanges();

                    return Created("", teacher);
                }
                else
                {
                    return NotFound("Email already exist..");
                }
            }
            return NotFound("Not valid input..");
        }

        /// <summary>
        /// Delete teacher by id.
        /// </summary>
        /// <remarks>
        /// Enter id and delete one teacher by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteTeacher(int id)
        {
            var findTeacher = _dataBase.Teachers.Find(id);

            if (findTeacher == null)
            {
                return NotFound("No teacher with this id..");
            }

            var findUser = _dataBase.Users.Where(x => x.Email == findTeacher.Email)
                                                .FirstOrDefault();
            _dataBase.Users.Remove(findUser);
            _dataBase.SaveChanges();

            var categories = _dataBase.Categories;
            foreach (var category in categories)
            {
                if (category.TeacherID == findTeacher.Id)
                {
                    category.TeacherID = null;
                    _dataBase.Categories.Update(category);
                }
            }

            var courses = _dataBase.Courses;
            foreach (var course in courses)
            {
                if (course.TeacherID == findTeacher.Id)
                {
                    course.TeacherID = null;
                    _dataBase.Courses.Update(course);
                }
            }

            var sections = _dataBase.Sections;
            foreach (var section in sections)
            {
                if (section.TeacherID == findTeacher.Id)
                {
                    section.TeacherID = null;
                    _dataBase.Sections.Update(section);
                }
            }

            _dataBase.Teachers.Remove(findTeacher);
            _dataBase.SaveChanges();

            return NoContent();
        }

        /// <summary>
        /// Update teacher by id.
        /// </summary>
        /// <remarks>
        /// Enter id and update the parameters that you want.
        /// </remarks>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateTeacher(int id, [FromBody] Teacher teacher)
        {
            var findTeacher = _dataBase.Teachers.Where(x => x.Id == id)
                                              .FirstOrDefault();

            if (findTeacher == null)
            {
                return NotFound("No teacher with this id..");
            }

            if (ModelState.IsValid)
            {

                teacher.Password = Crypting.Crypt(teacher.Password);
                teacher.ConfirmPassword = Crypting.Crypt(teacher.ConfirmPassword);

                _dataBase.Entry(findTeacher).CurrentValues.SetValues(teacher);
                _dataBase.SaveChanges();

                var findUser = _dataBase.Users.Where(x => x.Email == findTeacher.Email)
                                                    .FirstOrDefault();
                findUser.FirstName = teacher.FirstName;
                findUser.LastName = teacher.LastName;
                findUser.Username = teacher.Username;
                findUser.Email = teacher.Email;
                findUser.Password = teacher.Password;
                findUser.ConfirmPassword = teacher.ConfirmPassword;
                _dataBase.Users.Update(findUser);
                _dataBase.SaveChanges();

                return NoContent();
            }

            return NoContent();
        }
    }
}
