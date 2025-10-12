using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;
using OmeenChatting.Services;
using System.Security.Claims;

namespace OmeenChatting.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;
        private readonly IUserService _userService;

        public ChatHub(IChatService chatService, IUserService userService)
        {
            _chatService = chatService;
            _userService = userService;
        }

        public override async Task OnConnectedAsync()
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != null)
            {
                await _userService.SetUserOnlineAsync(int.Parse(userId), true);
                await Groups.AddToGroupAsync(Context.ConnectionId, $"User_{userId}");
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != null)
            {
                await _userService.SetUserOnlineAsync(int.Parse(userId), false);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"User_{userId}");
            }
            await base.OnDisconnectedAsync(exception);
        }

        public async Task JoinChat(string chatId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"Chat_{chatId}");
        }

        public async Task LeaveChat(string chatId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Chat_{chatId}");
        }

        public async Task SendMessage(int chatId, int receiverId, string content)
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != null)
            {
                var message = await _chatService.SendMessageAsync(int.Parse(userId), receiverId, chatId, content);
                
                // Send to chat group
                await Clients.Group($"Chat_{chatId}").SendAsync("ReceiveMessage", new
                {
                    Id = message.Id,
                    Content = message.Content,
                    SenderId = message.SenderId,
                    SenderName = message.Sender.Name,
                    SentAt = message.SentAt,
                    ChatId = message.ChatId
                });

                // Send to specific user
                await Clients.Group($"User_{receiverId}").SendAsync("NewMessage", new
                {
                    Id = message.Id,
                    Content = message.Content,
                    SenderId = message.SenderId,
                    SenderName = message.Sender.Name,
                    SentAt = message.SentAt,
                    ChatId = message.ChatId
                });
            }
        }

        public async Task MarkAsRead(int messageId)
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != null)
            {
                await _chatService.MarkMessageAsReadAsync(messageId, int.Parse(userId));
                
                // Notify sender that message was read
                var message = await _chatService.GetMessageAsync(messageId);
                if (message != null)
                {
                    await Clients.Group($"User_{message.SenderId}").SendAsync("MessageRead", new
                    {
                        MessageId = messageId,
                        ReadBy = int.Parse(userId),
                        ReadAt = DateTime.UtcNow
                    });
                }
            }
        }

        public async Task UserTyping(int chatId, int receiverId)
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != null)
            {
                await Clients.Group($"Chat_{chatId}").SendAsync("UserTyping", new
                {
                    UserId = int.Parse(userId),
                    ChatId = chatId
                });
            }
        }

        public async Task UserStoppedTyping(int chatId)
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != null)
            {
                await Clients.Group($"Chat_{chatId}").SendAsync("UserStoppedTyping", new
                {
                    UserId = int.Parse(userId),
                    ChatId = chatId
                });
            }
        }
    }
}