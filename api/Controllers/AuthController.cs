using Microsoft.AspNetCore.Mvc;
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

            var user = new AppUser
            {
                Username = dto.Username,
                FullName = dto.FullName,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            };
            _ctx.Users.Add(user);
            await _ctx.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), new { id = user.Id }, new { user.Id, user.Username, user.FullName });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _ctx.Users.SingleOrDefaultAsync(u => u.Username == dto.Username);
            if (user == null) return Unauthorized(new { message = "Invalid credentials" });

            var valid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!valid) return Unauthorized(new { message = "Invalid credentials" });

            // NOTE: This returns basic info. Replace with JWT or Identity as needed.
            var outDto = new UserDto { Id = user.Id, Username = user.Username, FullName = user.FullName};
            return Ok(outDto);
        }
    }
}