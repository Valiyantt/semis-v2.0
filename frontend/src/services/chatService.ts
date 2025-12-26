import api from './api';

export interface ChatMessage {
  id?: number;
  sender: string; // username or 'system'
  content: string;
  timestamp?: string;
  conversationId?: number;
}

export interface ChatConversation {
  id: number;
  userId: number;
  subject: string;
  status: 'open' | 'closed' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export const chatService = {
  // Create a new chat conversation
  createConversation: async (subject: string): Promise<ChatConversation> => {
    try {
      const response = await api.post('chat/conversations', { subject });
      return response.data;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  },

  // Get user's conversations
  getConversations: async (): Promise<ChatConversation[]> => {
    try {
      const response = await api.get('chat/conversations');
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  // Get messages in a conversation
  getMessages: async (conversationId: number): Promise<ChatMessage[]> => {
    try {
      const response = await api.get(`chat/conversations/${conversationId}/messages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Send a message
  sendMessage: async (
    conversationId: number,
    content: string
  ): Promise<ChatMessage> => {
    try {
      const response = await api.post(
        `chat/conversations/${conversationId}/messages`,
        { content }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Close a conversation
  closeConversation: async (conversationId: number): Promise<void> => {
    try {
      await api.post(`chat/conversations/${conversationId}/close`);
    } catch (error) {
      console.error('Error closing conversation:', error);
      throw error;
    }
  },

  // Get support ticket status
  getTicketStatus: async (conversationId: number): Promise<any> => {
    try {
      const response = await api.get(`chat/conversations/${conversationId}/status`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket status:', error);
      throw error;
    }
  },
};
