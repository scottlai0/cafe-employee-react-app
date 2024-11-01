import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from '@mui/material';

const CafeGrid = ({ isDarkMode, cafes, loading }) => {
  // Handle button click
  const handleButtonClick = (id) => {
    alert(`Button clicked for row: ${id}`); // Customize the action
  };


  const theme = isDarkMode == 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'
  const columnDefs = [
    {
      headerName: 'Logo',
      field: 'logo',
      cellRenderer: (params: any) => {
        if (params?.value) {
          return <img src="${params.value}" width="50" height="50" alt="Cafe Logo" />
        }
        return 'No Logo'
      },
      width: 100,
    },
    { headerName: 'Name', field: 'name', width: 200 },
    { headerName: 'Description', field: 'description', width: 300 },
    { headerName: 'No. of Employees', field: 'employees'},
    { headerName: 'Location', field: 'location', width: 150 },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        // Define the button renderer inline
        return (
          <>
            <Button onClick={() => handleButtonClick(params.data.id)}>
            Edit
            </Button>
            <Button onClick={() => handleButtonClick(params.data.id)}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className={ theme } style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={cafes}
        columnDefs={columnDefs}
        loading={loading}
        pagination
        paginationPageSize={10}
      />
    </div>
  );
};

export default CafeGrid;
