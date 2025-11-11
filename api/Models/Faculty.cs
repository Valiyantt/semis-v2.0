// Models/Faculty.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Faculty
    {
        [Key]
        public int FacultyId { get; set; }

        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public string Role { get; set; } = "Faculty";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
