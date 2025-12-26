using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("backend/chat")]
    [Authorize]
    public class ChatController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ChatController> _logger;

        public ChatController(AppDbContext context, ILogger<ChatController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Create a new chat conversation (support ticket)
        /// </summary>
        [HttpPost("conversations")]
        public async Task<IActionResult> CreateConversation([FromBody] CreateConversationRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Subject))
                    return BadRequest(new { message = "Subject is required" });

                var username = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

                if (user == null)
                    return Unauthorized();

                // Create conversation record (you'll need to create a ChatConversation model)
                var conversation = new
                {
                    UserId = user.Id,
                    Subject = request.Subject,
                    Status = "open",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                return Ok(new { message = "Conversation created successfully", conversation });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating conversation: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        /// <summary>
        /// Get user's conversations
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

                // Return mock data for now - replace with actual database queries
                var conversations = new object[]
                {
                    new
                    {
                        id = 1,
                        userId = user.Id,
                        subject = "Course Registration Help",
                        status = "open",
                        createdAt = DateTime.UtcNow,
                        updatedAt = DateTime.UtcNow
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
        /// Send a message in a conversation
        /// </summary>
        [HttpPost("conversations/{conversationId}/messages")]
        public async Task<IActionResult> SendMessage(int conversationId, [FromBody] SendMessageRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Content))
                    return BadRequest(new { message = "Message content is required" });

                var username = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

                if (user == null)
                    return Unauthorized();

                var message = new
                {
                    id = new Random().Next(),
                    conversationId = conversationId,
                    sender = user.Username,
                    content = request.Content,
                    timestamp = DateTime.UtcNow
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
        /// Get messages in a conversation
        /// </summary>
        [HttpGet("conversations/{conversationId}/messages")]
        public async Task<IActionResult> GetMessages(int conversationId)
        {
            try
            {
                var username = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

                if (user == null)
                    return Unauthorized();

                // Return mock messages for now
                var messages = new object[]
                {
                    new
                    {
                        id = 1,
                        conversationId = conversationId,
                        sender = "support",
                        content = "Hello! How can we assist you?",
                        timestamp = DateTime.UtcNow.AddMinutes(-5)
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
        /// Close a conversation
        /// </summary>
        [HttpPost("conversations/{conversationId}/close")]
        public async Task<IActionResult> CloseConversation(int conversationId)
        {
            try
            {
                var username = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

                if (user == null)
                    return Unauthorized();

                return Ok(new { message = "Conversation closed successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error closing conversation: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        /// <summary>
        /// Get conversation status
        /// </summary>
        [HttpGet("conversations/{conversationId}/status")]
        public async Task<IActionResult> GetStatus(int conversationId)
        {
            try
            {
                var status = new
                {
                    conversationId = conversationId,
                    status = "open",
                    lastUpdate = DateTime.UtcNow,
                    assignedAgent = "Support Team"
                };

                return Ok(status);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching status: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
    }

    public class CreateConversationRequest
    {
        public string Subject { get; set; }
    }

    public class SendMessageRequest
    {
        public string Content { get; set; }
    }
}
