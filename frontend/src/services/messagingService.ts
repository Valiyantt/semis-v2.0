import api from './api';

export interface DirectMessage {
  id: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface MessageConversation {
  participantId: number;
  participantName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const messagingService = {
  // Get all conversations for current user
  getConversations: async (): Promise<MessageConversation[]> => {
    try {
      const response = await api.get('messaging/conversations');
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  // Get messages with a specific user
  getMessages: async (participantId: number): Promise<DirectMessage[]> => {
    try {
      const response = await api.get(`messaging/messages/${participantId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Send a direct message
  sendMessage: async (
    receiverId: number,
    content: string
  ): Promise<DirectMessage> => {
    try {
      const response = await api.post('messaging/send', {
        receiverId,
        content,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Mark messages as read
  markAsRead: async (participantId: number): Promise<void> => {
    try {
      await api.post(`messaging/mark-read/${participantId}`);
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  },

  // Search users to message
  searchUsers: async (query: string): Promise<any[]> => {
    try {
      const response = await api.get(`messaging/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  // Get unread message count
  getUnreadCount: async (): Promise<number> => {
    try {
      const response = await api.get('messaging/unread-count');
      return response.data.count;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  },
};

export const notificationService = {
  // Get all notifications
  getNotifications: async (): Promise<any[]> => {
    try {
      const response = await api.get('notifications');
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId: number): Promise<void> => {
    try {
      await api.post(`notifications/${notificationId}/read`);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Mark all as read
  markAllAsRead: async (): Promise<void> => {
    try {
      await api.post('notifications/mark-all-read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  // Delete notification
  deleteNotification: async (notificationId: number): Promise<void> => {
    try {
      await api.delete(`notifications/${notificationId}`);
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  // Get unread count
  getUnreadCount: async (): Promise<number> => {
    try {
      const response = await api.get('notifications/unread-count');
      return response.data.count;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  },

  // Subscribe to notifications (WebSocket support)
  subscribe: async (callback: (notification: any) => void): Promise<void> => {
    try {
      // This would be implemented with WebSocket in production
      // For now, polling can be used
      setInterval(async () => {
        const notifications = await notificationService.getNotifications();
        if (notifications.length > 0) {
          callback(notifications[0]);
        }
      }, 5000);
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      throw error;
    }
  },
};
