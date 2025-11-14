using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class ProgramEntry
    {
        public int Id { get; set; }
        [Required] public string Title { get; set; } = "";
        public string Department { get; set; } = "";
        public string Description { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
