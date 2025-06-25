import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative w-full">
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        className="w-full p-3 pr-10 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {type === "password" && (
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={toggleShowPassword}
        >
          {showPassword ? <FaRegEyeSlash size={22} /> : <FaRegEye size={22} />}
        </span>
      )}
    </div>
  );
};


export default Input;
