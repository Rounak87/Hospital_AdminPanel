import React from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent, Stack } from '@mui/material';
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

      {/* Patient Table - full width */}
      <Paper sx={{ padding: 2, mb: 4 }}>
        <PatientTabs />
      </Paper>

      {/* Charts and Cards Row */}
      <Grid container spacing={4}>
        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 3, height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Patient Status Distribution
            </Typography>
            <Box sx={{ flex: 1, minHeight: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusCounts}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
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
            </Box>
          </Paper>
        </Grid>

        {/* Cards */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Patients</Typography>
                <Typography variant="h4">{patients.length}</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6">Currently Admitted</Typography>
                <Typography variant="h4">{statusCounts.find(s => s.name === 'Admitted')?.value || 0}</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6">Under Observation</Typography>
                <Typography variant="h4">{statusCounts.find(s => s.name === 'Under Observation')?.value || 0}</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6">Discharged</Typography>
                <Typography variant="h4">{statusCounts.find(s => s.name === 'Discharged')?.value || 0}</Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
