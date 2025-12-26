using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Controllers
{
    [ApiController]
    [Route("backend/[controller]")]
    public class SecurityController : ControllerBase
    {
        private readonly AppDbContext _ctx;

        public SecurityController(AppDbContext ctx) => _ctx = ctx;

        // Access Logs
        [HttpGet("access-logs")]
        public async Task<IActionResult> GetAccessLogs([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var query = _ctx.AccessLogs.AsQueryable();

            if (startDate.HasValue)
                query = query.Where(a => a.AccessTime >= startDate);

            if (endDate.HasValue)
                query = query.Where(a => a.AccessTime <= endDate);

            var logs = await query.OrderByDescending(a => a.AccessTime).ToListAsync();
            return Ok(logs);
        }

        [HttpPost("access-logs")]
        public async Task<IActionResult> LogAccess([FromBody] CreateAccessLogDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var log = new AccessLog
            {
                UserId = dto.UserId,
                Location = dto.Location,
                Purpose = dto.Purpose,
                AccessTime = DateTime.UtcNow,
                Status = dto.Status ?? "approved",
                Notes = dto.Notes
            };

            _ctx.AccessLogs.Add(log);
            await _ctx.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAccessLogs), new { id = log.AccessLogId }, log);
        }

        // Incident Reports
        [HttpGet("incidents")]
        public async Task<IActionResult> GetIncidents([FromQuery] string status = null)
        {
            var query = _ctx.IncidentReports.AsQueryable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(i => i.Status == status);

            var incidents = await query.OrderByDescending(i => i.ReportDate).ToListAsync();
            return Ok(incidents);
        }

        [HttpGet("incidents/{id}")]
        public async Task<IActionResult> GetIncidentById(int id)
        {
            var incident = await _ctx.IncidentReports.FindAsync(id);
            if (incident == null) return NotFound(new { message = "Incident not found" });
            return Ok(incident);
        }

        [HttpPost("incidents")]
        public async Task<IActionResult> CreateIncident([FromBody] CreateIncidentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var incident = new IncidentReport
            {
                Title = dto.Title,
                Description = dto.Description,
                Location = dto.Location,
                IncidentType = dto.IncidentType,
                ReportDate = DateTime.UtcNow,
                ReportedBy = dto.ReportedBy,
                Status = "open",
                Severity = dto.Severity ?? "medium"
            };

            _ctx.IncidentReports.Add(incident);
            await _ctx.SaveChangesAsync();

            return CreatedAtAction(nameof(GetIncidentById), new { id = incident.IncidentId }, incident);
        }

        [HttpPut("incidents/{id}")]
        public async Task<IActionResult> UpdateIncident(int id, [FromBody] UpdateIncidentDto dto)
        {
            var incident = await _ctx.IncidentReports.FindAsync(id);
            if (incident == null) return NotFound(new { message = "Incident not found" });

            incident.Status = dto.Status ?? incident.Status;
            incident.ResolutionNotes = dto.ResolutionNotes ?? incident.ResolutionNotes;

            if (!string.IsNullOrEmpty(dto.Status) && dto.Status == "closed")
                incident.ResolvedDate = DateTime.UtcNow;

            _ctx.IncidentReports.Update(incident);
            await _ctx.SaveChangesAsync();

            return Ok(incident);
        }

        // Security Alerts
        [HttpGet("alerts")]
        public async Task<IActionResult> GetAlerts([FromQuery] bool? resolved = null)
        {
            var query = _ctx.SecurityAlerts.AsQueryable();

            if (resolved.HasValue)
                query = query.Where(a => a.IsResolved == resolved);

            var alerts = await query.OrderByDescending(a => a.AlertDate).ToListAsync();
            return Ok(alerts);
        }

        [HttpPost("alerts")]
        public async Task<IActionResult> CreateAlert([FromBody] CreateSecurityAlertDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var alert = new SecurityAlert
            {
                AlertType = dto.AlertType,
                Message = dto.Message,
                Location = dto.Location,
                AlertDate = DateTime.UtcNow,
                AlertLevel = dto.AlertLevel ?? "medium",
                IsResolved = false
            };

            _ctx.SecurityAlerts.Add(alert);
            await _ctx.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAlerts), alert);
        }

        [HttpPut("alerts/{id}/resolve")]
        public async Task<IActionResult> ResolveAlert(int id, [FromBody] ResolveAlertDto dto)
        {
            var alert = await _ctx.SecurityAlerts.FindAsync(id);
            if (alert == null) return NotFound(new { message = "Alert not found" });

            alert.IsResolved = true;
            alert.ResolutionNotes = dto.ResolutionNotes;
            alert.ResolvedDate = DateTime.UtcNow;

            _ctx.SecurityAlerts.Update(alert);
            await _ctx.SaveChangesAsync();

            return Ok(alert);
        }

        // Visitor Logs
        [HttpGet("visitor-logs")]
        public async Task<IActionResult> GetVisitorLogs([FromQuery] DateTime? date = null)
        {
            var query = _ctx.VisitorLogs.AsQueryable();

            if (date.HasValue)
                query = query.Where(v => v.CheckInTime.Date == date.Value.Date);

            var logs = await query.OrderByDescending(v => v.CheckInTime).ToListAsync();
            return Ok(logs);
        }

        [HttpPost("visitor-logs/check-in")]
        public async Task<IActionResult> CheckInVisitor([FromBody] VisitorCheckInDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var log = new VisitorLog
            {
                VisitorName = dto.VisitorName,
                VisitorEmail = dto.VisitorEmail,
                VisitorPhone = dto.VisitorPhone,
                PurposeOfVisit = dto.PurposeOfVisit,
                HostName = dto.HostName,
                CheckInTime = DateTime.UtcNow,
                Status = "checked-in"
            };

            _ctx.VisitorLogs.Add(log);
            await _ctx.SaveChangesAsync();

            return Ok(new { message = "Visitor checked in successfully", visitorLog = log });
        }

        [HttpPut("visitor-logs/{id}/check-out")]
        public async Task<IActionResult> CheckOutVisitor(int id)
        {
            var log = await _ctx.VisitorLogs.FindAsync(id);
            if (log == null) return NotFound(new { message = "Visitor log not found" });

            log.CheckOutTime = DateTime.UtcNow;
            log.Status = "checked-out";

            _ctx.VisitorLogs.Update(log);
            await _ctx.SaveChangesAsync();

            return Ok(new { message = "Visitor checked out successfully", visitorLog = log });
        }

        // Security Statistics
        [HttpGet("statistics")]
        public async Task<IActionResult> GetStatistics()
        {
            var todayAccess = await _ctx.AccessLogs
                .Where(a => a.AccessTime.Date == DateTime.UtcNow.Date)
                .CountAsync();

            var openIncidents = await _ctx.IncidentReports
                .CountAsync(i => i.Status == "open");

            var activeAlerts = await _ctx.SecurityAlerts
                .CountAsync(a => !a.IsResolved);

            var todayVisitors = await _ctx.VisitorLogs
                .Where(v => v.CheckInTime.Date == DateTime.UtcNow.Date)
                .CountAsync();

            return Ok(new
            {
                todayAccess,
                openIncidents,
                activeAlerts,
                todayVisitors,
                totalIncidents = await _ctx.IncidentReports.CountAsync(),
                totalAlerts = await _ctx.SecurityAlerts.CountAsync()
            });
        }
    }

    // DTOs
    public class CreateAccessLogDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string Purpose { get; set; }

        public string Status { get; set; }
        public string Notes { get; set; }
    }

    public class CreateIncidentDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string IncidentType { get; set; }

        [Required]
        public string ReportedBy { get; set; }

        public string Severity { get; set; }
    }

    public class UpdateIncidentDto
    {
        public string Status { get; set; }
        public string ResolutionNotes { get; set; }
    }

    public class CreateSecurityAlertDto
    {
        [Required]
        public string AlertType { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public string Location { get; set; }

        public string AlertLevel { get; set; }
    }

    public class ResolveAlertDto
    {
        public string ResolutionNotes { get; set; }
    }

    public class VisitorCheckInDto
    {
        [Required]
        public string VisitorName { get; set; }

        [Required]
        public string VisitorEmail { get; set; }

        [Required]
        public string VisitorPhone { get; set; }

        [Required]
        public string PurposeOfVisit { get; set; }

        [Required]
        public string HostName { get; set; }
    }
}
