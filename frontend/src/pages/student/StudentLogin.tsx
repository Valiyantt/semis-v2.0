import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { studentManagementService } from "../services/studentManagementService";

const StudentLogin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!credentials.email || !credentials.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await studentManagementService.loginStudent({
        email: credentials.email,
        password: credentials.password,
      });

      // Store token and user info
      localStorage.setItem("token", response.token);
      localStorage.setItem("authenticated", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.student.id,
          fullName: response.student.fullName,
          email: response.student.email,
          role: "Student",
        })
      );

      navigate("/student/dashboard");
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMsg);
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
          <p className="text-gray-500 text-sm">Student Portal</p>
          <p className="text-gray-600 text-sm mt-1">School Enterprise Management Information System</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="your.email@student.edu"
              value={credentials.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-[#800000] outline-none transition text-sm sm:text-base"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-[#800000] outline-none transition text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#800000] text-white font-semibold py-2.5 rounded-lg hover:bg-[#660000] transition duration-200 shadow-sm disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Registration Link */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <Link
              to="/student/register"
              className="text-[#800000] hover:underline font-semibold"
            >
              Register here
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Email:</span> john.smith@student.semis.edu
          </p>
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Password:</span> student123
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} SEMIS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
