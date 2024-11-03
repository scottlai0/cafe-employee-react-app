import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { createTheme, Divider, FormControl, styled, TextField, ThemeProvider } from '@mui/material';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { addEmployee, updateEmployee } from '../services/employees-service';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};


const buttonTheme = createTheme({
  palette: {
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#03a9f4',
    },
  },
});

export default function AddEditEmployeeModal({ employee_data, isEditMode, open, onClose, onSuccess }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const resetValues = () => {
    setValue('employee_id', '');
    setValue('name', '');
    setValue('email_address', '');
    setValue('phone_number', '');
    setValue('gender', '');
    setValue('cafe_id', '');
    setValue('start_date', '');
    setValue('end_date', '');
  }

  useEffect(() => {
    // Prefill values only if in edit mode and employee_data exists
    if (isEditMode && employee_data) {
      setValue('employee_id', employee_data.id || '');
      setValue('name', employee_data.name || '');
      setValue('email_address', employee_data.email_address || '');
      setValue('phone_number', employee_data.phone_number || '');
      setValue('gender', employee_data.gender || '');
      setValue('cafe_id', employee_data.cafe_id || '');
      setValue('start_date', employee_data.start_date || '');
      setValue('end_date', employee_data.end_date || '')
    } else {
      // Reset for new employees
      resetValues()
    }
  }, [isEditMode, employee_data, setValue]);

  const handleCloseModal = () => {
    resetValues();
    onClose();
  }

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (isEditMode) {
        return await updateEmployee(formData);
      } else {
        return await addEmployee(formData);
      }
    },
    onSuccess: () => {
      onSuccess();
      handleCloseModal();
    },
    onError: (error) => {
      console.error("Error:", error);
    }
  });


  const onSubmit = async (data: any) => {
    const newData: any = {
      id: employee_data?.id,
      name: data.name,
      email_address: data.email_address,
      phone_number: data.phone_number,
      gender: data.gender,
      cafe_id: data.cafe_id,
      start_date: data.start_date,
      end_date: data.end_date
    }
  

    mutation.mutate(newData);
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 'bold' }}>
            {isEditMode ? (
              <span>
                <EditIcon sx={{ mr: 1 }}/> 
                <span>Edit Employee Information</span>
              </span>
            ) : (
              <>
                <AddCircleIcon sx={{ mr: 1 }}/>
                <span>Add New Employee</span>
              </>
            )}
          </Typography>
          <Divider />
          <Typography sx={{ my: 1 }}>Please enter Employee details.</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ mt: 2, gap: 2, width: '100%' }}>
              <TextField
                label="Employee ID"
                defaultValue={isEditMode ? employee_data?.id : 'ID will be auto-generated upon submission'}
                disabled={true} // Disable if in edit mode
              />
              <TextField 
                label="Name"
                {...register('name', { required: '* Name is required' })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
              <TextField 
                label="Email"
                {...register('Email', { required: '* Email is required' })}
                error={!!errors.Email}
                helperText={errors.Email ? errors.Email.message : ''}
              />
              <TextField 
                label="Phone Number"
                {...register('phone_number', { required: '* Phone number is required' })}
                error={!!errors.phone_number}
                helperText={errors.phone_number ? errors.phone_number.message : ''}
              />
               <TextField 
                label="Gender"
                {...register('gender', { required: '* Gender is required' })}
                error={!!errors.gender}
                helperText={errors.gender ? errors.gender.message : ''}
              />
              <TextField 
                label="Start Date"
                {...register('start_date', { required: '* Start Date is required' })}
                error={!!errors.start_date}
                helperText={errors.start_date ? errors.start_date.message : ''}
              />
              <TextField 
                label="End Date"
                {...register('start_date') }
              />

              <Divider />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 1, gap: 1 }}>
                <ThemeProvider theme={{ buttonTheme }}>
                  <Button 
                    type="submit" 
                    color="primary" 
                    variant="contained" 
                  >
                    {isEditMode ? 'Update Cafe' : 'Add Cafe'}
                  </Button>
                  <Button color="secondary" variant="contained" onClick={handleCloseModal}>Close</Button>
                </ThemeProvider>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
