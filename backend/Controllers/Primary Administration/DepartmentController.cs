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
    public class DepartmentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DepartmentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            return await _context.Departments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var dept = await _context.Departments.FindAsync(id);
            if (dept == null) return NotFound("Department not found.");
            return dept;
        }

        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(Department dept)
        {
            _context.Departments.Add(dept);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDepartment), new { id = dept.DepartmentId }, dept);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(int id, Department dept)
        {
            if (id != dept.DepartmentId) return BadRequest("Mismatched Department ID.");
            _context.Entry(dept).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var dept = await _context.Departments.FindAsync(id);
            if (dept == null) return NotFound();
            _context.Departments.Remove(dept);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
