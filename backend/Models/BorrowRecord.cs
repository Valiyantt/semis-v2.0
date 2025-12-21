namespace backend.Models
{
    public class BorrowRecord
    {
        public int BorrowId { get; set; }
        public int BookId { get; set; }
        public int StudentId { get; set; }
        public DateTime BorrowDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public decimal Fine { get; set; }
        public string Status { get; set; }

        // Navigation
        public Book Book { get; set; }
        public Student Student { get; set; }
    }
}
