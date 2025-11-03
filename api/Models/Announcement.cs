namespace api.Models
{
    public class Announcement
    {
        public int AnnouncementId { get; set; }
        public string Title { get; set; } = "";
        public string Message { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;
    }
}