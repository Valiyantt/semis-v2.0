using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Data;

namespace api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }

        public DbSet<ProgramEntry> Programs { get; set; }
        public DbSet<WelcomePage> WelcomePages { get; set; }
        public DbSet<AboutUs> AboutUsEntries { get; set; }
        public DbSet<BillingStatement> BillingStatements { get; set; }
        public DbSet<AppUser> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            base.OnModelCreating(mb);
            mb.Entity<AppUser>().HasIndex(u => u.Username).IsUnique();
            mb.Entity<ProgramEntry>().Property(p => p.Title).HasMaxLength(200);
        }
    }
}
