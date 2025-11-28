import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, BookOpen, BarChart2, Settings, ChevronRight, User } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: "superadmin" | "faculty" | "student" | "registrar"; // extensible for later
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, role }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const navItems =
    role === "superadmin"
      ? [
          { name: "Dashboard", path: "/superadmin/dashboard", icon: <Home size={16} /> },
          { name: "Students", path: "/superadmin/students", icon: <Users size={16} /> },
          { name: "Faculty", path: "/superadmin/faculty", icon: <BookOpen size={16} /> },
          { name: "Reports", path: "/superadmin/reports", icon: <BarChart2 size={16} /> },
          { name: "Settings", path: "/superadmin/settings", icon: <Settings size={16} /> },
          { name: "SuperAdmins", path: "/superadmin/superadmins", icon: <Users size={16} /> },
        ]
      : [];

  return (
    <aside
      onMouseEnter={() => setSidebarCollapsed(false)}
      onMouseLeave={() => setSidebarCollapsed(true)}
      className={`fixed top-16 left-0 h-[calc(100%-4rem)] bg-[#800000] text-white backdrop-blur-md shadow-lg transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 rounded-r-2xl ${
        sidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <User size={24} className="text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0">
            <div className="font-semibold text-sm truncate">Zoeyshen</div>
            <div className="text-xs text-white/70 truncate">Administrator</div>
          </div>
        )}
      </div>

      <nav className="mt-4 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-white/10 transition whitespace-nowrap font-bold text-white ${
                    isActive ? "bg-white/20" : ""
                  }`
                }
              >
                <span className="opacity-90 flex-shrink-0">{item.icon}</span>
                {!sidebarCollapsed && <span className="flex-1">{item.name}</span>}
                {!sidebarCollapsed && <ChevronRight size={14} className="ml-auto" />}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {!sidebarCollapsed && (
        <div className="absolute bottom-6 left-4 right-4">
          <div className="text-xs text-white/70">© SEMIS</div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
