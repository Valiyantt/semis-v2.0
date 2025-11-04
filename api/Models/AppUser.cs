using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class AppUser
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = "";

        public string FullName { get; set; } = "";

        [Required]
        public string PasswordHash { get; set; } = "";

        [EmailAddress]
        public string Email { get; set; } = "";

        public bool IsActive { get; set; } = true;

        public DateTime DateCreated { get; set; } = DateTime.Now;

        // Foreign Key to Role
        [ForeignKey("AppRole")]
        public int RoleId { get; set; }

        // Navigation property
        public AppRole? Role { get; set; }
    }
}
