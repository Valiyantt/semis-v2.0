using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers.SuperAdminArea
{
    [Route("api/superadmin/[controller]")]
    [ApiController]
    [Authorize(Roles = "SuperAdmin")]
    public class AnnouncementsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AnnouncementsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetAnnouncements()
        {
            return await _context.Announcements.OrderByDescending(a => a.DatePosted).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Announcement>> GetAnnouncement(int id)
        {
            var announcement = await _context.Announcements.FindAsync(id);
            if (announcement == null) return NotFound("Announcement not found.");
            return announcement;
        }

        [HttpPost]
        public async Task<ActionResult<Announcement>> PostAnnouncement(Announcement announcement)
        {
            announcement.DatePosted = DateTime.Now;
            _context.Announcements.Add(announcement);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAnnouncement), new { id = announcement.AnnouncementId }, announcement);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnnouncement(int id, Announcement announcement)
        {
            if (id != announcement.AnnouncementId) return BadRequest("Mismatched Announcement ID.");
            _context.Entry(announcement).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnnouncement(int id)
        {
            var announcement = await _context.Announcements.FindAsync(id);
            if (announcement == null) return NotFound();
            _context.Announcements.Remove(announcement);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
