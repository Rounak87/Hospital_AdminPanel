import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPatients } from '../store/patientSlice';
import type { PatientAdmission } from '../types/patient';
import { generateAllAdmissionData } from '../Utils/AdmissionData';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const getRandomBloodGroup = (): string => {
  const index = Math.floor(Math.random() * BLOOD_GROUPS.length);
  return BLOOD_GROUPS[index];
};

const PatientsLoader: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAndLoadPatients() {
      try {
        const res = await fetch('https://dummyjson.com/users');
        const data = await res.json();

        const patientsFromApi = data.users;
        const totalPatients = patientsFromApi.length;

        // Generate admission data for all patients at once
        const admissionDataArray = generateAllAdmissionData(totalPatients);

        // Merge API user data with generated admission data and assign random blood group
        const patients: PatientAdmission[] = patientsFromApi.map((user: any, index: number) => {
          const admissionData = admissionDataArray[index];

          return {
            generatedId: admissionData.generatedId,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            gender: user.gender,
            email: user.email,
            phone: user.phone,
            address: {
              address: user.address.address,
              city: user.address.city,
              postalCode: user.address.postalCode,
            },
            status: admissionData.status,
            roomNumber: admissionData.roomNumber,
            bloodGroup: getRandomBloodGroup(),  // Assign random blood group here
          };
        });

        dispatch(setPatients(patients));
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    }

    fetchAndLoadPatients();
  }, [dispatch]);

  return null; // This component only loads data, no UI
};

export default PatientsLoader;
