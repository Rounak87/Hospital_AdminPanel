import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import type { PatientAdmission } from '../types/patient';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

const COLORS = ['#14b8a6', '#2563eb', '#f59e42'];

const OverviewPage: React.FC = () => {
  const patients: PatientAdmission[] = useSelector((state: RootState) => state.patients.patients);

  const totalPatients = patients.length;
  const admittedCount = patients.filter(p => p.status === 'Admitted').length;
  const dischargedCount = patients.filter(p => p.status === 'Discharged').length;
  const underObservationCount = patients.filter(p => p.status === 'Under Observation').length;

  const statusData = [
    { name: 'Admitted', value: admittedCount },
    { name: 'Discharged', value: dischargedCount },
    { name: 'Under Observation', value: underObservationCount },
  ];

  const ageGroups = [
    '0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71+'
  ];
  const ageData = ageGroups.map(group => {
    let count = 0;
    if (group === '0-10') count = patients.filter(p => p.age >= 0 && p.age <= 10).length;
    else if (group === '11-20') count = patients.filter(p => p.age >= 11 && p.age <= 20).length;
    else if (group === '21-30') count = patients.filter(p => p.age >= 21 && p.age <= 30).length;
    else if (group === '31-40') count = patients.filter(p => p.age >= 31 && p.age <= 40).length;
    else if (group === '41-50') count = patients.filter(p => p.age >= 41 && p.age <= 50).length;
    else if (group === '51-60') count = patients.filter(p => p.age >= 51 && p.age <= 60).length;
    else if (group === '61-70') count = patients.filter(p => p.age >= 61 && p.age <= 70).length;
    else count = patients.filter(p => p.age >= 71).length;
    return { ageGroup: group, count };
  });

  const recentPatients = patients
    .filter(p => p.status === 'Admitted')
    .slice()
    .sort((a, b) => b.generatedId - a.generatedId)
    .slice(0, 5);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-teal-50 to-white min-h-screen">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div>
            <h1 className="text-4xl font-extrabold text-teal-700 tracking-wide mb-1">Dashboard</h1>
            <div className="text-base text-blue-600 font-medium">
              Welcome to <span className="font-bold text-teal-600">Unriddle Healthcare</span> Admin Panel
            </div>
          </div>
        </div>
        <div className="border-b border-teal-200 mt-4" />
      </div>

      {/* Stats Cards */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-blue-100 p-8 flex flex-col items-center justify-center transition hover:shadow-xl">
          <div className="text-lg font-semibold mb-2 text-teal-700">Total Patients</div>
          <div className="text-4xl font-extrabold text-blue-900">{totalPatients}</div>
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-blue-100 p-8 flex flex-col items-center justify-center transition hover:shadow-xl">
          <div className="text-lg font-semibold mb-2 text-teal-700">Admitted Patients</div>
          <div className="text-4xl font-extrabold text-orange-600">{admittedCount}</div>
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-blue-100 p-8 flex flex-col items-center justify-center transition hover:shadow-xl">
          <div className="text-lg font-semibold mb-2 text-teal-700">Discharged Patients</div>
          <div className="text-4xl font-extrabold text-green-700">{dischargedCount}</div>
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-blue-100 p-8 flex flex-col items-center justify-center transition hover:shadow-xl">
          <div className="text-lg font-semibold mb-2 text-teal-700">Under Observation</div>
          <div className="text-4xl font-extrabold text-teal-700">{underObservationCount}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex-1 bg-blue-50 rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col">
          <div className="text-lg font-semibold mb-2 text-teal-700">Status Distribution</div>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex-1 bg-blue-50 rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col">
          <div className="text-lg font-semibold mb-2 text-teal-700">Age Distribution</div>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ageData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barCategoryGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recently Added Patients */}
      <div className="mt-10">
        <div className="text-lg font-semibold mb-2 text-teal-700">Recently Added Patients</div>
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          {recentPatients.length === 0 ? (
            <div className="text-gray-500">No patients available.</div>
          ) : (
            <ul>
              {recentPatients.map(patient => (
                <li
                  key={patient.generatedId}
                  className="py-4 border-b last:border-b-0 flex flex-col md:flex-row md:items-center md:justify-between gap-2 hover:bg-blue-50 rounded transition"
                >
                  <div>
                    <div className="font-bold text-blue-900 text-lg">
                      {patient.firstName} {patient.lastName}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-1">
                      <span>Age: <span className="font-semibold">{patient.age}</span></span>
                      <span>Gender: <span className="font-semibold capitalize">{patient.gender}</span></span>
                      <span>
                        Status:{' '}
                        <span
                          className={
                            patient.status === 'Admitted'
                              ? 'bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full'
                              : patient.status === 'Discharged'
                              ? 'bg-orange-100 text-orange-700 font-semibold px-2 py-1 rounded-full'
                              : 'bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded-full'
                          }
                        >
                          {patient.status}
                        </span>
                      </span>
                      <span>Blood Group: <span className="font-semibold">{patient.bloodGroup}</span></span>
                      {patient.status === 'Admitted' && patient.roomNumber && (
                        <span>Room: <span className="font-semibold">{patient.roomNumber}</span></span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-1 text-sm text-gray-600">
                    <span>
                      <span className="font-semibold">Email:</span> {patient.email}
                    </span>
                    <span>
                      <span className="font-semibold">Phone:</span> {patient.phone}
                    </span>
                    <span>
                      <span className="font-semibold">City:</span> {patient.address.city}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
