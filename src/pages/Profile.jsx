import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import { Link, Navigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, loading } = useContext(Context);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen 	bg-slate-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-4">
        <div className="w-24 h-24 mx-auto rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold text-white">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-300">{user.email}</p>

        <div className="mt-4">
          <p className="text-sm text-gray-400">
            Member since:{" "}
            <span className="text-gray-200">
              {new Date(user.createdAt).toDateString()}
            </span>
          </p>
        </div>
        <Link to={'/'}>
        <button
          className="mt-6 w-full bg-red-600 hover:bg-red-700 transition rounded-xl py-2 text-white font-semibold">
         Create Task
        </button>
            </Link>
      </div>
    </div>
  );
};

export default Profile;
