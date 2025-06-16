import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='relative w-full'>
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        placeholder={placeholder}
        className='w-full p-2 border-2 border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {type === 'password' && (
        <span
          className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700'
          onClick={toggleShowPassword}
        >
          {showPassword ? <FaRegEyeSlash size={22} /> : <FaRegEye size={22} />}
        </span>
      )}
    </div>
  );
};

export default Input;
