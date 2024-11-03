import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, CircularProgress, TextField, Typography, useTheme } from '@mui/material';

import { fetchEmployees } from '../services/employees-service'; // Adjust the path as necessary
import EmployeeGrid from '../components/employee-table';

import AddHomeWorkTwoToneIcon from '@mui/icons-material/AddHomeWorkTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { fetchCafes } from '../services/cafes-service';
import AddEditEmployeeModal from '../components/add-edit-employee.modal';


const EmployeePage = () => {
  return EmployeePageTemplate()
};

export default EmployeePage;

export const EmployeePageTemplate = (cafe_id: string | null = null) => {
  const isDarkMode = useTheme().palette.mode;

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // For filtering values in AGGrid based on search bar
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = () => {
    setIsEditMode(false);
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditCafe = (employee_row_data) => {
    setIsEditMode(true);
    setSelectedEmployee(employee_row_data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  // To fetch cafe data
  const { cafe_data, cafe_error, cafe_isLoading } = useQuery({
    queryKey: ['cafes'],
    queryFn: fetchCafes,
  });

  // To fetch employees data
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });

  
  // Filter employees based on search term
  // const filtered_data = data?.filter(employee =>
	// 	employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   employee.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   employee.location.toLowerCase().includes(searchTerm.toLowerCase())
  // );


  if (isLoading && cafe_isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress />
        <p>Loading Data...</p>
      </Box>
    );
  }

  if (error) return <p>Error loading employees: {error.message}</p>;

  return (
    <>
      <Box sx={{ display: 'flex', py: 2, justifyContent: 'space-between', gap: 2 }}>
        <Button variant="contained" onClick={handleOpenModal}>
          <AddHomeWorkTwoToneIcon sx={{ mr: 1 }} />
          Add New Employee
        </Button>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
      </Box>
      <EmployeeGrid 
        isDarkMode={isDarkMode} 
        employee_data={data} 
        loading={isLoading} 
        onEditEmployee={handleEditCafe}
        onRefresh={refetch} // Pass the refetch function to CafeGrid
      />
      <AddEditEmployeeModal
        employee_data={selectedEmployee} 
        isEditMode={isEditMode} 
        open={isModalOpen} 
        onClose={handleCloseModal} 
        onSuccess={refetch} // Call refetch on success
      />
    </>
  );
}