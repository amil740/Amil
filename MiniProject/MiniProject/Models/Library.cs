using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MiniProject.Exceptions;

namespace MiniProject.Models
{
    internal class Library
    {
        public int BookLimit { get; set; }
        public List<Book> Books { get; set; }

        public Library(int bookLimit)
        {
            BookLimit = bookLimit;
            Books = new List<Book>();
        }

        public void AddBook(Book book)
        {
            if (Books.Count >= BookLimit)
            {
                throw new CapacityLimitException($"Limit asilib {BookLimit}");
            }
            
            Books.Add(book);
            Console.WriteLine($"Kitab elave edildi : {book.Name}");

        }
        
        public Book GetBookById(int? id)
        {
            if (id == null)
            {
                throw new NullReferenceException("ID null ola bilmez!");
            }
            
            Book book = Books.FirstOrDefault(b => b.Id == id);
            return book;
        }
        
        public Book RemoveById(int? id)
        {
            if (id == null)
            {
                throw new NullReferenceException("ID null ola bilmez!");
            }
            
            Book book = Books.FirstOrDefault(b => b.Id == id);
            if (book == null)
            {
                throw new NotFoundException($"ID {id} tapilmadi!");
            }
            
            Books.Remove(book);
            return book;
        }
    }
}
