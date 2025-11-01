import React from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => (
  <header className="bg-[#800000] text-white shadow-lg px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-3">
      <button onClick={onToggleSidebar} className="md:hidden">
        <Menu size={24} />
      </button>
      <h1 className="text-2xl font-semibold tracking-wide">SEMIS</h1>
    </div>
    <nav className="hidden md:flex space-x-6 text-sm font-medium">
      <a href="/" className="hover:text-gray-200 transition">Dashboard</a>
      <a href="/students" className="hover:text-gray-200 transition">Students</a>
      <a href="/faculty" className="hover:text-gray-200 transition">Faculty</a>
      <a href="/reports" className="hover:text-gray-200 transition">Reports</a>
      <a href="/settings" className="hover:text-gray-200 transition">Settings</a>
    </nav>
  </header>
);

export default Header;
