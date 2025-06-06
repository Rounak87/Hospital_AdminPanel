import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Divider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import type { PatientAdmission } from '../types/patient';

interface PatientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (patient: PatientAdmission) => void;
  initialData?: PatientAdmission;
}

const statuses: PatientAdmission['status'][] = ['Admitted', 'Discharged', 'Under Observation'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genders: PatientAdmission['gender'][] = ['male', 'female', 'other'];

const PatientForm: React.FC<PatientFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  const emptyForm: PatientAdmission = {
    generatedId: 0,
    firstName: '',
    lastName: '',
    age: 0,
    gender: 'male',
    email: '',
    phone: '',
    address: { address: '', city: '', postalCode: '' },
    status: 'Admitted',
    roomNumber: undefined,
    bloodGroup: '',
  };

  const [formData, setFormData] = useState<PatientAdmission>(initialData || emptyForm);
  const [error, setError] = useState<string | null>(null);

  // Get all admitted patients from Redux
  const patients: PatientAdmission[] = useSelector((state: RootState) => state.patients.patients);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(emptyForm);
    }
    setError(null);
    // eslint-disable-next-line
  }, [initialData, open]);

  const handleChange = <K extends keyof PatientAdmission>(field: K, value: PatientAdmission[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (
    field: keyof PatientAdmission['address'],
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    // Validation: all fields required
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.age ||
      !formData.gender ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.address.trim() ||
      !formData.address.city.trim() ||
      !formData.address.postalCode.trim() ||
      !formData.status ||
      !formData.bloodGroup ||
      (formData.status === 'Admitted' && !formData.roomNumber)
    ) {
      setError('All fields are required.');
      return;
    }

    // Room number check for admitted patients
    if (formData.status === 'Admitted' && formData.roomNumber) {
      const roomTaken = patients.some(
        p =>
          p.status === 'Admitted' &&
          p.roomNumber === formData.roomNumber &&
          // Allow editing the same patient without error
          p.generatedId !== formData.generatedId
      );
      if (roomTaken) {
        setError('This room is already assigned to another admitted patient. Please choose another room.');
        return;
      }
    }

    setError(null);
    onSubmit(formData);
    setFormData(emptyForm); // Clear form after submit
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: 'rounded-2xl bg-blue-50',
        style: { borderRadius: 20 },
      }}
    >
      <DialogTitle>
        <span className="text-2xl font-bold text-teal-700">
          {initialData ? 'Edit Patient' : 'Add Patient'}
        </span>
      </DialogTitle>
      <Divider />
      <DialogContent dividers className="!bg-blue-50">
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={formData.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={formData.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
            required
          />
          <TextField
            label="Age"
            type="number"
            fullWidth
            margin="normal"
            value={formData.age}
            onChange={e => handleChange('age', Number(e.target.value))}
            required
          />
          <TextField
            label="Gender"
            select
            fullWidth
            margin="normal"
            value={formData.gender}
            onChange={e => handleChange('gender', e.target.value as PatientAdmission['gender'])}
            required
          >
            {genders.map(gender => (
              <MenuItem key={gender} value={gender}>
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            required
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={e => handleChange('phone', e.target.value)}
            required
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={formData.address.address}
            onChange={e => handleAddressChange('address', e.target.value)}
            required
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={formData.address.city}
            onChange={e => handleAddressChange('city', e.target.value)}
            required
          />
          <TextField
            label="Postal Code"
            fullWidth
            margin="normal"
            value={formData.address.postalCode}
            onChange={e => handleAddressChange('postalCode', e.target.value)}
            required
          />
          <TextField
            label="Status"
            select
            fullWidth
            margin="normal"
            value={formData.status}
            onChange={e => handleChange('status', e.target.value as PatientAdmission['status'])}
            required
          >
            {statuses.map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Blood Group"
            select
            fullWidth
            margin="normal"
            value={formData.bloodGroup}
            onChange={e => handleChange('bloodGroup', e.target.value)}
            required
          >
            {bloodGroups.map(bg => (
              <MenuItem key={bg} value={bg}>
                {bg}
              </MenuItem>
            ))}
          </TextField>
          {formData.status === 'Admitted' && (
            <TextField
              label="Room Number"
              fullWidth
              margin="normal"
              value={formData.roomNumber || ''}
              onChange={e => handleChange('roomNumber', e.target.value)}
              required
            />
          )}
        </div>
      </DialogContent>
      <DialogActions className="!bg-blue-50 pb-4 pr-6">
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: '0.75rem',
            color: '#0ea5e9',
            borderColor: '#0ea5e9',
            textTransform: 'none',
            fontWeight: 600,
            mr: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: '#14b8a6',
            '&:hover': { bgcolor: '#0d9488' },
            borderRadius: '0.75rem',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            boxShadow: 2,
          }}
        >
          {initialData ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientForm;
