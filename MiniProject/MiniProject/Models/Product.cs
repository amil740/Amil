using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniProject.Models
{
    internal abstract class Product
    {
        private static int _nextId = 1;
        
        public int Id { get; private set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Count { get; set; }
        public double TotalIncome { get; protected set; }
        
        protected Product()
        {
            Id = _nextId++;
        }
        
        public abstract void sell();
        public abstract void showInfo();
    }
}
