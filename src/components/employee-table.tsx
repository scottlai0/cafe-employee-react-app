import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from '@mui/material';
import { deleteEmployee } from '../services/employees-service';
import { useState } from 'react';
import ConfirmDeleteModal from './confirm-delete-cafe-modal';

const EmployeeGrid = ({ isDarkMode, employee_data, loading, onEditEmployee, onRefresh }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const theme = isDarkMode === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';

  const columnDefs = [
    {
      headerName: 'Employee ID',
      field: 'id',
    },
    {
      headerName: 'Name',
      field: 'name',
    },
    {
      headerName: 'Phone Number',
      field: 'phone_number',
    },
    {
      headerName: 'Gender',
      field: 'gender'
    },
    {
      headerName: 'Employee Name',
      field: 'Employee_name'
    },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <>
          <Button onClick={() => onEditEmployee(params.data)}>Edit</Button>
          <Button
            onClick={() => {
              setSelectedEmployee(params.data);
              setOpenDeleteModal(true);
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleConfirmDelete = async () => {
    if (selectedEmployee) {
      await deleteEmployee(selectedEmployee.id);
      setOpenDeleteModal(false);
      setSelectedEmployee(null);
      // Call the onRefresh function to refresh the data after deletion
      onRefresh();
    }
  };

  return (
    <>
      <div className={theme} style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={employee_data} // Use employee_data directly from props
          columnDefs={columnDefs}
          loading={loading}
          pagination
          paginationPageSize={10}
        />
      </div>
      <ConfirmDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        selectedEmployee={selectedEmployee}
      />
    </>
  );
};

export default EmployeeGrid;
