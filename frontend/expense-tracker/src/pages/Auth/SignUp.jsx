import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";


const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // <-- Added
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
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
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, { fullName, email, password });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during signup. Please try again."
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

      <div className="bg-white shadow-2xl rounded-2xl px-7 py-10 w-full max-w-sm flex flex-col items-center gap-5">
        <h3 className="text-3xl font-extrabold text-gray-800">Create an Account</h3>
        <p className="text-gray-700 text-center">Please enter your details to sign up</p>

        <form className="flex flex-col gap-5 w-full" onSubmit={handleSignUp}>
          <Input type="text" placeholder="Full Name" value={fullName} onChange={setFullName} />
          <Input type="email" placeholder="Email" value={email} onChange={setEmail} />
          <Input type="password" placeholder="Password" value={password} onChange={setPassword} />

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white text-xl py-2 rounded-xl transition`}
          >
            {loading ? "Please wait..." : "Sign Up"}
          </button>

          <p className="text-center text-base text-gray-700 mt-2">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

