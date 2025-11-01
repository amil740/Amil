using BookBorrow.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrow.Interfaces
{
    public interface IBookService
    {
        Task<Book> AddAsync(Book book);
        Task<Book> GetByIdAsync(int id);
        Task<List<Book>> GetAllAsync();
        Task<Book> UpdateAsync(Book book);
        Task<bool> DeleteAsync(int id);
        Task<List<Book>> GetMostBorrowedBooksAsync();
        Task<List<Book>> GetAvailableBooksAsync();
        Task<List<Book>> GetTop3BooksByPrice();

    }
}
