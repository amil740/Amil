using System.ComponentModel.DataAnnotations;

namespace OmeenChatting.Models
{
    public class Chat
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; } = string.Empty;
        
        public bool IsGroupChat { get; set; } = false;
        
        public string? GroupPicture { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public int? CreatedById { get; set; }
        
        // Navigation properties
        public virtual User? CreatedBy { get; set; }
        public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
        public virtual ICollection<ChatParticipant> Participants { get; set; } = new List<ChatParticipant>();
    }
}