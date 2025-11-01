using BookBorrow.Datas;
using BookBorrow.Exceptions;
using BookBorrow.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrow.Services
{
    public class BorrowService : IBorrowService
    {
        private readonly LibraryDbContext _context;

        public BorrowService(LibraryDbContext context)
        {
            _context = context;
        }

        public async Task<Borrow> BorrowBookAsync(int bookId, string borrowerName)
        {
            if (string.IsNullOrWhiteSpace(borrowerName))
            {
                throw new InvalidBorrowerNameException();
            }

            var book = await _context.Books.FindAsync(bookId);
            if (book == null)
            {
                throw new BookNotFoundException(bookId);
            }

            if (book.StockCount <= 0)
            {
                throw new BookOutOfStockException(bookId);
            }

            var borrow = new Borrow
            {
                BookId = bookId,
                BorrowerName = borrowerName.Trim(),
                BorrowDate = DateTime.Now,
                IsReturned = false,
                Price = book.Price,
                ReturnDate = null
            };

            book.StockCount--;

            _context.Borrows.Add(borrow);
            _context.Books.Update(book);
            await _context.SaveChangesAsync();

            return borrow;
        }

        public async Task<List<Borrow>> GetAllBorrowsAsync()
        {
            return await _context.Borrows.ToListAsync();
        }

        public async Task<Borrow> ReturnBookAsync(int borrowId)
        {
            var borrow = await _context.Borrows.FindAsync(borrowId);
            if (borrow == null)
            {
                throw new BorrowNotFoundException(borrowId);
            }

            if (borrow.IsReturned)
            {
                throw new BookAlreadyReturnedException(borrowId);
            }

            var book = await _context.Books.FindAsync(borrow.BookId);
            if (book == null)
            {
                throw new BookNotFoundException(borrow.BookId);
            }

            borrow.ReturnDate = DateTime.Now;
            borrow.IsReturned = true;

            book.StockCount++;

            _context.Borrows.Update(borrow);
            _context.Books.Update(book);
            await _context.SaveChangesAsync();

            return borrow;
        }
    }
}
