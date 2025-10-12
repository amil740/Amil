using Microsoft.AspNetCore.Mvc;
using OmeenChatting.Services;
using System.ComponentModel.DataAnnotations;

namespace OmeenChatting.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _authService.RegisterAsync(request.PhoneNumber, request.Name, request.Password);
            
            if (user == null)
            {
                return Conflict(new { message = "User with this phone number already exists" });
            }

            var token = _authService.GenerateJwtToken(user);
            
            return Ok(new
            {
                token,
                user = new
                {
                    user.Id,
                    user.Name,
                    user.PhoneNumber,
                    user.ProfilePicture,
                    user.Status
                }
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var token = await _authService.LoginAsync(request.PhoneNumber, request.Password);
            
            if (token == null)
            {
                return Unauthorized(new { message = "Invalid phone number or password" });
            }

            var user = await _authService.GetUserByPhoneAsync(request.PhoneNumber);
            
            return Ok(new
            {
                token,
                user = new
                {
                    user!.Id,
                    user.Name,
                    user.PhoneNumber,
                    user.ProfilePicture,
                    user.Status
                }
            });
        }
    }

    public class RegisterRequest
    {
        [Required]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;
        
        [Required]
        [MinLength(2)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginRequest
    {
        [Required]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;
        
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}