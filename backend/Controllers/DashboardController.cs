using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("backend/[controller]")]
    [Authorize(Roles = "SuperAdmin")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSuperAdminDashboard()
        {
            try
            {
                var totalUsers = await _context.Users.CountAsync();
                var totalFaculty = await _context.Faculties.CountAsync();
                var totalStudents = await _context.Students.CountAsync();
                var totalDepartments = await _context.Departments.CountAsync();

                var dashboard = new
                {
                    TotalUsers = totalUsers,
                    TotalFaculty = totalFaculty,
                    TotalStudents = totalStudents,
                    TotalDepartments = totalDepartments,
                    RecentActivity = await GetRecentActivity(),
                    SystemStats = await GetSystemStats()
                };

                return Ok(dashboard);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching dashboard", error = ex.Message });
            }
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsersStats()
        {
            try
            {
                var stats = new
                {
                    TotalUsers = await _context.Users.CountAsync(),
                    ActiveUsers = await _context.Users.Where(u => u.IsActive).CountAsync(),
                    InactiveUsers = await _context.Users.Where(u => !u.IsActive).CountAsync()
                };

                return Ok(stats);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching user statistics", error = ex.Message });
            }
        }

        [HttpGet("faculty")]
        public async Task<IActionResult> GetFacultyStats()
        {
            try
            {
                var stats = new
                {
                    TotalFaculty = await _context.Faculties.CountAsync(),
                    ByDepartment = await _context.Faculties
                        .GroupBy(f => "General")
                        .Select(g => new { Department = g.Key, Count = g.Count() })
                        .ToListAsync()
                };

                return Ok(stats);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching faculty statistics", error = ex.Message });
            }
        }

        [HttpGet("students")]
        public async Task<IActionResult> GetStudentStats()
        {
            try
            {
                var stats = new
                {
                    TotalStudents = await _context.Students.CountAsync(),
                    ByYear = new
                    {
                        FirstYear = 0,
                        SecondYear = 0,
                        ThirdYear = 0,
                        FourthYear = 0
                    }
                };

                return Ok(stats);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching student statistics", error = ex.Message });
            }
        }

        [HttpGet("departments")]
        public async Task<IActionResult> GetDepartmentsStats()
        {
            try
            {
                var departments = await _context.Departments
                    .Select(d => new { d.DepartmentId, d.Name })
                    .ToListAsync();

                return Ok(departments);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching departments", error = ex.Message });
            }
        }

        [HttpGet("audit-logs")]
        public async Task<IActionResult> GetAuditLogs()
        {
            try
            {
                var logs = await _context.AuditLogs
                    .OrderByDescending(l => l.Timestamp)
                    .Take(10)
                    .ToListAsync();

                return Ok(logs);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching audit logs", error = ex.Message });
            }
        }

        private async Task<List<dynamic>> GetRecentActivity()
        {
            var activities = new List<dynamic>
            {
                new { Type = "User Created", Description = "New faculty member added", Timestamp = System.DateTime.Now.AddHours(-2) },
                new { Type = "Student Enrolled", Description = "5 students enrolled in Physics 101", Timestamp = System.DateTime.Now.AddHours(-5) },
                new { Type = "Department Updated", Description = "Computer Science department updated", Timestamp = System.DateTime.Now.AddHours(-8) }
            };

            return await Task.FromResult(activities);
        }

        private async Task<dynamic> GetSystemStats()
        {
            var stats = new
            {
                ActiveSessions = 24,
                SystemHealth = "Optimal",
                LastBackup = System.DateTime.Now.AddDays(-1),
                ServerLoad = 35
            };

            return await Task.FromResult(stats);
        }
    }
}
