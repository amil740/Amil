using System;
using System.Collections.Generic;
using System.Linq;
using ConsoleApp1.Models;

class Program
{
    private static Department department = new Department();
    
    static void Main()
    {
        bool running = true;
        
        while (running)
        {
            Console.Clear();
            Console.WriteLine("=== MAIN MENU ===");
            Console.WriteLine("1. Add Employee");
            Console.WriteLine("2. Get Employee By id");
            Console.WriteLine("3. Remove Employee");
            Console.WriteLine("0. Quit");
            Console.WriteLine("==================");
            Console.Write("Please select an option: ");
            
            string choice = Console.ReadLine();
            
            switch (choice)
            {
                case "1":
                    AddEmployee();
                    break;
                    
                case "2":
                    GetEmployeeById();
                    break;
                    
                case "3":
                    RemoveEmployee();
                    break;
                    
                case "0":
                    Console.WriteLine("Goodbye!");
                    running = false;
                    break;

                default:
                    Console.WriteLine("Invalid option. Please try again.");
                    Console.WriteLine("Press any key to continue...");
                    Console.ReadKey();
                    break;
            }
        }
    }
    
    public static void AddEmployee()
    {
        Employee employee = new Employee();
        
        Console.Write("Enter Employee Id: ");
        employee.Id = int.Parse(Console.ReadLine());
        
        Console.Write("Enter Employee Name: ");
        employee.Name = Console.ReadLine();
        
        Console.Write("Enter Employee Salary: ");
        employee.Salary = double.Parse(Console.ReadLine());
        
        department.AddEmployee(employee);
        
        Console.WriteLine("Employee added successfully!");
        Console.WriteLine("Press any key to continue...");
        Console.ReadKey();
    }
    
    public static void GetEmployeeById()
    {
        Console.Write("Enter Employee ID to search: ");
        int id = int.Parse(Console.ReadLine());
        
        var employee = department.Employees.FirstOrDefault(e => e.Id == id);
        if (employee != null)
        {
            Console.WriteLine("\nEmployee found:");
            employee.ShowInfo();
        }
        else
        {
            Console.WriteLine($"Employee with ID {id} not found.");
        }
        
        Console.WriteLine("Press any key to continue...");
        Console.ReadKey();
    }
    
    public static void RemoveEmployee()
    {
        Console.Write("Enter Employee ID to remove: ");
        int id = int.Parse(Console.ReadLine());
        
        var employee = department.Employees.FirstOrDefault(e => e.Id == id);
        if (employee != null)
        {
            department.Employees.Remove(employee);
            Console.WriteLine("Employee removed successfully!");
        }
        else
        {
            Console.WriteLine($"Employee with ID {id} not found.");
        }
        
        Console.WriteLine("Press any key to continue...");
        Console.ReadKey();
    }
}