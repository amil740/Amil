using Microsoft.EntityFrameworkCore;
using RestaurantApp.BLL.Interfaces;
using RestaurantApp.Core.Models;
using RestaurantApp.DLL.Data;

namespace RestaurantApp.DLL.Repositories
{
    public class MenuItemRepository : GenericRepository<MenuItem>, IMenuItemRepository
    {
        public MenuItemRepository(RestaurantDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<MenuItem>> GetMenuItemsByCategoryAsync(int categoryId)
        {
            return await _dbSet
           .Where(m => m.CategoryId == categoryId)
           .ToListAsync();
        }

        public async Task<MenuItem> GetMenuItemWithCategoryAsync(int id)
        {
            return await _dbSet
           .Include(m => m.Category)
           .FirstOrDefaultAsync(m => m.Id == id);
        }
    }
}
