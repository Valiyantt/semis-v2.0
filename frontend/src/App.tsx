import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Students from "./pages/Students";
import Faculty from "./pages/Faculty";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

// Protect private routes
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute
            element={
              <div className="flex min-h-screen bg-gray-50 font-[Corbel]">
                {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main layout area */}
                <div className="flex-1 flex flex-col">
                  <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                  {/* Main content area */}
                  <main className="mt-16 md:ml-64 p-8 transition-all duration-300">
                    <Dashboard />
                  </main>
                </div>
              </div>
            }
          />
        }
      />

      <Route
        path="/students"
        element={
          <PrivateRoute
            element={
              <div className="flex min-h-screen bg-gray-50 font-[Corbel]">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex-1 flex flex-col">
                  <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                  <main className="mt-16 md:ml-64 p-8 transition-all duration-300">
                    <Students />
                  </main>
                </div>
              </div>
            }
          />
        }
      />

      <Route
        path="/faculty"
        element={
          <PrivateRoute
            element={
              <div className="flex min-h-screen bg-gray-50 font-[Corbel]">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex-1 flex flex-col">
                  <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                  <main className="mt-16 md:ml-64 p-8 transition-all duration-300">
                    <Faculty />
                  </main>
                </div>
              </div>
            }
          />
        }
      />

      <Route
        path="/reports"
        element={
          <PrivateRoute
            element={
              <div className="flex min-h-screen bg-gray-50 font-[Corbel]">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex-1 flex flex-col">
                  <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                  <main className="mt-16 md:ml-64 p-8 transition-all duration-300">
                    <Reports />
                  </main>
                </div>
              </div>
            }
          />
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute
            element={
              <div className="flex min-h-screen bg-gray-50 font-[Corbel]">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex-1 flex flex-col">
                  <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                  <main className="mt-16 md:ml-64 p-8 transition-all duration-300">
                    <Settings />
                  </main>
                </div>
              </div>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
