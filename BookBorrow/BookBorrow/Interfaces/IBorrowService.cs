using System.Collections.Generic;
using System.Threading.Tasks;
using BookBorrow.Models;

namespace BookBorrow.Services
{
    public interface IBorrowService
    {
        Task<Borrow> BorrowBookAsync(int bookId, string borrowerName);
        Task<Borrow> ReturnBookAsync(int borrowId);
        Task<List<Borrow>> GetAllBorrowsAsync();
    }
}
