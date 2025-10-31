using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TicketSystem.Data;
using TicketSystem.Interfaces;
using TicketSystem.Models;

namespace TicketSystem.Services
{
    internal class TicketService : ITicketService
    {
        private readonly DatasDbContext _context;

        public TicketService(DatasDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context), "Database context cannot be null.");
        }

        public async Task CreateTicketAsync(Ticket newTicket)
        {
            if (newTicket == null)
            {
                throw new ArgumentNullException(nameof(newTicket), "The ticket to create cannot be null.");
            }
            if (newTicket.Price < 0)
            {
                throw new ArgumentException("Ticket price cannot be negative.", nameof(newTicket.Price));
            }
            await _context.Tickets.AddAsync(newTicket);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTicketAsync(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Ticket ID must be a positive integer.", nameof(id));
            }

            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                throw new KeyNotFoundException($"Ticket with ID {id} not found.");
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
        }

        public Task<List<Ticket>> GetAllTicketsAsync()
        {
            return _context.Tickets.ToListAsync();
        }

        public Task<Ticket?> GetTicketByIdAsync(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Ticket ID must be a positive integer.", nameof(id));
            }
            return _context.Tickets.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task UpdateTicketAsync(Ticket updatedTicket)
        {
            if (updatedTicket == null)
            {
                throw new ArgumentNullException(nameof(updatedTicket), "The ticket to update cannot be null.");
            }
            if (updatedTicket.Price < 0)
            {
                throw new ArgumentException("Ticket price cannot be negative.", nameof(updatedTicket.Price));
            }

            _context.Tickets.Update(updatedTicket);
            await _context.SaveChangesAsync();
        }
    }
}
