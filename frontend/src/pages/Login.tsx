import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Temporary login logic — replace with API call later
    if (email === "admin@semis.com" && password === "admin") {
      localStorage.setItem("authenticated", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[400px]">
        <h1 className="text-3xl font-bold text-center text-[var(--color-maroon)] mb-6">
          SEMIS Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-maroon)] outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-maroon)] outline-none"
          />
          <button
            type="submit"
            className="bg-[var(--color-maroon)] text-white font-semibold py-2 rounded-lg hover:bg-red-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
