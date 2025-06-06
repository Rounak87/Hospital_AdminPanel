
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Components/MainLayout';
import PatientsLoader from './Components/PatientsLoader';
import OverviewPage from './Components/OverviewPage';
import PatientsInfoPage from './Components/PateintsInfoPage';
import PatientStatisticsPage from './Components/PatientsStatisticPage';

function App() {
  return (
    <Router>
      
      <PatientsLoader />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          
          <Route index element={<OverviewPage />} />
          <Route path="patients" element={<PatientsInfoPage />} />
          <Route path="statistics" element={<PatientStatisticsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
