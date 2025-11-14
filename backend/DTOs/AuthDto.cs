
namespace backend.DTOs
{
    public class RegisterDto
    {
        public string Username { get; set; } = "";
        public string FullName { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class LoginDto
    {
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = "";
        public string FullName { get; set; } = "";
        public string Role { get; set; } = "";
    }
}