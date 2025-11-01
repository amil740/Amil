using System;

namespace BookBorrow.Exceptions
{
    /// <summary>
    /// Thrown when a book is out of stock
    /// </summary>
    public class BookOutOfStockException : Exception
    {
        public BookOutOfStockException(int bookId)
          : base($"Book with id {bookId} is out of stock.")
        {
  }

        public BookOutOfStockException(string message)
            : base(message)
        {
    }
    }
}
