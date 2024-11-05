import { forwardRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { Button } from '@mui/material';
import { deleteEmployee } from '../services/employees-service';

import ConfirmDeleteEmployeeModal from './confirm-delete-employee-modal';

const EmployeeGrid = forwardRef(({ 
  isDarkMode, 
  employee_data, 
  loading, 
  onEditEmployee, 
  onRefresh
}: any, ref: any) => {

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const columnDefs = [
    {
      headerName: 'Employee',
      children: [
        {
          headerName: 'ID',
          field: 'id',
          minWidth: 120
        },
        {
          headerName: 'Name',
          field: 'name',
          minWidth: 140
        },
        {
          headerName: 'Phone Number',
          field: 'phone_number',
          minWidth: 140
        },
        {
          headerName: 'Gender',
          field: 'gender',
          mindWith: 80
        },
      ]
    },
    {
      headerName: 'Cafe',
      field: 'cafe_name',
      cellRenderer: (params: any) => {
        return params.value ? params.value : '-';
      },
      tooltipValueGetter: (params: any) => `Cafe ID: ${params.data.cafe_id}`,
      minWidth: 150
    },
    {
      headerName: 'Employment Details',
      children: [
        {
          headerName: 'Start Date',
          field: 'start_date',
          cellRenderer: (params: any) => {
            return params.value ? params.value : '-';
          },
          minWidth: 120
        },
        {
          headerName: 'End Date',
          field: 'end_date',
          cellRenderer: (params: any) => {
            return params.value ? params.value : '-';
          },
          minWidth: 120
        },
        {
          headerName: 'Days Worked',
          field: 'days_worked',
          minWidth: 120
        }
      ]
    },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => (
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
      minWidth: 200
    },
  ];

  const handleConfirmDelete = async () => {
    if (selectedEmployee) {
      await deleteEmployee((selectedEmployee as any).id);
      setOpenDeleteModal(false);
      setSelectedEmployee(null);
      // Call the onRefresh function to refresh the data after deletion
      onRefresh();
    }
  };

  const theme = isDarkMode === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';
  
  return (
    <div className={theme} style={{ height: 600, width: '100%' }}>
      <AgGridReact
        ref={ref} // Attaching ref for employees.tsx resize button to access this grid API
        rowData={employee_data}
        columnDefs={columnDefs}
        loading={loading}
        pagination
        paginationPageSize={10}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          resizable: true,
        }}
        gridOptions={{
          tooltipShowDelay: 0
        }}
      />
      <ConfirmDeleteEmployeeModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        selectedEmployee={selectedEmployee}
      />
    </div>
  );
});

export default EmployeeGrid;
