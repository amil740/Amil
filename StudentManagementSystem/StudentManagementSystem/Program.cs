using StudentManagementSystem.Models;
using System;

namespace StudentManagementSystem
{
    class Program
    {
        private static StudentManager studentManager = new StudentManager();
        
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to Student Management System!");
            Console.WriteLine("====================================");
            
            bool running = true;
            
            while (running)
            {
                DisplayMenu();
                Console.Write("Enter your choice (1-7): ");
                string input = Console.ReadLine();
                
                switch (input)
                {
                    case "1":
                        AddStudent();
                        break;
                    case "2":
                        ViewAllStudents();
                        break;
                    case "3":
                        UpdateStudent();
                        break;
                    case "4":
                        RemoveStudent();
                        break;
                    case "5":
                        SaveToFile();
                        break;
                    case "6":
                        CalculateAverageGrade();
                        break;
                    case "7":
                        running = false;
                        Console.WriteLine("Thank you for using Student Management System. Goodbye!");
                        break;
                    default:
                        Console.WriteLine("Invalid choice. Please enter a number between 1 and 7.");
                        break;
                }
                
                if (running)
                {
                    Console.WriteLine("\nPress any key to continue...");
                    Console.ReadKey();
                    Console.Clear();
                }
            }
        }
        
        private static void DisplayMenu()
        {
            Console.WriteLine("\n=== Student Management System Menu ===");
            Console.WriteLine("1. Add Student");
            Console.WriteLine("2. View All Students");
            Console.WriteLine("3. Update Student");
            Console.WriteLine("4. Remove Student");
            Console.WriteLine("5. Save to File");
            Console.WriteLine("6. Calculate Average Grade");
            Console.WriteLine("7. Exit");
            Console.WriteLine("=====================================");
        }
        
        private static void AddStudent()
        {
            try
            {
                Console.WriteLine("\n=== Add New Student ===");
                
                Console.Write("Enter Student ID: ");
                int id = int.Parse(Console.ReadLine());
                
                Console.Write("Enter Student Name: ");
                string name = Console.ReadLine();
                
                Console.Write("Enter Student Age: ");
                int age = int.Parse(Console.ReadLine());
                
                Console.Write("Enter Student Grade: ");
                double grade = double.Parse(Console.ReadLine());
                
                Student student = new Student
                {
                    Id = id,
                    Name = name,
                    Age = age,
                    Grade = grade
                };
                
                studentManager.AddStudent(student);
                Console.WriteLine("Student added successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding student: {ex.Message}");
            }
        }
        
        private static void ViewAllStudents()
        {
            Console.WriteLine("\n=== All Students ===");
            var students = studentManager.GetAllStudents();
            
            if (students.Count == 0)
            {
                Console.WriteLine("No students found.");
                return;
            }
            
            Console.WriteLine("{0,-5} {1,-20} {2,-5} {3,-8}", "ID", "Name", "Age", "Grade");
            Console.WriteLine(new string('-', 40));
            
            foreach (var student in students)
            {
                Console.WriteLine("{0,-5} {1,-20} {2,-5} {3,-8:F2}", 
                    student.Id, student.Name, student.Age, student.Grade);
            }
        }
        
        private static void UpdateStudent()
        {
            try
            {
                Console.WriteLine("\n=== Update Student ===");
                Console.Write("Enter Student ID to update: ");
                int id = int.Parse(Console.ReadLine());
                
                Console.Write("Enter new Name: ");
                string name = Console.ReadLine();
                
                Console.Write("Enter new Age: ");
                int age = int.Parse(Console.ReadLine());
                
                Console.Write("Enter new Grade: ");
                double grade = double.Parse(Console.ReadLine());
                
                Student updatedStudent = new Student
                {
                    Id = id,
                    Name = name,
                    Age = age,
                    Grade = grade
                };
                
                studentManager.UpdateStudent(updatedStudent);
                Console.WriteLine("Student updated successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating student: {ex.Message}");
            }
        }
        
        private static void RemoveStudent()
        {
            try
            {
                Console.WriteLine("\n=== Remove Student ===");
                Console.Write("Enter Student ID to remove: ");
                int id = int.Parse(Console.ReadLine());
                
                studentManager.RemoveStudent(id);
                Console.WriteLine("Student removed successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error removing student: {ex.Message}");
            }
        }
        
        private static void SaveToFile()
        {
            try
            {
                Console.WriteLine("\n=== Save to File ===");
                Console.Write("Enter file path (or press Enter for default 'students.csv'): ");
                string filePath = Console.ReadLine();
                
                if (string.IsNullOrWhiteSpace(filePath))
                {
                    filePath = "students.csv";
                }
                
                studentManager.SaveToFile(filePath);
                Console.WriteLine($"Students saved to {filePath} successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving to file: {ex.Message}");
            }
        }
        
        private static void CalculateAverageGrade()
        {
            try
            {
                Console.WriteLine("\n=== Calculate Average Grade ===");
                var students = studentManager.GetAllStudents();
                
                if (students.Count == 0)
                {
                    Console.WriteLine("No students found to calculate average.");
                    return;
                }
              
                double average = students.Average(s => s.Grade);
                Console.WriteLine($"Average Grade: {average:F2}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error calculating average grade: {ex.Message}");
            }
        }
    }
}
