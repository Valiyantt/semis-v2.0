namespace backend.Models
{
    public class AccessLog
    {
        public int AccessLogId { get; set; }
        public int UserId { get; set; }
        public string Location { get; set; }
        public string Purpose { get; set; }
        public DateTime AccessTime { get; set; }
        public string Status { get; set; }
        public string Notes { get; set; }

        // Navigation
        public AppUser User { get; set; }
    }
}
