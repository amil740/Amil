using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrow.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public double Price { get; set; }
        public int StockCount { get; set; }
        public List<Borrow> Borrows { get; set; }

        public override string ToString()
        {
            return $"Book Id: {Id}, Name: {Name}, Author: {Author}, Price: {Price}, StockCount: {StockCount}";
        }
    }
}
