using Microsoft.EntityFrameworkCore;
using OmeenChatting.Data;
using OmeenChatting.Models;

namespace OmeenChatting.Services
{
    public class ChatService : IChatService
    {
        private readonly ChatDbContext _context;

        public ChatService(ChatDbContext context)
        {
            _context = context;
        }

        public async Task<Message> SendMessageAsync(int senderId, int receiverId, int chatId, string content)
        {
            var message = new Message
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                ChatId = chatId,
                Content = content,
                SentAt = DateTime.UtcNow,
                Type = MessageType.Text
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            // Load sender information
            await _context.Entry(message)
                .Reference(m => m.Sender)
                .LoadAsync();

            return message;
        }

        public async Task<List<Message>> GetChatMessagesAsync(int chatId, int userId)
        {
            return await _context.Messages
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .Where(m => m.ChatId == chatId)
                .OrderBy(m => m.SentAt)
                .ToListAsync();
        }

        public async Task<List<Chat>> GetUserChatsAsync(int userId)
        {
            return await _context.ChatParticipants
                .Where(cp => cp.UserId == userId)
                .Select(cp => cp.Chat)
                .Include(c => c.Messages.OrderByDescending(m => m.SentAt).Take(1))
                .Include(c => c.Participants)
                    .ThenInclude(p => p.User)
                .ToListAsync();
        }

        public async Task<Chat> CreateChatAsync(int user1Id, int user2Id)
        {
            var user1 = await _context.Users.FindAsync(user1Id);
            var user2 = await _context.Users.FindAsync(user2Id);

            var chat = new Chat
            {
                Name = $"{user1?.Name} & {user2?.Name}",
                IsGroupChat = false,
                CreatedAt = DateTime.UtcNow,
                CreatedById = user1Id
            };

            _context.Chats.Add(chat);
            await _context.SaveChangesAsync();

            // Add participants
            var participant1 = new ChatParticipant
            {
                ChatId = chat.Id,
                UserId = user1Id,
                JoinedAt = DateTime.UtcNow,
                IsAdmin = true
            };

            var participant2 = new ChatParticipant
            {
                ChatId = chat.Id,
                UserId = user2Id,
                JoinedAt = DateTime.UtcNow,
                IsAdmin = false
            };

            _context.ChatParticipants.AddRange(participant1, participant2);
            await _context.SaveChangesAsync();

            return chat;
        }

        public async Task<Chat?> GetOrCreateChatAsync(int user1Id, int user2Id)
        {
            // Check if chat already exists between these users
            var existingChat = await _context.ChatParticipants
                .Where(cp => cp.UserId == user1Id)
                .Select(cp => cp.Chat)
                .Where(c => !c.IsGroupChat)
                .Where(c => c.Participants.Any(p => p.UserId == user2Id))
                .FirstOrDefaultAsync();

            if (existingChat != null)
            {
                return existingChat;
            }

            return await CreateChatAsync(user1Id, user2Id);
        }

        public async Task MarkMessageAsReadAsync(int messageId, int userId)
        {
            var message = await _context.Messages.FindAsync(messageId);
            if (message != null && message.ReceiverId == userId)
            {
                message.IsRead = true;
                message.ReadAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Message?> GetMessageAsync(int messageId)
        {
            return await _context.Messages
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .FirstOrDefaultAsync(m => m.Id == messageId);
        }
    }
}