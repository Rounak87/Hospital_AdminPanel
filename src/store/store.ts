import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './PatientSlice.ts';

export const store = configureStore({
  reducer: {
    patients: patientReducer,
    
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
