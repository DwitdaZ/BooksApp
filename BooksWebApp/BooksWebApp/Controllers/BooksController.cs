using BooksWebApp.Models.Request.Books;
using BooksWebApp.Services.Books;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BooksWebApp.Controllers
{
    [RoutePrefix("api/Books")]
    public class BooksController : ApiController
    {
        BookService svc = new BookService();

        [HttpGet, Route("echo")]
        public IHttpActionResult EchoTest()
        {
            return Ok("Echo test success");
        }

        [HttpGet, Route()]
        public IHttpActionResult Get()
        {
            var status = svc.GetAllBooks();
            if (status == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(status);
            }
        }

        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var status = svc.GetBookById(id);
            if (status == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(status);
            }
        }

        [HttpPost, Route()]
        public IHttpActionResult Post(BookAddRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                return Ok("Book number " + svc.AddBook(model) + " has been added to the directory");
            }
        }

        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Put(BookUpdateRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                return Ok("Book number " + svc.EditBook(model) + " has been updated");
            }
        }

        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var status = svc.RemoveBook(id);
            if (status == 0)
            {
                return NotFound();
            }
            else
            {
                return Ok("Book number " + svc.RemoveBook(id) + " has been deleted");
            }
        }

        // api/Books/{id}/details
        [HttpGet, Route("{id:int}/details")]
        public IHttpActionResult GetDetail(int id)
        {
            var status = svc.GetBookDetails(id);
            if (status == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(status);
            }
        }

        // api/Books/genre
        [HttpGet, Route("{genre}")]
        public IHttpActionResult Get(string genre)
        {
            var status = svc.GetBookGenre(genre);
            if (status == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(status);
            }
        }

        [HttpGet, Route("~/api/authors/{authorId}/books")]
        public IHttpActionResult GetAuthor(int authorId)
        {
            var status = svc.GetBookAuthor(authorId);
            if (status == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(status);
            }
        }

        //api/Books/date/yyyy/mm/dd
        [Route("date/{pubDate:datetime:regex(\\d{4}-\\d{2}-\\d{2})}")]
        [Route("date/{*pubDate:datetime:regex(\\d{4}/\\d{2}/\\d{2})}")]
        public IHttpActionResult GetPublication(DateTime pubDate)
        {
            var status = svc.GetBookPub(pubDate);
            if (status == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(status);
            }
        }
    }
}
