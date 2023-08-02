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
    public class SectionController : ControllerBase
    {
        private readonly ApplicationDataContext _dataBase;

        public SectionController(ApplicationDataContext dataBase)
        {
            _dataBase = dataBase;
        }

        /// <summary>
        /// Get all sections.
        /// </summary>
        /// <remarks>
        /// Return all sections from database.
        /// </remarks>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllSections()
        {
            var sections = _dataBase.Sections.ToArray();

            if (!sections.Any())
            {
                return NotFound();
            }

            return Ok(sections);
        }

        /// <summary>
        /// Get section by id.
        /// </summary>
        /// <remarks>
        /// Enter id and recive section by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetSection(int id)
        {
            var section = _dataBase.Sections.FirstOrDefault(x => x.Id.Equals(id));

            if (section == null)
            {
                return NotFound("No section with this id..");
            }

            return Ok(section);
        }

        /// <summary>
        /// Create a section.
        /// </summary>
        /// <remarks>
        /// Give the information and create a section.
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateSection([FromBody] Section section)
        {
            section.VideoUrl = "initial";

            if (ModelState.IsValid)
            {
                //section.AdminID = generalAdmin.Id;

                _dataBase.Sections.Add(section);
                _dataBase.SaveChanges();

                return Created("", section);

            }
            return NotFound("Not valid input..");
        }

        /// <summary>
        /// Delete section by id.
        /// </summary>
        /// <remarks>
        /// Enter id and delete one section by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteSection(int id)
        {
            var findSection = _dataBase.Sections.Find(id);

            if (findSection == null)
            {
                return NotFound("No section with this id..");
            }

            _dataBase.Sections.Remove(findSection);
            _dataBase.SaveChanges();

            return NoContent();
        }

        /// <summary>
        /// Update section by id.
        /// </summary>
        /// <remarks>
        /// Enter id and update the parameters that you want.
        /// </remarks>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateSection(int id, [FromBody] Section section)
        {
            var findSection = _dataBase.Sections.Where(x => x.Id == id)
                                              .FirstOrDefault();

            if (findSection == null)
            {
                return NotFound("No section with this id..");
            }

            if (ModelState.IsValid)
            {
                _dataBase.Entry(findSection).CurrentValues.SetValues(section);
                _dataBase.SaveChanges();

                return NoContent();
            }
            return NoContent();
        }
    }
}
