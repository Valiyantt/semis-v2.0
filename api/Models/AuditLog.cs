using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class AuditLog
    {
        public int AuditLogId { get; set; }
        public string Action { get; set; } = "";
        public string PerformedBy { get; set; } = "";
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}