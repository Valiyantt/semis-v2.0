using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class BillingStatement
    {
        public int Id { get; set; }
        [Required] public string AccountName { get; set; } = "";
        public decimal Amount { get; set; }
        public string Details { get; set; } = "";
        public DateTime DueDate { get; set; } = DateTime.UtcNow;
    }
}