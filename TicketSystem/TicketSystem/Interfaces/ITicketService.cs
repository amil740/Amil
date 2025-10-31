using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketSystem.Models;

namespace TicketSystem.Interfaces
{
    public interface ITicketService
    {
        Task<List<Ticket>> GetAllTicketsAsync();
        Task<Ticket?> GetTicketByIdAsync(int id);
        Task CreateTicketAsync(Ticket newTicket);
        Task UpdateTicketAsync(Ticket updatedTicket);
        Task DeleteTicketAsync(int id);
    }
}
