using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class ChatConversation
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public string Subject { get; set; }
        public string Status { get; set; } // open, closed, pending
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<ChatMessage> Messages { get; set; } = new();
    }

    public class ChatMessage
    {
        public int Id { get; set; }
        public int ConversationId { get; set; }
        public ChatConversation Conversation { get; set; }
        public int SenderId { get; set; }
        public AppUser Sender { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public bool IsRead { get; set; } = false;
    }

    public class DirectMessage
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public AppUser Sender { get; set; }
        public int ReceiverId { get; set; }
        public AppUser Receiver { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public bool IsRead { get; set; } = false;
        public bool IsDeleted { get; set; } = false;
    }

    public class SystemNotification
    {
        public int Id { get; set; }
        public string Type { get; set; } // announcement, alert, info, success
        public string Title { get; set; }
        public string Message { get; set; }
        public string Link { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<UserNotification> UserNotifications { get; set; } = new();
    }

    public class UserNotification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public int NotificationId { get; set; }
        public SystemNotification Notification { get; set; }
        public bool IsRead { get; set; } = false;
        public bool IsDeleted { get; set; } = false;
        public DateTime ReadAt { get; set; }
    }

    public class DeviceToken
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public string Token { get; set; }
        public string DeviceType { get; set; } // web, ios, android
        public string DeviceName { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime LastUsedAt { get; set; }
    }
}
