using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Hubs
{
    public class MessagingHub : Hub
    {
        private readonly AppDbContext _context;
        private readonly ILogger<MessagingHub> _logger;

        // Track active users and their connection IDs
        private static Dictionary<string, string> UserConnections = new();

        public MessagingHub(AppDbContext context, ILogger<MessagingHub> logger)
        {
            _context = context;
            _logger = logger;
        }

        public override async Task OnConnectedAsync()
        {
            var username = Context.User?.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
            
            if (!string.IsNullOrEmpty(username))
            {
                UserConnections[username] = Context.ConnectionId;
                await Clients.All.SendAsync("UserOnline", username);
                _logger.LogInformation($"User {username} connected with ConnectionId: {Context.ConnectionId}");
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var username = Context.User?.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
            
            if (!string.IsNullOrEmpty(username) && UserConnections.ContainsKey(username))
            {
                UserConnections.Remove(username);
                await Clients.All.SendAsync("UserOffline", username);
                _logger.LogInformation($"User {username} disconnected");
            }

            await base.OnDisconnectedAsync(exception);
        }

        /// <summary>
        /// Send a direct message
        /// </summary>
        public async Task SendDirectMessage(string recipientUsername, string message)
        {
            try
            {
                var senderUsername = Context.User?.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                
                if (string.IsNullOrEmpty(senderUsername) || string.IsNullOrEmpty(message))
                    return;

                var sender = await _context.Users.FirstOrDefaultAsync(u => u.Username == senderUsername);
                var recipient = await _context.Users.FirstOrDefaultAsync(u => u.Username == recipientUsername);

                if (sender == null || recipient == null)
                    return;

                // Save to database
                var directMessage = new Models.DirectMessage
                {
                    SenderId = sender.Id,
                    ReceiverId = recipient.Id,
                    Content = message,
                    Timestamp = DateTime.UtcNow,
                    IsRead = false
                };

                _context.Add(directMessage);
                await _context.SaveChangesAsync();

                // Send to recipient if online
                if (UserConnections.TryGetValue(recipientUsername, out var connectionId))
                {
                    await Clients.Client(connectionId).SendAsync("ReceiveMessage", 
                        new 
                        { 
                            id = directMessage.Id,
                            sender = senderUsername,
                            senderName = sender.Username,
                            content = message,
                            timestamp = directMessage.Timestamp
                        });
                }

                // Send confirmation to sender
                await Clients.Caller.SendAsync("MessageSent", directMessage.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error sending message: {ex.Message}");
                await Clients.Caller.SendAsync("Error", "Failed to send message");
            }
        }

        /// <summary>
        /// Send a typing indicator
        /// </summary>
        public async Task SendTypingIndicator(string recipientUsername)
        {
            try
            {
                var senderUsername = Context.User?.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                
                if (UserConnections.TryGetValue(recipientUsername, out var connectionId))
                {
                    await Clients.Client(connectionId).SendAsync("UserTyping", senderUsername);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error sending typing indicator: {ex.Message}");
            }
        }

        /// <summary>
        /// Mark message as read
        /// </summary>
        public async Task MarkMessageAsRead(int messageId)
        {
            try
            {
                var message = await _context.Set<Models.DirectMessage>().FindAsync(messageId);
                if (message != null)
                {
                    message.IsRead = true;
                    await _context.SaveChangesAsync();

                    var sender = await _context.Users.FindAsync(message.SenderId);
                    if (sender != null && UserConnections.TryGetValue(sender.Username, out var connectionId))
                    {
                        await Clients.Client(connectionId).SendAsync("MessageRead", messageId);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error marking message as read: {ex.Message}");
            }
        }

        /// <summary>
        /// Broadcast system notification
        /// </summary>
        public async Task BroadcastNotification(string title, string message, string type = "info")
        {
            try
            {
                var userRole = Context.User?.FindFirst("http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value;
                
                // Only admins can broadcast notifications
                if (userRole != "Admin" && userRole != "SuperAdmin")
                    return;

                var notification = new Models.SystemNotification
                {
                    Type = type,
                    Title = title,
                    Message = message,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Add(notification);
                await _context.SaveChangesAsync();

                // Send to all connected clients
                await Clients.All.SendAsync("NotificationReceived", 
                    new 
                    { 
                        id = notification.Id,
                        type = type,
                        title = title,
                        message = message,
                        timestamp = notification.CreatedAt
                    });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error broadcasting notification: {ex.Message}");
            }
        }

        /// <summary>
        /// Get online users
        /// </summary>
        public async Task GetOnlineUsers()
        {
            await Clients.Caller.SendAsync("OnlineUsers", UserConnections.Keys.ToList());
        }
    }
}
