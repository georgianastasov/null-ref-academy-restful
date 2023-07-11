using NullRefAcademy.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mime;
using NullRefAcademy.Cryptography;
using NullRefAcademy.Models;

namespace NullRefAcademy.Controllers
{
    [Route("api/[controller]/[action]")]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDataContext _dataBase;

        public UserController(ApplicationDataContext dataBase)
        {
            _dataBase = dataBase;
        }

        /// <summary>
        /// Get all users.
        /// </summary>
        /// <remarks>
        /// Return all users from database.
        /// </remarks>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = _dataBase.Users.ToArray();

            if (!users.Any())
            {
                return NotFound();
            }

            foreach (var user in users)
            {
                user.Password = Crypting.DeCrypt(user.Password);
            }

            return Ok(users);
        }

        /// <summary>
        /// Get user by id.
        /// </summary>
        /// <remarks>
        /// Enter id and recive user by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = _dataBase.Users.FirstOrDefault(x => x.Id.Equals(id));

            if (user == null)
            {
                return NotFound("No user with this id..");
            }

            if (user.AccountType == "Admin")
            {
                var admin = _dataBase.Admins.Where(x => x.Email == user.Email)
                                                .FirstOrDefault();

                admin.Password = Crypting.DeCrypt(admin.Password);
                admin.ConfirmPassword = Crypting.DeCrypt(admin.ConfirmPassword);

                return Ok(admin);
            }
            else if (user.AccountType == "Teacher")
            {
                var teacher = _dataBase.Teachers.Where(x => x.Email == user.Email)
                                                .FirstOrDefault();

                teacher.Password = Crypting.DeCrypt(teacher.Password);
                teacher.ConfirmPassword = Crypting.DeCrypt(teacher.ConfirmPassword);

                return Ok(teacher);
            }
            else if (user.AccountType == "Student")
            {
                var student = _dataBase.Students.Where(x => x.Email == user.Email)
                                                .FirstOrDefault();

                student.Password = Crypting.DeCrypt(student.Password);
                student.ConfirmPassword = Crypting.DeCrypt(student.ConfirmPassword);

                return Ok(student);
            }

            return Ok();
        }

        /// <summary>
        /// Create a user.
        /// </summary>
        /// <remarks>
        /// Give the information and create a user.
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            DateTime date = DateTime.Now;
            user.CreatedDate = date.ToString("dd/MM/yyyy");

            if (ModelState.IsValid)
            {
                var check = _dataBase.Users.FirstOrDefault(s => s.Email == user.Email);

                if (check == null)
                {
                    if (user.AccountType != "Admin" && user.AccountType != "Teacher" && user.AccountType != "Student")
                    {
                        return NotFound("Invalid account type..");
                    }

                    user.Password = Crypting.Crypt(user.Password);
                    user.ConfirmPassword = Crypting.Crypt(user.ConfirmPassword);
                    _dataBase.Users.Add(user);
                    _dataBase.SaveChanges();

                    if (user.AccountType == "Admin")
                    {
                        Admin admin = new Admin();
                        admin.FirstName = user.FirstName;
                        admin.LastName = user.LastName;
                        admin.Username = user.Username;
                        admin.Email = user.Email;
                        admin.Password = user.Password;
                        admin.ConfirmPassword = user.ConfirmPassword;
                        admin.AccountType = user.AccountType;
                        admin.CreatedDate = user.CreatedDate;
                        _dataBase.Admins.Add(admin);
                        _dataBase.SaveChanges();

                        return Created("", admin);
                    }
                    else if (user.AccountType == "Teacher")
                    {
                        Teacher teacher = new Teacher();
                        teacher.FirstName = user.FirstName;
                        teacher.LastName = user.LastName;
                        teacher.Username = user.Username;
                        teacher.Email = user.Email;
                        teacher.Password = user.Password;
                        teacher.ConfirmPassword = user.ConfirmPassword;
                        teacher.AccountType = user.AccountType;
                        teacher.CreatedDate = user.CreatedDate;
                        _dataBase.Teachers.Add(teacher);
                        _dataBase.SaveChanges();

                        return Created("", teacher);
                    }
                    else if (user.AccountType == "Student")
                    {
                        Student student = new Student();
                        student.FirstName = user.FirstName;
                        student.LastName = user.LastName;
                        student.Username = user.Username;
                        student.Email = user.Email;
                        student.Password = user.Password;
                        student.ConfirmPassword = user.ConfirmPassword;
                        student.AccountType = user.AccountType;
                        student.CreatedDate = user.CreatedDate;
                        student.Bio = null;
                        student.Points = 0;
                        student.Progress = 0;
                        student.TimeSpent = "00h:00m:01s";
                        _dataBase.Students.Add(student);
                        _dataBase.SaveChanges();

                        return Created("", student);
                    }
                }
                else
                {
                    return NotFound("Email already exist..");
                }
            }
            return NotFound("Invalid input..");
        }

        /// <summary>
        /// Delete user by id.
        /// </summary>
        /// <remarks>
        /// Enter id and delete one user by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var findUser = _dataBase.Users.Find(id);

            if (findUser == null)
            {
                return NotFound("No user with this id..");
            }

            if (findUser.AccountType == "Admin")
            {
                var findAdmin = _dataBase.Admins.Where(x => x.Email == findUser.Email)
                                                .FirstOrDefault();

                var categories = _dataBase.Categories;
                foreach (var category in categories)
                {
                    if (category.AdminID == findAdmin.Id)
                    {
                        category.AdminID = null;
                        _dataBase.Categories.Update(category);
                    }
                }

                var courses = _dataBase.Courses;
                foreach (var course in courses)
                {
                    if (course.AdminID == findAdmin.Id)
                    {
                        course.AdminID = null;
                        _dataBase.Courses.Update(course);
                    }
                }

                var sections = _dataBase.Sections;
                foreach (var section in sections)
                {
                    if (section.AdminID == findAdmin.Id)
                    {
                        section.AdminID = null;
                        _dataBase.Sections.Update(section);
                    }
                }

                _dataBase.Admins.Remove(findAdmin);
                _dataBase.SaveChanges();
            }
            else if (findUser.AccountType == "Teacher")
            {
                var findTeacher = _dataBase.Teachers.Where(x => x.Email == findUser.Email)
                                                    .FirstOrDefault();

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
            }
            else if (findUser.AccountType == "Student")
            {
                var findStudent = _dataBase.Students.Where(x => x.Email == findUser.Email)
                                                    .FirstOrDefault();

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

                _dataBase.Students.Remove(findStudent);
                _dataBase.SaveChanges();
            }

            _dataBase.Users.Remove(findUser);
            _dataBase.SaveChanges();

            return NoContent();
        }

        /// <summary>
        /// Update user by id.
        /// </summary>
        /// <remarks>
        /// Enter id and update the parameters that you want.
        /// </remarks>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            var findUser = _dataBase.Users.Where(x => x.Id == id)
                                              .FirstOrDefault();

            if (findUser == null)
            {
                return NotFound("No user with this id..");
            }

            if (ModelState.IsValid)
            {

                if (user.AccountType != "Admin" && user.AccountType != "Teacher" && user.AccountType != "Student")
                {
                    return NotFound("Wrong account type..");
                }


                user.Password = Crypting.Crypt(user.Password);
                user.ConfirmPassword = Crypting.Crypt(user.ConfirmPassword);

                _dataBase.Entry(findUser).CurrentValues.SetValues(user);
                _dataBase.SaveChanges();


                if (user.AccountType == "Admin")
                {
                    var findAdmin = _dataBase.Admins.Where(x => x.Email == findUser.Email)
                                                    .FirstOrDefault();
                    findAdmin.FirstName = user.FirstName;
                    findAdmin.LastName = user.LastName;
                    findAdmin.Username = user.Username;
                    findAdmin.Email = user.Email;
                    findAdmin.Password = user.Password;
                    findAdmin.ConfirmPassword = user.ConfirmPassword;
                    _dataBase.Admins.Update(findAdmin);
                    _dataBase.SaveChanges();

                    return NoContent();
                }
                else if (user.AccountType == "Teacher")
                {
                    var findTeacher = _dataBase.Teachers.Where(x => x.Email == findUser.Email)
                                                    .FirstOrDefault();
                    findTeacher.FirstName = user.FirstName;
                    findTeacher.LastName = user.LastName;
                    findTeacher.Username = user.Username;
                    findTeacher.Email = user.Email;
                    findTeacher.Password = user.Password;
                    findTeacher.ConfirmPassword = user.ConfirmPassword;
                    _dataBase.Teachers.Update(findTeacher);
                    _dataBase.SaveChanges();

                    return NoContent();
                }
                else if (user.AccountType == "Student")
                {
                    var findStudent = _dataBase.Students.Where(x => x.Email == findUser.Email)
                                                        .FirstOrDefault();
                    findStudent.FirstName = user.FirstName;
                    findStudent.LastName = user.LastName;
                    findStudent.Username = user.Username;
                    findStudent.Email = user.Email;
                    findStudent.Password = user.Password;
                    findStudent.ConfirmPassword = user.ConfirmPassword;
                    _dataBase.Students.Update(findStudent);
                    _dataBase.SaveChanges();

                    return NoContent();
                }

                _dataBase.Users.Update(user);
                _dataBase.SaveChanges();

            }

            return NoContent();
        }
    }
}
