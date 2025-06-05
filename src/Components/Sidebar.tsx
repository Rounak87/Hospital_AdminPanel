import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

const Sidebar = () => (
  <Box sx={{ width: 240, bgcolor: '#f8f9fa', height: '100vh', p: 2 }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Evergreen Hospital</Typography>
    <List>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/" exact>
          <ListItemText primary="Overview" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/patients">
          <ListItemText primary="Patients Info" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/statistics">
          <ListItemText primary="Patient Statistics" />
        </ListItemButton>
      </ListItem>
    </List>
  </Box>
);

export default Sidebar;
