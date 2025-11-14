using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers.SuperAdminArea
{
    [Route("api/superadmin/[controller]")]
    [ApiController]
    [Authorize(Roles = "SuperAdmin")]
    public class RolesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public RolesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/superadmin/roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppRole>>> GetRoles()
        {
            return await _context.Roles.ToListAsync();
        }

        // GET: api/superadmin/roles/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AppRole>> GetRole(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null) return NotFound("Role not found.");
            return role;
        }

        // POST: api/superadmin/roles
        [HttpPost]
        public async Task<ActionResult<AppRole>> PostRole(AppRole role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRole), new { id = role.RoleId }, role);
        }

        // PUT: api/superadmin/roles/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRole(int id, AppRole role)
        {
            if (id != role.RoleId) return BadRequest("Mismatched Role ID.");
            _context.Entry(role).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/superadmin/roles/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null) return NotFound();
            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
