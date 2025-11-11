// Controllers/Administration/FacultyController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using System.Threading.Tasks;

namespace api.Controllers.Administration
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacultyController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FacultyController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetFaculties()
        {
            var faculties = await _context.Set<Faculty>().ToListAsync();
            return Ok(faculties);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFaculty(int id)
        {
            var faculty = await _context.Set<Faculty>().FindAsync(id);
            if (faculty == null) return NotFound();
            return Ok(faculty);
        }

        [HttpPost]
        public async Task<IActionResult> CreateFaculty([FromBody] Faculty faculty)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _context.Set<Faculty>().Add(faculty);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFaculty), new { id = faculty.FacultyId }, faculty);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFaculty(int id, [FromBody] Faculty updated)
        {
            var faculty = await _context.Set<Faculty>().FindAsync(id);
            if (faculty == null) return NotFound();

            faculty.FullName = updated.FullName;
            faculty.Email = updated.Email;
            faculty.PasswordHash = updated.PasswordHash;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFaculty(int id)
        {
            var faculty = await _context.Set<Faculty>().FindAsync(id);
            if (faculty == null) return NotFound();

            _context.Set<Faculty>().Remove(faculty);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
