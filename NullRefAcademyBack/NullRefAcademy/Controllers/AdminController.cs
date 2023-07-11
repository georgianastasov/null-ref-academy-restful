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
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDataContext _dataBase;

        public AdminController(ApplicationDataContext dataBase)
        {
            _dataBase = dataBase;
        }

        /// <summary>
        /// Get all admins.
        /// </summary>
        /// <remarks>
        /// Return all admins from database.
        /// </remarks>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllAdmins()
        {
            var admins = _dataBase.Admins.ToArray();

            if (!admins.Any())
            {
                return NotFound();
            }

            foreach (var admin in admins)
            {
                admin.Password = Crypting.DeCrypt(admin.Password);
            }

            return Ok(admins);
        }

        /// <summary>
        /// Get admin by id.
        /// </summary>
        /// <remarks>
        /// Enter id and recive admin by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAdmin(int id)
        {
            var admin = _dataBase.Admins.FirstOrDefault(x => x.Id.Equals(id));

            if (admin == null)
            {
                return NotFound("No admin with this id..");
            }

            admin.Password = Crypting.DeCrypt(admin.Password);
            admin.ConfirmPassword = Crypting.DeCrypt(admin.ConfirmPassword);

            return Ok(admin);
        }

        /// <summary>
        /// Create an admin.
        /// </summary>
        /// <remarks>
        /// Give the information and create an admin.
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddAdmin([FromBody] Admin admin)
        {
            DateTime date = DateTime.Now;
            admin.CreatedDate = date.ToString("dd/MM/yyyy");
            admin.AccountType = "Admin";

            if (ModelState.IsValid)
            {
                var check = _dataBase.Admins.FirstOrDefault(s => s.Email == admin.Email);

                if (check == null)
                {
                    admin.Password = Crypting.Crypt(admin.Password);
                    admin.ConfirmPassword = Crypting.Crypt(admin.ConfirmPassword);
                    _dataBase.Admins.Add(admin);
                    _dataBase.SaveChanges();

                    User user = new User();
                    user.FirstName = admin.FirstName;
                    user.LastName = admin.LastName;
                    user.Username = admin.Username;
                    user.Email = admin.Email;
                    user.AccountType = "Admin";
                    user.Password = admin.Password;
                    user.ConfirmPassword = admin.ConfirmPassword;
                    user.CreatedDate = admin.CreatedDate;
                    _dataBase.Users.Add(user);
                    _dataBase.SaveChanges();

                    return Created("", admin);
                }
                else
                {
                    return NotFound("Email already exist..");
                }
            }
            return NotFound("Not valid input..");
        }

        /// <summary>
        /// Delete admin by id.
        /// </summary>
        /// <remarks>
        /// Enter id and delete one admin by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            var findAdmin = _dataBase.Admins.Find(id);

            if (findAdmin == null)
            {
                return NotFound("No admin with this id..");
            }

            var findUser = _dataBase.Users.Where(x => x.Email == findAdmin.Email)
                                                .FirstOrDefault();
            _dataBase.Users.Remove(findUser);
            _dataBase.SaveChanges();

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

            return NoContent();
        }

        /// <summary>
        /// Update admin by id.
        /// </summary>
        /// <remarks>
        /// Enter id and update the parameters that you want.
        /// </remarks>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateAdmin(int id, [FromBody] Admin admin)
        {
            var findAdmin = _dataBase.Admins.Where(x => x.Id == id)
                                              .FirstOrDefault();

            if (findAdmin == null)
            {
                return NotFound("No admin with this id..");
            }

            if (ModelState.IsValid)
            {
                admin.Password = Crypting.Crypt(admin.Password);
                admin.ConfirmPassword = Crypting.Crypt(admin.ConfirmPassword);

                //_dataBase.Admins.Update(admin);
                _dataBase.Entry(findAdmin).CurrentValues.SetValues(admin);
                _dataBase.SaveChanges();

                var findUser = _dataBase.Users.Where(x => x.Email == findAdmin.Email)
                                                    .FirstOrDefault();
                findUser.FirstName = admin.FirstName;
                findUser.LastName = admin.LastName;
                findUser.Username = admin.Username;
                findUser.Email = admin.Email;
                findUser.Password = admin.Password;
                findUser.ConfirmPassword = admin.ConfirmPassword;
                _dataBase.Users.Update(findUser);
                _dataBase.SaveChanges();

                return NoContent();
            }

            return NoContent();
        }
    }
}
