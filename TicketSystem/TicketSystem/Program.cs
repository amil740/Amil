using TicketSystem.Data;
using TicketSystem.Services;
using TicketSystem.Models;

var context = new DatasDbContext();
var eventService = new EventService(context);

var newEvent = new Event { Price = 0.00m };
await eventService.CreateAsync(newEvent);
Console.WriteLine("Event created successfully");

var allEvents = await eventService.GetAllAsync();
foreach (var evt in allEvents)
{
    Console.WriteLine(evt);
}

var eventById = await eventService.GetByIdAsync(1);
if (eventById != null)
{
    Console.WriteLine($"Found event: {eventById}");
}
