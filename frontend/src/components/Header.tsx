import React, { useState } from "react";
import { Menu, Bell, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const currentUser = (() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  })();

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white/60 backdrop-blur-sm text-gray-800 h-16 flex items-center px-6 border-b border-white/30">
      <button
        onClick={onToggleSidebar}
        className="mr-4 p-2 hover:bg-gray-100 rounded-md transition"
        aria-label="Toggle sidebar"
      >
        <Menu size={22} />
      </button>

      <div className="flex-1">
        <h1 className="text-lg font-semibold tracking-wide text-[#800000]">SEMIS</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-gray-100">
          <Bell size={18} />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-md transition cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#800000]/20 flex items-center justify-center">
              <User size={20} className="text-[#800000]" />
            </div>
            <div className="text-sm">
              <div className="font-semibold">{currentUser?.username || "User"}</div>
              <div className="text-xs text-gray-500">{currentUser?.role || "Unknown"}</div>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="text-sm font-semibold text-gray-700">{currentUser?.username || "User"}</div>
                <div className="text-xs text-gray-500">{currentUser?.role || "Unknown"}</div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
