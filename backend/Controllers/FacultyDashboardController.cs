using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("backend/[controller]")]
    [Authorize(Roles = "Faculty")]
    public class FacultyDashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FacultyDashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetFacultyDashboard()
        {
            try
            {
                // Get current user from claims (this would be set during login)
                var userIdClaim = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized("User ID not found in token");
                }

                var dashboard = new FacultyDashboardDto
                {
                    TotalClasses = 5,
                    TotalStudents = 142,
                    PendingAssignments = 3,
                    UpcomingClasses = 2,
                    TodaySchedule = new List<ClassScheduleDto>
                    {
                        new ClassScheduleDto
                        {
                            ClassId = 1,
                            ClassName = "Advanced Mathematics",
                            StartTime = "10:00 AM",
                            EndTime = "11:30 AM",
                            RoomNumber = "204"
                        },
                        new ClassScheduleDto
                        {
                            ClassId = 2,
                            ClassName = "Physics 101",
                            StartTime = "2:00 PM",
                            EndTime = "3:30 PM",
                            RoomNumber = "Lab A"
                        }
                    },
                    RecentActivity = new List<ActivityDto>
                    {
                        new ActivityDto
                        {
                            ActivityId = 1,
                            ActivityType = "Class attendance submitted",
                            Description = "Advanced Mathematics",
                            Course = "Advanced Mathematics",
                            Timestamp = "Yesterday",
                            IconType = "Users"
                        },
                        new ActivityDto
                        {
                            ActivityId = 2,
                            ActivityType = "Assignment graded",
                            Description = "Physics 101",
                            Course = "Physics 101",
                            Timestamp = "2 days ago",
                            IconType = "BookOpen"
                        }
                    }
                };

                return Ok(dashboard);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching dashboard", error = ex.Message });
            }
        }

        [HttpGet("classes")]
        public async Task<IActionResult> GetFacultyClasses()
        {
            try
            {
                var classes = new List<dynamic>
                {
                    new { classId = 1, name = "Advanced Mathematics", studentCount = 35, schedule = "MWF 10:00-11:30", room = "204" },
                    new { classId = 2, name = "Physics 101", studentCount = 42, schedule = "MWF 2:00-3:30", room = "Lab A" },
                    new { classId = 3, name = "Chemistry 201", studentCount = 38, schedule = "TTh 10:00-11:30", room = "301" },
                    new { classId = 4, name = "Biology 150", studentCount = 40, schedule = "TTh 2:00-3:30", room = "B02" },
                    new { classId = 5, name = "Earth Science", studentCount = 28, schedule = "F 1:00-4:00", room = "103" }
                };

                return Ok(classes);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching classes", error = ex.Message });
            }
        }

        [HttpGet("assignments")]
        public async Task<IActionResult> GetPendingAssignments()
        {
            try
            {
                var assignments = new List<dynamic>
                {
                    new { assignmentId = 1, title = "Midterm Exam Grading", course = "Advanced Mathematics", submissionCount = 35, pendingCount = 8 },
                    new { assignmentId = 2, title = "Lab Report Review", course = "Physics 101", submissionCount = 40, pendingCount = 5 },
                    new { assignmentId = 3, title = "Project Evaluation", course = "Chemistry 201", submissionCount = 35, pendingCount = 12 }
                };

                return Ok(assignments);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching assignments", error = ex.Message });
            }
        }

        [HttpGet("performance")]
        public async Task<IActionResult> GetClassPerformance()
        {
            try
            {
                var performance = new List<dynamic>
                {
                    new { course = "Advanced Mathematics", avgScore = 78, passRate = 85 },
                    new { course = "Physics 101", avgScore = 85, passRate = 92 },
                    new { course = "Chemistry 201", avgScore = 72, passRate = 78 }
                };

                return Ok(performance);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching performance data", error = ex.Message });
            }
        }
    }
}
