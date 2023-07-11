using NullRefAcademy.Cryptography;
using NullRefAcademy.Data;
using NullRefAcademy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using System.Diagnostics;
using Microsoft.AspNetCore.Cors;
using NullRefAcademy.Helpers;

namespace NullRefAcademy.Controllers
{
    //[EnableCors("http://localhost:4200")]
    [Route("api/[controller]/[action]")]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    [ApiController]
    public class HomeController : ControllerBase
    {

        private readonly ApplicationDataContext _dataBase;

        public HomeController(ILogger<HomeController> logger, ApplicationDataContext dataBase)
        {
            _dataBase = dataBase;
        }


        /// <summary>
        /// User registration.
        /// </summary>
        /// <remarks>
        /// Enter your info and register.
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Register([FromBody] User user)
        {
            DateTime dateAndTime = DateTime.Now;
            user.CreatedDate = dateAndTime.ToString("dd/MM/yyyy");

            if (ModelState.IsValid)
            {
                var check = _dataBase.Users.FirstOrDefault(s => s.Email == user.Email);
                if (check == null)
                {
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
                    else
                    {
                        //Wrong account type..
                        return BadRequest("Wrong account type..");
                    }
                }
                else
                {
                    //Email already exist..
                    return BadRequest("Email already exist..");
                }
            }

            //Invalid input..
            return BadRequest("Invalid input..");
        }

        /// <summary>
        /// User login.
        /// </summary>
        /// <remarks>
        /// Enter your info and login.
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Login([FromBody] UserLogin userLogin)
        {
            if (ModelState.IsValid)
            {
                var cryptedPassword = Crypting.Crypt(userLogin.Password);
                var data = _dataBase.Users.Where(s => s.Email.Equals(userLogin.Email) && s.Password.Equals(cryptedPassword)).ToList();

                if (data.Count() > 0)
                { 
                    if (data[0].AccountType == "Admin")
                    {
                        var admin = _dataBase.Admins.Where(s => s.Email.Equals(userLogin.Email) && s.Password.Equals(cryptedPassword)).FirstOrDefault();

                        return Ok(admin);
                    }
                    else if (data[0].AccountType == "Teacher")
                    {
                        var teacher = _dataBase.Teachers.Where(s => s.Email.Equals(userLogin.Email) && s.Password.Equals(cryptedPassword)).FirstOrDefault();

                        return Ok(teacher);
                    }
                    else if (data[0].AccountType == "Student")
                    {
                        var student = _dataBase.Students.Where(s => s.Email.Equals(userLogin.Email) && s.Password.Equals(cryptedPassword)).FirstOrDefault();

                        return Ok(student);
                    }
                }
                else
                {
                    return BadRequest("Login failed.");
                }
            }
            //Not valid input..
            return BadRequest("Not valid input.");
        }
    }
}
