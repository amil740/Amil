using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RestaurantApp.Core.Models;

namespace RestaurantApp.Infrastructure.Data.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(o => o.Id);

            builder.Property(o => o.Date)
               .IsRequired();

            builder.HasMany(o => o.OrderItems)
            .WithOne(oi => oi.Order)
                   .HasForeignKey(oi => oi.OrderId)
         .OnDelete(DeleteBehavior.Cascade);

            builder.Ignore(o => o.TotalPrice);
        }
    }
}
