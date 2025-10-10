using ConsoleApp2.Transactions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp2.Interfaces
{
    public interface ITransactionService
    {
        public List<Transaction> GetAll();
        public void AddTransaction(Transaction transaction);
        public List<Transaction> GetTransactionsByCard(string cardNumber);
        public List<Transaction> GetTransactionsByDateRange(DateTime startDate, DateTime endDate);
        public List<Transaction> GetCardTransactionsByDateRange(string cardNumber, DateTime startDate, DateTime endDate);
    }
}
