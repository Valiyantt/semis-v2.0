namespace backend.Models
{
    public class IncidentReport
    {
        public int IncidentId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string IncidentType { get; set; }
        public DateTime ReportDate { get; set; }
        public string ReportedBy { get; set; }
        public string Status { get; set; }
        public string Severity { get; set; }
        public string ResolutionNotes { get; set; }
        public DateTime? ResolvedDate { get; set; }
    }
}
