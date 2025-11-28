import React from "react";
import { Menu, Bell, User } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#800000]/20 flex items-center justify-center">
            <User size={20} className="text-[#800000]" />
          </div>
          <div className="text-sm">
            <div className="font-semibold">Administrator</div>
            <div className="text-xs text-gray-500">SuperAdmin</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
