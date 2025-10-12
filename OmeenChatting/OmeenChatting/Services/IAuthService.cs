using OmeenChatting.Models;

namespace OmeenChatting.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(string phoneNumber, string name, string password);
        Task<string?> LoginAsync(string phoneNumber, string password);
        Task<User?> GetUserByPhoneAsync(string phoneNumber);
        string GenerateJwtToken(User user);
    }
}