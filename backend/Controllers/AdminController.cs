using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using api.Data;
using api.DTOs;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
[ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        public AdminController(AppDbContext ctx) { _ctx = ctx; }

        [HttpGet("welcome")]
        public async Task<IActionResult> GetWelcome()
        {
            var w = await _ctx.WelcomePages.OrderByDescending(x => x.UpdatedAt).FirstOrDefaultAsync();
            if (w == null) return NotFound();
            return Ok(w);
        }

        [HttpPost("welcome")]
        public async Task<IActionResult> SetWelcome([FromBody] WelcomePage model)
        {
            // Replace or add
            var existing = await _ctx.WelcomePages.FirstOrDefaultAsync();
            if (existing == null)
            {
                model.UpdatedAt = DateTime.UtcNow;
                _ctx.WelcomePages.Add(model);
            }
            else
            {
                existing.Content = model.Content;
                existing.UpdatedAt = DateTime.UtcNow;
            }
            await _ctx.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("about")]
        public async Task<IActionResult> GetAbout()
        {
            var a = await _ctx.AboutUsEntries.FirstOrDefaultAsync();
            if (a == null) return NotFound();
            return Ok(a);
        }

        [HttpPost("about")]
        public async Task<IActionResult> SetAbout([FromBody] AboutUs model)
        {
            var existing = await _ctx.AboutUsEntries.FirstOrDefaultAsync();
            if (existing == null)
            {
                _ctx.AboutUsEntries.Add(model);
            }
            else
            {
                existing.Content = model.Content;
            }
            await _ctx.SaveChangesAsync();
            return Ok();
        }
    }
}