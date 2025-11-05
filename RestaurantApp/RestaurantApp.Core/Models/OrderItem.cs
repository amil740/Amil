using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantApp.Core.Models
{
    public class OrderItem:Common.BaseEntity
    {
        public int MenuItemId { get; set; }
        public MenuItem MenuItem { get; set; }
        public int Count { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
