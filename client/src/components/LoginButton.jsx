import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <div>
      <div>
        <Link
          to="/login"
          class="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
        >
          <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
          <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
          <Link
            to="/login"
            class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900"
          >
            Login with Google
          </Link>
          <span class="absolute inset-0 border-2 border-white rounded-full"></span>
        </Link>
      </div>
    </div>
  );
};

export default LoginButton;
