using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MiniProject.Exceptions;

namespace MiniProject.Models
{
    internal class Book : Product
    {
        public string Author { get; set; }
        public int PageCount { get; set; }

        public Book(string name, double price, string authorName, int pageCount)
        {
            Name = name;
            Price = price;
            Author = authorName;
            PageCount = pageCount;
            Count = 0;
            TotalIncome = 0;
        }

        public override void sell()
        {
            if (Count > 0)
            {
                Count--;
                TotalIncome += Price;
                Console.WriteLine($"Kitab satildi: {Name}");
            }
            else
            {
                throw new ProductCountsZeroException($"Kitab '{Name}' qalmayib!");
            }

        }

        public override void showInfo()
        {
            Console.WriteLine($"Book ID: {Id}, Name: {Name}, Author: {Author}, Page Count: {PageCount}, Price: {Price}, Count: {Count}, Total Income: {TotalIncome}");
        }
    }
}
