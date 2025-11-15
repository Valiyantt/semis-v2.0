using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTOs;
using backend.Models;

namespace backend.Controllers
{
[ApiController]
    [Route("backend/[controller]")]
    public class BillingController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        public BillingController(AppDbContext ctx) { _ctx = ctx; }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _ctx.BillingStatements.OrderBy(b => b.DueDate).ToListAsync();
            var dto = list.Select(b => new BillingDto {
                Id = b.Id, AccountName = b.AccountName, Amount = b.Amount, Details = b.Details, DueDate = b.DueDate
            });
            return Ok(dto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var b = await _ctx.BillingStatements.FindAsync(id);
            if (b == null) return NotFound();
            return Ok(new BillingDto { Id = b.Id, AccountName = b.AccountName, Amount = b.Amount, Details = b.Details, DueDate = b.DueDate });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BillingDto dto)
        {
            var b = new BillingStatement { AccountName = dto.AccountName, Amount = dto.Amount, Details = dto.Details, DueDate = dto.DueDate };
            _ctx.BillingStatements.Add(b);
            await _ctx.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = b.Id }, dto);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] BillingDto dto)
        {
            var b = await _ctx.BillingStatements.FindAsync(id);
            if (b == null) return NotFound();
            b.AccountName = dto.AccountName; b.Amount = dto.Amount; b.Details = dto.Details; b.DueDate = dto.DueDate;
            await _ctx.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var b = await _ctx.BillingStatements.FindAsync(id);
            if (b == null) return NotFound();
            _ctx.BillingStatements.Remove(b);
            await _ctx.SaveChangesAsync();
            return NoContent();
        }
    }
}