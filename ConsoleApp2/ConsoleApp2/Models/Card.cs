using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp2.Models
{
    public class Card
    {
        public int Id { get; set; }
        public double Bonus { get; set; }
        public double Balance { get; set; }
        
        private long _cardNumber;
        public long CardNumber 
        {
            get => _cardNumber;
            set
            {
                if (value.ToString().Length == 16)
                {
                    _cardNumber = value;
                }
                else
                {
                    throw new Exception("kart nomresi 16 character olmalidir");
                }
            }
        }
        
        public enum CardName
        {
            Leo,
            Abb,
            Kapital
        }
        
        public void Withdraw(double amount)
        {
            if (amount <= Balance)
            {
                Console.WriteLine(true);
                Balance -= amount;
            }
            else
            {
                Console.WriteLine(false);
                throw new Exception("Balansda kifayet qeder pul yoxdur");
            }
        }
        
        public override string ToString()
        {
            return $"Id: {Id}, CardNumber: {CardNumber}, Balance: {Balance}, Bonus: {Bonus}";
        }
    }

    public static class CardExtensions
    {
        public static Card MaskCardNumber(this Card card)
        {
            var cardNumberStr = card.CardNumber.ToString();
            var maskedCardNumber = cardNumberStr.Substring(0, 4) + "00000000" + cardNumberStr.Substring(12, 4);
            
            return new Card
            {
                Id = card.Id,
                Bonus = card.Bonus,
                Balance = card.Balance,
                CardNumber = long.Parse(maskedCardNumber)
            };
        }
    }
    
    public class BonusCalculator
    {
        public static double CalculateBonus(Card card)
        {
            double bonusPercentage = (Card.CardName)card.Id switch
            {
                Card.CardName.Leo => 0.04,
                Card.CardName.Abb => 0.02,
                Card.CardName.Kapital => 0.05,
                _ => 0.0
            };

            return card.Balance * bonusPercentage;
        }
    }
}
