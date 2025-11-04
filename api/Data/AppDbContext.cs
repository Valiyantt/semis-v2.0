using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<AppRole> Roles { get; set; }
        public DbSet<SuperAdmin> SuperAdmins { get; set; }
        public DbSet<ProgramEntry> Programs { get; set; }
        public DbSet<WelcomePage> WelcomePages { get; set; }
        public DbSet<AboutUs> AboutUsEntries { get; set; }
        public DbSet<BillingStatement> BillingStatements { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            base.OnModelCreating(mb);

            // Unique username
            mb.Entity<AppUser>()
                .HasIndex(u => u.Username)
                .IsUnique();

            // Role relationship
            mb.Entity<AppUser>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Validation rules
            mb.Entity<ProgramEntry>()
                .Property(p => p.Title)
                .HasMaxLength(200);

            mb.Entity<Department>()
                .Property(d => d.Name)
                .HasMaxLength(100)
                .IsRequired();

            mb.Entity<AppRole>()
                .Property(r => r.RoleName)
                .HasMaxLength(50)
                .IsRequired();
        }
    }
}
