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
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

const STATUS_COLORS = ['#0088FE', '#00C49F', '#FF8042'];
const GENDER_COLORS = {
  male: '#1f77b4',
  female: '#ff7f0e',
  other: '#2ca02c',
};

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const PatientStatisticsPage: React.FC = () => {
  const patients: PatientAdmission[] = useSelector((state: RootState) => state.patients.patients);

  // Status distribution data
  const admittedPatients = patients.filter(p => p.status === 'Admitted');
  const statusCounts = [
    { name: 'Admitted', value: admittedPatients.length },
    { name: 'Discharged', value: patients.filter(p => p.status === 'Discharged').length },
    { name: 'Under Observation', value: patients.filter(p => p.status === 'Under Observation').length },
  ];

  // Gender distribution
  const genders = ['male', 'female', 'other'] as const;
  const genderData = genders.map(g => ({
    name: g,
    value: patients.filter(p => p.gender === g).length,
  }));

  // Scatter chart data: age vs blood group, color by gender
  const bloodGroupIndex = (bg: string) => BLOOD_GROUPS.indexOf(bg);

  const scatterData = patients.map(p => ({
    age: p.age,
    bloodGroup: bloodGroupIndex(p.bloodGroup),
    bloodGroupLabel: p.bloodGroup,
    gender: p.gender,
  }));

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Patient Statistics</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Status Distribution Pie Chart */}
        <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Patient Status Distribution</h3>
          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusCounts}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  label
                >
                  {statusCounts.map((entry, index) => (
                    <Cell key={`cell-status-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Two stacked charts */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Scatter Chart */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Age vs Blood Group (Colored by Gender)</h3>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="age"
                    name="Age"
                    domain={['dataMin - 5', 'dataMax + 5']}
                    tickCount={10}
                  />
                  <YAxis
                    type="category"
                    dataKey="bloodGroupLabel"
                    name="Blood Group"
                    allowDuplicatedCategory={false}
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  {['male', 'female', 'other'].map(gender => (
                    <Scatter
                      key={gender}
                      name={gender}
                      data={scatterData.filter(p => p.gender === gender)}
                      fill={GENDER_COLORS[gender]}
                      shape="circle"
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gender Distribution Pie Chart */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Gender Distribution</h3>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-gender-${index}`} fill={GENDER_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientStatisticsPage;
