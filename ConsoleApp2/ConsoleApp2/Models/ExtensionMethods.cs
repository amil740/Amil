using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp2.Models
{
    public static class ExtensionMethods
    {
        public static string GetMaskedCardNumber(this Card card)
        {
            var cardNumberStr = card.CardNumber.ToString();

            if (cardNumberStr.Length != 16)
            {
                throw new Exception("Card number must be exactly 16 digits.");
            }

            return cardNumberStr.Substring(0, 4) + " **** **** " + cardNumberStr.Substring(12, 4);
        }

        public static void ExpenseAndGetBonus(this Card card, double amount)
        {
            if (card.Balance < amount)
            {
                throw new InvalidOperationException("Insufficient balance for this transaction.");
            }
            
            card.Balance -= amount;
            
            double bonusPercentage = (Card.CardName)card.Id switch
            {
                Card.CardName.Leo => 0.04,
                Card.CardName.Abb => 0.02,
                Card.CardName.Kapital => 0.05,
                _ => 0.0
            };
            
            card.Bonus += amount * bonusPercentage;
        }
    }
}
