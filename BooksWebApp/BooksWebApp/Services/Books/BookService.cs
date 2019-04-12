using BooksWebApp.Models.Domain;
using BooksWebApp.Models.DTO.Books;
using BooksWebApp.Models.Request.Books;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BooksWebApp.Services.Books
{
    public class BookService
    {
        string BadConnection()
        {
            return "Error: Db Connection Failed";
        }

        SqlConnection DbConnection()
        {
            var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DbConn"].ConnectionString);
            conn.Open();
            return conn;
        }

        public List<Book> GetAllBooks()
        {
            using (var conn = DbConnection())
            {
                Book book = null;
                List<Book> bookList = null;
                if (conn.State == ConnectionState.Open)
                {
                    using (var cmd = new SqlCommand("Book_SelectAll", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                        bookList = new List<Book>();

                        while (reader.Read())
                        {
                            book = new Book()
                            {
                                Book_Id = (int)reader["Book_Id"],
                                Title = (string)reader["Title"],
                                Genre = (string)reader["Genre"],
                                Publication_Date = (DateTime)reader["Publication_Date"],
                                Price = (decimal)reader["Price"],
                                Description = (string)reader["Description"],
                                Author_Id = (int)reader["Author_Id"]
                            };
                            bookList.Add(book);
                        }
                    }
                }
                else
                {
                    BadConnection();
                }
                return bookList;
            }
        }

        public Book GetBookById(int id)
        {
            using (var conn = DbConnection())
            {
                Book book = null;
                if (conn.State == ConnectionState.Open)
                {
                    using (var cmd = new SqlCommand("Book_SelectById", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Book_Id", id);
                        var reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                        if (reader.Read())
                        {
                            book = new Book()
                            {
                                Book_Id = (int)reader["Book_Id"],
                                Title = (string)reader["Title"],
                                Genre = (string)reader["Genre"],
                                Publication_Date = (DateTime)reader["Publication_Date"],
                                Price = (decimal)reader["Price"],
                                Description = (string)reader["Description"],
                                Author_Id = (int)reader["Author_Id"]
                            };
                        }
                    }
                }
                else
                {
                    BadConnection();
                }
                return book;
            }
        }

        public int AddBook(BookAddRequest model)
        {
            using (var conn = DbConnection())
            {
                int id = 0;
                if (conn.State == ConnectionState.Open)
                {
                    using (var cmd = new SqlCommand("Book_Create", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Title", model.Title);
                        cmd.Parameters.AddWithValue("@Genre", model.Genre);
                        cmd.Parameters.AddWithValue("@Publication_Date", model.Publication_Date);
                        cmd.Parameters.AddWithValue("@Price", model.Price);
                        cmd.Parameters.AddWithValue("@Description", model.Description);
                        cmd.Parameters.AddWithValue("@Author_Id", model.Author_Id);
                        cmd.Parameters.AddWithValue("@Book_Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                        cmd.ExecuteNonQuery();

                        id = (int)cmd.Parameters["@Book_Id"].Value;
                    }
                }
                else
                {
                    BadConnection();
                }
                return id;
            }
        }

        public int EditBook(BookUpdateRequest model)
        {
            using (var conn = DbConnection())
            {
                int id = 0;
                if (conn.State == ConnectionState.Open)
                {
                    using (var cmd = new SqlCommand("Book_Update", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Book_Id", model.Book_Id);
                        cmd.Parameters.AddWithValue("@Title", model.Title);
                        cmd.Parameters.AddWithValue("@Genre", model.Genre);
                        cmd.Parameters.AddWithValue("@Publication_Date", model.Publication_Date);
                        cmd.Parameters.AddWithValue("@Price", model.Price);
                        cmd.Parameters.AddWithValue("@Description", model.Description);
                        cmd.Parameters.AddWithValue("@Author_Id", model.Author_Id);

                        cmd.ExecuteNonQuery();

                        id = (int)cmd.Parameters["@Book_Id"].Value;
                    }
                }
                else
                {
                    BadConnection();
                }
                return id;
            }
        }

        public int RemoveBook(int id)
        {
            using (var conn = DbConnection())
            {
                int temp = 0;
                if (conn.State == ConnectionState.Open)
                {
                    using (var cmd = new SqlCommand("Book_Delete", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Book_Id", id);
                        temp = (int)cmd.Parameters["@Book_Id"].Value;
                        cmd.ExecuteNonQuery();
                    }
                }
                else
                {
                    BadConnection();
                }
                return temp;
            }
        }

        // Custom
        
        public BookDetailsDTO GetBookDetails(int id)
        {
            using (var conn = DbConnection())
            {
                BookDetailsDTO book = null;
                if (conn.State == ConnectionState.Open)
                {
                    using (var cmd = new SqlCommand("Book_SelectByDetails", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Book_Id", id);
                        var reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                        if (reader.Read())
                        {
                            book = new BookDetailsDTO()
                            {
                                Title = (string)reader["Title"],
                                Genre = (string)reader["Genre"],
                                Publication_Date = (DateTime)reader["Publication_Date"],
                                Description = (string)reader["Description"],
                                Price = (decimal)reader["Price"],
                                Author = (string)reader["Name"]
                            };
                        }
                    }
                }
                else
                {
                    BadConnection();
                }
                return book;
            }
        }

        public List<BookDTO> GetBookGenre(string genre)
        {
            using (var conn = DbConnection())
            {
                List<BookDTO> bookList = null;
                BookDTO book = null;
                if (conn.State == ConnectionState.Open)
                {
                    using (var cmd = new SqlCommand("Book_SelectByGenre", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Genre", genre);
                        var reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                        bookList = new List<BookDTO>();

                        while (reader.Read())
                        {
                            book = new BookDTO()
                            {
                                Title = (string)reader["Title"],
                                Author = (string)reader["Author"],
                                Genre = (string)reader["Genre"]
                            };
                            bookList.Add(book);
                        }
                    }
                }
                else
                {
                    BadConnection();
                }
                return bookList;
            }
        }

        public List<BookDTO> GetBookAuthor(int id)
        {
            using (var conn = DbConnection())
            {
                List<BookDTO> bookList = null;
                BookDTO book = null;
                if (conn.State == ConnectionState.Open)
                {
                    using (var cmd = new SqlCommand("Book_SelectByAuthor", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Author_Id", id);
                        var reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                        bookList = new List<BookDTO>();

                        while (reader.Read())
                        {
                            book = new BookDTO()
                            {
                                Title = (string)reader["Title"],
                                Author = (string)reader["Author"],
                                Genre = (string)reader["Genre"]
                            };
                            bookList.Add(book);
                        }
                    }
                }
                else
                {
                    BadConnection();
                }
                return bookList;
            }
        }

        public List<BookDTO> GetBookPub(DateTime pubDate)
        {
            using (var conn = DbConnection())
            {
                List<BookDTO> bookList = null;
                BookDTO book = null;
                if (conn.State == ConnectionState.Open)
                {
                    using (var cmd = new SqlCommand("Book_SelectByPublication", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Publication_Date", pubDate);
                        var reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                        bookList = new List<BookDTO>();

                        if (reader.Read())
                        {
                            book = new BookDTO()
                            {
                                Title = (string)reader["Title"],
                                Author = (string)reader["Author"],
                                Genre = (string)reader["Genre"]
                            };
                            bookList.Add(book);
                        }
                    }
                }
                else
                {
                    BadConnection();
                }
                return bookList;
            }
        }
    }
}