import React from 'react';
import PatientTabs from './PatientTabs';

const PatientsInfoPage: React.FC = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-teal-50 to-white min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-teal-700 tracking-wide mb-2">
          Patients Information
        </h2>
        <div className="border-b border-teal-200" />
      </div>
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
        <PatientTabs />
      </div>
    </div>
  );
};

export default PatientsInfoPage;
