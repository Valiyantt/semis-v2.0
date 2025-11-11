namespace backend.Models
{
    public class Department
    {
        public int DepartmentId { get; set; }
        public string Name { get; set; } = "";
        public string? Head { get; set; }
    }
}