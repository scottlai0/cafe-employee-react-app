import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import { Autocomplete, createTheme, Divider, FormControl, styled, TextField, ThemeProvider } from '@mui/material';

import { Controller, useForm } from 'react-hook-form';
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

export default function AddEditEmployeeModal({ 
  cafe_data, 
  selected_cafe_info,
  employee_data, 
  isEditMode, 
  open, 
  onClose, 
  onSuccess,
}) {

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  const cafe_options = cafe_data?.map((e: any) => {
    return { id: e.id, name: e.name }
  })

  const resetValues = () => {
    setValue('employee_id', '');
    setValue('name', '');
    setValue('email_address', '');
    setValue('phone_number', '');
    setValue('gender', '');
    setValue('cafe_id', selected_cafe_info?.id || '');
    setValue('start_date', null);
    setValue('end_date', null);
  }

  const cafe_id = watch('cafe_id')

  useEffect(() => {
    // Prefill values only if in edit mode and employee_data exists
    if (isEditMode && employee_data) {
      setValue('employee_id', employee_data.id || '');
      setValue('name', employee_data.name || '');
      setValue('email_address', employee_data.email_address || '');
      setValue('phone_number', employee_data.phone_number || '');
      setValue('gender', employee_data.gender || '');
      setValue('cafe_id', employee_data.cafe_id || selected_cafe_info?.id || null);
      setValue('cafe_name', null);
      setValue('start_date', employee_data.start_date || null);
      setValue('end_date', employee_data.end_date || null)
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
    console.log(data)
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

  // Cafe Dropdown config 
  const handleCafeNameChange = (event, new_value) => {
    console.log(new_value)
    if (new_value) {
      setValue('cafe_id', new_value.id)
    } else {
      setValue('cafe_id', '')
    }
  }

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
                <EditIcon sx={{ mr: 1 }} />
                <span>Edit Employee Information</span>
              </span>
            ) : (
              <>
                <AddCircleIcon sx={{ mr: 1 }} />
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
                defaultValue={isEditMode ? employee_data?.id : 'Employee ID will be auto-generated upon submission'}
                disabled={true}
              />
              <TextField
                label="Name"
                {...register('name', { required: '* Name is required' })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
              <TextField
                label="Email"
                {...register('email_address', { required: '* Email is required' })}
                error={!!errors.email_address}
                helperText={errors.email_address ? errors.email_address.message : ''}
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

              <Divider />

              <Typography sx={{ mt: 1 }}>Employment details</Typography>
              <Box sx = {{ display: 'flex', gap: 2}}>
                <TextField 
                  sx = {{ width: '40%' }}
                  label="Cafe ID"
                  disabled={true}
                  value={cafe_id?.id}
                />
                <Autocomplete
                  id="cafe_dropdown"
                  value={selected_cafe_info?.name}
                  sx={{ width: '100%' }}
                  options={cafe_options}
                  getOptionLabel={(option => option.name || '')}
                  renderInput={(params) => (
                    <TextField {...params} label="Cafe Name" />
                  )}
                  disabled={ !!selected_cafe_info?.id }
                  onChange={handleCafeNameChange}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                    onChange={(date) => {
                      const formatted_date = date.toISOString().split('T')[0]
                      setValue('start_date', formatted_date)
                    }}
                    sx={{ width: '100%' }} 
                    label="Start Date"
                  />
                  <DatePicker sx={{ width: '100%' }} label="End Date" />
                </LocalizationProvider>
              </Box>
              
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
