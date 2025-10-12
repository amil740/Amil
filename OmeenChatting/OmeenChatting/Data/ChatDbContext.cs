using Microsoft.EntityFrameworkCore;
using OmeenChatting.Models;

namespace OmeenChatting.Data
{
    public class ChatDbContext : DbContext
    {
        public ChatDbContext(DbContextOptions<ChatDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<ChatParticipant> ChatParticipants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => u.PhoneNumber).IsUnique();
                entity.Property(u => u.PhoneNumber).IsRequired();
                entity.Property(u => u.Name).IsRequired();
            });

            // Message configuration
            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasKey(m => m.Id);
                
                entity.HasOne(m => m.Sender)
                    .WithMany(u => u.SentMessages)
                    .HasForeignKey(m => m.SenderId)
                    .OnDelete(DeleteBehavior.Restrict);
                
                entity.HasOne(m => m.Receiver)
                    .WithMany(u => u.ReceivedMessages)
                    .HasForeignKey(m => m.ReceiverId)
                    .OnDelete(DeleteBehavior.Restrict);
                
                entity.HasOne(m => m.Chat)
                    .WithMany(c => c.Messages)
                    .HasForeignKey(m => m.ChatId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Chat configuration
            modelBuilder.Entity<Chat>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.Property(c => c.Name).IsRequired();
            });

            // ChatParticipant configuration
            modelBuilder.Entity<ChatParticipant>(entity =>
            {
                entity.HasKey(cp => cp.Id);
                
                entity.HasOne(cp => cp.Chat)
                    .WithMany(c => c.Participants)
                    .HasForeignKey(cp => cp.ChatId)
                    .OnDelete(DeleteBehavior.Cascade);
                
                entity.HasOne(cp => cp.User)
                    .WithMany(u => u.ChatParticipants)
                    .HasForeignKey(cp => cp.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                // Ensure unique user per chat
                entity.HasIndex(cp => new { cp.ChatId, cp.UserId }).IsUnique();
            });
        }
    }
}