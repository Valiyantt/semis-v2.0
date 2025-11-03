using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Department
    {
        public int DepartmentId { get; set; }
        public string Name { get; set; } = "";
        public string? Head { get; set; }
    }
}