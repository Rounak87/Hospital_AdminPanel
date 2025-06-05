import React from 'react';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <Box sx={{ display: 'flex' }}>
    <Sidebar />
    <Box sx={{ flex: 1, bgcolor: '#f4f6f8', minHeight: '100vh', p: 3 }}>
      <Outlet />
    </Box>
  </Box>
);

export default MainLayout;
