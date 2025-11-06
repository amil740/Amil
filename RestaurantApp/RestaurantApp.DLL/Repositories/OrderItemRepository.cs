using Microsoft.EntityFrameworkCore;
using RestaurantApp.BLL.Interfaces;
using RestaurantApp.Core.Models;
using RestaurantApp.DLL.Data;

namespace RestaurantApp.DLL.Repositories
{
    public class OrderItemRepository : GenericRepository<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepository(RestaurantDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<OrderItem>> GetOrderItemsByOrderAsync(int orderId)
        {
             return await _dbSet
            .Where(oi => oi.OrderId == orderId)
            .ToListAsync();
        }
    }
}
