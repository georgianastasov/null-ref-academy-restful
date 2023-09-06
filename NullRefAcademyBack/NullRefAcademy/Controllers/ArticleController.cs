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
    public class ArticleController : ControllerBase
    {
        private readonly ApplicationDataContext _dataBase;

        public ArticleController(ApplicationDataContext dataBase)
        {
            _dataBase = dataBase;
        }

        /// <summary>
        /// Get all articles.
        /// </summary>
        /// <remarks>
        /// Return all articles from database.
        /// </remarks>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllArticles()
        {
            var articles = _dataBase.Articles.ToArray();

            if (!articles.Any())
            {
                return NotFound();
            }

            return Ok(articles);
        }

        /// <summary>
        /// Get article by id.
        /// </summary>
        /// <remarks>
        /// Enter id and recive article by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetArticle(int id)
        {
            var article = _dataBase.Articles.FirstOrDefault(x => x.Id.Equals(id));

            if (article == null)
            {
                return NotFound("No article with this id..");
            }

            return Ok(article);
        }

        /// <summary>
        /// Create a article.
        /// </summary>
        /// <remarks>
        /// Give the information and create an article.
        /// </remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateArticle([FromBody] Article article)
        {
            DateTime date = DateTime.Now;
            article.CreatedDate = date.ToString("dd/MM/yyyy");
            article.Rating = 0;
            article.RatingQty = 0;

            if (ModelState.IsValid)
            {
                //article.AdminID = generalAdmin.Id;

                _dataBase.Articles.Add(article);
                _dataBase.SaveChanges();

                return Created("", article);

            }
            return NotFound("Not valid input..");
        }

        /// <summary>
        /// Delete article by id.
        /// </summary>
        /// <remarks>
        /// Enter id and delete one article by this id.
        /// </remarks>
        /// <param name="id"></param>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            var findArticle = _dataBase.Articles.Find(id);

            if (findArticle == null)
            {
                return NotFound("No article with this id..");
            }

            string result = null;
            var students = _dataBase.Students;
            foreach (var student in students)
            {
                if (student.ArticleIDs != null)
                {
                    var array = student.ArticleIDs.Split(',', StringSplitOptions.RemoveEmptyEntries);
                    for (int i = 0; i < array.Length; i++)
                    {
                        string articleInfo = array[i];
                        var articleArray = articleInfo.Split('=', StringSplitOptions.RemoveEmptyEntries);
                        int articleId = int.Parse(articleArray[0].ToString());
                        if (articleId != findArticle.Id)
                        {
                            result += articleInfo + ",";
                        }
                    }
                    student.ArticleIDs = result;
                }
                _dataBase.Students.Update(student);
                result = null;
            }

            result = null;
            var teachers = _dataBase.Teachers;
            foreach (var teacher in teachers)
            {
                if (teacher.ArticleIDs != null)
                {
                    var array = teacher.ArticleIDs.Split(',', StringSplitOptions.RemoveEmptyEntries);
                    for (int i = 0; i < array.Length; i++)
                    {
                        string articleInfo = array[i];
                        var articleArray = articleInfo.Split('=', StringSplitOptions.RemoveEmptyEntries);
                        int articleId = int.Parse(articleArray[0].ToString());
                        if (articleId != findArticle.Id)
                        {
                            result += articleInfo + ",";
                        }
                    }
                    teacher.ArticleIDs = result;
                }
                _dataBase.Teachers.Update(teacher);
                result = null;
            }

            _dataBase.Articles.Remove(findArticle);
            _dataBase.SaveChanges();

            return NoContent();
        }

        /// <summary>
        /// Update article by id.
        /// </summary>
        /// <remarks>
        /// Enter id and update the parameters that you want.
        /// </remarks>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateArticle(int id, [FromBody] Article article)
        {
            var findArticle = _dataBase.Articles.Where(x => x.Id == id)
                                              .FirstOrDefault();

            if (findArticle == null)
            {
                return NotFound("No article with this id..");
            }

            if (ModelState.IsValid)
            {
                _dataBase.Entry(findArticle).CurrentValues.SetValues(article);
                _dataBase.SaveChanges();

                return NoContent();
            }
            return NoContent();
        }
    }
}
