using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Controllers
{
    [ApiController]
    [Route("backend/[controller]")]
    public class AdministrationController : ControllerBase
    {
        private readonly AppDbContext _ctx;

        public AdministrationController(AppDbContext ctx) => _ctx = ctx;

        // System Settings
        [HttpGet("settings")]
        public async Task<IActionResult> GetSettings()
        {
            var settings = await _ctx.SystemSettings.FirstOrDefaultAsync();
            if (settings == null)
                return Ok(new { message = "No settings found" });

            return Ok(settings);
        }

        [HttpPut("settings")]
        public async Task<IActionResult> UpdateSettings([FromBody] UpdateSystemSettingsDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var settings = await _ctx.SystemSettings.FirstOrDefaultAsync();
            if (settings == null)
            {
                settings = new SystemSettings
                {
                    SchoolName = dto.SchoolName,
                    SchoolEmail = dto.SchoolEmail,
                    SchoolPhone = dto.SchoolPhone,
                    Address = dto.Address,
                    City = dto.City,
                    State = dto.State,
                    Country = dto.Country,
                    LogoUrl = dto.LogoUrl,
                    AcademicYear = dto.AcademicYear,
                    Semester = dto.Semester,
                    UpdatedAt = DateTime.UtcNow
                };

                _ctx.SystemSettings.Add(settings);
            }
            else
            {
                settings.SchoolName = dto.SchoolName ?? settings.SchoolName;
                settings.SchoolEmail = dto.SchoolEmail ?? settings.SchoolEmail;
                settings.SchoolPhone = dto.SchoolPhone ?? settings.SchoolPhone;
                settings.Address = dto.Address ?? settings.Address;
                settings.City = dto.City ?? settings.City;
                settings.State = dto.State ?? settings.State;
                settings.Country = dto.Country ?? settings.Country;
                settings.LogoUrl = dto.LogoUrl ?? settings.LogoUrl;
                settings.AcademicYear = dto.AcademicYear ?? settings.AcademicYear;
                settings.Semester = dto.Semester ?? settings.Semester;
                settings.UpdatedAt = DateTime.UtcNow;

                _ctx.SystemSettings.Update(settings);
            }

            await _ctx.SaveChangesAsync();
            return Ok(settings);
        }

        // User Role Management
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers([FromQuery] string role = null)
        {
            var query = _ctx.Users.Include(u => u.Role).AsQueryable();

            if (!string.IsNullOrEmpty(role))
                query = query.Where(u => u.Role.RoleName == role);

            var users = await query.OrderBy(u => u.Email).ToListAsync();
            return Ok(users);
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _ctx.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return NotFound(new { message = "User not found" });
            return Ok(user);
        }

        [HttpPut("users/{id}/role")]
        public async Task<IActionResult> UpdateUserRole(int id, [FromBody] UpdateUserRoleDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _ctx.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "User not found" });

            var role = await _ctx.Roles.FirstOrDefaultAsync(r => r.RoleName == dto.RoleName);
            if (role == null) return BadRequest(new { message = "Role not found" });

            user.RoleId = role.RoleId;
            _ctx.Users.Update(user);
            await _ctx.SaveChangesAsync();

            return Ok(new { message = "User role updated successfully", user });
        }

        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _ctx.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "User not found" });

            _ctx.Users.Remove(user);
            await _ctx.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully" });
        }

        // Roles Management
        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _ctx.Roles.ToListAsync();
            return Ok(roles);
        }

        [HttpPost("roles")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var roleExists = await _ctx.Roles.AnyAsync(r => r.RoleName == dto.Name);
            if (roleExists) return BadRequest(new { message = "Role already exists" });

            var role = new AppRole
            {
                RoleName = dto.Name,
                Description = dto.Description
            };

            _ctx.Roles.Add(role);
            await _ctx.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoles), role);
        }

        // Announcements
        [HttpGet("announcements")]
        public async Task<IActionResult> GetAnnouncements([FromQuery] bool? active = null)
        {
            var query = _ctx.Announcements.AsQueryable();

            var announcements = await query.OrderByDescending(a => a.CreatedAt).ToListAsync();
            return Ok(announcements);
        }

        [HttpGet("announcements/{id}")]
        public async Task<IActionResult> GetAnnouncementById(int id)
        {
            var announcement = await _ctx.Announcements.FindAsync(id);
            if (announcement == null) return NotFound(new { message = "Announcement not found" });
            return Ok(announcement);
        }

        [HttpPost("announcements")]
        public async Task<IActionResult> CreateAnnouncement([FromBody] CreateAnnouncementDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var announcement = new Announcement
            {
                Title = dto.Title,
                Content = dto.Content,
                StartDate = dto.StartDate ?? DateTime.UtcNow,
                EndDate = dto.EndDate,
                Category = dto.Category ?? "general",
                PublishedBy = dto.PublishedBy,
                Status = "active"
            };

            _ctx.Announcements.Add(announcement);
            await _ctx.SaveChangesAsync();
Category = dto.Category ?? "general",
                Status = "active",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNowid}")]
        public async Task<IActionResult> UpdateAnnouncement(int id, [FromBody] UpdateAnnouncementDto dto)
        {
            var announcement = await _ctx.Announcements.FindAsync(id);
            if (announcement == null) return NotFound(new { message = "Announcement not found" });

            announcement.Title = dto.Title ?? announcement.Title;
            announcement.Content = dto.Content ?? announcement.Content;
            announcement.Eategory = dto.Category ?? announcement.Category;
            announcement.UpdatedAt = DateTime.UtcNow
            _ctx.Announcements.Update(announcement);
            await _ctx.SaveChangesAsync();

            return Ok(announcement);
        }

        [HttpDelete("announcements/{id}")]
        public async Task<IActionResult> DeleteAnnouncement(int id)
        {
            var announcement = await _ctx.Announcements.FindAsync(id);
            if (announcement == null) return NotFound(new { message = "Announcement not found" });

            _ctx.Announcements.Remove(announcement);
            await _ctx.SaveChangesAsync();

            return Ok(new { message = "Announcement deleted successfully" });
        }

        // Audit Logs
        [HttpGet("audit-logs")]
        public async Task<IActionResult> GetAuditLogs([FromQuery] int userId = 0, [FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
        {string performedBy = null)
        {
            var query = _ctx.AuditLogs.AsQueryable();

            if (!string.IsNullOrEmpty(performedBy))
                query = query.Where(a => a.PerformedBy.Contains(performedBy));

            var logs = await query.OrderByDescending(a => a.Timestamp).ToListAsync();
            return Ok(logs);
        }

        [HttpPost("audit-logs")]
        public async Task<IActionResult> LogActivity([FromBody] CreateAuditLogDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var auditLog = new AuditLog
            {
                Action = dto.Action,
                PerformedBy = dto.PerformedBy,
                Timestamp = DateTime.UtcNow

            _ctx.AuditLogs.Add(auditLog);
            await _ctx.SaveChangesAsync();

            return Ok(auditLog);
        }

        // Dashboard Statistics
        [HttpGet("statistics")]
        public async Task<IActionResult> GetAdminStatistics()
        {
            var totalUsers = await _ctx.Users.CountAsync();
            var totalRoles = await _ctx.Roles.CountAsync();
            var recentActivities = await _ctx.AuditLogs.OrderByDescending(a => a.Timestamp).Take(10).CountAsync();
            var activeAnnouncements = await _ctx.Announcements
                .Where(a => a.StartDate <= DateTime.UtcNow && (a.EndDate == null || a.EndDate >= DateTime.UtcNow))
                .CountAsync();

            var usersByRole = await _ctx.Users
                .Include(u => u.Role)
                .GroupBy(u => u.Role.Name)
                .Select(g => new
                {
                    role = g.Key,
                    count = g.Count()
                }nnouncements = await _ctx.Announcements.CountAsync();

            var usersByRole = await _ctx.Users
                .Include(u => u.Role)
                .GroupBy(u => u.Role.RoleName)
                .Select(g => new
                {
                    role = g.Key,
                    count = g.Count()
                })
                .ToListAsync();

            return Ok(new
            {
                totalUsers,
                totalRoles,
                recentActivities,
                achoolPhone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string LogoUrl { get; set; }
        public string AcademicYear { get; set; }
        public string Semester { get; set; }
    }

    public class UpdateUserRoleDto
    {
        [Required]
        public string RoleName { get; set; }
    }

    public class CreateRoleDto
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }
    }

    public class CreateAnnouncementDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Category { get; set; }

        [Required]
        public string PublishedBy { get; set; }
    }

    public class UpdateAnnouncementDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime? EndDate { get; set; }
        public string Category { get; set; }
    }

    public class CreateAuditLogDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string Action { get; set; }

        [Required]
        public string EntityType { get; set; }

        public int? EntityId { get; set; }
        public string OldValues { get; set; }
        public string NewValues { get; set; }
    }
}
string Action { get; set; }

        [Required]
        public string PerformedBy