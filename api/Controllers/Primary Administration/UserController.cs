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
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ GET: api/superadmin/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _context.Users
                .Include(u => u.Role)
                .OrderBy(u => u.FullName)
                .ToListAsync();
        }

        // ✅ GET: api/superadmin/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null) return NotFound();
            return user;
        }

        // ✅ POST: api/superadmin/users
        [HttpPost]
        public async Task<ActionResult<AppUser>> CreateUser(AppUser user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
                return BadRequest("Username already exists.");

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // ✅ PUT: api/superadmin/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, AppUser user)
        {
            if (id != user.Id) return BadRequest();

            var existing = await _context.Users.FindAsync(id);
            if (existing == null) return NotFound();

            existing.FullName = user.FullName;
            existing.Email = user.Email;
            existing.RoleId = user.RoleId;
            existing.IsActive = user.IsActive;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // ✅ DELETE: api/superadmin/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
