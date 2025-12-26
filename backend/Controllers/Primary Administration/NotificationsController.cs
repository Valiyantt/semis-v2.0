using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using System;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("backend/notifications")]
    [Authorize]
    public class NotificationsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<NotificationsController> _logger;

        public NotificationsController(AppDbContext context, ILogger<NotificationsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get all notifications for the current user
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetNotifications()
        {
            try
            {
                var username = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

                if (user == null)
                    return Unauthorized();

                // Mock notifications - replace with actual database queries
                var notifications = new object[]
                {
                    new
                    {
                        id = 1,
                        type = "announcement",
                        title = "System Maintenance",
                        message = "The system will be under maintenance on Dec 27 from 2-4 AM",
                        timestamp = DateTime.UtcNow.AddMinutes(-10),
                        read = false,
                        link = "/announcements/1"
                    },
                    new
                    {
                        id = 2,
                        type = "success",
                        title = "Enrollment Approved",
                        message = "Your enrollment for Spring 2025 has been approved",
                        timestamp = DateTime.UtcNow.AddHours(-1),
                        read = false,
                        link = "/dashboard"
                    },
                    new
                    {
                        id = 3,
                        type = "alert",
                        title = "Payment Due",
                        message = "Your tuition payment is due in 5 days",
                        timestamp = DateTime.UtcNow.AddHours(-2),
                        read = true,
                        link = "/billing"
                    }
                };

                return Ok(notifications);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching notifications: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        /// <summary>
        /// Mark a notification as read
        /// </summary>
        [HttpPost("{notificationId}/read")]
        public async Task<IActionResult> MarkAsRead(int notificationId)
        {
            try
            {
                return Ok(new { message = "Notification marked as read" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error marking notification as read: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        /// <summary>
        /// Mark all notifications as read
        /// </summary>
        [HttpPost("mark-all-read")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            try
            {
                var username = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

                if (user == null)
                    return Unauthorized();

                return Ok(new { message = "All notifications marked as read" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error marking all notifications as read: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        /// <summary>
        /// Delete a notification
        /// </summary>
        [HttpDelete("{notificationId}")]
        public async Task<IActionResult> DeleteNotification(int notificationId)
        {
            try
            {
                return Ok(new { message = "Notification deleted" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting notification: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        /// <summary>
        /// Get unread notification count
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

        /// <summary>
        /// Create a system notification (admin only)
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> CreateNotification([FromBody] CreateNotificationRequest request)
        {
            try
            {
                var notification = new
                {
                    id = new Random().Next(),
                    type = request.Type,
                    title = request.Title,
                    message = request.Message,
                    timestamp = DateTime.UtcNow,
                    read = false
                };

                return Ok(notification);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating notification: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
    }

    public class CreateNotificationRequest
    {
        public string Type { get; set; } // announcement, alert, info, success
        public string Title { get; set; }
        public string Message { get; set; }
        public int[] UserIds { get; set; } // Recipients
    }
}
