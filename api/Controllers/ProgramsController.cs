using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.DTOs;
using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProgramsController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        public ProgramsController(AppDbContext ctx) { _ctx = ctx; }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _ctx.Programs.OrderBy(p => p.Title).ToListAsync();
            var dto = list.Select(p => new ProgramDto { Id = p.Id, Title = p.Title, Department = p.Department, Description = p.Description });
            return Ok(dto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var p = await _ctx.Programs.FindAsync(id);
            if (p == null) return NotFound();
            return Ok(new ProgramDto { Id = p.Id, Title = p.Title, Department = p.Department, Description = p.Description });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProgramDto dto)
        {
            var p = new ProgramEntry { Title = dto.Title, Department = dto.Department, Description = dto.Description };
            _ctx.Programs.Add(p);
            await _ctx.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = p.Id }, dto);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProgramDto dto)
        {
            var p = await _ctx.Programs.FindAsync(id);
            if (p == null) return NotFound();
            p.Title = dto.Title;
            p.Department = dto.Department;
            p.Description = dto.Description;
            await _ctx.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var p = await _ctx.Programs.FindAsync(id);
            if (p == null) return NotFound();
            _ctx.Programs.Remove(p);
            await _ctx.SaveChangesAsync();
            return NoContent();
        }
    }
}
