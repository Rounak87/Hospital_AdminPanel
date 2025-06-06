import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <div className="fixed top-0 left-0 h-screen w-60 bg-slate-100 border-r border-slate-200 shadow z-20 flex flex-col p-4">
    <div className="text-2xl font-extrabold mb-8 text-blue-700 tracking-wide">
      <span className="text-blue-900">Unriddle</span> <span className="text-blue-500">Healthcare</span>
    </div>
    <nav className="flex flex-col gap-2">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `block px-4 py-2 rounded transition-colors ${
            isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-blue-50'
          }`
        }
      >
        Overview
      </NavLink>
      <NavLink
        to="/patients"
        className={({ isActive }) =>
          `block px-4 py-2 rounded transition-colors ${
            isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-blue-50'
          }`
        }
      >
        Patients Info
      </NavLink>
      <NavLink
        to="/statistics"
        className={({ isActive }) =>
          `block px-4 py-2 rounded transition-colors ${
            isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-blue-50'
          }`
        }
      >
        Patient Statistics
      </NavLink>
    </nav>
  </div>
);

export default Sidebar;
