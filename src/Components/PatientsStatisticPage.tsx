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

const STATUS_COLORS = ['#14b8a6', '#2563eb', '#f59e42'];
const GENDER_COLORS = {
  male: '#0ea5e9',
  female: '#f472b6',
  other: '#a3e635',
};
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const PatientStatisticsPage: React.FC = () => {
  const patients: PatientAdmission[] = useSelector((state: RootState) => state.patients.patients);

  // Status distribution
  const statusCounts = [
    { name: 'Admitted', value: patients.filter(p => p.status === 'Admitted').length },
    { name: 'Discharged', value: patients.filter(p => p.status === 'Discharged').length },
    { name: 'Under Observation', value: patients.filter(p => p.status === 'Under Observation').length },
  ];

  // Gender distribution
  const genders = ['male', 'female', 'other'] as const;
  const genderData = genders.map(g => ({
    name: g,
    value: patients.filter(p => p.gender === g).length,
  }));

  // Scatter chart: age vs blood group, colored by gender
  const bloodGroupIndex = (bg: string) => BLOOD_GROUPS.indexOf(bg);
  const scatterData = patients.map(p => ({
    age: p.age,
    bloodGroup: bloodGroupIndex(p.bloodGroup),
    bloodGroupLabel: p.bloodGroup,
    gender: p.gender,
  }));

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-teal-50 to-white min-h-screen">
      <h2 className="text-3xl font-extrabold text-teal-700 tracking-wide mb-8">Patient Statistics</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Status Pie Chart */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-teal-700">Patient Status Distribution</h3>
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
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Scatter and Gender Pie Charts */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-4 text-teal-700">Age vs Blood Group (Colored by Gender)</h3>
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
                  {genders.map(gender => (
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
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 text-teal-700">Gender Distribution</h3>
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
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
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
