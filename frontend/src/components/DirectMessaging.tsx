import React, { useState, useRef, useEffect } from "react";
import { Send, X, Phone, Video, MoreVertical } from "lucide-react";

interface DirectMessage {
  id: string;
  sender: string;
  senderName: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participant: string;
  participantName: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  avatar?: string;
}

interface MessagingProps {
  currentUsername: string;
  currentUserRole?: string;
}

const DirectMessaging: React.FC<MessagingProps> = ({ currentUsername }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      participant: "prof_anderson",
      participantName: "Prof. Dr. Anderson",
      lastMessage: "Please submit your assignment by Friday",
      timestamp: new Date(Date.now() - 600000),
      unreadCount: 2,
    },
    {
      id: "2",
      participant: "admin",
      participantName: "Admin Support",
      lastMessage: "Your enrollment has been approved",
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 0,
    },
  ]);

  const [messages, setMessages] = useState<DirectMessage[]>([
    {
      id: "1",
      sender: "prof_anderson",
      senderName: "Prof. Dr. Anderson",
      content: "Please submit your assignment by Friday",
      timestamp: new Date(Date.now() - 600000),
      read: true,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !selectedConversation) return;

    const newMessage: DirectMessage = {
      id: Date.now().toString(),
      sender: currentUsername,
      senderName: "You",
      content: inputValue,
      timestamp: new Date(),
      read: true,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    // Mark as read
    setConversations(
      conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) {
    const unreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center z-40 relative"
        title="Direct Messages"
      >
        💬
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-24 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">Direct Messages</h3>
          <p className="text-xs text-blue-100">
            {conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)} unread
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 hover:bg-white/20 rounded transition"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div
          className={`w-full md:w-60 border-r border-gray-200 flex flex-col overflow-hidden ${
            selectedConversation ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                  selectedConversation === conv.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800 truncate">
                      {conv.participantName}
                    </p>
                    <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col hidden md:flex">
            {/* Chat Header */}
            <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">
                {conversations.find((c) => c.id === selectedConversation)?.participantName}
              </h4>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-200 rounded transition">
                  <Phone size={16} />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded transition">
                  <Video size={16} />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded transition">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === currentUsername ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === currentUsername
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === currentUsername
                          ? "text-blue-100"
                          : "text-gray-600"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 hidden md:flex items-center justify-center text-gray-500">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectMessaging;
