import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 px-4 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Brand/Logo */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">TaskWeb</h1>
          <p className="text-sm">
            Simplify your daily tasks with an elegant and efficient task manager.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">Quick Links</h2>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/profile" className="hover:text-white transition">Profile</a></li>
            <li><a href="/tasks" className="hover:text-white transition">Tasks</a></li>
          </ul>
        </div>

        {/* Contact / Socials */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">Contact</h2>
          <p>Email: <a href="mailto:2005yashkurechiya@gmail.com" className="hover:text-white">2005yashkurechiya@gmail.com</a></p>
          <p>GitHub: <a href="https://github.com/yashkurechiya" className="hover:text-white">github.com/yashkurechiya</a></p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TaskWeb. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
