using Microsoft.EntityFrameworkCore;
using OmeenChatting.Data;
using OmeenChatting.Models;

namespace OmeenChatting.Services
{
    public class UserService : IUserService
    {
        private readonly ChatDbContext _context;

        public UserService(ChatDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> SearchUsersAsync(string searchTerm)
        {
            return await _context.Users
                .Where(u => u.Name.Contains(searchTerm) || u.PhoneNumber.Contains(searchTerm))
                .Take(20)
                .ToListAsync();
        }

        public async Task<User?> GetUserAsync(int userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        public async Task SetUserOnlineAsync(int userId, bool isOnline)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                user.IsOnline = isOnline;
                user.LastSeen = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateUserStatusAsync(int userId, string status)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                user.Status = status;
                await _context.SaveChangesAsync();
            }
        }
    }
}