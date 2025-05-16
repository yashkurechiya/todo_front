import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
 

const Header = () => {

   const  {isAuthenticated , setIsAuthenticated , loading, setLoading} = useContext(Context);
   console.log(isAuthenticated);

    const logoutHandler = async (e) => {
    setLoading(true);
    try {
     await axios.get(`${server}/users/logout`, {
       
        withCredentials: true
      });
      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);

    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsAuthenticated(false);

    }
  };

   
   
  return (
    <nav className="bg-gray-800 sticky text-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Title */}
        <h2 className="text-2xl font-bold ">TaskWeb</h2>

        {/* Links */}
        <article className="space-x-6">
          <Link
            to={"/"}
            className="hover:text-red-500 transition duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            to={"/profile"}
            className="hover:text-red-500 transition duration-300 ease-in-out"
          >
            Profile
          </Link>

        {
          isAuthenticated?
          <button disabled={loading} 
          onClick={logoutHandler} className='hover:text-red-500 transition duration-300 ease-in-out'> Logout</button>
        :
          <Link
            to={"/login"}
            className="hover:text-red-500 transition duration-300 ease-in-out"
          >
            Login
          </Link>
        }

        </article>
      </div>
    </nav>
  );
};

export default Header;


 