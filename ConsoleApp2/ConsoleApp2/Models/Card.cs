using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace ConsoleApp2.Models
{
    public enum Bank
    {
        ABB,
        Kapital,
        Leo
    }

    public class Card
    {
        public int Id { get; set; }
        public double Balance { get; set; }
        public double Bonus { get; set; }
        private string _cardNumber = string.Empty;
        public string CardNumber 
        {
            get => _cardNumber;
            set
            {
                if (IsValidCardNumber(value))
                {
                    _cardNumber = value;
                }
                else
                {
                    throw new ArgumentException("Kart nomresi 16 reqem ola bilmez");
                }
            }
        }
        
        public Bank Bank { get; set; }

        private bool IsValidCardNumber(string cardNumber)
        {
            if (string.IsNullOrEmpty(cardNumber))
                return false;
                
            Regex regex = new Regex(@"^\d{16}$");
            return regex.IsMatch(cardNumber);
        }
        
        public bool WithDraw(double amount)
        {
            if (amount <= 0)
                return false;
                
            if (Balance >= amount)
            {
                Balance -= amount;
                return true;
            }
            
            return false;
        }
        
        public override string ToString()
        {
            return $"Id: {Id}, CardNumber: {CardNumber}, Balance: {Balance}, Bonus: {Bonus}, Bank: {Bank}";
        }
    }
}
