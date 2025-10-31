using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketSystem.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public DateTime EventDate { get; set; }
        public decimal Price { get; set; }
        public  int EventId { get; set; }
        public Event? Event { get; set; }
        public bool IsUsed { get; set; } = false;

        public override string ToString()
        {
            return $"Ticket Id: {Id}, Name: {Name}, Event Date: {EventDate}, Price: {Price}";
        }
    }
}