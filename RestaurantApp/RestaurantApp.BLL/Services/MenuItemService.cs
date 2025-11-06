using RestaurantApp.BLL.Interfaces;
using RestaurantApp.Core.Models;

namespace RestaurantApp.BLL.Services
{
    public class MenuItemService : IMenuItemService
    {
        private readonly IMenuItemRepository _menuItemRepository;
        private readonly ICategoryRepository _categoryRepository;

        public MenuItemService(IMenuItemRepository menuItemRepository, ICategoryRepository categoryRepository)
        {
            _menuItemRepository = menuItemRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task AddAsync(string name, double price, int categoryId)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Menu Item null ola bilmez.", nameof(name));
            }
            if (price < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(price), "Qiymet 0dan boyuk olmalidir.");
            }
            var category = await _categoryRepository.GetByIdAsync(categoryId);
            if (category == null)
            {
                throw new ArgumentException("Bele bir category yoxdur.", nameof(categoryId));
            }
            var existingItem = await _menuItemRepository.FindAsync(item => item.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
            if (existingItem.Any())
            {
                throw new InvalidOperationException("Artig bele item var.");
            }

            var newMenuItem = new MenuItem
            {
                Name = name,
                Price = price,
                CategoryId = categoryId
            };

            await _menuItemRepository.AddAsync(newMenuItem);
            await _menuItemRepository.SaveChangesAsync();
        }

        public Task<MenuItem> GetAllMenuItemsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<List<MenuItem>> GetByPriceIntervalAsync(double minPrice, double maxPrice)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<MenuItem>> GetMenuItemsByCategoryAsync(int categoryId)
        {
            throw new NotImplementedException();
        }

        public Task RemoveAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<MenuItem>> SearchAsync(string search)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(int id, string newName, double newPrice)
        {
            throw new NotImplementedException();
        }
    }
}
