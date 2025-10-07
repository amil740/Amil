using MiniProject.Models;
using MiniProject.Exceptions;

Book book1 = new Book("The Great Gatsby", 10.99, "F. Scott Fitzgerald", 180);
Book book2 = new Book("To Kill a Mockingbird", 12.99, "Harper Lee", 281);
Book book3 = new Book("1984", 15.99, "George Orwell", 328);
Book book4 = new Book("Pride and Prejudice", 9.99, "Jane Austen", 279);
Book book5 = new Book("The Catcher in the Rye", 11.99, "J.D. Salinger", 214);
book1.showInfo();
book1.Count = 2;
book1.sell();
Console.WriteLine($"After sale - Count: {book1.Count}, Income: {book1.TotalIncome}");
Library library = new Library(3);
library.AddBook(book1);
library.AddBook(book2);

Book found = library.GetBookById(book1.Id);
Console.WriteLine($"Found book: {found?.Name}");

