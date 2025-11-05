using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantApp.Core.Models
{
    public class Order:Common.BaseEntity
    {
        public List<OrderItem> OrderItems { get; set; }
        public double TotalPrice 
           
        { 
            get 
            {
                return OrderItems?.Sum(oi => oi.MenuItem.Price * oi.Count) ?? 0;
            }
        }
        public DateTime Date { get; set; }

    }
}
