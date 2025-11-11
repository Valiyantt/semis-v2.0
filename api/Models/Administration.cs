// Models/Administration.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Administration
    {
        [Key]
        public int AdminId { get; set; }

        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public string Role { get; set; } = "Administration";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
