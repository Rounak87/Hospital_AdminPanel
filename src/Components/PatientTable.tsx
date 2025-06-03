import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import type { PatientAdmission } from '../types/patient';


import './PatientTable.css';

type TabKey = 'Admitted' | 'Under Observation' | 'Discharged';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'Admitted', label: 'Admitted' },
  { key: 'Under Observation', label: 'Under Observation' },
  { key: 'Discharged', label: 'Discharged' },
];

const PatientTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('Admitted');

  const patients: PatientAdmission[] = useSelector((state: RootState) => state.patients.patients);

  // Filter patients by active tab status
  const filteredPatients = patients.filter(p => p.status === activeTab);

  return (
    <div>
      {/* Tabs header */}
      <div className="tab-header">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table for active tab */}
      <div style={{ marginTop: 20 }}>
        {filteredPatients.length === 0 ? (
          <p>No patients in this category.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 800 }}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Age</th>
                  <th style={thStyle}>Gender</th>
                  {activeTab === 'Admitted' && <th style={thStyle}>Room</th>}
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>City</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(patient => (
                  <tr key={patient.generatedId} className="table-row">
                    <td style={tdStyle}>{patient.generatedId}</td>
                    <td style={tdStyle}>{patient.firstName} {patient.lastName}</td>
                    <td style={tdStyle}>{patient.age}</td>
                    <td style={tdStyle}>{patient.gender}</td>
                    {activeTab === 'Admitted' && <td style={tdStyle}>{patient.roomNumber || '-'}</td>}
                    <td style={tdStyle}>{patient.email}</td>
                    <td style={tdStyle}>{patient.phone}</td>
                    <td style={tdStyle}>{patient.address.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
};

export default PatientTabs;
