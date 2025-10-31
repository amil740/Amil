using TicketSystem.Models;

namespace TicketSystem.Interfaces
{
    public interface IEventService
    {
        Task<List<Event>> GetAllAsync();
        Task<Event?> GetByIdAsync(int id);
        Task CreateAsync(Event newEvent);
        Task UpdateAsync(Event newEvent);
        Task DeleteAsync(int id);

        // Filter methods
        /// <summary>
        /// Gets events sorted by ticket sales count (most sold to least sold)
        /// </summary>
        Task<List<(Event Event, int TicketsSold)>> GetEventsByTicketSalesAsync();

        /// <summary>
        /// Gets events sorted by total revenue (highest to lowest)
        /// </summary>
        Task<List<(Event Event, decimal Revenue)>> GetEventsByRevenueAsync();

        /// <summary>
        /// Gets only future events
        /// </summary>
        Task<List<Event>> GetFutureEventsAsync();

        /// <summary>
        /// Gets past events with ticket information (purchased/used count)
        /// Format: Event1 - 5/8 (5 purchased, 8 used)
        /// </summary>
        Task<List<(Event Event, int PurchasedTickets, int UsedTickets)>> GetPastEventsWithTicketInfoAsync();
    }
}
