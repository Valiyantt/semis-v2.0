using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("backend/[controller]")]
    public class SchoolStructureController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SchoolStructureController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("levels")]
        public async Task<IActionResult> GetSchoolLevels()
        {
            try
            {
                var levels = await _context.SchoolLevels
                    .OrderBy(l => l.SchoolLevelId)
                    .Select(l => new { l.SchoolLevelId, l.LevelName })
                    .ToListAsync();

                return Ok(levels);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching school levels", error = ex.Message });
            }
        }

        [HttpGet("grades/{levelId}")]
        public async Task<IActionResult> GetGradesByLevel(int levelId)
        {
            try
            {
                var grades = await _context.Grades
                    .Where(g => g.SchoolLevelId == levelId)
                    .OrderBy(g => g.GradeId)
                    .Select(g => new { g.GradeId, g.GradeName })
                    .ToListAsync();

                if (!grades.Any())
                    return NotFound(new { message = "No grades found for this level" });

                return Ok(grades);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching grades", error = ex.Message });
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetCompleteStructure()
        {
            try
            {
                var structure = await _context.SchoolLevels
                    .OrderBy(l => l.SchoolLevelId)
                    .Select(l => new
                    {
                        l.SchoolLevelId,
                        l.LevelName,
                        Grades = _context.Grades
                            .Where(g => g.SchoolLevelId == l.SchoolLevelId)
                            .OrderBy(g => g.GradeId)
                            .Select(g => new { g.GradeId, g.GradeName })
                            .ToList()
                    })
                    .ToListAsync();

                return Ok(structure);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching school structure", error = ex.Message });
            }
        }
    }
}
