using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; } = "";
        public string? Description { get; set; }
        public ICollection<AppUser>? Users { get; set; }

    }
}