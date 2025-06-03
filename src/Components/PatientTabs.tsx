import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import type { PatientAdmission } from '../types/patient';

import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Stack,
} from '@mui/material';

import PatientForm from './PatientForm';
import ConfirmDialog from './ConfirmDialog';
import PatientsLoader from './PatientsLoader';

import { addPatient, updatePatient, deletePatient } from '../store/patientSlice';

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
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(tabs[newValue].key);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
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
    } else {
      const maxId = patients.reduce((max, p) => Math.max(max, p.generatedId), 0);
      dispatch(addPatient({ ...patient, generatedId: maxId + 1 }));
    }
    setFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedPatient) {
      dispatch(deletePatient(selectedPatient.generatedId));
    }
    setConfirmOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <PatientsLoader />
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Patients</Typography>
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Add Patient
        </Button>
      </Stack>

      {/* Tabs */}
      <Tabs value={tabs.findIndex(t => t.key === activeTab)} onChange={handleTabChange} aria-label="patient status tabs" sx={{ mb: 2 }}>
        {tabs.map(tab => (
          <Tab key={tab.key} label={tab.label} />
        ))}
      </Tabs>

      {/* Search */}
      <Box mb={2} maxWidth={400}>
        <TextField
          label="Search by name"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleSearchChange}
        />
      </Box>

      {/* Table */}
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="patients table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 70 }}>ID</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Name</TableCell>
                <TableCell sx={{ width: 70 }}>Age</TableCell>
                <TableCell sx={{ width: 100 }}>Gender</TableCell>
                {activeTab === 'Admitted' && <TableCell sx={{ width: 100 }}>Room</TableCell>}
                <TableCell sx={{ minWidth: 200 }}>Email</TableCell>
                <TableCell sx={{ minWidth: 130 }}>Phone</TableCell>
                <TableCell sx={{ minWidth: 120 }}>City</TableCell>
                <TableCell sx={{ width: 180, textAlign: 'center', whiteSpace: 'nowrap' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={activeTab === 'Admitted' ? 9 : 8} align="center">
                    No patients found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedPatients.map(patient => (
                  <TableRow key={patient.generatedId} hover>
                    <TableCell>{patient.generatedId}</TableCell>
                    <TableCell>{patient.firstName} {patient.lastName}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    {activeTab === 'Admitted' && <TableCell>{patient.roomNumber || '-'}</TableCell>}
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.address.city}</TableCell>
                    <TableCell sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleEditClick(patient)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteClick(patient)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredPatients.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </Paper>

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
    </Box>
  );
};

export default PatientTabs;
