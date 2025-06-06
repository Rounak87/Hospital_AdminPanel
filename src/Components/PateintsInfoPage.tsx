import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PatientTabs from './PatientTabs';

const PatientsInfoPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Patients Information
      </Typography>

      <Paper sx={{ p: 2 }}>
        <PatientTabs />
      </Paper>
    </Box>
  );
};

export default PatientsInfoPage;
