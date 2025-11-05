using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantApp.Core.Models
{
    public class Category:Common.BaseEntity
    {
        public string Name { get; set; }
        public List<MenuItem> MenuItems { get; set; }
    }
}
