using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RestaurantApp.DLL.Data;

namespace RestaurantApp.PL
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var services = new ServiceCollection();

            services.AddDbContext<RestaurantDbContext>(options =>
                options.UseSqlServer("Server=Amil;Database=RestaurantApp;Trusted_Connection=true;Encrypt=false;TrustServerCertificate=true;"));

            var serviceProvider = services.BuildServiceProvider();

            using (var context = serviceProvider.GetRequiredService<RestaurantDbContext>())
            {
                try
                {
                    context.Database.Migrate();
                    Console.WriteLine("✓ Database connection successful!");
                    Console.WriteLine("✓ Migrations applied successfully.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"✗ Database connection failed: {ex.Message}");
                }
            }
        }
    }
}
