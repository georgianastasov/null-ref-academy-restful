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
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDataContext _dataBase;

        public CategoryController(ApplicationDataContext dataBase)
        {
            _dataBase = dataBase;
        }

        /// <summary>
        /// Get all categories.
        /// </summary>
        /// <remarks>
        /// Return all categories from database.
        /// </remarks>
        [HttpGet]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = _dataBase.Categories.ToArray();

            if (!categories.Any())
            {
                return NotFound();
            }

            return Ok(categories);
        }

        /// <summary>
        /// Get category by id.
        /// </summary>
        /// <remarks>
        /// Enter id and recive category by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetCategory(int id)
        {
            var category = _dataBase.Categories.FirstOrDefault(x => x.Id.Equals(id));

            if (category == null)
            {
                return NotFound("No category with this id..");
            }

            return Ok(category);
        }

        /// <summary>
        /// Create a category.
        /// </summary>
        /// <remarks>
        /// Give the information and create a category.
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateCategory([FromBody] Category category)
        {
            if (ModelState.IsValid)
            {

                //category.AdminID = generalAdmin.Id;

                _dataBase.Categories.Add(category);
                _dataBase.SaveChanges();

                return Created("", category);

            }
            return NotFound("Not valid input..");
        }

        /// <summary>
        /// Delete category by id.
        /// </summary>
        /// <remarks>
        /// Enter id and delete one category by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var findCategory = _dataBase.Categories.Find(id);

            if (findCategory == null)
            {
                return NotFound("No category with this id..");
            }

            var courses = _dataBase.Courses;
            var sections = _dataBase.Sections;
            foreach (var course in courses)
            {
                if (course.CategoryID == findCategory.Id)
                {
                    foreach (var section in sections)
                    {
                        if (section.CourseID == course.Id)
                        {
                            _dataBase.Sections.Remove(section);
                        }
                    }
                    _dataBase.Courses.Remove(course);
                }
            }

            _dataBase.Categories.Remove(findCategory);
            _dataBase.SaveChanges();

            return NoContent();
        }

        /// <summary>
        /// Update category by id.
        /// </summary>
        /// <remarks>
        /// Enter id and update the parameters that you want.
        /// </remarks>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] Category category)
        {
            var findCategory = _dataBase.Categories.Where(x => x.Id == id)
                                              .FirstOrDefault();

            if (findCategory == null)
            {
                return NotFound("No category with this id..");
            }

            if (ModelState.IsValid)
            {
                _dataBase.Entry(findCategory).CurrentValues.SetValues(category);
                _dataBase.SaveChanges();

                return NoContent();
            }

            return NoContent();
        }
    }
}
