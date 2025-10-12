using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OmeenChatting.Services;

namespace OmeenChatting.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string q)
        {
            if (string.IsNullOrWhiteSpace(q))
            {
                return BadRequest("Search term is required");
            }

            var users = await _userService.SearchUsersAsync(q);
            
            var userList = users.Select(u => new
            {
                u.Id,
                u.Name,
                u.PhoneNumber,
                u.ProfilePicture,
                u.IsOnline,
                u.LastSeen,
                u.Status
            });

            return Ok(userList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserAsync(id);
            
            if (user == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                user.Id,
                user.Name,
                user.PhoneNumber,
                user.ProfilePicture,
                user.IsOnline,
                user.LastSeen,
                user.Status
            });
        }
    }
}