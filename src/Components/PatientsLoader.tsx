import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPatients } from '../store/patientSlice';
import type { PatientAdmission } from '../types/patient';
import { generateAllAdmissionData } from '../Utils/AdmissionData';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const getRandomBloodGroup = () => BLOOD_GROUPS[Math.floor(Math.random() * BLOOD_GROUPS.length)];

const PatientsLoader: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAndLoadPatients() {
      try {
        const res = await fetch('https://dummyjson.com/users');
        const data = await res.json();
        const patientsFromApi = data.users;
        const admissionDataArray = generateAllAdmissionData(patientsFromApi.length);

        const patients: PatientAdmission[] = patientsFromApi.map((user: any, index: number) => ({
          generatedId: admissionDataArray[index].generatedId,
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
          status: admissionDataArray[index].status,
          roomNumber: admissionDataArray[index].roomNumber,
          bloodGroup: getRandomBloodGroup(),
        }));

        dispatch(setPatients(patients));
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    }
    fetchAndLoadPatients();
  }, [dispatch]);

  return null;
};

export default PatientsLoader;
