using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }
        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Administration> Administrations { get; set; }
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
        public DbSet<SchoolLevel> SchoolLevels { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<AccessLog> AccessLogs { get; set; }
        public DbSet<IncidentReport> IncidentReports { get; set; }
        public DbSet<SecurityAlert> SecurityAlerts { get; set; }
        public DbSet<VisitorLog> VisitorLogs { get; set; }
        public DbSet<SystemSettings> SystemSettings { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<BorrowRecord> BorrowRecords { get; set; }

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

            // AccessLog relationship
            mb.Entity<AccessLog>()
                .HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // BorrowRecord relationships
            mb.Entity<BorrowRecord>()
                .HasOne(b => b.Book)
                .WithMany(bk => bk.BorrowRecords)
                .HasForeignKey(b => b.BookId)
                .OnDelete(DeleteBehavior.Cascade);

            mb.Entity<BorrowRecord>()
                .HasOne(b => b.Student)
                .WithMany()
                .HasForeignKey(b => b.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

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

            // Book properties
            mb.Entity<Book>()
                .Property(b => b.Title)
                .IsRequired()
                .HasMaxLength(200);

            mb.Entity<Book>()
                .Property(b => b.ISBN)
                .HasMaxLength(20);

            // AccessLog properties
            mb.Entity<AccessLog>()
                .Property(a => a.Location)
                .HasMaxLength(100)
                .IsRequired();

            mb.Entity<AccessLog>()
                .Property(a => a.Purpose)
                .HasMaxLength(200)
                .IsRequired();
        }
    }
}
