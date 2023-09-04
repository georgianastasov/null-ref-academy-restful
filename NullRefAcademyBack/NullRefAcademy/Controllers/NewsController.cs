using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NullRefAcademy.Data;
using NullRefAcademy.Models;
using System.Net.Mime;

namespace NullRefAcademy.Controllers
{
    [Route("api/[controller]/[action]")]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly ApplicationDataContext _dataBase;

        public NewsController(ApplicationDataContext dataBase)
        {
            _dataBase = dataBase;
        }

        /// <summary>
        /// Get all news.
        /// </summary>
        /// <remarks>
        /// Return all news from database.
        /// </remarks>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllNews()
        {
            var news = _dataBase.News.ToArray();

            if (!news.Any())
            {
                return NotFound();
            }

            return Ok(news);
        }

        /// <summary>
        /// Get news by id.
        /// </summary>
        /// <remarks>
        /// Enter id and recive news by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetNews(int id)
        {
            var news = _dataBase.News.FirstOrDefault(x => x.Id.Equals(id));

            if (news == null)
            {
                return NotFound("No news with this id..");
            }

            return Ok(news);
        }

        /// <summary>
        /// Create a news.
        /// </summary>
        /// <remarks>
        /// Give the information and create a news.
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateNews([FromBody] News news)
        {
            DateTime date = DateTime.Now;
            news.CreatedDate = date.ToString("dd/MM/yyyy");
            news.Rating = 0;
            news.RatingQty = 0;

            if (ModelState.IsValid)
            {
                //news.AdminID = generalAdmin.Id;

                _dataBase.News.Add(news);
                _dataBase.SaveChanges();

                return Created("", news);

            }
            return NotFound("Not valid input..");
        }

        /// <summary>
        /// Delete news by id.
        /// </summary>
        /// <remarks>
        /// Enter id and delete one news by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteNews(int id)
        {
            var findNews = _dataBase.News.Find(id);

            if (findNews == null)
            {
                return NotFound("No news with this id..");
            }

            string result = null;
            var students = _dataBase.Students;
            foreach (var student in students)
            {
                if (student.NewsIDs != null)
                {
                    var array = student.NewsIDs.Split(',', StringSplitOptions.RemoveEmptyEntries);
                    for (int i = 0; i < array.Length; i++)
                    {
                        string newsInfo = array[i];
                        var newsArray = newsInfo.Split('=', StringSplitOptions.RemoveEmptyEntries);
                        int newsId = int.Parse(newsArray[0].ToString());
                        if (newsId != findNews.Id)
                        {
                            result += newsInfo + ",";
                        }
                    }
                    student.NewsIDs = result;
                }
                _dataBase.Students.Update(student);
                result = null;
            }

            _dataBase.News.Remove(findNews);
            _dataBase.SaveChanges();

            return NoContent();
        }

        /// <summary>
        /// Update news by id.
        /// </summary>
        /// <remarks>
        /// Enter id and update the parameters that you want.
        /// </remarks>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateNews(int id, [FromBody] News news)
        {
            var findNews = _dataBase.News.Where(x => x.Id == id)
                                              .FirstOrDefault();

            if (findNews == null)
            {
                return NotFound("No news with this id..");
            }

            if (ModelState.IsValid)
            {
                _dataBase.Entry(findNews).CurrentValues.SetValues(news);
                _dataBase.SaveChanges();

                return NoContent();
            }
            return NoContent();
        }
    }
}
