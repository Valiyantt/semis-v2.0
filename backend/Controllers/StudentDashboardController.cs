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
    [Authorize(Roles = "Student")]
    public class StudentDashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentDashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetStudentDashboard()
        {
            try
            {
                // Get current user from claims (this would be set during login)
                var userIdClaim = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized("User ID not found in token");
                }

                var dashboard = new StudentDashboardDto
                {
                    EnrolledCourses = 5,
                    CurrentGPA = 3.7,
                    PendingAssignments = 4,
                    OverdueTasks = 1,
                    Courses = new List<CourseDto>
                    {
                        new CourseDto { CourseId = 1, CourseName = "Advanced Mathematics", ProfessorName = "Prof. Dr. Anderson", Grade = "A" },
                        new CourseDto { CourseId = 2, CourseName = "Physics 101", ProfessorName = "Prof. Sarah Miller", Grade = "A-" },
                        new CourseDto { CourseId = 3, CourseName = "Chemistry 201", ProfessorName = "Prof. James White", Grade = "B+" },
                        new CourseDto { CourseId = 4, CourseName = "English Literature", ProfessorName = "Prof. Emily Davis", Grade = "A" },
                        new CourseDto { CourseId = 5, CourseName = "Biology 101", ProfessorName = "Prof. Michael Brown", Grade = "A-" }
                    },
                    UpcomingAssignments = new List<AssignmentDto>
                    {
                        new AssignmentDto { AssignmentId = 1, Title = "Calculus Problem Set 5", CourseName = "Advanced Mathematics", DueDate = "Dec 10", Status = "Due Soon" },
                        new AssignmentDto { AssignmentId = 2, Title = "Lab Report - Energy Transfer", CourseName = "Physics 101", DueDate = "Dec 13", Status = "Due Soon" },
                        new AssignmentDto { AssignmentId = 3, Title = "Essay: British Romanticism", CourseName = "English Literature", DueDate = "Dec 15", Status = "Due Soon" },
                        new AssignmentDto { AssignmentId = 4, Title = "Chapter 12-14 Questions", CourseName = "Chemistry 201", DueDate = "Dec 8", Status = "Overdue" }
                    },
                    CourseProgress = new List<CourseProgressDto>
                    {
                        new CourseProgressDto { CourseName = "Advanced Mathematics", ProgressPercentage = 92 },
                        new CourseProgressDto { CourseName = "Physics 101", ProgressPercentage = 88 },
                        new CourseProgressDto { CourseName = "Chemistry 201", ProgressPercentage = 85 }
                    }
                };

                return Ok(dashboard);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching dashboard", error = ex.Message });
            }
        }

        [HttpGet("courses")]
        public async Task<IActionResult> GetStudentCourses()
        {
            try
            {
                var courses = new List<dynamic>
                {
                    new { courseId = 1, name = "Advanced Mathematics", professor = "Prof. Dr. Anderson", credit = 3, grade = "A", status = "Active" },
                    new { courseId = 2, name = "Physics 101", professor = "Prof. Sarah Miller", credit = 4, grade = "A-", status = "Active" },
                    new { courseId = 3, name = "Chemistry 201", professor = "Prof. James White", credit = 3, grade = "B+", status = "Active" },
                    new { courseId = 4, name = "English Literature", professor = "Prof. Emily Davis", credit = 3, grade = "A", status = "Active" },
                    new { courseId = 5, name = "Biology 101", professor = "Prof. Michael Brown", credit = 4, grade = "A-", status = "Active" }
                };

                return Ok(courses);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching courses", error = ex.Message });
            }
        }

        [HttpGet("assignments")]
        public async Task<IActionResult> GetStudentAssignments()
        {
            try
            {
                var assignments = new List<dynamic>
                {
                    new { assignmentId = 1, title = "Calculus Problem Set 5", course = "Advanced Mathematics", dueDate = "2025-12-10", status = "Pending", submittedDate = null },
                    new { assignmentId = 2, title = "Lab Report - Energy Transfer", course = "Physics 101", dueDate = "2025-12-13", status = "Pending", submittedDate = null },
                    new { assignmentId = 3, title = "Essay: British Romanticism", course = "English Literature", dueDate = "2025-12-15", status = "Pending", submittedDate = null },
                    new { assignmentId = 4, title = "Chapter 12-14 Questions", course = "Chemistry 201", dueDate = "2025-12-08", status = "Overdue", submittedDate = null }
                };

                return Ok(assignments);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching assignments", error = ex.Message });
            }
        }

        [HttpGet("grades")]
        public async Task<IActionResult> GetStudentGrades()
        {
            try
            {
                var grades = new List<dynamic>
                {
                    new { courseId = 1, courseName = "Advanced Mathematics", currentGrade = "A", score = 92, passStatus = "Pass" },
                    new { courseId = 2, courseName = "Physics 101", currentGrade = "A-", score = 88, passStatus = "Pass" },
                    new { courseId = 3, courseName = "Chemistry 201", currentGrade = "B+", score = 85, passStatus = "Pass" },
                    new { courseId = 4, courseName = "English Literature", currentGrade = "A", score = 90, passStatus = "Pass" },
                    new { courseId = 5, courseName = "Biology 101", currentGrade = "A-", score = 87, passStatus = "Pass" }
                };

                return Ok(grades);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching grades", error = ex.Message });
            }
        }

        [HttpGet("schedule")]
        public async Task<IActionResult> GetStudentSchedule()
        {
            try
            {
                var schedule = new List<dynamic>
                {
                    new { courseId = 1, courseName = "Advanced Mathematics", professor = "Prof. Dr. Anderson", schedule = "MWF 10:00-11:30", room = "204" },
                    new { courseId = 2, courseName = "Physics 101", professor = "Prof. Sarah Miller", schedule = "MWF 2:00-3:30", room = "Lab A" },
                    new { courseId = 3, courseName = "Chemistry 201", professor = "Prof. James White", schedule = "TTh 10:00-11:30", room = "301" },
                    new { courseId = 4, courseName = "English Literature", professor = "Prof. Emily Davis", schedule = "TTh 1:00-2:30", room = "205" },
                    new { courseId = 5, courseName = "Biology 101", professor = "Prof. Michael Brown", schedule = "F 9:00-12:00", room = "B01" }
                };

                return Ok(schedule);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error fetching schedule", error = ex.Message });
            }
        }
    }
}
