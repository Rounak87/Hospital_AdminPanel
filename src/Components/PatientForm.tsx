import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import type { PatientAdmission } from '../types/patient';

interface PatientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (patient: PatientAdmission) => void;
  initialData?: PatientAdmission;
}

const statuses = ['Admitted', 'Discharged', 'Under Observation'];

const PatientForm: React.FC<PatientFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<PatientAdmission>({
    generatedId: initialData?.generatedId || 0,
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    age: initialData?.age || 0,
    gender: initialData?.gender || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || { address: '', city: '', postalCode: '' },
    status: initialData?.status || 'Admitted',
    roomNumber: initialData?.roomNumber,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        generatedId: 0,
        firstName: '',
        lastName: '',
        age: 0,
        gender: '',
        email: '',
        phone: '',
        address: { address: '', city: '', postalCode: '' },
        status: 'Admitted',
        roomNumber: undefined,
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof PatientAdmission, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field: keyof PatientAdmission['address'], value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          value={formData.firstName}
          onChange={e => handleChange('firstName', e.target.value)}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          value={formData.lastName}
          onChange={e => handleChange('lastName', e.target.value)}
        />
        <TextField
          label="Age"
          type="number"
          fullWidth
          margin="normal"
          value={formData.age}
          onChange={e => handleChange('age', Number(e.target.value))}
        />
        <TextField
          label="Gender"
          select
          fullWidth
          margin="normal"
          value={formData.gender}
          onChange={e => handleChange('gender', e.target.value)}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={e => handleChange('email', e.target.value)}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={formData.phone}
          onChange={e => handleChange('phone', e.target.value)}
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          value={formData.address.address}
          onChange={e => handleAddressChange('address', e.target.value)}
        />
        <TextField
          label="City"
          fullWidth
          margin="normal"
          value={formData.address.city}
          onChange={e => handleAddressChange('city', e.target.value)}
        />
        <TextField
          label="Postal Code"
          fullWidth
          margin="normal"
          value={formData.address.postalCode}
          onChange={e => handleAddressChange('postalCode', e.target.value)}
        />
        <TextField
          label="Status"
          select
          fullWidth
          margin="normal"
          value={formData.status}
          onChange={e => handleChange('status', e.target.value)}
        >
          {statuses.map(status => (
            <MenuItem key={status} value={status}>
              {status}
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
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientForm;
