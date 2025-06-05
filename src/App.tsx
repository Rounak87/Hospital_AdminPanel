import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Components/MainLayout';
import PatientsLoader from './Components/PatientsLoader';
import OverviewPage from './Components/OverviewPage';
import { Box, Typography } from '@mui/material';


const PatientsInfoPage: React.FC = () => (
  <Box p={3}>
    <Typography variant="h3" gutterBottom>
      Patients Info Page
    </Typography>
    <Typography>
      This page will display the patient table and related info.
    </Typography>
  </Box>
);

const PatientStatisticsPage: React.FC = () => (
  <Box p={3}>
    <Typography variant="h3" gutterBottom>
      Patient Statistics Page
    </Typography>
    <Typography>
      This page will display charts, graphs, and statistics.
    </Typography>
  </Box>
);

function App() {
  return (
    <Router>
     
      <PatientsLoader />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Default route shows OverviewPage */}
          <Route index element={<OverviewPage />} />
          <Route path="patients" element={<PatientsInfoPage />} />
          <Route path="statistics" element={<PatientStatisticsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
