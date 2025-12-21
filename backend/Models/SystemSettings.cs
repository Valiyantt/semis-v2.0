namespace backend.Models
{
    public class SystemSettings
    {
        public int SettingId { get; set; }
        public string SchoolName { get; set; }
        public string SchoolEmail { get; set; }
        public string SchoolPhone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string LogoUrl { get; set; }
        public string AcademicYear { get; set; }
        public string Semester { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
