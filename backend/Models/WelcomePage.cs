using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class WelcomePage
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime UpdatedAt { get; set; }
    }
}
