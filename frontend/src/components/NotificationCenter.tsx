import React, { useState } from "react";
import { Bell, X, AlertCircle, Info, CheckCircle, Clock } from "lucide-react";

interface Notification {
  id: string;
  type: "announcement" | "alert" | "info" | "success";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "announcement",
      title: "System Maintenance",
      message: "The system will be under maintenance on Dec 27 from 2-4 AM",
      timestamp: new Date(Date.now() - 600000),
      read: false,
    },
    {
      id: "2",
      type: "success",
      title: "Enrollment Approved",
      message: "Your enrollment for Spring 2025 has been approved",
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: "3",
      type: "alert",
      title: "Payment Due",
      message: "Your tuition payment is due in 5 days",
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
    {
      id: "4",
      type: "info",
      title: "Course Materials Updated",
      message: "Prof. Anderson has uploaded new course materials for Math 101",
      timestamp: new Date(Date.now() - 86400000),
      read: true,
    },
    {
      id: "5",
      type: "announcement",
      title: "Exam Schedule Released",
      message: "Final exam schedules are now available in your dashboard",
      timestamp: new Date(Date.now() - 172800000),
      read: true,
    },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "announcement":
        return <Bell className="w-5 h-5 text-blue-600" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "info":
        return <Info className="w-5 h-5 text-gray-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBgColor = (type: Notification["type"]) => {
    switch (type) {
      case "announcement":
        return "bg-blue-50";
      case "alert":
        return "bg-red-50";
      case "success":
        return "bg-green-50";
      case "info":
        return "bg-gray-50";
      default:
        return "bg-gray-50";
    }
  };

  const getLeftBorderColor = (type: Notification["type"]) => {
    switch (type) {
      case "announcement":
        return "border-l-blue-600";
      case "alert":
        return "border-l-red-600";
      case "success":
        return "border-l-green-600";
      case "info":
        return "border-l-gray-600";
      default:
        return "border-l-gray-600";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-80 right-6 w-14 h-14 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition flex items-center justify-center z-40 relative"
        title="Notifications"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-96 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">Notifications</h3>
          <p className="text-xs text-orange-100">{unreadCount} unread</p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/20 rounded transition"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 border-l-4 cursor-pointer transition ${getBgColor(notif.type)} ${getLeftBorderColor(notif.type)} ${
                  !notif.read ? "bg-opacity-100" : "bg-opacity-50"
                } hover:bg-opacity-75`}
                onClick={() => {
                  handleMarkAsRead(notif.id);
                  setExpandedId(expandedId === notif.id ? null : notif.id);
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p
                        className={`text-sm font-semibold ${
                          !notif.read ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></span>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 mt-1">
                      {formatTime(notif.timestamp)}
                    </p>

                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                      {notif.message}
                    </p>

                    {expandedId === notif.id && (
                      <div className="mt-3 pt-3 border-t border-gray-300">
                        <p className="text-sm text-gray-700 mb-3">
                          {notif.message}
                        </p>
                        <div className="flex gap-2">
                          {notif.link && (
                            <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                              View Details
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(notif.id);
                            }}
                            className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-2xl text-center">
        <button className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
          View all notifications →
        </button>
      </div>
    </div>
  );
};

export default NotificationCenter;
