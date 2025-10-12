using System.ComponentModel.DataAnnotations;

namespace OmeenChatting.Models
{
    public class Message
    {
        public int Id { get; set; }
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        
        public bool IsRead { get; set; } = false;
        
        public DateTime? ReadAt { get; set; }
        
        public MessageType Type { get; set; } = MessageType.Text;
        
        public string? AttachmentUrl { get; set; }
        
        // Foreign keys
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public int ChatId { get; set; }
        
        // Navigation properties
        public virtual User Sender { get; set; } = null!;
        public virtual User Receiver { get; set; } = null!;
        public virtual Chat Chat { get; set; } = null!;
    }
    
    public enum MessageType
    {
        Text,
        Image,
        File,
        Audio,
        Video
    }
}