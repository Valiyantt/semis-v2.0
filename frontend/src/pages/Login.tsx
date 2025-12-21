import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login({ username, password });
      
      // Route based on user role
      const userRole = response.user.role?.toLowerCase();
      if (userRole === "superadmin") {
        navigate("/superadmin/dashboard");
      } else if (userRole === "faculty") {
        navigate("/faculty/dashboard");
      } else if (userRole === "student") {
        navigate("/student/dashboard");
      } else if (userRole === "registrar") {
        navigate("/registrar/dashboard");
      } else if (userRole === "billing") {
        navigate("/billing/dashboard");
      } else {
        navigate("/superadmin/dashboard"); // Default fallback
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Login failed";
      setError(msg);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 font-[Corbel] px-4">
      <div className="bg-white shadow-xl rounded-2xl px-6 sm:px-8 py-6 sm:py-8 w-full max-w-md md:max-w-lg lg:max-w-xl border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mb-2 tracking-wide">
            SEMIS
          </h1>
          <p className="text-gray-500 text-sm">School Enterprise Management Information System</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-[#800000] outline-none transition text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-[#800000] outline-none transition text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#800000] text-white font-semibold py-2.5 rounded-lg hover:bg-[#660000] transition duration-200 shadow-sm disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Test Credentials Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 mb-2">Test Credentials:</p>
          <div className="space-y-1 text-xs text-gray-600">
            <p><span className="font-semibold">SuperAdmin:</span> admin / admin123</p>
            <p><span className="font-semibold">Faculty:</span> faculty01 / faculty123</p>
            <p><span className="font-semibold">Student:</span> student01 / student123</p>
            <p><span className="font-semibold">Registrar:</span> registrar01 / registrar123</p>
            <p><span className="font-semibold">Billing:</span> billing01 / billing123</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} SEMIS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
