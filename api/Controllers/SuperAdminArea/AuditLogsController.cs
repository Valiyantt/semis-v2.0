using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers.SuperAdminArea
{
    [Route("api/superadmin/[controller]")]
    [ApiController]
    public class AuditLogsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AuditLogsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuditLog>>> GetAuditLogs()
        {
            return await _context.AuditLogs
                .OrderByDescending(a => a.Timestamp)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuditLog>> GetAuditLog(int id)
        {
            var log = await _context.AuditLogs.FindAsync(id);
            if (log == null) return NotFound("Audit log not found.");
            return log;
        }

        [HttpPost]
        public async Task<ActionResult<AuditLog>> PostAuditLog(AuditLog log)
        {
            log.Timestamp = DateTime.Now;
            _context.AuditLogs.Add(log);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAuditLog), new { id = log.AuditLogId }, log);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuditLog(int id)
        {
            var log = await _context.AuditLogs.FindAsync(id);
            if (log == null) return NotFound();
            _context.AuditLogs.Remove(log);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
