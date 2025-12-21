namespace backend.Models
{
    public class SecurityAlert
    {
        public int AlertId { get; set; }
        public string AlertType { get; set; }
        public string Message { get; set; }
        public string Location { get; set; }
        public DateTime AlertDate { get; set; }
        public string AlertLevel { get; set; }
        public bool IsResolved { get; set; }
        public string ResolutionNotes { get; set; }
        public DateTime? ResolvedDate { get; set; }
    }
}
