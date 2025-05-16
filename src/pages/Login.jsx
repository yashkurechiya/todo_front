import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);

const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(`${server}/users/login`, {
      email, password
    }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });

    toast.success(data.message);

    // ✅ Fetch user immediately after login
    const res = await axios.get(`${server}/users/me`, {
      withCredentials: true
    });

    setUser(res.data.user); // <- this is important!
    setIsAuthenticated(true);
    setLoading(false);

  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    console.error(error);
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
  }
};


  if (isAuthenticated) return <Navigate to={'/profile'} />

  return (
    <div className="flex items-center justify-center min-h-screen 	bg-slate-900">
      <section className="bg-slate-800 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-slate-100 mb-6">
          Login to Your Account
        </h2>
        <form className="space-y-4 text-slate-400" onSubmit={submitHandler}>
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
              type="Submit"
              className={`w-full bg-blue-500 text-white  p-3 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 `}>
              Login
            </button>
          </div>

          {/* Or Sign Up */}
          <div className="text-center text-gray-600">
            <h4 className="my-4">Or</h4>
            <Link
              to="/register"
              className="text-blue-900 hover:text-blue-400 transition"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
