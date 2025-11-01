using System;

namespace BookBorrow.Exceptions
{
    /// <summary>
    /// Thrown when a borrow record is not found
    /// </summary>
    public class BorrowNotFoundException : Exception
    {
     public BorrowNotFoundException(int borrowId)
      : base($"Borrow record with id {borrowId} not found.")
        {
       }

 public BorrowNotFoundException(string message)
    : base(message)
        {
        }
    }
}
