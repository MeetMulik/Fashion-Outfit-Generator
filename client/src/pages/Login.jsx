import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebase-config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(firebaseAuth, provider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
    localStorage.setItem("user", JSON.stringify(providerData[0]));
    history("/");
  };

  return (
    <div>
      <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16 flex flex-col items-center justify-center">
            <p
              tabindex="0"
              className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
            >
              Login to your account
            </p>
            <p
              tabindex="0"
              className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
            >
              Dont have account?{" "}
              <a
                href="javascript:void(0)"
                className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"
              >
                {" "}
                Sign up here
              </a>
            </p>
            <button
              onClick={handleLogin}
              aria-label="Continue with google"
              className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
            >
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
                alt="google"
              />
              <p className="text-base font-medium ml-4 text-gray-700">
                Continue with Google
              </p>
            </button>
            <div className="mt-8 ">
              <button className="focus:ring-2 p-4 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                Create my account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
