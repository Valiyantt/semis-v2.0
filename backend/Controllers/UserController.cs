using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("backend/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // GET: backend/user/faculty - Get all faculty members
        [HttpGet("faculty")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetAllFaculty()
        {
            try
            {
                var facultyRole = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == "Faculty");
                if (facultyRole == null)
                {
                    return Ok(new List<object>());
                }

                var faculty = await _context.Users
                    .Where(u => u.RoleId == facultyRole.RoleId)
                    .Select(u => new
                    {
                        u.Id,
                        u.Username,
                        u.FullName,
                        u.Email,
                        u.IsActive,
                        u.DateCreated,
                        Role = new { u.Role!.RoleName }
                    })
                    .ToListAsync();

                return Ok(faculty);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching faculty members", error = ex.Message });
            }
        }

        // GET: backend/user/faculty/:id - Get faculty member by ID
        [HttpGet("faculty/{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetFacultyById(int id)
        {
            try
            {
                var faculty = await _context.Users
                    .Include(u => u.Role)
                    .FirstOrDefaultAsync(u => u.Id == id);

                if (faculty == null)
                {
                    return NotFound(new { message = "Faculty member not found" });
                }

                var result = new
                {
                    faculty.Id,
                    faculty.Username,
                    faculty.FullName,
                    faculty.Email,
                    faculty.IsActive,
                    faculty.DateCreated,
                    Role = new { faculty.Role!.RoleName }
                };

                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching faculty member", error = ex.Message });
            }
        }

        // POST: backend/user/faculty - Create new faculty member
        [HttpPost("faculty")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> CreateFaculty([FromBody] CreateFacultyDto dto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(dto.FullName) || string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
                {
                    return BadRequest(new { message = "Full name, email, and password are required" });
                }

                // Check if user already exists
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
                if (existingUser != null)
                {
                    return Conflict(new { message = "User with this email already exists" });
                }

                var facultyRole = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == "Faculty");
                if (facultyRole == null)
                {
                    return BadRequest(new { message = "Faculty role not found" });
                }

                var username = string.IsNullOrWhiteSpace(dto.Username)
                    ? dto.FullName.ToLower().Replace(" ", "")
                    : dto.Username;

                var faculty = new AppUser
                {
                    Username = username,
                    FullName = dto.FullName,
                    Email = dto.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                    RoleId = facultyRole.RoleId,
                    IsActive = true,
                    DateCreated = System.DateTime.UtcNow
                };

                _context.Users.Add(faculty);
                await _context.SaveChangesAsync();

                var result = new
                {
                    faculty.Id,
                    faculty.Username,
                    faculty.FullName,
                    faculty.Email,
                    faculty.IsActive,
                    faculty.DateCreated,
                    Role = new { RoleName = "Faculty" }
                };

                return CreatedAtAction(nameof(GetFacultyById), new { id = faculty.Id }, result);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error creating faculty member", error = ex.Message });
            }
        }

        // PUT: backend/user/faculty/:id - Update faculty member
        [HttpPut("faculty/{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> UpdateFaculty(int id, [FromBody] UpdateFacultyDto dto)
        {
            try
            {
                var faculty = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
                if (faculty == null)
                {
                    return NotFound(new { message = "Faculty member not found" });
                }

                if (!string.IsNullOrWhiteSpace(dto.FullName))
                {
                    faculty.FullName = dto.FullName;
                }

                if (!string.IsNullOrWhiteSpace(dto.Email))
                {
                    // Check if email is already in use by another user
                    var existingEmail = await _context.Users
                        .FirstOrDefaultAsync(u => u.Email == dto.Email && u.Id != id);
                    if (existingEmail != null)
                    {
                        return Conflict(new { message = "Email is already in use" });
                    }
                    faculty.Email = dto.Email;
                }

                if (dto.IsActive.HasValue)
                {
                    faculty.IsActive = dto.IsActive.Value;
                }

                _context.Users.Update(faculty);
                await _context.SaveChangesAsync();

                var result = new
                {
                    faculty.Id,
                    faculty.Username,
                    faculty.FullName,
                    faculty.Email,
                    faculty.IsActive,
                    faculty.DateCreated
                };

                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error updating faculty member", error = ex.Message });
            }
        }

        // DELETE: backend/user/faculty/:id - Remove faculty member
        [HttpDelete("faculty/{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> DeleteFaculty(int id)
        {
            try
            {
                var faculty = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
                if (faculty == null)
                {
                    return NotFound(new { message = "Faculty member not found" });
                }

                _context.Users.Remove(faculty);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Faculty member removed successfully" });
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error removing faculty member", error = ex.Message });
            }
        }
    }

    // DTOs
    public class CreateFacultyDto
    {
        public string Username { get; set; } = "";
        public string FullName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
        public int? SchoolLevelId { get; set; }
    }

    public class UpdateFacultyDto
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public bool? IsActive { get; set; }
        public int? SchoolLevelId { get; set; }
    }
}
