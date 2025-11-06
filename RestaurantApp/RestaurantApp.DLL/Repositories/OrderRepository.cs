using Microsoft.EntityFrameworkCore;
using RestaurantApp.BLL.Interfaces;
using RestaurantApp.Core.Models;
using RestaurantApp.DLL.Data;

namespace RestaurantApp.DLL.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(RestaurantDbContext context) : base(context)
        {
        }

        public async Task<Order> GetOrderWithItemsAsync(int id)
        {
             return await _dbSet
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Order>> GetRecentOrdersAsync(int count)
        {
            return await _dbSet
                       .OrderByDescending(o => o.Id)
                       .Take(count)
                       .ToListAsync();
        }
    }
}
