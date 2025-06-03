import React from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import PatientTabs from './PatientTabs';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

const Dashboard: React.FC = () => {
  const patients = useSelector((state: RootState) => state.patients.patients);

  // Pie chart data: count patients by status
  const statusCounts = ['Admitted', 'Under Observation', 'Discharged'].map(status => ({
    name: status,
    value: patients.filter(p => p.status === status).length,
  }));

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Patient Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Left side: PatientTabs Table */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2 }}>
            <PatientTabs />
          </Paper>
        </Grid>

        {/* Right side: Charts and Cards */}
        <Grid item xs={12} md={4} container direction="column" spacing={3}>
          {/* Pie Chart */}
          <Grid item>
            <Paper sx={{ padding: 2, height: 350 }}>
              <Typography variant="h6" gutterBottom>
                Patient Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={statusCounts}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {statusCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Additional Cards */}
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Patients</Typography>
                <Typography variant="h4">{patients.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h6">Currently Admitted</Typography>
                <Typography variant="h4">{statusCounts.find(s => s.name === 'Admitted')?.value || 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
