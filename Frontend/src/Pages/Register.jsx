import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError("");
      await API.post("/auth/register", data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        
        <h2 className="text-2xl font-bold text-center mb-2">
          Create Account 🚀
        </h2>

        <p className="text-gray-500 text-sm text-center mb-5">
          Sign up to get started
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
        >
          Register
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-5">
          Already have an account?{" "}
          <span
            className="text-indigo-500 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}