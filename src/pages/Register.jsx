import { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Context, server } from '../main';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Home from './Home';

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated ,loading, setLoading} = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      const { data } = await axios.post(`${server}/users/new`, {
        name, email, password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      toast.success(data.message);
      setIsAuthenticated(true);
      // setLoading(false);

    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsAuthenticated(false);
      // setLoading(false);

    }
  };


  if (isAuthenticated) return <Navigate to={'/'} />

  return (
    <div className="flex items-center 	bg-slate-900 justify-center min-h-screen ">
      <section className="bg-slate-800 p-8 rounded-lg shadow-lg w-90 sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-slate-100 mb-6">
          Create an Account
        </h2>
        <form className="space-y-4 text-slate-400" onSubmit={submitHandler}>
          {/* Name Input */}
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder="Name"
              className="w-full p-3 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              // disabled={loading}
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Sign Up
            </button>
          </div>

          {/* Or Login */}
          <div className="text-center text-gray-600">
            <h4 className="my-4">Or</h4>
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-600 transition"
            >
              Login
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
