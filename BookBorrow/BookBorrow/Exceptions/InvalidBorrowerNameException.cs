using System;

namespace BookBorrow.Exceptions
{
    /// <summary>
    /// Thrown when an invalid borrower name is provided
    /// </summary>
    public class InvalidBorrowerNameException : Exception
    {
  public InvalidBorrowerNameException()
        : base("Borrower name cannot be null or empty.")
        {
    }

        public InvalidBorrowerNameException(string message)
       : base(message)
        {
        }
    }
}
