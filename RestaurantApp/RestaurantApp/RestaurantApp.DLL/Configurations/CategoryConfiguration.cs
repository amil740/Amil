using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RestaurantApp.Core.Models;

namespace RestaurantApp.Infrastructure.Data.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
              .HasMaxLength(100);

            builder.HasMany(c => c.MenuItems)
     .WithOne(m => m.Category)
     .HasForeignKey(m => m.CategoryId);
     .HasForeignKey(m => m.CategoryId);
        }
    }
}
