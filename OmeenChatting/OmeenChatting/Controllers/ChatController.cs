using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OmeenChatting.Services;
using System.Security.Claims;

namespace OmeenChatting.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;
        private readonly IUserService _userService;

        public ChatController(IChatService chatService, IUserService userService)
        {
            _chatService = chatService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserChats()
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var chats = await _chatService.GetUserChatsAsync(userId.Value);
            
            var chatList = chats.Select(c => new
            {
                c.Id,
                c.Name,
                c.IsGroupChat,
                c.GroupPicture,
                LastMessage = c.Messages.FirstOrDefault(),
                Participants = c.Participants.Select(p => new
                {
                    p.User.Id,
                    p.User.Name,
                    p.User.PhoneNumber,
                    p.User.ProfilePicture,
                    p.User.IsOnline,
                    p.User.LastSeen
                })
            });

            return Ok(chatList);
        }

        [HttpGet("{chatId}/messages")]
        public async Task<IActionResult> GetChatMessages(int chatId)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var messages = await _chatService.GetChatMessagesAsync(chatId, userId.Value);
            
            var messageList = messages.Select(m => new
            {
                m.Id,
                m.Content,
                m.SentAt,
                m.IsRead,
                m.ReadAt,
                m.Type,
                m.SenderId,
                SenderName = m.Sender.Name,
                m.ReceiverId,
                ReceiverName = m.Receiver.Name
            });

            return Ok(messageList);
        }

        [HttpPost("start")]
        public async Task<IActionResult> StartChat([FromBody] StartChatRequest request)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var chat = await _chatService.GetOrCreateChatAsync(userId.Value, request.UserId);
            
            if (chat == null)
            {
                return BadRequest("Could not create or find chat");
            }
            
            return Ok(new
            {
                chat.Id,
                chat.Name,
                chat.IsGroupChat
            });
        }

        private int? GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return userIdClaim != null ? int.Parse(userIdClaim) : null;
        }
    }

    public class StartChatRequest
    {
        public int UserId { get; set; }
    }
}