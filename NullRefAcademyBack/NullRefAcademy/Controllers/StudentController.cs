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
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDataContext _dataBase;

        public StudentController(ApplicationDataContext dataBase)
        {
            _dataBase = dataBase;
        }

        /// <summary>
        /// Get all students.
        /// </summary>
        /// <remarks>
        /// Return all students from database.
        /// </remarks>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = _dataBase.Students.ToArray();

            if (!students.Any())
            {
                return NotFound();
            }

            foreach (var student in students)
            {
                student.Password = Crypting.DeCrypt(student.Password);
            }

            return Ok(students);
        }

        /// <summary>
        /// Get student by id.
        /// </summary>
        /// <remarks>
        /// Enter id and recive student by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetStudent(int id)
        {
            var student = _dataBase.Students.FirstOrDefault(x => x.Id.Equals(id));

            if (student == null)
            {
                return NotFound("No student with this id..");
            }

            student.Password = Crypting.DeCrypt(student.Password);
            student.ConfirmPassword = Crypting.DeCrypt(student.ConfirmPassword);

            return Ok(student);
        }

        /// <summary>
        /// Create a student.
        /// </summary>
        /// <remarks>
        /// Give the information and create a student.
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddStudent([FromBody] Student student)
        {
            DateTime date = DateTime.Now;
            student.CreatedDate = date.ToString("dd/MM/yyyy");
            student.AccountType = "Student";
            student.Points = 0;
            student.Progress = 0;
            student.TimeSpent = "00h:00m:01s";

            if (ModelState.IsValid)
            {
                var check = _dataBase.Students.FirstOrDefault(s => s.Email == student.Email);

                if (check == null)
                {
                    student.Password = Crypting.Crypt(student.Password);
                    student.ConfirmPassword = Crypting.Crypt(student.ConfirmPassword);
                    _dataBase.Students.Add(student);
                    _dataBase.SaveChanges();

                    User user = new User();
                    user.FirstName = student.FirstName;
                    user.LastName = student.LastName;
                    user.Username = student.Username;
                    user.Email = student.Email;
                    user.AccountType = "Student";
                    user.Password = student.Password;
                    user.ConfirmPassword = student.ConfirmPassword;
                    user.CreatedDate = student.CreatedDate;
                    _dataBase.Users.Add(user);
                    _dataBase.SaveChanges();

                    return Created("", student);
                }
                else
                {
                    return NotFound("Email already exist..");
                }
            }
            return NotFound("Not valid input..");
        }

        /// <summary>
        /// Delete student by id.
        /// </summary>
        /// <remarks>
        /// Enter id and delete one student by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteStudent(int id) 
        {
            var findStudent = _dataBase.Students.Find(id);

            if (findStudent == null)
            {
                return NotFound("No student with this id..");
            }

            var findUser = _dataBase.Users.Where(x => x.Email == findStudent.Email)
                                                .FirstOrDefault();
            _dataBase.Users.Remove(findUser);
            _dataBase.SaveChanges();

            string result = null;
            var courses = _dataBase.Courses;
            foreach (var course in courses)
            {
                if (course.StudentsIDs != null)
                {
                    var array = course.StudentsIDs.Split(',', StringSplitOptions.RemoveEmptyEntries);

                    for (int i = 0; i < array.Length; i++)
                    {
                        int studentId = int.Parse(array[i].ToString());
                        if (studentId != findStudent.Id)
                        {
                            result += studentId + ",";
                        }
                    }

                    course.StudentsIDs = result;
                }
                _dataBase.Courses.Update(course);
                result = null;
            }

            result = null;
            var articles = _dataBase.Articles;
            foreach (var article in articles)
            {
                if (article.StudentsIDs != null)
                {
                    var array = article.StudentsIDs.Split(',', StringSplitOptions.RemoveEmptyEntries);

                    for (int i = 0; i < array.Length; i++)
                    {
                        int studentId = int.Parse(array[i].ToString());
                        if (studentId != findStudent.Id)
                        {
                            result += studentId + ",";
                        }
                    }

                    article.StudentsIDs = result;
                }
                _dataBase.Articles.Update(article);
                result = null;
            }

            result = null;
            var newss = _dataBase.News;
            foreach (var news in newss)
            {
                if (news.StudentsIDs != null)
                {
                    var array = news.StudentsIDs.Split(',', StringSplitOptions.RemoveEmptyEntries);

                    for (int i = 0; i < array.Length; i++)
                    {
                        int studentId = int.Parse(array[i].ToString());
                        if (studentId != findStudent.Id)
                        {
                            result += studentId + ",";
                        }
                    }

                    news.StudentsIDs = result;
                }
                _dataBase.News.Update(news);
                result = null;
            }

            _dataBase.Students.Remove(findStudent);
            _dataBase.SaveChanges();

            return NoContent();
        }

        /// <summary>
        /// Update student by id.
        /// </summary>
        /// <remarks>
        /// Enter id and update the parameters that you want.
        /// </remarks>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] Student student)
        {
            var findStudent = _dataBase.Students.Where(x => x.Id == id)
                                              .FirstOrDefault();

            if (findStudent == null)
            {
                return NotFound("No student with this id..");
            }

            if (ModelState.IsValid)
            {

                student.Password = Crypting.Crypt(student.Password);
                student.ConfirmPassword = Crypting.Crypt(student.ConfirmPassword);

                _dataBase.Entry(findStudent).CurrentValues.SetValues(student);
                _dataBase.SaveChanges();

                var findUser = _dataBase.Users.Where(x => x.Email == findStudent.Email)
                                                    .FirstOrDefault();
                findUser.FirstName = student.FirstName;
                findUser.LastName = student.LastName;
                findUser.Username = student.Username;
                findUser.Email = student.Email;
                findUser.Password = student.Password;
                findUser.ConfirmPassword = student.ConfirmPassword;
                _dataBase.Users.Update(findUser);
                _dataBase.SaveChanges();

                return NoContent();
            }

            return NoContent();
        }

    }
}
