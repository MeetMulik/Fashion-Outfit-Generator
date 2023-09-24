import React from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Profile = () => {
  const [{ user }, dispatch] = useStateValue();
  console.log(user);

  const logout = () => {
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  return (
    <div className="flex flex-col">
      <h1>Profiles:</h1>
      <h1>{user?.email}</h1>
      <div>
        <button
          onClick={logout}
          class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
