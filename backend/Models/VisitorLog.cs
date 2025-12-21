namespace backend.Models
{
    public class VisitorLog
    {
        public int VisitorLogId { get; set; }
        public string VisitorName { get; set; }
        public string VisitorEmail { get; set; }
        public string VisitorPhone { get; set; }
        public string PurposeOfVisit { get; set; }
        public string HostName { get; set; }
        public DateTime CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }
        public string Status { get; set; }
    }
}
