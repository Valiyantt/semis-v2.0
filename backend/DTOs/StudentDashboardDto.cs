using System.Collections.Generic;

namespace backend.DTOs
{
    public class StudentDashboardDto
    {
        public int EnrolledCourses { get; set; }
        public double CurrentGPA { get; set; }
        public int PendingAssignments { get; set; }
        public int OverdueTasks { get; set; }
        public List<CourseDto> Courses { get; set; } = new();
        public List<AssignmentDto> UpcomingAssignments { get; set; } = new();
        public List<CourseProgressDto> CourseProgress { get; set; } = new();
    }

    public class CourseDto
    {
        public int CourseId { get; set; }
        public string CourseName { get; set; } = "";
        public string ProfessorName { get; set; } = "";
        public string Grade { get; set; } = "";
    }

    public class AssignmentDto
    {
        public int AssignmentId { get; set; }
        public string Title { get; set; } = "";
        public string CourseName { get; set; } = "";
        public string DueDate { get; set; } = "";
        public string Status { get; set; } = ""; // "Due Soon", "Overdue", "Pending"
    }

    public class CourseProgressDto
    {
        public string CourseName { get; set; } = "";
        public int ProgressPercentage { get; set; }
    }
}
