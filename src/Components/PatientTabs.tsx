import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import type { PatientAdmission } from '../types/patient';

import './PatientTabs.css';

type TabKey = 'Admitted' | 'Under Observation' | 'Discharged';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'Admitted', label: 'Admitted' },
  { key: 'Under Observation', label: 'Under Observation' },
  { key: 'Discharged', label: 'Discharged' },
];

const PATIENTS_PER_PAGE = 10;

const PatientTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('Admitted');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const patients: PatientAdmission[] = useSelector((state: RootState) => state.patients.patients);

  // Reset page when tab or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchText]);

  // Filter patients by active tab status
  const filteredByStatus = patients.filter(p => p.status === activeTab);

  // Further filter by search text (firstName or lastName)
  const filteredPatients = filteredByStatus.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  });

  // Pagination calculations
  const totalPatients = filteredPatients.length;
  const totalPages = Math.ceil(totalPatients / PATIENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PATIENTS_PER_PAGE;
  const currentPatients = filteredPatients.slice(startIndex, startIndex + PATIENTS_PER_PAGE);

  // Handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

      {/* Search box */}
      <div style={{ marginBottom: 15 }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{
            padding: '8px 12px',
            width: '100%',
            maxWidth: 400,
            fontSize: 16,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* Table */}
      <div>
        {currentPatients.length === 0 ? (
          <p>No patients found.</p>
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
                {currentPatients.map(patient => (
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

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div style={paginationContainerStyle}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={paginationButtonStyle}
          >
            Previous
          </button>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                style={{
                  ...paginationButtonStyle,
                  ...(pageNum === currentPage ? activePageButtonStyle : {}),
                }}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={paginationButtonStyle}
          >
            Next
          </button>
        </div>
      )}
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

const paginationContainerStyle: React.CSSProperties = {
  marginTop: 20,
  display: 'flex',
  justifyContent: 'center',
  gap: 8,
  flexWrap: 'wrap',
};

const paginationButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  border: '1px solid #ccc',
  backgroundColor: 'white',
  cursor: 'pointer',
  borderRadius: 4,
  minWidth: 40,
};

const activePageButtonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
  fontWeight: 'bold',
  borderColor: '#007bff',
};

export default PatientTabs;
