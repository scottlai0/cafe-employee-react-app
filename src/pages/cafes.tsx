import React, { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";

import CafeGrid from "../components/cafe-table";
import { fetchCafes } from "../services/cafes-service";
import AddEditCafeModel from "../components/add-edit-cafe-modal";

import { alpha, Box, Button, InputBase, styled, useTheme } from "@mui/material";

import AddHomeWorkTwoToneIcon from '@mui/icons-material/AddHomeWorkTwoTone';
import SearchIcon from '@mui/icons-material/Search';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));



const CafePage = () => {
	const isDarkMode  = useTheme().palette.mode

	// Modal logic
	const [isModalOpen, setIsModalOpen] = useState(false)
	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	// To fetch cafe data
  const { data, error, isLoading } = useQuery({
    queryKey: ['cafes'],
    queryFn: fetchCafes
  });

	if (isLoading) return <p>Loading cafes...</p>;
  if (error) return <p>Error loading cafes: {error.message}</p>;

  return (
    <>
			<Box sx={{ display: 'flex', py: 2, justifyContent: 'flex-end' }}>
      	<Button variant="contained" onClick={() => handleOpenModal() }>
					<AddHomeWorkTwoToneIcon sx={{ mr: 1}} />
					Add New Café
				</Button>
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{ 'aria-label': 'search' }}
						onChange={(e) => console.log(e.target.value)} // Implement filtering logic
					/>
				</Search>
			</Box>
			<CafeGrid isDarkMode={isDarkMode} cafes={data} loading={isLoading} />
			<AddEditCafeModel open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default CafePage;