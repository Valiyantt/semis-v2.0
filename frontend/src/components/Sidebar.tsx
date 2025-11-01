import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: "superadmin" | "faculty" | "student" | "registrar"; // extensible for later
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, role }) => {
  // Define navigation items based on role
  const navItems =
    role === "superadmin"
      ? [
          { name: "Dashboard", path: "/superadmin/dashboard" },
          { name: "Students", path: "/superadmin/students" },
          { name: "Faculty", path: "/superadmin/faculty" },
          { name: "Reports", path: "/superadmin/reports" },
          { name: "Settings", path: "/superadmin/settings" },
        ]
      : [];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      <nav className="mt-6 px-4">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 ${
                    isActive ? "text-[#800000] font-semibold" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
