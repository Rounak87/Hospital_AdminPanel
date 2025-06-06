import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 min-h-screen bg-slate-50 p-6 ml-60">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
