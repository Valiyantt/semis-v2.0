namespace backend.Models
{
    public class AuditLog
    {
        public int AuditLogId { get; set; }
        public string Action { get; set; } = "";
        public string PerformedBy { get; set; } = "";
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}