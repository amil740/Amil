using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Employee> Employees { get; set; } = new List<Employee>();

        public void AddEmployee(Employee employee)
        {
            Employees.Add(employee);
        }

        public void GetEmployeeById(int id)
        {
            var employee = Employees.FirstOrDefault(e => e.Id == id);
            if (employee != null)
            {
                employee.ShowInfo();
            }
        }

        public void RemoveEmployee(int id)
        {
            var employee = Employees.FirstOrDefault(e => e.Id == id);
            if (employee != null)
            {
                Employees.Remove(employee);
            }
        }
    }
}
