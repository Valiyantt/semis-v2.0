import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      <nav className="mt-6 px-4">
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 ${
                  isActive ? "text-[#800000]" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/students"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 ${
                  isActive ? "text-[#800000]" : ""
                }`
              }
            >
              Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faculty"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 ${
                  isActive ? "text-[#800000]" : ""
                }`
              }
            >
              Faculty
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 ${
                  isActive ? "text-[#800000]" : ""
                }`
              }
            >
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 ${
                  isActive ? "text-[#800000]" : ""
                }`
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
