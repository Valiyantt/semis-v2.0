using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "SuperAdmin")]
    public class SuperAdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SuperAdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSuperAdmins()
        {
            var admins = await _context.SuperAdmins.ToListAsync();
            return Ok(admins);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSuperAdmin(int id)
        {
            var admin = await _context.SuperAdmins.FindAsync(id);
            if (admin == null) return NotFound();
            return Ok(admin);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSuperAdmin([FromBody] SuperAdmin admin)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _context.SuperAdmins.Add(admin);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSuperAdmin), new { id = admin.SuperAdminId }, admin);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSuperAdmin(int id, [FromBody] SuperAdmin updated)
        {
            var admin = await _context.SuperAdmins.FindAsync(id);
            if (admin == null) return NotFound();

            admin.FullName = updated.FullName;
            admin.Email = updated.Email;
            admin.PasswordHash = updated.PasswordHash;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSuperAdmin(int id)
        {
            var admin = await _context.SuperAdmins.FindAsync(id);
            if (admin == null) return NotFound();

            _context.SuperAdmins.Remove(admin);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
