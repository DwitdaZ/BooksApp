using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BooksWebApp.Models.DTO.Books
{
    public class BookDTO
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
    }
}