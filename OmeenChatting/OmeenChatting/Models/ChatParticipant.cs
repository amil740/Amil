namespace OmeenChatting.Models
{
    public class ChatParticipant
    {
        public int Id { get; set; }
        
        public int ChatId { get; set; }
        public int UserId { get; set; }
        
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
        
        public bool IsAdmin { get; set; } = false;
        
        // Navigation properties
        public virtual Chat Chat { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}