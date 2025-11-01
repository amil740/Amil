using System;

namespace BookBorrow.Exceptions
{
    /// <summary>
    /// Thrown when trying to return a book that was already returned
    /// </summary>
    public class BookAlreadyReturnedException : Exception
    {
     public BookAlreadyReturnedException(int borrowId)
    : base($"Borrow record with id {borrowId} has already been returned.")
 {
       }

 public BookAlreadyReturnedException(string message)
           : base(message)
        {
       }
    }
}
