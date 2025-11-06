using RestaurantApp.Core.Interfaces;
using RestaurantApp.Core.Models;

namespace RestaurantApp.BLL.Interfaces
{
    public interface IOrderItemRepository : IGenericRepository<OrderItem>
    {
  Task<IEnumerable<OrderItem>> GetOrderItemsByOrderAsync(int orderId);
    }
}
