using System.Collections.Generic;

namespace backend.DTOs
{
    public class FacultyDashboardDto
    {
        public int TotalClasses { get; set; }
        public int TotalStudents { get; set; }
        public int PendingAssignments { get; set; }
        public int UpcomingClasses { get; set; }
        public List<ClassScheduleDto> TodaySchedule { get; set; } = new();
        public List<ActivityDto> RecentActivity { get; set; } = new();
    }

    public class ClassScheduleDto
    {
        public int ClassId { get; set; }
        public string ClassName { get; set; } = "";
        public string StartTime { get; set; } = "";
        public string EndTime { get; set; } = "";
        public string RoomNumber { get; set; } = "";
    }

    public class ActivityDto
    {
        public int ActivityId { get; set; }
        public string ActivityType { get; set; } = "";
        public string Description { get; set; } = "";
        public string Course { get; set; } = "";
        public string Timestamp { get; set; } = "";
        public string IconType { get; set; } = "";
    }
}
