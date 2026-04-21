import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-80">
        
        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 text-sm text-center mb-4">
          Login to your account
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300 font-semibold"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            className="text-indigo-500 cursor-pointer font-semibold"
            onClick={() => navigate("/")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}