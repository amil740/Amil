using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace RestaurantApp.DLL.Data
{
    public class RestaurantDbContextFactory : IDesignTimeDbContextFactory<RestaurantDbContext>
    {
        public RestaurantDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<RestaurantDbContext>();

            optionsBuilder.UseSqlServer("Server=Amil;Database=RestaurantApp;Trusted_Connection=true;Encrypt=false;TrustServerCertificate=true;");

            return new RestaurantDbContext(optionsBuilder.Options);
        }
    }
}
