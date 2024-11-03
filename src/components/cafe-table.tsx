import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { deleteCafe } from '../services/cafes-service';
import { useState } from 'react';
import ConfirmDeleteModal from './confirm-delete-cafe-modal';

const CafeGrid = ({ isDarkMode, cafe_data, loading, onEditCafe, onRefresh }) => {
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
      cellRenderer: (params) => (
        params.value ? (
          <img src={params.value} width="50" height="50" alt="Cafe Logo" />
        ) : (
          'No Logo'
        )
      ),
      width: 100,
    },
    { headerName: 'Name', field: 'name', width: 200 },
    { headerName: 'Description', field: 'description', width: 300 },
    { headerName: 'Location', field: 'location', width: 150 },
    {
      headerName: 'Employees',
      field: 'employees',
      cellRenderer: (params) => (
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
      cellRenderer: (params) => (
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
      await deleteCafe(selectedCafe.id);
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
      <ConfirmDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        selectedCafe={selectedCafe}
      />
    </>
  );
};

export default CafeGrid;
