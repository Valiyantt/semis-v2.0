using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        public AuthController(AppDbContext ctx) { _ctx = ctx; }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _ctx.Users.AnyAsync(u => u.Username == dto.Username))
                return Conflict(new { message = "Username already exists" });

            // ✅ Fetch the default role from the Role table
            var userRole = await _ctx.Roles.FirstOrDefaultAsync(r => r.RoleName == "User");
            if (userRole == null)
            {
                // Automatically create it if missing (optional safeguard)
                userRole = new Role { RoleName = "User", Description = "Default user role" };
                _ctx.Roles.Add(userRole);
                await _ctx.SaveChangesAsync();
            }

            var user = new AppUser
            {
                Username = dto.Username,
                FullName = dto.FullName,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = userRole // ✅ Assign the Role entity, not a string
            };

            _ctx.Users.Add(user);
            await _ctx.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), new { id = user.Id }, new
            {
                user.Id,
                user.Username,
                user.FullName,
                Role = user.Role.RoleName // ✅ Return role name as string
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _ctx.Users
                .Include(u => u.Role) // ✅ Include Role to access RoleName
                .SingleOrDefaultAsync(u => u.Username == dto.Username);

            if (user == null) return Unauthorized(new { message = "Invalid credentials" });

            var valid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!valid) return Unauthorized(new { message = "Invalid credentials" });

            // ✅ Send RoleName, not Role object
            var outDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                FullName = user.FullName,
                Role = user.Role?.RoleName ?? "User" // handle null safely
            };

            return Ok(outDto);
        }
    }
}
