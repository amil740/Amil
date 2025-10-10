using System;
using System.Collections.Generic;
using System.Linq;
using ConsoleApp2.Interfaces;
using ConsoleApp2.Transactions;
using ConsoleApp2.Exceptions;

namespace ConsoleApp2.Services
{
    public class TransactionService : ITransactionService
    {
        private List<Transaction> _transactions;

        public TransactionService()
        {
            _transactions = new List<Transaction>();
        }

        public List<Transaction> GetAll()
        {
            return _transactions.ToList();
        }
        public void AddTransaction(Transaction transaction)
        {
            if (transaction == null)
            {
                throw new ArgumentNullException(nameof(transaction), "Tranzaksiya null ola bilməz");
            }

            if (_transactions.Any(t => t.Id == transaction.Id))
            {
                throw new ConflictException($"Bu Id ({transaction.Id}) ilə tranzaksiya artıq mövcuddur");
            }

            if (transaction.Amount <= 0)
            {
                throw new ArgumentException("Tranzaksiya məbləği müsbət olmalıdır", nameof(transaction));
            }

            _transactions.Add(transaction);
        }

        public List<Transaction> GetTransactionsByCard(int cardNumber)
        {
            return _transactions
                .Where(t => t.CardNumber == cardNumber)
                .OrderByDescending(t => t.Date)
                .ToList();
        }

        public List<Transaction> GetTransactionsByDateRange(DateTime startDate, DateTime endDate)
        {
            if (startDate > endDate)
            {
                throw new ArgumentException("Başlama tarixi bitiş tarixindən böyük ola bilməz");
            }

            return _transactions
                .Where(t => t.Date >= startDate && t.Date <= endDate)
                .OrderByDescending(t => t.Date)
                .ToList();
        }

        public List<Transaction> GetCardTransactionsByDateRange(int cardNumber, DateTime startDate, DateTime endDate)
        {
            if (startDate > endDate)
            {
                throw new ArgumentException("Başlama tarixi bitiş tarixindən böyük ola bilməz");
            }

            return _transactions
                .Where(t => t.CardNumber == cardNumber && t.Date >= startDate && t.Date <= endDate)
                .OrderByDescending(t => t.Date)
                .ToList();
        }

        public List<Transaction> GetByCardNumber(int cardNumber)
        {
            return GetTransactionsByCard(cardNumber);
        }
    }
}