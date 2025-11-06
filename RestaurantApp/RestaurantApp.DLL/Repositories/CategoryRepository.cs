using Microsoft.EntityFrameworkCore;
using RestaurantApp.BLL.Interfaces;
using RestaurantApp.Core.Models;
using RestaurantApp.DLL.Data;

namespace RestaurantApp.DLL.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(RestaurantDbContext context) : base(context)
        {
        }

        public async Task<Category> GetCategoryWithMenuItemsAsync(int id)
        {
            return await _dbSet
            .Include(c => c.MenuItems)
            .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
