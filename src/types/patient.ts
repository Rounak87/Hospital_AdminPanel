// src/types/patient.ts

export interface Address {
  address: string;
  city: string;
  postalCode: string;
}

export interface PatientAdmission {
  generatedId: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  address: Address;
  status: 'Admitted' | 'Discharged' | 'Under Observation';
  roomNumber?: string;
}


