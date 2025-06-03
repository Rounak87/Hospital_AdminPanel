import "./App.css";

import PatientsLoader from './Components/PatientsLoader';
import PatientTable from './Components/PatientTable';

function App() {
  return (
    <>
      <PatientsLoader />
      <PatientTable />
    </>
  );
}

export default App;
