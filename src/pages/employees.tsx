import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, CircularProgress, TextField, Typography, useTheme } from '@mui/material';
import { fetchEmployees } from '../services/employees-service';
import EmployeeGrid from '../components/employee-table';
import AddHomeWorkTwoToneIcon from '@mui/icons-material/AddHomeWorkTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { fetchCafes } from '../services/cafes-service';
import AddEditEmployeeModal from '../components/add-edit-employee.modal';
import { AgGridReact } from 'ag-grid-react'; // Import AgGridReact


export const EmployeePageTemplate = (cafe_id: string | null = null) => {

  const isDarkMode = useTheme().palette.mode;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
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

  const {
    data: cafe_data,
    error: cafe_error,
    isLoading: cafe_isLoading,
    refetch: cafe_refetch,
  } = useQuery({
    queryKey: ['cafes'],
    queryFn: fetchCafes,
  });

  const {
    data: employee_data,
    error: employee_error,
    isLoading: employee_isLoading,
    refetch: employee_refetch,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });
  
  // If page is accessed through Cafe page's column selection, filter the employee data based on the Cafe's ID
  const filtered_data = cafe_id?.cafe_id ? employee_data?.filter((e: any) => e.cafe_id === cafe_id.cafe_id) : employee_data
  const selected_cafe_info = cafe_id?.cafe_id ? cafe_data?.filter((e: any) => e.id === cafe_id.cafe_id)[0] : null

  // Filter cafes based on search term
  const search_filtered_data = filtered_data?.filter(employee =>
    employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone_number.toString().includes(searchTerm.toLowerCase()) ||
    employee.cafe_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.cafe_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.start_date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.end_date?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  // Function to resize columns
  const gridRef = useRef<AgGridReact>(null); // Create a ref for the AgGrid
  const resizeColumnsToFit = () => {
    if (gridRef.current) {
      gridRef.current.api.autoSizeAllColumns();
    }
  };

  if ( cafe_isLoading || employee_isLoading ) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress sx={{ mr: 1 }} />
        <p>Loading Employees...</p>
      </Box>
    );
  } else if (cafe_error) {
    return <p>Error loading cafes: {cafe_error.message}</p>;
  } else if (employee_error) {
    return <p>Error loading employees: {employee_error.message}</p> 
  } else {
    return (
      <>
        {cafe_id?.cafe_id}
        <Box sx={{ display: 'flex', py: 2, justifyContent: 'space-between', gap: 2 }}>
          <Button variant="contained" onClick={handleOpenModal}>
            <AddHomeWorkTwoToneIcon sx={{ mr: 1 }} />
            Add New Employee
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={resizeColumnsToFit}> {/* Button to trigger resizing */}
              Resize Columns
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
          
        </Box>
        <EmployeeGrid
          ref={gridRef} // Attach the ref to the EmployeeGrid
          isDarkMode={isDarkMode}
          employee_data={search_filtered_data}
          loading={employee_isLoading}
          onEditEmployee={handleEditCafe}
          onRefresh={employee_refetch}
        />
        <AddEditEmployeeModal
          cafe_data={cafe_data}
          selected_cafe_info={selected_cafe_info}
          employee_data={selectedEmployee}
          isEditMode={isEditMode}
          open={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={employee_refetch}
        />
      </>
    );
  }
};
