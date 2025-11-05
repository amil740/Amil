using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RestaurantApp.Core.Models;

namespace RestaurantApp.Infrastructure.Data.Configurations
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.HasKey(oi => oi.Id);

            builder.Property(oi => oi.Count)
                .IsRequired();

            builder.HasOne(oi => oi.MenuItem)
                  .WithMany()
         .HasForeignKey(oi => oi.MenuItemId);

            builder.HasOne(oi => oi.Order)
         .WithMany(o => o.OrderItems)
                 .HasForeignKey(oi => oi.OrderId);
        }
    }
}
