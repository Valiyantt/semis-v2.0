import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => (
  <aside
    className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white shadow-lg border-r transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } md:translate-x-0 transition-transform duration-300 ease-in-out`}
  >
    <div className="p-6 space-y-4">
      <h2 className="font-semibold text-[#800000] text-lg">Navigation</h2>
      <ul className="space-y-3 text-gray-700">
        <li><Link to="/" onClick={onClose} className="hover:text-[#800000]">Dashboard</Link></li>
        <li><Link to="/students" onClick={onClose} className="hover:text-[#800000]">Students</Link></li>
        <li><Link to="/faculty" onClick={onClose} className="hover:text-[#800000]">Faculty</Link></li>
        <li><Link to="/reports" onClick={onClose} className="hover:text-[#800000]">Reports</Link></li>
        <li><Link to="/settings" onClick={onClose} className="hover:text-[#800000]">Settings</Link></li>
      </ul>
    </div>
  </aside>
);

export default Sidebar;
