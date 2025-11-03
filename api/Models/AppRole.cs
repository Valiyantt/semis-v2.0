using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Role
    {
        [Key]
        public int RoleId { get; set; }
        [Required]
        public string RoleName { get; set; } = "";
        public string? Description { get; set; }
        public ICollection<AppUser>? Users { get; set; }

    }
}