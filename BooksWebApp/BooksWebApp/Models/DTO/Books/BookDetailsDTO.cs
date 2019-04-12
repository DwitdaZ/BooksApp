using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BooksWebApp.Models.DTO.Books
{
    public class BookDetailsDTO
    {
        public string Title { get; set; }
        public string Genre { get; set; }
        public DateTime Publication_Date { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Author { get; set; }
    }
}