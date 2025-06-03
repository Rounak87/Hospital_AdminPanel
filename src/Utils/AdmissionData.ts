import type { PatientAdmission } from '../types/patient';

// Rooms 1 to 40 as strings
const rooms = Array.from({ length: 40 }, (_, i) => (i + 1).toString());


const statuses: PatientAdmission['status'][] = ['Admitted', 'Discharged', 'Under Observation'];


export function generateAllAdmissionData(total: number) {
  const assignedRooms = new Set<string>();

  return Array.from({ length: total }, (_, index) => {
    const generatedId = index + 1;
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    let roomNumber: string | undefined;
    if (status === 'Admitted') {
      // Find first available room not assigned yet
      const availableRooms = rooms.filter(r => !assignedRooms.has(r));
      if (availableRooms.length > 0) {
        roomNumber = availableRooms[0];
        assignedRooms.add(roomNumber);
      }
    }

    return { generatedId, status, roomNumber };
  });
}
