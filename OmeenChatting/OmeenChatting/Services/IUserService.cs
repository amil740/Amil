using OmeenChatting.Models;

namespace OmeenChatting.Services
{
    public interface IUserService
    {
        Task<List<User>> SearchUsersAsync(string searchTerm);
        Task<User?> GetUserAsync(int userId);
        Task SetUserOnlineAsync(int userId, bool isOnline);
        Task UpdateUserStatusAsync(int userId, string status);
    }
}