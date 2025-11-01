using BookBorrow.Datas;
using BookBorrow.Exceptions;
using BookBorrow.Interfaces;
using BookBorrow.Models;
using BookBorrow.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddDbContext<LibraryDbContext>();
        services.AddScoped<IBookService, BookService>();
        services.AddScoped<IBorrowService, BorrowService>();
    })
    .Build();

using (var scope = host.Services.CreateScope())
{
    var bookService = scope.ServiceProvider.GetRequiredService<IBookService>();
    var borrowService = scope.ServiceProvider.GetRequiredService<IBorrowService>();

    bool running = true;
    while (running)
    {
   Console.Clear();
     Console.WriteLine("=== Library System ===\n");
        Console.WriteLine("1. Add Book");
    Console.WriteLine("2. Get All Books");
   Console.WriteLine("3. Borrow Book");
 Console.WriteLine("4. Return Book");
        Console.WriteLine("5. Exit");
   Console.Write("\nChoice: ");

        string choice = Console.ReadLine() ?? "";

      try
        {
            switch (choice)
            {
             case "1":
         await AddBook(bookService);
         break;
case "2":
         await GetAllBooks(bookService);
     break;
    case "3":
   await BorrowBook(borrowService, bookService);
                 break;
         case "4":
     await ReturnBook(borrowService);
           break;
     case "5":
  running = false;
   break;
  default:
            Console.WriteLine("Invalid option!");
         Console.ReadKey();
    break;
            }
        }
        catch (Exception ex)
        {
       Console.WriteLine($"Error: {ex.Message}");
            Console.ReadKey();
    }
    }
}

async Task AddBook(IBookService bookService)
{
    Console.Clear();
    Console.WriteLine("=== Add Book ===\n");

    try
    {
     Console.Write("Book Name: ");
  string name = Console.ReadLine() ?? "";

    Console.Write("Author: ");
        string author = Console.ReadLine() ?? "";

        Console.Write("Price: ");
        double.TryParse(Console.ReadLine(), out double price);

        Console.Write("Stock: ");
        int.TryParse(Console.ReadLine(), out int stock);

        var book = new Book { Name = name, Author = author, Price = price, StockCount = stock };
      var createdBook = await bookService.AddAsync(book);

        Console.WriteLine($"\nBook added! ID: {createdBook.Id}");
    }
    catch (ArgumentNullException ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
    }
    catch (Exception ex)
    {
     Console.WriteLine($"Error: {ex.Message}");
    }

    Console.WriteLine("Press any key...");
    Console.ReadKey();
}

async Task GetAllBooks(IBookService bookService)
{
    Console.Clear();
    Console.WriteLine("=== All Books ===\n");

    try
    {
        var books = await bookService.GetAllAsync();
   if (books.Count == 0)
        {
    Console.WriteLine("No books found.");
        }
        else
        {
       foreach (var book in books)
          {
        Console.WriteLine(book.ToString());
         }
     }
    }
    catch (Exception ex)
    {
      Console.WriteLine($"Error: {ex.Message}");
    }

    Console.WriteLine("\nPress any key...");
  Console.ReadKey();
}

async Task BorrowBook(IBorrowService borrowService, IBookService bookService)
{
    Console.Clear();
    Console.WriteLine("=== Borrow Book ===\n");

    try
    {
        var availableBooks = await bookService.GetAvailableBooksAsync();
        if (availableBooks.Count == 0)
        {
    Console.WriteLine("No available books!");
            Console.ReadKey();
   return;
        }

        Console.WriteLine("Available Books:");
        foreach (var book in availableBooks)
     {
            Console.WriteLine($"{book.Id}. {book.Name} (Stock: {book.StockCount})");
 }

        Console.Write("\nBook ID: ");
        int.TryParse(Console.ReadLine(), out int bookId);

        Console.Write("Borrower Name: ");
     string borrowerName = Console.ReadLine() ?? "";

   var borrow = await borrowService.BorrowBookAsync(bookId, borrowerName);
   Console.WriteLine($"\nBook borrowed! Borrow ID: {borrow.Id}");
    }
    catch (BookNotFoundException ex)
    {
        Console.WriteLine($"Book Error: {ex.Message}");
    }
    catch (BookOutOfStockException ex)
    {
        Console.WriteLine($"Stock Error: {ex.Message}");
    }
    catch (InvalidBorrowerNameException ex)
    {
        Console.WriteLine($"Name Error: {ex.Message}");
    }
  catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
    }

    Console.WriteLine("Press any key...");
    Console.ReadKey();
}

async Task ReturnBook(IBorrowService borrowService)
{
  Console.Clear();
  Console.WriteLine("=== Return Book ===\n");

    try
    {
        Console.Write("Borrow ID: ");
        int.TryParse(Console.ReadLine(), out int borrowId);

        var borrow = await borrowService.ReturnBookAsync(borrowId);
        Console.WriteLine($"\nBook returned! Return Date: {borrow.ReturnDate}");
    }
    catch (BorrowNotFoundException ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
    }
    catch (BookAlreadyReturnedException ex)
    {
Console.WriteLine($"Error: {ex.Message}");
    }
    catch (Exception ex)
    {
 Console.WriteLine($"Error: {ex.Message}");
    }

    Console.WriteLine("Press any key...");
    Console.ReadKey();
}


