using RestaurantApp.Core.Interfaces;
using RestaurantApp.Core.Models;

namespace RestaurantApp.BLL.Interfaces
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
      Task<Order> GetOrderWithItemsAsync(int id);
        Task<IEnumerable<Order>> GetRecentOrdersAsync(int count);
    }
}
