using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OmeenChatting.Data;
using OmeenChatting.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

namespace OmeenChatting.Services
{
    public class AuthService : IAuthService
    {
        private readonly ChatDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(ChatDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<User?> RegisterAsync(string phoneNumber, string name, string password)
        {
            // Check if user already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
            if (existingUser != null)
            {
                return null;
            }

            // Create new user
            var user = new User
            {
                PhoneNumber = phoneNumber,
                Name = name,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                CreatedAt = DateTime.UtcNow,
                LastSeen = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<string?> LoginAsync(string phoneNumber, string password)
        {
            var user = await GetUserByPhoneAsync(phoneNumber);
            
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null;
            }

            // Update last seen
            user.LastSeen = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return GenerateJwtToken(user);
        }

        public async Task<User?> GetUserByPhoneAsync(string phoneNumber)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
        }

        public string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"] ?? "OmeenChatting_SuperSecret_Key_2024_Azerbaijan_Turkey";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim("PhoneNumber", user.PhoneNumber)
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"] ?? "OmeenChatting",
                audience: jwtSettings["Audience"] ?? "OmeenChattingUsers",
                claims: claims,
                expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}