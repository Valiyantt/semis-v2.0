using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.DTOs;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

namespace api.Controllers
{
[ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        private readonly IConfiguration _config;
        public AuthController(AppDbContext ctx, IConfiguration config) { _ctx = ctx; _config = config; }

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
            var user = await _ctx.Users.Include(u => u.Role).SingleOrDefaultAsync(u => u.Username == dto.Username);
            if (user == null) return Unauthorized(new { message = "Invalid credentials" });

            var valid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!valid) return Unauthorized(new { message = "Invalid credentials" });

            // Build JWT
            var jwtSection = _config.GetSection("Jwt");
            var key = jwtSection.GetValue<string>("Key") ?? "ChangeThisSecretToAStrongRandomValueForProduction";
            var issuer = jwtSection.GetValue<string>("Issuer") ?? "semis";
            var audience = jwtSection.GetValue<string>("Audience") ?? "semis_clients";
            var expireMinutes = jwtSection.GetValue<int?>("ExpireMinutes") ?? 120;

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };
            if (!string.IsNullOrWhiteSpace(user.Role?.RoleName))
            {
                claims.Add(new Claim(ClaimTypes.Role, user.Role.RoleName));
            }

            var keyBytes = Encoding.UTF8.GetBytes(key);
            var creds = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expireMinutes),
                signingCredentials: creds
            );

            var tokenStr = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new { token = tokenStr, user = new UserDto { Id = user.Id, Username = user.Username, FullName = user.FullName, Role = user.Role?.RoleName } });
        }
    }
}