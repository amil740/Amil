using RestaurantApp.Core.Models;

namespace RestaurantApp.BLL.Interfaces
{
    public interface IMenuItemService
    {
        Task<MenuItem> GetAllMenuItemsAsync();
        Task<IEnumerable<MenuItem>> GetMenuItemsByCategoryAsync(int categoryId);
        Task AddAsync(string name, double price, int categoryId);
        Task RemoveAsync(int id);
        Task UpdateAsync(int id, string newName, double newPrice);
        Task<List<MenuItem>> SearchAsync(string search);

        Task<List<MenuItem>> GetByPriceIntervalAsync(double minPrice, double maxPrice);
    }
}
