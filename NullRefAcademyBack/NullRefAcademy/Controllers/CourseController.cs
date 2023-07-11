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
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDataContext _dataBase;

        public CourseController(ApplicationDataContext dataBase)
        {
            _dataBase = dataBase;
        }

        /// <summary>
        /// Get all courses.
        /// </summary>
        /// <remarks>
        /// Return all courses from database.
        /// </remarks>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = _dataBase.Courses.ToArray();

            if (!courses.Any())
            {
                return NotFound();
            }

            return Ok(courses);
        }

        /// <summary>
        /// Get course by id.
        /// </summary>
        /// <remarks>
        /// Enter id and recive course by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetCourse(int id)
        {
            var course = _dataBase.Courses.FirstOrDefault(x => x.Id.Equals(id));

            if (course == null)
            {
                return NotFound("No course with this id..");
            }

            return Ok(course);
        }

        /// <summary>
        /// Create a course.
        /// </summary>
        /// <remarks>
        /// Give the information and create a course.
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateCourse([FromBody] Course course)
        {
            DateTime date = DateTime.Now;
            course.CreatedDate = date.ToString("dd/MM/yyyy");

            if (ModelState.IsValid)
            {
                //course.AdminID = generalAdmin.Id;

                _dataBase.Courses.Add(course);
                _dataBase.SaveChanges();

                return Created("", course);

            }
            return NotFound("Not valid input..");
        }

        /// <summary>
        /// Delete course by id.
        /// </summary>
        /// <remarks>
        /// Enter id and delete one course by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var findCourse = _dataBase.Courses.Find(id);

            if (findCourse == null)
            {
                return NotFound("No course with this id..");
            }

            var sections = _dataBase.Sections;
            foreach (var section in sections)
            {
                if (section.CourseID == findCourse.Id)
                {
                    _dataBase.Sections.Remove(section);
                }
            }

            string result = null;
            var students = _dataBase.Students;
            foreach (var student in students)
            {
                if (student.CoursesIDs != null)
                {
                    var array = student.CoursesIDs.Split(',', StringSplitOptions.RemoveEmptyEntries);
                    for (int i = 0; i < array.Length; i++)
                    {
                        string courseInfo = array[i];
                        var courseArray = courseInfo.Split('=', StringSplitOptions.RemoveEmptyEntries);
                        int courseId = int.Parse(courseArray[0].ToString());
                        if (courseId != findCourse.Id)
                        {
                            result += courseInfo + ",";
                        }
                    }
                    student.CoursesIDs = result;
                }
                _dataBase.Students.Update(student);
                result = null;
            }

            _dataBase.Courses.Remove(findCourse);
            _dataBase.SaveChanges();

            return NoContent();
        }

        /// <summary>
        /// Update course by id.
        /// </summary>
        /// <remarks>
        /// Enter id and update the parameters that you want.
        /// </remarks>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateCourse(int id, [FromBody] Course course)
        {
            var findCourse = _dataBase.Courses.Where(x => x.Id == id)
                                              .FirstOrDefault();

            if (findCourse == null)
            {
                return NotFound("No course with this id..");
            }

            if (ModelState.IsValid)
            {
                _dataBase.Entry(findCourse).CurrentValues.SetValues(course);
                _dataBase.SaveChanges();

                return NoContent();
            }

            return NoContent();
        }
    }
}
