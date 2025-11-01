import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Faculty from "./pages/Faculty";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 font-[Corbel]">
        <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-8 mt-4 md:mt-0 md:ml-0 transition-all">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
