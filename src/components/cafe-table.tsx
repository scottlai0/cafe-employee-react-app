import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { deleteCafe } from '../services/cafes-service';
import { useState } from 'react';
import ConfirmDeleteCafeModal from './confirm-delete-cafe-modal';

const CafeGrid = ({ isDarkMode, cafe_data, loading, onEditCafe, onRefresh }: any) => {
  
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  
  const navigate = useNavigate();

  const theme = isDarkMode === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';

  const columnDefs = [
    {
      headerName: 'Cafe ID',
      field: 'id',
    },
    {
      headerName: 'Logo',
      field: 'logo',
      cellRenderer: (params: any) => {
        if (params.value) {
          return (
            <img src={`data:image/png;base64,${params.value}`} 
            width="40" 
            height="40" 
            alt="Cafe Logo" />
          )
        } else {
          return (
            'No Logo'
          )
        }
      },
      width: 100,
    },
    { headerName: 'Name', field: 'name', width: 200 },
    { headerName: 'Description', field: 'description', width: 300 },
    { headerName: 'Location', field: 'location', width: 150 },
    {
      headerName: 'Employees',
      field: 'employees',
      cellRenderer: (params: any) => (
        <>
          <Button onClick={() => navigate({ to: `/employees/${params.data.id}` })}>
            <OpenInNewIcon sx={{ fontSize: 'medium' }} />
          </Button>
          {params.data.employees}
        </>
      ),
    },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => (
        <>
          <Button onClick={() => onEditCafe(params.data)}>Edit</Button>
          <Button
            onClick={() => {
              setSelectedCafe(params.data);
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
    if (selectedCafe) {
      await deleteCafe((selectedCafe as any).id);
      setOpenDeleteModal(false);
      setSelectedCafe(null);
      // Call the onRefresh function to refresh the data after deletion
      onRefresh();
    }
  };

  return (
    <>
      <div className={theme} style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={cafe_data} // Use cafe_data directly from props
          columnDefs={columnDefs}
          loading={loading}
          pagination
          paginationPageSize={10}
        />
      </div>
      <ConfirmDeleteCafeModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        selectedCafe={selectedCafe}
      />
    </>
  );
};

export default CafeGrid;
