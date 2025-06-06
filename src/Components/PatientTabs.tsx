import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import type { PatientAdmission } from '../types/patient';

import PatientForm from './PatientForm';
import ConfirmDialog from './ConfirmDialog';

import { addPatient, updatePatient, deletePatient } from '../store/patientSlice';
import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type TabKey = 'Admitted' | 'Under Observation' | 'Discharged';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'Admitted', label: 'Admitted' },
  { key: 'Under Observation', label: 'Under Observation' },
  { key: 'Discharged', label: 'Discharged' },
];

const rowsPerPage = 10;

const PatientTabs: React.FC = () => {
  const dispatch = useDispatch();
  const patients: PatientAdmission[] = useSelector((state: RootState) => state.patients.patients);

  const [activeTab, setActiveTab] = useState<TabKey>('Admitted');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);

  // Modal states
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientAdmission | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Reset page on tab or search change
  useEffect(() => {
    setPage(0);
  }, [activeTab, searchText]);

  // Filter patients by status and search text
  const filteredByStatus = patients.filter(p => p.status === activeTab);
  const filteredPatients = filteredByStatus.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  });

  // Pagination slice
  const paginatedPatients = filteredPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Handlers
  const handleTabChange = (key: TabKey) => setActiveTab(key);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  // CRUD modal handlers
  const handleAddClick = () => {
    setSelectedPatient(null);
    setIsEditMode(false);
    setFormOpen(true);
  };

  const handleEditClick = (patient: PatientAdmission) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
    setFormOpen(true);
  };

  const handleDeleteClick = (patient: PatientAdmission) => {
    setSelectedPatient(patient);
    setConfirmOpen(true);
  };

  const handleFormSubmit = (patient: PatientAdmission) => {
    if (isEditMode) {
      dispatch(updatePatient(patient));
      toast.success('Patient updated successfully!');
    } else {
      const maxId = patients.reduce((max, p) => Math.max(max, p.generatedId), 0);
      dispatch(addPatient({ ...patient, generatedId: maxId + 1 }));
      toast.success('Patient added successfully!');
    }
    setFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedPatient) {
      dispatch(deletePatient(selectedPatient.generatedId));
      toast.success('Patient deleted successfully!');
    }
    setConfirmOpen(false);
  };

  return (
    <div>
      {/* Header and Add button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-teal-700">Patients</h2>
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg px-5 py-2 shadow transition"
          onClick={handleAddClick}
        >
          + Add Patient
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-teal-200">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 font-medium rounded-t-lg transition-all
              ${
                activeTab === tab.key
                  ? 'bg-white border-x border-t border-teal-300 border-b-0 text-teal-700 shadow'
                  : 'bg-teal-50 text-blue-900 hover:bg-white'
              }
            `}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4 max-w-xs">
        <input
          type="text"
          placeholder="Search by name"
          className="w-full px-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      {/* Patient Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-blue-100">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Age</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Gender</th>
              {activeTab === 'Admitted' && (
                <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Room</th>
              )}
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">City</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-blue-900 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {paginatedPatients.length === 0 ? (
              <tr>
                <td colSpan={activeTab === 'Admitted' ? 9 : 8} className="text-center py-8 text-gray-400">
                  No patients found.
                </td>
              </tr>
            ) : (
              paginatedPatients.map(patient => (
                <tr
                  key={patient.generatedId}
                  className="hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-3">{patient.generatedId}</td>
                  <td className="px-4 py-3 font-semibold text-blue-900">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td className="px-4 py-3">{patient.age}</td>
                  <td className="px-4 py-3 capitalize">{patient.gender}</td>
                  {activeTab === 'Admitted' && (
                    <td className="px-4 py-3">{patient.roomNumber || '-'}</td>
                  )}
                  <td className="px-4 py-3">{patient.email}</td>
                  <td className="px-4 py-3">{patient.phone}</td>
                  <td className="px-4 py-3">{patient.address.city}</td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <button
                      className="inline-flex items-center justify-center bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full p-2 mr-2 transition"
                      title="Edit"
                      onClick={() => handleEditClick(patient)}
                    >
                      <EditIcon fontSize="small" />
                    </button>
                    <button
                      className="inline-flex items-center justify-center bg-red-100 text-red-700 hover:bg-red-200 rounded-full p-2 transition"
                      title="Delete"
                      onClick={() => handleDeleteClick(patient)}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 bg-blue-50 rounded-b-2xl">
          <span className="text-sm text-blue-900">
            Page {page + 1} of {Math.max(1, Math.ceil(filteredPatients.length / rowsPerPage))}
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-teal-100 text-teal-700 font-bold disabled:opacity-50"
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 rounded bg-teal-100 text-teal-700 font-bold disabled:opacity-50"
              onClick={() => handleChangePage(page + 1)}
              disabled={page >= Math.ceil(filteredPatients.length / rowsPerPage) - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PatientForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedPatient || undefined}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Patient"
        description={`Are you sure you want to delete ${selectedPatient?.firstName} ${selectedPatient?.lastName}?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default PatientTabs;
