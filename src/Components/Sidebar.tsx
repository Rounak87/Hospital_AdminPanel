import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <div className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-100 to-teal-50 border-r border-blue-200 shadow-lg z-20 flex flex-col p-6">
    <div className="flex items-center justify-center gap-3 mb-10">
      <span className="flex items-center justify-center w-12 h-12 bg-teal-600 rounded-full text-white font-bold text-2xl shadow">
        U
      </span>
      <span className="text-2xl font-extrabold text-blue-900 tracking-wide leading-tight">
        Unriddle <span className="text-teal-600">Healthcare</span>
      </span>
    </div>
    <nav className="flex flex-col gap-2">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `block px-4 py-2 rounded-lg font-medium transition-all ${
            isActive
              ? 'bg-teal-600 text-white shadow'
              : 'text-blue-900 hover:bg-teal-100 hover:text-teal-700'
          }`
        }
      >
        <span className="mr-2">🏠</span> Overview
      </NavLink>
      <NavLink
        to="/patients"
        className={({ isActive }) =>
          `block px-4 py-2 rounded-lg font-medium transition-all ${
            isActive
              ? 'bg-teal-600 text-white shadow'
              : 'text-blue-900 hover:bg-teal-100 hover:text-teal-700'
          }`
        }
      >
        <span className="mr-2">👨‍⚕️</span> Patients Info
      </NavLink>
      <NavLink
        to="/statistics"
        className={({ isActive }) =>
          `block px-4 py-2 rounded-lg font-medium transition-all ${
            isActive
              ? 'bg-teal-600 text-white shadow'
              : 'text-blue-900 hover:bg-teal-100 hover:text-teal-700'
          }`
        }
      >
        <span className="mr-2">📊</span> Patient Statistics
      </NavLink>
    </nav>
    <div className="mt-auto text-xs text-blue-400 pt-8">
       {new Date().getFullYear()} Unriddle Healthcare
    </div>
  </div>
);

export default Sidebar;
