import { useQuery } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { fetchEmployees } from '../services/employees-service';

const EmployeePage = () => {
  const navigate = useNavigate();
  const { data: employees = [], isLoading } = useQuery(['employees'], fetchEmployees);

  const columnDefs = [
    { headerName: 'Employee ID', field: 'id', width: 150 },
    { headerName: 'Name', field: 'name', width: 200 },
    { headerName: 'Email Address', field: 'email', width: 200 },
    { headerName: 'Phone Number', field: 'phone', width: 150 },
    { headerName: 'Days Worked', field: 'daysWorked', width: 150 },
    { headerName: 'Café Name', field: 'cafeName', width: 200 },
    {
      headerName: 'Actions',
      cellRendererFramework: (params) => (
        <>
          <Button onClick={() => navigate(`/employees/edit/${params.data.id}`)}>Edit</Button>
          {/* Implement delete functionality similar to CafePage */}
        </>
      ),
      width: 150,
    },
  ];

  return (
    <div>
      <Button variant="contained" onClick={() => navigate('/employees/add')}>Add New Employee</Button>
      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={employees}
          columnDefs={columnDefs}
          loading={isLoading}
          pagination
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default EmployeePage;
