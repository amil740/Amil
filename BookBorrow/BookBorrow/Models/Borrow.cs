using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrow.Models
{
    public class Borrow
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public string BorrowerName { get; set; }
        public DateTime BorrowDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public bool IsReturned { get; set; }
        public double Price { get; set; }
        public override string ToString()
        {
            return $"Borrow Id: {Id}, BookId: {BookId}, BorrowerName: {BorrowerName}, BorrowDate: {BorrowDate}, ReturnDate: {ReturnDate}, IsReturned: {IsReturned}, Price: {Price}";
        }
    }
}
