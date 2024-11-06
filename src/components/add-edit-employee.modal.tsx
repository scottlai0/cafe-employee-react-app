import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Autocomplete, createTheme, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, styled, TextField, ThemeProvider } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { addEmployee, updateEmployee } from '../services/employees-service';
import dayjs from 'dayjs';

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
}: any) {
  const { register, handleSubmit, setValue, watch, control, formState: { errors } }: any = useForm();
  
  const cafe_options = cafe_data?.map((e: any) => ({ id: e.id, name: e.name }));
  
  const resetValues = () => {
    setValue('employee_id', '');
    setValue('name', '');
    setValue('email_address', '');
    setValue('phone_number', '');
    setValue('gender', '');
    setValue('cafe_id', selected_cafe_info?.id || '');
    setValue('cafe_name', selected_cafe_info?.name || '');
    setValue('start_date', null);
    setValue('end_date', null);
  };

  useEffect(() => {
    if (isEditMode && employee_data) {
      setValue('employee_id', employee_data.id || '');
      setValue('name', employee_data.name || '');
      setValue('email_address', employee_data.email_address || '');
      setValue('phone_number', employee_data.phone_number || '');
      setValue('gender', employee_data.gender || '');
      setValue('cafe_id', employee_data.cafe_id || selected_cafe_info?.id || null);
      setValue('cafe_name', employee_data.cafe_name || selected_cafe_info?.name || null);
      setValue('start_date', employee_data.start_date || null);
      setValue('end_date', employee_data.end_date || null);
    } else {
      resetValues();
    }
  }, [isEditMode, employee_data, setValue]);

  const handleCloseModal = () => {
    resetValues();
    onClose();
  };

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return isEditMode ? await updateEmployee(formData) : await addEmployee(formData);
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
      employee_id: employee_data?.id,
      name: data.name,
      email_address: data.email_address,
      phone_number: data.phone_number.toString(),
      gender: data.gender,
      cafe_id: data.cafe_id,
      cafe_name: data.cafe_name,
      start_date: data.start_date,
      end_date: data.end_date,
    };
    
    console.log(newData)
    mutation.mutate(newData);
  };

  const handleCafeNameChange = (event: any, new_value: any) => {
    setValue('cafe_id', new_value ? new_value.id : '');
    setValue('cafe_name', new_value ? new_value.name : '');

    return event;
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            onClose();
          }
          return event
        }}
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
                size="small"
              />
              <TextField
                label="Name"
                {...register('name', { 
                  required: '* Name is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum character count is 6.'
                  },
                  maxLength: {
                    value: 50,
                    message: 'Maximum character count is 50.'
                  }
                })}
                size="small"
                error={!!errors.name}
                helperText={errors.name ? errors.name?.message : ''}
              />
              <TextField
                label="Email"
                {...register('email_address', { 
                  required: '* Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email format.'
                  }
                })}
                size="small"
                error={!!errors.email_address}
                helperText={errors.email_address ? errors.email_address?.message : ''}
              />
              <TextField
                label="Phone Number"
                {...register('phone_number', { 
                  required: '* Phone number is required',
                  pattern: {
                    value: /^[89]\d{7}$/,
                    message: 'Invalid phone number format.'
                  }
                })}
                size="small"
                error={!!errors.phone_number}
                helperText={errors.phone_number ? errors.phone_number?.message : ''}
              />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: '* Gender is required' }}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      onChange={(e) => field.onChange(e.target.value)} // Set the gender value
                    >
                      <FormControlLabel value="Female" control={<Radio />} label="Female" />
                      <FormControlLabel value="Male" control={<Radio />} label="Male" />
                      <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  )}
                />
                {errors.gender && (
                  <Typography variant="body2" color="error">
                    {(errors as any).gender.message}
                  </Typography>
                )}
              </FormControl>
              <Divider />

              <Typography sx={{ mt: 1 }}>Employment details</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField 
                  sx={{ width: '40%' }}
                  label="Cafe ID"
                  disabled={true}
                  value={watch('cafe_id') || ''}
                  size="small"
                />
                <Autocomplete
                  id="cafe_dropdown"
                  value={cafe_options?.find((option: any) => option.name === watch('cafe_name')) || null}
                  sx={{ width: '100%' }}
                  options={cafe_options}
                  getOptionLabel={(option) => option.name || ''}
                  renderInput={(params) => (
                    <TextField {...params} label="Cafe Name" />
                  )}
                  onChange={handleCafeNameChange}
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                    value={watch('start_date') ? dayjs(watch('start_date')) : null}
                    onChange={(date: dayjs.Dayjs) => setValue('start_date', date ? date.format('YYYY-MM-DD') : null)}
                    sx={{ width: '100%' }} 
                    label="Start Date"
                  />
                  <DatePicker 
                    value={watch('end_date') ? dayjs(watch('end_date')) : null} 
                    onChange={(date) => setValue('end_date', date ? date.format('YYYY-MM-DD') : null)}
                    sx={{ width: '100%' }} 
                    label="End Date" 
                  />
                </LocalizationProvider>
              </Box>
              
              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 1, gap: 1 }}>
                <ThemeProvider theme={buttonTheme}>
                  <Button type="submit" color="primary" variant="contained">
                    {isEditMode ? 'Update Employee' : 'Add Employee'}
                  </Button>
                  <Button color="secondary" variant="contained" onClick={handleCloseModal}>
                    Close
                  </Button>
                </ThemeProvider>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
