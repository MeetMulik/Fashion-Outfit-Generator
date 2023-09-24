import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { close, menu } from "../assets";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import LoginButton from "./LoginButton";
import { actionType } from "../context/reducer";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    navigate("/");
  };

  return (
    <div>
      <div className="bg-black">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <header className="flex justify-between items-center py-2 md:py-4">
            <Link
              to="/"
              className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
              aria-label="logo"
            >
              <svg
                width="95"
                height="94"
                viewBox="0 0 95 94"
                className="w-6 h-auto text-indigo-500"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96 0V47L48 94H0V47L48 0H96Z" />
              </svg>
              <span className="text-white">Outfitter</span>
            </Link>
            <nav className="hidden lg:flex gap-12 ">
              <Link
                to="/"
                className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
              >
                Home
              </Link>
              {user && (
                <>
                  <Link
                    to="/chat"
                    className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
                  >
                    Chat
                  </Link>
                  <Link
                    to="/previousorders"
                    className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/myoutfits"
                    className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
                  >
                    My Outfits
                  </Link>
                </>
              )}
              <Link
                to="/about"
                className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
              >
                About
              </Link>
            </nav>
            <div className="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
              {user ? (
                //design a dropdown menu for user
                <div className="flex items-center gap-x-12">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={user?.photoURL}
                      alt="pfp"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <span className="block text-white text-sm font-medium">
                        {user?.displayName}
                      </span>
                      <span
                        onClick={logout}
                        className="cursor-pointer block text-indigo-600 hover:text-indigo-500 text-xs"
                      >
                        Logout
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <LoginButton />
              )}
            </div>
            <div className="lg:hidden flex flex-1 justify-end items-center py-5 z-20">
              <img
                src={toggle ? close : menu}
                alt="menu"
                className="w-[28px] h-[28px] object-contain"
                onClick={() => setToggle(!toggle)}
              />
              <div
                className={`${
                  !toggle ? "hidden" : "flex"
                } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
              >
                <ul className="list-none flex justify-end items-start flex-1 flex-col">
                  <li
                    className={`font-poppins font-normal cursor-pointer text-[16px] `}
                  >
                    <Link to="/chat" className="text-white">
                      Chat
                    </Link>
                  </li>
                  <li
                    className={`font-poppins font-normal cursor-pointer text-[16px] `}
                  >
                    <Link to="/previousorders" className="text-white">
                      Orders
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
