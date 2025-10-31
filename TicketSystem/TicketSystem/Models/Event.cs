using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketSystem.Models
{
    public class Event
    {
        public int Id { get; set; }
        public DateTime EventDate { get; set; }
        public decimal Price { get; set; }
        public List<Ticket>? Tickets { get; set; }

        public override string ToString()
        {
            return $"Event Id: {Id}, Price: {Price}";
        }
    }
}