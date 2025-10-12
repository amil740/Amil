using OmeenChatting.Models;

namespace OmeenChatting.Services
{
    public interface IChatService
    {
        Task<Message> SendMessageAsync(int senderId, int receiverId, int chatId, string content);
        Task<List<Message>> GetChatMessagesAsync(int chatId, int userId);
        Task<List<Chat>> GetUserChatsAsync(int userId);
        Task<Chat> CreateChatAsync(int user1Id, int user2Id);
        Task<Chat?> GetOrCreateChatAsync(int user1Id, int user2Id);
        Task MarkMessageAsReadAsync(int messageId, int userId);
        Task<Message?> GetMessageAsync(int messageId);
    }
}