using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class AppUser
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = "";

        public string FullName { get; set; } = "";

        [Required]
        public string PasswordHash { get; set; } = "";

        // Foreign Key to Role
        [ForeignKey("Role")]
        public int RoleId { get; set; }

        // Navigation property
        public Role? Role { get; set; }
    }
}
