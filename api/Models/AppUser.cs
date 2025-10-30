using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class AppUser
    {
        public int Id { get; set; }
        [Required] public string Username { get; set; } = "";
        public string FullName { get; set; } = "";
        [Required] public string PasswordHash { get; set; } = "";
        public string Role { get; set; } = "User";
    }
}