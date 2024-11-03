import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CafeGrid from "../components/cafe-table";
import { fetchCafes } from "../services/cafes-service";
import AddEditCafeModal from "../components/add-edit-cafe-modal";
import { Box, Button, CircularProgress, TextField, useTheme } from "@mui/material";
import AddHomeWorkTwoToneIcon from '@mui/icons-material/AddHomeWorkTwoTone';
import SearchIcon from '@mui/icons-material/Search';

const CafePage = () => {
  const isDarkMode = useTheme().palette.mode;

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  
  // For filtering values in AGGrid based on search bar
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = () => {
    setIsEditMode(false);
    setSelectedCafe(null);
    setIsModalOpen(true);
  };

  const handleEditCafe = (cafe_row_data) => {
    setIsEditMode(true);
    setSelectedCafe(cafe_row_data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCafe(null);
  };

  // To fetch cafe data
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['cafes'],
    queryFn: fetchCafes,
  });

  // Filter cafes based on search term
  const filtered_data = data?.filter(cafe =>
    cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cafe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cafe.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress sx={{ mr: 1 }} />
        <p>Loading cafes...</p>
      </Box>
    );
  }

  if (error) return <p>Error loading cafes: {error.message}</p>;

  return (
    <>
      <Box sx={{ display: 'flex', py: 2, justifyContent: 'space-between', gap: 2 }}>
        <Button variant="contained" onClick={handleOpenModal}>
          <AddHomeWorkTwoToneIcon sx={{ mr: 1 }} />
          Add New Café
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
      <CafeGrid 
        isDarkMode={isDarkMode} 
        cafe_data={filtered_data} 
        loading={isLoading} 
        onEditCafe={handleEditCafe}
        onRefresh={refetch} // Pass the refetch function to CafeGrid
      />
      <AddEditCafeModal 
        cafe_data={selectedCafe} 
        isEditMode={isEditMode} 
        open={isModalOpen} 
        onClose={handleCloseModal} 
        onSuccess={refetch} // Call refetch on success
      />
    </>
  );
};

export default CafePage;
