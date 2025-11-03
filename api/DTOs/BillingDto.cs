namespace api.DTOs
{
    public class BillingDto
    {
        public int Id { get; set; }
        public string AccountName { get; set; } = "";
        public decimal Amount { get; set; }
        public string Details { get; set; } = "";
        public DateTime DueDate { get; set; }
    }
}