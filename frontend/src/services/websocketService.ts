import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;
const handlers: { [key: string]: (data: any) => void } = {};

export const websocketService = {
  // Initialize WebSocket connection
  initialize: async (token: string) => {
    try {
      connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5157/messagingHub", {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect([0, 0, 0, 5000, 10000, 30000])
        .build();

      // Register event handlers
      connection.on("ReceiveMessage", (message) => {
        if (handlers["message"]) {
          handlers["message"](message);
        }
      });

      connection.on("MessageSent", (messageId) => {
        if (handlers["messageSent"]) {
          handlers["messageSent"](messageId);
        }
      });

      connection.on("MessageRead", (messageId) => {
        if (handlers["messageRead"]) {
          handlers["messageRead"](messageId);
        }
      });

      connection.on("UserOnline", (username) => {
        if (handlers["userOnline"]) {
          handlers["userOnline"](username);
        }
      });

      connection.on("UserOffline", (username) => {
        if (handlers["userOffline"]) {
          handlers["userOffline"](username);
        }
      });

      connection.on("UserTyping", (username) => {
        if (handlers["userTyping"]) {
          handlers["userTyping"](username);
        }
      });

      connection.on("NotificationReceived", (notification) => {
        if (handlers["notification"]) {
          handlers["notification"](notification);
        }
      });

      connection.on("OnlineUsers", (users) => {
        if (handlers["onlineUsers"]) {
          handlers["onlineUsers"](users);
        }
      });

      connection.on("Error", (error) => {
        console.error("SignalR Error:", error);
        if (handlers["error"]) {
          handlers["error"](error);
        }
      });

      await connection.start();
      console.log("WebSocket connected");
    } catch (error) {
      console.error("Failed to connect to WebSocket:", error);
      throw error;
    }
  },

  // Send direct message
  sendDirectMessage: async (recipientUsername: string, message: string) => {
    if (connection?.state === signalR.HubConnectionState.Connected) {
      await connection.invoke("SendDirectMessage", recipientUsername, message);
    }
  },

  // Send typing indicator
  sendTypingIndicator: async (recipientUsername: string) => {
    if (connection?.state === signalR.HubConnectionState.Connected) {
      await connection.invoke("SendTypingIndicator", recipientUsername);
    }
  },

  // Mark message as read
  markMessageAsRead: async (messageId: number) => {
    if (connection?.state === signalR.HubConnectionState.Connected) {
      await connection.invoke("MarkMessageAsRead", messageId);
    }
  },

  // Broadcast notification (admin only)
  broadcastNotification: async (
    title: string,
    message: string,
    type: string = "info"
  ) => {
    if (connection?.state === signalR.HubConnectionState.Connected) {
      await connection.invoke("BroadcastNotification", title, message, type);
    }
  },

  // Get online users
  getOnlineUsers: async () => {
    if (connection?.state === signalR.HubConnectionState.Connected) {
      await connection.invoke("GetOnlineUsers");
    }
  },

  // Register event handler
  on: (event: string, handler: (data: any) => void) => {
    handlers[event] = handler;
  },

  // Unregister event handler
  off: (event: string) => {
    delete handlers[event];
  },

  // Check connection status
  isConnected: () => {
    return connection?.state === signalR.HubConnectionState.Connected;
  },

  // Disconnect
  disconnect: async () => {
    if (connection) {
      await connection.stop();
      connection = null;
      console.log("WebSocket disconnected");
    }
  },
};
