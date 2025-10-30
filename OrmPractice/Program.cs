using OrmPractice.Data;
using OrmPractice.Models;

namespace OrmPractice
{
    internal class Program
    {
        static void Main(string[] args)
        {
            using (var context = new Datas())
            {
                context.Database.EnsureCreated();

                var group1 = new Group
                {
                    Name = "PA201",
                    Description = "Programming Academy 201",
                    Limit = 30
                };

                var group2 = new Group
                {
                    Name = "PA202",
                    Description = "Programming Academy 202",
                    Limit = 25
                };

                context.Groups.Add(group1);
                context.Groups.Add(group2);
                context.SaveChanges();

                var student1 = new Student
                {
                    Name = "Michael",
                    Age = 21,
                    GroupId = group1.Id
                };

                var student2 = new Student
                {
                    Name = "Sarah",
                    Age = 22,
                    GroupId = group1.Id
                };

                var student3 = new Student
                {
                    Name = "John",
                    Age = 20,
                    GroupId = group2.Id
                };

                context.Students.Add(student1);
                context.Students.Add(student2);
                context.Students.Add(student3);
                context.SaveChanges();

                var groups = context.Groups.ToList();
                foreach (var g in groups)
                {
                    Console.WriteLine($"ID: {g.Id}, Ad: {g.Name}, haqqinda: {g.Description}, Limit: {g.Limit}");
                }

                var students = context.Students.ToList();
                foreach (var s in students)
                {
                    Console.WriteLine($"ID: {s.Id}, Ad: {s.Name}, Yas: {s.Age}, Qrup ID: {s.GroupId}");
                }

            }
        }
    }
}
