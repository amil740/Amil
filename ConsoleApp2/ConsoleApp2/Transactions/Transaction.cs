using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp2.Transactions
{
    public class Transaction
    {
        public int Id { get; set; }
        public int CardNumber { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
        
        public override string ToString()
        {
            return $"Id: {Id}, CardNumber: {CardNumber}, Amount: {Amount:C}, Date: {Date:yyyy-MM-dd HH:mm:ss}";
        }
    }
}
