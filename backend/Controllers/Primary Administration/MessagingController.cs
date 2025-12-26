using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("backend/messaging")]
    [Authorize]
    public class MessagingController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<MessagingController> _logger;

        public MessagingController(AppDbContext context, ILogger<MessagingController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get all conversations for the current user
        /// </summary>
        [HttpGet("conversations")]
        public async Task<IActionResult> GetConversations()
        {
            try
            {
                var username = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

                if (user == null)
                    return Unauthorized();

                // Mock conversations - replace with actual database queries
                var conversations = new object[]
                {
                    new
                    {
                        participantId = 2,
                        participantName = "Prof. Dr. Anderson",
                        lastMessage = "Please submit your assignment by Friday",
                        lastMessageTime = DateTime.UtcNow.AddMinutes(-10),
                        unreadCount = 2
                    },
                    new
                    {
                        participantId = 3,
                        participantName = "Admin Support",
                        lastMessage = "Your enrollment has been approved",
                        lastMessageTime = DateTime.UtcNow.AddHours(-1),
                        unreadCount = 0
                    }
                };

                return Ok(conversations);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching conversations: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        /// <summary>
        /// Get messages with a specific user
        /// </summary>
        [HttpGet("messages/{participantId}")]
        public async Task<IActionResult> GetMessages(int participantId)
        {
            try
            {
                var username = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

                if (user == null)
                    return Unauthorized();

                // Mock messages - replace with actual database queries
                var messages = new object[]
                {
                    new
                    {
                        id = 1,
                        senderId = participantId,
                        senderName = "Prof. Dr. Anderson",
                        receiverId = user.Id,
                        content = "Please submit your assignment by Friday",
                        timestamp = DateTime.UtcNow.AddMinutes(-10),
                        read = true
                    },
                    new
                    {
                        id = 2,
                        senderId = user.Id,
                        senderName = "You",
                        receiverId = participantId,
                        content = "Thanks for the reminder!",
                        timestamp = DateTime.UtcNow.AddMinutes(-5),
                        read = true
                    }
                };

                return Ok(messages);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching messages: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        /// <summary>
        /// Send a direct message
        /// </summary>
        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Content))
                    return BadRequest(new { message = "Message content is required" });

                var username = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                var sender = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

                if (sender == null)
                    return Unauthorized();

                var receiver = await _context.Users.FindAsync(request.ReceiverId);
                if (receiver == null)
                    return NotFound(new { message = "Recipient not found" });

                var message = new
                {
                    id = new Random().Next(),
                    senderId = sender.Id,
                    senderName = sender.Username,
                    receiverId = receiver.Id,
                    content = request.Content,
                    timestamp = DateTime.UtcNow,
                    read = false
                };

                return Ok(message);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error sending message: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        /// <summary>
        /// Mark messages as read
        /// </summary>
        [HttpPost("mark-read/{participantId}")]
        public async Task<IActionResult> MarkAsRead(int participantId)
        {
            try
            {
                return Ok(new { message = "Messages marked as read" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error marking messages as read: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        /// <summary>
        /// Search for users to message
        /// </summary>
        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string q)
        {
            try
            {
                if (string.IsNullOrEmpty(q))
                    return Ok(new object[] { });

                // Mock search - replace with actual database queries
                var users = new object[]
                {
                    new { id = 2, name = "Prof. Dr. Anderson", role = "Faculty" },
                    new { id = 3, name = "Admin Support", role = "Admin" }
                };

                var results = users.Where(u => u.name.Contains(q, StringComparison.OrdinalIgnoreCase)).ToArray();
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error searching users: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        /// <summary>
        /// Get unread message count
        /// </summary>
        [HttpGet("unread-count")]
        public async Task<IActionResult> GetUnreadCount()
        {
            try
            {
                return Ok(new { count = 2 });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching unread count: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
    }

    public class SendMessageRequest
    {
        public int ReceiverId { get; set; }
        public string Content { get; set; }
    }
}
