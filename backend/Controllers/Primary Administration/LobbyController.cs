using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Controllers
{
[ApiController]
    [Route("backend/[controller]")]
    public class LobbyController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        public LobbyController(AppDbContext ctx) { _ctx = ctx; }

        [HttpGet]
        public async Task<IActionResult> GetLobby()
        {
            var welcome = await _ctx.WelcomePages.OrderByDescending(w => w.UpdatedAt).FirstOrDefaultAsync();
            var about = await _ctx.AboutUsEntries.FirstOrDefaultAsync();
            var programs = await _ctx.Programs.OrderBy(p => p.Title).Take(8).ToListAsync();
            var billing = await _ctx.BillingStatements.OrderByDescending(b => b.DueDate).Take(5).ToListAsync();

            return Ok(new
            {
                Welcome = welcome?.Content,
                About = about?.Content,
                Programs = programs.Select(p => new { p.Id, p.Title, p.Department }),
                Billing = billing.Select(b => new { b.Id, b.AccountName, b.Amount, b.DueDate })
            });
        }
    }
}