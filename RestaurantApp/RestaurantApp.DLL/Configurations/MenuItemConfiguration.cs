using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RestaurantApp.Core.Models;

namespace RestaurantApp.Infrastructure.Data.Configurations
{
    public class MenuItemConfiguration : IEntityTypeConfiguration<MenuItem>
    {
        public void Configure(EntityTypeBuilder<MenuItem> builder)
        {
            builder.HasKey(m => m.Id);

            builder.Property(m => m.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(m => m.Price)
                   .IsRequired();

            builder.HasIndex(m => m.Name)
                   .IsUnique();

            builder.HasOne(m => m.Category)
                   .WithMany(c => c.MenuItems)
                   .HasForeignKey(m => m.CategoryId);
        }
    }
}
