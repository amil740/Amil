using ConsoleApp2.Models;
using ConsoleApp2.Services;
using ConsoleApp2.Transactions;
using ConsoleApp2.Exceptions;


var cardService = new CardService();
var transactionService = new TransactionService();

var leoCard = new Card
{
    Id = 1,
    CardNumber = 1234567890123456,
    Balance = 1500.50,
    Bonus = 0.0
};

var abbCard = new Card
{
    Id = 2,
    CardNumber = 9876543210987654,
    Balance = 2300.75,
    Bonus = 0.0
};

var kapitalCard = new Card
{
    Id = 3,
    CardNumber = 5555444433332222,
    Balance = 800.25,
    Bonus = 0.0
};

try
{
    cardService.AddCard(leoCard);
    cardService.AddCard(abbCard);
    cardService.AddCard(kapitalCard);
    
    Console.WriteLine("Cards added successfully!");
}
catch (ConflictException ex)
{
    Console.WriteLine($"Conflict: {ex.Message}");
}
catch (InvalidCardNumberException ex)
{
    Console.WriteLine($"Invalid card: {ex.Message}");
}

var allCards = cardService.GetAll();
Console.WriteLine($"\nTotal cards: {allCards.Count}");

foreach (var card in allCards)
{
    Console.WriteLine(card.ToString());
    Console.WriteLine($"Masked: {card.GetMaskedCardNumber()}");
    
    var maskedCard = card.MaskCardNumber();
    Console.WriteLine($"Extension masked: {maskedCard}");
    
    var calculatedBonus = BonusCalculator.CalculateBonus(card);
    Console.WriteLine($"Calculated bonus: {calculatedBonus:C}");
}

Console.WriteLine("\n--- Testing ExpenseAndGetBonus ---");
var testCard = cardService.GetById(1);
if (testCard != null)
{
    Console.WriteLine($"Before expense: {testCard}");
    testCard.ExpenseAndGetBonus(100.0);
    Console.WriteLine($"After expense: {testCard}");
}

Console.WriteLine("\n--- Testing Withdraw ---");
var withdrawCard = cardService.GetById(2);
if (withdrawCard != null)
{
    Console.WriteLine($"Before withdraw: {withdrawCard}");
    try
    {
        withdrawCard.Withdraw(50.0);
        Console.WriteLine($"After withdraw: {withdrawCard}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Withdraw failed: {ex.Message}");
    }
}

Console.WriteLine("\n--- Adding Transactions ---");
var transaction1 = new Transaction
{
    Id = 1,
    CardNumber = (int)leoCard.CardNumber,
    Amount = 100.0,
    Date = DateTime.Now
};

var transaction2 = new Transaction
{
    Id = 2,
    CardNumber = (int)abbCard.CardNumber,
    Amount = 50.0,
    Date = DateTime.Now.AddDays(-1)
};

try
{
    transactionService.AddTransaction(transaction1);
    transactionService.AddTransaction(transaction2);
    
    var allTransactions = transactionService.GetAll();
    Console.WriteLine($"Total transactions: {allTransactions.Count}");
    
    foreach (var transaction in allTransactions)
    {
        Console.WriteLine(transaction.ToString());
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Transaction error: {ex.Message}");
}

Console.WriteLine("\n--- Card Service Indexer ---");
var foundCard = cardService[(int)leoCard.CardNumber];
if (foundCard != null)
{
    Console.WriteLine($"Found card using indexer: {foundCard}");
}

var cardTransactions = transactionService.GetTransactionsByCard((int)leoCard.CardNumber);
Console.WriteLine($"\nTransactions for Leo card: {cardTransactions.Count}");
foreach (var trans in cardTransactions)
{
    Console.WriteLine(trans.ToString());
}

var dateRangeTransactions = transactionService.GetTransactionsByDateRange(DateTime.Now.AddDays(-2), DateTime.Now);
Console.WriteLine($"\nTransactions in date range: {dateRangeTransactions.Count}");
foreach (var trans in dateRangeTransactions)
{
    Console.WriteLine(trans.ToString());
}
