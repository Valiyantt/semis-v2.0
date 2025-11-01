import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import SuperAdminStudents from "./pages/superadmin/SuperAdminStudents";
import SuperAdminFaculty from "./pages/superadmin/SuperAdminFaculty";
import SuperAdminReports from "./pages/superadmin/SuperAdminReports";
import SuperAdminSettings from "./pages/superadmin/SuperAdminSettings";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// Protect private routes
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  return isAuthenticated ? element : <Navigate to="/" />;
};

// Common layout wrapper for SuperAdmin pages
const SuperAdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50 font-[Corbel]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} role="superadmin" />

      {/* Main layout */}
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="mt-16 md:ml-64 p-8 transition-all duration-300">{children}</main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Login />} />

      {/* Super Admin Protected Routes */}
      <Route
        path="/superadmin/dashboard"
        element={
          <PrivateRoute element={<SuperAdminLayout><SuperAdminDashboard /></SuperAdminLayout>} />
        }
      />
      <Route
        path="/superadmin/students"
        element={
          <PrivateRoute element={<SuperAdminLayout><SuperAdminStudents /></SuperAdminLayout>} />
        }
      />
      <Route
        path="/superadmin/faculty"
        element={
          <PrivateRoute element={<SuperAdminLayout><SuperAdminFaculty /></SuperAdminLayout>} />
        }
      />
      <Route
        path="/superadmin/reports"
        element={
          <PrivateRoute element={<SuperAdminLayout><SuperAdminReports /></SuperAdminLayout>} />
        }
      />
      <Route
        path="/superadmin/settings"
        element={
          <PrivateRoute element={<SuperAdminLayout><SuperAdminSettings /></SuperAdminLayout>} />
        }
      />
    </Routes>
  );
}

export default App;
