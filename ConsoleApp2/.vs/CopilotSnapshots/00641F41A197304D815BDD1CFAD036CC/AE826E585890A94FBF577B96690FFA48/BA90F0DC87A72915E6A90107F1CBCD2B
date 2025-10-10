using ConsoleApp2.Exceptions;
using ConsoleApp2.Interfaces;
using ConsoleApp2.Models;
using System.Data;
using System.Text.Json;
namespace ConsoleApp2.Services
{
    internal class CardService : ICardService
    {
        private readonly string _filePath;

        public CardService()
        {
            string dataDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Data");
            if (!Directory.Exists(dataDirectory))
            {
                Directory.CreateDirectory(dataDirectory);
            }
            
            _filePath = Path.Combine(dataDirectory, "cards.json");

            if (!File.Exists(_filePath))
            {
                File.WriteAllText(_filePath, "[]");
            }
        }

        public void AddCard(Card card)
        {
            var cards = GetAll();
            
            if (card.Id == 0)
            {
                throw new ConflictException("Card Id cannot be zero.");
            }
            if (card.CardNumber.ToString().Length != 16)
            {
                throw new InvalidCardNumberException("Card number must be 16 characters long.");
            }
            if (cards.Any(c => c.Id == card.Id))
            {
                throw new ConflictException($"Bu id de kart{card.Id} artig var.");
            }

            cards.Add(card);
            SaveCards(cards);
        }
        public Card? this[int cardNumber]
        {
            get
            {
                var cards = GetAll();
                return cards.FirstOrDefault(c => c.CardNumber == cardNumber);
            }
        }
            public List<Card> GetAll()
            {
                if (!File.Exists(_filePath))
                { 
                    return new List<Card>();
                }

                string jsonContent = File.ReadAllText(_filePath);
            
                if (string.IsNullOrEmpty(jsonContent))
                {
                    return new List<Card>();
                }

                var cards = JsonSerializer.Deserialize<List<Card>>(jsonContent);
                return cards ?? new List<Card>();
            }

        public Card? GetById(int id)
        {
            var cards = GetAll();
            return cards.FirstOrDefault(c => c.Id == id);
        }
        private void SaveCards(List<Card> cards)
        {
            string jsonContent = JsonSerializer.Serialize(cards);
            File.WriteAllText(_filePath, jsonContent);
        }
    }
}
