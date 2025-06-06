import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Components/MainLayout';
import PatientsLoader from './Components/PatientsLoader';
import OverviewPage from './Components/OverviewPage';
import PatientsInfoPage from './Components/PateintsInfoPage';
import PatientStatisticsPage from './Components/PatientsStatisticPage';

function App() {
  return (
    <Router>
      {/* Load patients once on app start */}
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
