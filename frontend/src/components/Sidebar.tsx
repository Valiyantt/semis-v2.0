import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, BookOpen, BarChart2, Settings } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: "superadmin" | "faculty" | "student" | "registrar"; // extensible for later
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, role }) => {
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
      className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-slate-900/80 text-white backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0 rounded-r-2xl`}
    >
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <img src="/src/assets/avatar-placeholder.png" alt="avatar" className="w-12 h-12 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-sm">Zoeyshen</div>
          <div className="text-xs text-white/70">Administrator</div>
        </div>
      </div>

      <nav className="mt-4 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-white/10 transition ${
                    isActive ? "bg-white/10 font-semibold" : "text-white/90"
                  }`
                }
              >
                <span className="opacity-90">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <div className="text-xs text-white/70">© SEMIS</div>
      </div>
    </aside>
  );
};

export default Sidebar;
