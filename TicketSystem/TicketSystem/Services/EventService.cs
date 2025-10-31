using Microsoft.EntityFrameworkCore;
using TicketSystem.Data;
using TicketSystem.Interfaces;
using TicketSystem.Models;

namespace TicketSystem.Services
{
    public class EventService : IEventService
    {
        private readonly DatasDbContext _context;

        public EventService(DatasDbContext context)
  {
            _context = context ?? throw new ArgumentNullException(nameof(context), "Database context cannot be null.");
}

        public async Task CreateAsync(Event newEvent)
 {
          if (newEvent == null)
        {
          throw new ArgumentNullException(nameof(newEvent), "The event to create cannot be null.");
    }

      if (newEvent.Price < 0)
       {
      throw new ArgumentException("Event price cannot be negative.", nameof(newEvent.Price));
   }
     await _context.Events.AddAsync(newEvent);

            await _context.SaveChangesAsync();
        }

      public async Task DeleteAsync(int id)
        {
            if (id <= 0)
    {
           throw new ArgumentException("Event ID must be a positive integer.", nameof(id));
     }

          var entity = await _context.Events.FindAsync(id);
         if (entity == null)
            {
           throw new KeyNotFoundException($"Event with ID {id} not found.");
            }

    _context.Events.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public Task<List<Event>> GetAllAsync()
        {
       return _context.Events.ToListAsync();
        }

        public Task<Event?> GetByIdAsync(int id)
        {
            if (id <= 0)
    {
      throw new ArgumentException("Event ID must be a positive integer.", nameof(id));
     }
            return _context.Events.FirstOrDefaultAsync(e => e.Id == id);
        }

        public Task UpdateAsync(Event newEvent)
     {
 if (newEvent == null)
            {
       throw new ArgumentNullException(nameof(newEvent), "The event to update cannot be null.");
  }
        _context.Events.Update(newEvent);
       return _context.SaveChangesAsync();
        }

        /// <summary>
        /// Gets events sorted by ticket sales count (most sold to least sold)
        /// </summary>
 public async Task<List<(Event Event, int TicketsSold)>> GetEventsByTicketSalesAsync()
        {
            var eventsWithTicketCount = await _context.Events
        .Include(e => e.Tickets)
    .Select(e => new
    {
             Event = e,
              TicketsSold = e.Tickets != null ? e.Tickets.Count : 0
   })
         .OrderByDescending(x => x.TicketsSold)
      .ToListAsync();

            return eventsWithTicketCount
         .Select(x => (x.Event, x.TicketsSold))
  .ToList();
    }

        /// <summary>
        /// Gets events sorted by total revenue (highest to lowest)
        /// </summary>
        public async Task<List<(Event Event, decimal Revenue)>> GetEventsByRevenueAsync()
        {
            var eventsWithRevenue = await _context.Events
           .Include(e => e.Tickets)
 .Select(e => new
 {
     Event = e,
              Revenue = e.Tickets != null ? e.Tickets.Sum(t => t.Price) : 0m
      })
          .OrderByDescending(x => x.Revenue)
                .ToListAsync();

            return eventsWithRevenue
    .Select(x => (x.Event, x.Revenue))
       .ToList();
      }

        /// <summary>
        /// Gets only future events
        /// </summary>
        public Task<List<Event>> GetFutureEventsAsync()
   {
            return _context.Events
   .Where(e => e.EventDate > DateTime.Now)
         .OrderBy(e => e.EventDate)
       .ToListAsync();
     }

        /// <summary>
   /// Gets past events with ticket information (purchased/used count)
        /// Format: Event1 - 5/8 (5 purchased, 8 used)
        /// </summary>
      public async Task<List<(Event Event, int PurchasedTickets, int UsedTickets)>> GetPastEventsWithTicketInfoAsync()
     {
        var pastEvents = await _context.Events
              .Include(e => e.Tickets)
         .Where(e => e.EventDate <= DateTime.Now)
      .OrderByDescending(e => e.EventDate)
    .ToListAsync();

            return pastEvents
      .Select(e => (
     e,
            e.Tickets != null ? e.Tickets.Count : 0,
      e.Tickets != null ? e.Tickets.Count(t => t.IsUsed) : 0
                ))
    .ToList();
   }
    }
}
