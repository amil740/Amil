using System.ComponentModel.DataAnnotations;

namespace OmeenChatting.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;
        
        [Required]
        public string Name { get; set; } = string.Empty;
        
        public string? ProfilePicture { get; set; }
        
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime LastSeen { get; set; } = DateTime.UtcNow;
        
        public bool IsOnline { get; set; } = false;
        
        public string? Status { get; set; }
        
        // Navigation properties
        public virtual ICollection<Message> SentMessages { get; set; } = new List<Message>();
        public virtual ICollection<Message> ReceivedMessages { get; set; } = new List<Message>();
        public virtual ICollection<ChatParticipant> ChatParticipants { get; set; } = new List<ChatParticipant>();
    }
}