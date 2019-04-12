using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BooksWebApp.Models.Domain
{
    public class Book
    {
        [Required]
        public int Book_Id { get; set; }

        [Required(ErrorMessage = "A Title must be entered")]
        [StringLength(128)]
        public string Title { get; set; }

        [StringLength(50)]
        public string Genre { get; set; }

        [DisplayName("Publication Date")]
        public DateTime Publication_Date { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }

        [Required(ErrorMessage = "An Author ID must be entered")]
        [ForeignKey("Author_Id")]
        public int Author_Id { get; set; }
    }
}