import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // <-- Added
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setLoading(true); // <-- Start loading

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
    } finally {
      setLoading(false); // <-- Stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      
      {/* Top-left logo */}
      <div className="absolute top-4 left-3 backdrop-blur-3xl p-3 shadow-lg  rounded-3xl">
        <h2 className="text-2xl font-sans font-bold text-blue-700">
          Expenzy
        </h2>
      </div>

      <div className="bg-white shadow-2xl rounded-2xl px-8 py-10 w-full max-w-sm flex flex-col items-center gap-6 border-gray-500 border-1">
        <h3 className="text-3xl font-extrabold text-gray-800">Log in</h3>
        <p className="text-gray-700 text-center">
          Please enter your details to log in
        </p>

        <form className="flex flex-col gap-7 w-full" onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white text-xl py-2 rounded-xl transition`}
          >
            {loading ? "Please wait..." : "Log in"}
          </button>

          <p className="text-center text-base text-gray-700 mt-2">
            Don’t have an account?
            <Link to="/signup" className="text-blue-600 hover:underline ml-1">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
