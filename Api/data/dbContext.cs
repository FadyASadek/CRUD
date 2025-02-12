using Api.model;
using Microsoft.EntityFrameworkCore;

namespace Api.data
{
    public class dbContext : DbContext
    {
        public dbContext(DbContextOptions<dbContext> options) : base(options)
        {
        }

        // Ensure the property name is pluralized
        public DbSet<student>? Students { get; set; } 
    }
}
