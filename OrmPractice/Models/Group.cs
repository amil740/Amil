using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrmPractice.Models
{
    internal class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Limit { get; set; }
        public List<Student> Students { get; set; }
    }
}
