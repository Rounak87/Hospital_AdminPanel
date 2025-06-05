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

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

const OverviewPage: React.FC = () => {
  const patients: PatientAdmission[] = useSelector((state: RootState) => state.patients.patients);

  // Calculate stats
  const totalPatients = patients.length;
  const admittedCount = patients.filter(p => p.status === 'Admitted').length;
  const dischargedCount = patients.filter(p => p.status === 'Discharged').length;
  const underObservationCount = patients.filter(p => p.status === 'Under Observation').length;

  // Pie chart data for patient status
  const statusData = [
    { name: 'Admitted', value: admittedCount },
    { name: 'Discharged', value: dischargedCount },
    { name: 'Under Observation', value: underObservationCount },
  ];

  // Age distribution groups for bar chart
  const ageGroups = ['0-20', '21-40', '41-60', '61+'];
  const ageData = ageGroups.map(group => {
    let count = 0;
    if (group === '0-20') count = patients.filter(p => p.age <= 20).length;
    else if (group === '21-40') count = patients.filter(p => p.age > 20 && p.age <= 40).length;
    else if (group === '41-60') count = patients.filter(p => p.age > 40 && p.age <= 60).length;
    else count = patients.filter(p => p.age > 60).length;
    return { ageGroup: group, count };
  });

  // Recent 5 admitted patients sorted by admissionDate descending
  const recentAdmitted = patients
    .filter(p => p.status === 'Admitted')
    .sort((a, b) => new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime())
    .slice(0, 5);

  return (
    <div className="p-6">
      {/* Stats Cards Row */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 bg-slate-50 rounded-xl shadow p-6 flex flex-col items-center justify-center">
          <div className="text-lg font-semibold mb-2">Total Patients</div>
          <div className="text-3xl font-bold text-blue-700">{totalPatients}</div>
        </div>
        <div className="flex-1 bg-slate-50 rounded-xl shadow p-6 flex flex-col items-center justify-center">
          <div className="text-lg font-semibold mb-2">Admitted Patients</div>
          <div className="text-3xl font-bold text-green-700">{admittedCount}</div>
        </div>
        <div className="flex-1 bg-slate-50 rounded-xl shadow p-6 flex flex-col items-center justify-center">
          <div className="text-lg font-semibold mb-2">Discharged Patients</div>
          <div className="text-3xl font-bold text-orange-600">{dischargedCount}</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col">
          <div className="text-lg font-semibold mb-2">Status Distribution</div>
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
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col">
          <div className="text-lg font-semibold mb-2">Age Distribution</div>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Patients Table */}
      <div className="mt-8">
        <div className="text-lg font-semibold mb-2">Recently Admitted Patients</div>
        <div className="bg-white rounded-xl shadow p-4">
          {recentAdmitted.length === 0 ? (
            <div className="text-gray-500">No recent admissions.</div>
          ) : (
            <ul>
              {recentAdmitted.map(patient => (
                <li key={patient.generatedId} className="py-2 border-b last:border-b-0">
                  <div className="font-medium">
                    {patient.firstName} {patient.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    Admitted on: {new Date(patient.admissionDate).toLocaleDateString()}
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
