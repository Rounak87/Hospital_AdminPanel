

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PatientAdmission } from '../types/patient';


interface PatientState {
  patients: PatientAdmission[];
}

const initialState: PatientState = {
  patients: [],
};

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setPatients(state, action: PayloadAction<PatientAdmission[]>) {
      state.patients = action.payload;
    },
    addPatient(state, action: PayloadAction<PatientAdmission>) {
      state.patients.push(action.payload);
    },
    updatePatient(state, action: PayloadAction<PatientAdmission>) {
      const index = state.patients.findIndex(p => p.generatedId === action.payload.generatedId);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    deletePatient(state, action: PayloadAction<number>) {
      state.patients = state.patients.filter(p => p.generatedId !== action.payload);
    },
  },
});

export const { setPatients, addPatient, updatePatient, deletePatient } = patientSlice.actions;
export default patientSlice.reducer;
