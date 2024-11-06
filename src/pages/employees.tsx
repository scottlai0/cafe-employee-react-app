import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, CircularProgress, PaletteMode, TextField, useTheme } from '@mui/material';
import { fetchEmployees } from '../services/employees-service';
import EmployeeGrid from '../components/employee-table';
import AddHomeWorkTwoToneIcon from '@mui/icons-material/AddHomeWorkTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { fetchCafes } from '../services/cafes-service';
import AddEditEmployeeModal from '../components/add-edit-employee.modal';
import { AgGridReact } from 'ag-grid-react'; // Import AgGridReact


export const EmployeePageTemplate = (cafe_id: any = null) => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const isDarkMode: PaletteMode = useTheme().palette.mode

  const handleOpenModal = () => {
    setIsEditMode(false);
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditCafe = (employee_row_data: any) => {
    setIsEditMode(true);
    setSelectedEmployee(employee_row_data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const cafeQuery = useQuery({
    queryKey: ['cafes'],
    enabled: true,
    queryFn: fetchCafes,
    refetchInterval: 1000 * 60 * 2,
  });

  const employeeQuery = useQuery({
    queryKey: ['employees'],
    enabled: true,
    queryFn: fetchEmployees,
    refetchInterval: 1000 * 60 * 2,
  });
  
  // If page is accessed through Cafe page's column selection, filter the employee data based on the Cafe's ID
  const filtered_data = cafe_id?.cafe_id ? employeeQuery.data?.filter((e: any) => e.cafe_id === cafe_id.cafe_id) : employeeQuery.data
  const selected_cafe_info = cafe_id?.cafe_id ? cafeQuery.data?.filter((e: any) => e.id === cafe_id.cafe_id)[0] : null

  // Filter cafes based on search term
  const search_filtered_data = filtered_data?.filter((employee: any) =>
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

  if ( cafeQuery.isLoading || employeeQuery.isLoading ) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress sx={{ mr: 1 }} />
        <p>Loading Employees...</p>
      </Box>
    );
  } 
  
  if (cafeQuery.error) return <p>Error loading cafes: {cafeQuery.error.message}</p>;
  if (employeeQuery.error) return <p>Error loading employees: {employeeQuery.error.message}</p> 

  return (
    <>
      <>
        { cafe_id?.cafe_id ? <p>Displaying Employees for: <b>{selected_cafe_info?.name} - {selected_cafe_info?.id}</b> only.</p> : 
        <p>Displaying all employee data.</p>
        }
      </>
      <Box sx={{ display: 'flex', py: 2, justifyContent: 'space-between', gap: 2 }}>
        <Button variant="contained" onClick={handleOpenModal}>
          <AddHomeWorkTwoToneIcon sx={{ mr: 1 }} />
          Add New Employee
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={resizeColumnsToFit}> {/* Button to trigger resizing */}
            Autoresize Columns
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
        loading={employeeQuery.isLoading}
        onEditEmployee={handleEditCafe}
        onRefresh={employeeQuery.refetch}
      />
      <AddEditEmployeeModal
        cafe_data={cafeQuery.data}
        selected_cafe_info={selected_cafe_info}
        employee_data={selectedEmployee}
        isEditMode={isEditMode}
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={employeeQuery.refetch}
      />
    </>
  );

};
