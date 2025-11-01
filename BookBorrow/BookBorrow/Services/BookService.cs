using BookBorrow.Datas;
using BookBorrow.Interfaces;
using BookBorrow.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrow.Services
{
    public class BookService : IBookService
    {
        private readonly LibraryDbContext _context;

        public BookService(LibraryDbContext context)
        {
            _context = context;
        }

        public async Task<Book> AddAsync(Book book)
        {
            if (book == null)
            {
                throw new ArgumentNullException(nameof(book), "Book cannot be null");
            }

            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return false;
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Book>> GetAllAsync()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<List<Book>> GetAvailableBooksAsync()
        {
            return await _context.Books
                .Where(b => b.StockCount > 0)
                .ToListAsync();
        }

        public async Task<Book> GetByIdAsync(int id)
        {
            return await _context.Books.FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<Book>> GetMostBorrowedBooksAsync()
        {
            return await _context.Books
                .Include(b => b.Borrows)
                .OrderByDescending(b => b.Borrows.Count)
                .ToListAsync();
        }

        public async Task<List<Book>> GetTop3BooksByPrice()
        {
            return await _context.Books
                .OrderByDescending(b => b.Price)
                .Take(3)
                .ToListAsync();
        }

        public async Task<Book> UpdateAsync(Book book)
        {
            if (book == null)
            {
                throw new ArgumentNullException(nameof(book), "Book cannot be null");
            }

            var existingBook = await _context.Books.FindAsync(book.Id);
            if (existingBook == null)
            {
                throw new InvalidOperationException($"Book with id {book.Id} not found");
            }

            existingBook.Name = book.Name;
            existingBook.Author = book.Author;
            existingBook.Price = book.Price;
            existingBook.StockCount = book.StockCount;

            _context.Books.Update(existingBook);
            await _context.SaveChangesAsync();
            return existingBook;
        }
    }
}
