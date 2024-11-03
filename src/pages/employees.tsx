import React, { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchEmployeesByCafe } from '../services/employees-service'; // Replace with your actual service
import { Box, CircularProgress, Typography } from '@mui/material';

const EmployeePage = () => {
  const { cafeName } = useParams(); // Extracting cafeName from URL parameters
  const { data, error, isLoading } = useQuery(['employees', cafeName], () => fetchEmployeesByCafe(cafeName));

  useEffect(() => {
    console.log('Fetching employees for cafe:', cafeName);
  }, [cafeName]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading employees...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error loading employees: {error.message}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employees for {cafeName}
      </Typography>
      <ul>
        {data.map((employee) => (
          <li key={employee.id}>
            <Typography variant="body1">{employee.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default EmployeePage;
