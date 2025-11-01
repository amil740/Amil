using System;

namespace BookBorrow.Exceptions
{
    /// <summary>
    /// Thrown when a book is not found in the database
    /// </summary>
    public class BookNotFoundException : Exception
    {
        public BookNotFoundException(int bookId)
            : base($"Book with id {bookId} not found.")
        {
        }

        public BookNotFoundException(string message)
          : base(message)
        {
        }
    }
}
