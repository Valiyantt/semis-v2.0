import React from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-[#800000] text-white shadow-md h-16 flex items-center px-6">
      <button
        onClick={onToggleSidebar}
        className="mr-4 p-2 hover:bg-[#660000] rounded-md transition"
      >
        <Menu size={22} />
      </button>
      <h1 className="text-2xl font-bold tracking-wide">SEMIS</h1>
    </header>
  );
};

export default Header;
