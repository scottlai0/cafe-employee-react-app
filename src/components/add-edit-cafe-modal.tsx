import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { createTheme, Divider, FormControl, styled, TextField, ThemeProvider } from '@mui/material';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateCafe, addCafe } from '../services/cafes-service';

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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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


export default function AddEditCafeModal({ cafe_data, isEditMode, open, onClose, onSuccess }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  // State to hold logo file
  const [logo, setLogo] = useState<File | null>(null);
  const [logoError, setLogoError] = useState('');

  useEffect(() => {
    // Prefill values only if in edit mode and cafe_data exists
    if (isEditMode && cafe_data) {
      setValue('cafe_id', cafe_data.id || '');
      setValue('name', cafe_data.name || '');
      setValue('description', cafe_data.description || '');
      setValue('location', cafe_data.location || '');
      setValue('logo', cafe_data.logo || null)
    } else {
      // Reset for new cafes
      setValue('cafe_id', ''); 
      setValue('name', '');
      setValue('description', '');
      setValue('location', '');
      setLogo(null);
    }
  }, [isEditMode, cafe_data, setValue]);

  const cafe_id = watch('cafe_id');
  const name = watch('name');
  const description = watch('description');
  const location = watch('location');


  const confirmCloseModal = () => {
    if (cafe_id !== '' || name !== '' || description !== '' || location !== '' || logo ) {
      if (confirm('Are you sure you want to close? Unsaved changes will be lost.')) {
        closeModal() 
      } 
    } else {
      closeModal()
    }
  }

  const closeModal = () => {
    // Reset for new cafes
    setValue('cafe_id', ''); 
    setValue('name', '');
    setValue('description', '');
    setValue('location', '');
    setLogo(null);
    onClose()
  }

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (isEditMode) {
        return await updateCafe(formData);
      } else {
        return await addCafe(formData);
      }
    },
    onSuccess: () => {
      onSuccess();
      closeModal();
    },
    onError: (error) => {
      console.error("Error:", error);
    }
  });

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      // Check if file size is greater than 2 MB
      if (file.size > 2 * 1024 * 1024) { 
        setLogoError('Logo file size must be less than 2 MB');
        setLogo(null);
      } else {
        setLogoError(''); 
        setLogo(file);
      }
    }
  };

  const onSubmit = async (data: any) => {
    const newData: any = {
      id: cafe_data?.id,
      name: data.name,
      description: data.description,
      location: data.location,
      logo: null
    }
  
    if (logo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert the file to byte data (ArrayBuffer)
        const byteData = reader.result as ArrayBuffer; // Ensure result is treated as ArrayBuffer
        const byteArray = new Uint8Array(byteData); // Convert ArrayBuffer to Uint8Array
  
        // Convert byte array to string
        const stringData = Array.from(byteArray)
          .map(byte => String.fromCharCode(byte))
          .join('');

        // Encode the string to base64
        const encodedLogo = btoa(stringData);
        newData.logo = encodedLogo;
  
        mutation.mutate(newData);
      };
      reader.readAsArrayBuffer(logo); 
      // Read the logo file as an ArrayBuffer
    
    } else {
      mutation.mutate(newData);
    }
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            onClose();
          }
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 'bold' }}>
            {isEditMode ? (
              <span>
                <EditIcon sx={{ mr: 1 }}/> 
                <span>Edit Cafe</span>
              </span>
            ) : (
              <>
                <AddCircleIcon sx={{ mr: 1 }}/>
                <span>Add New Cafe</span>
              </>
            )}
          </Typography>
          <Divider />
          <Typography sx={{ my: 1 }}>Please enter Cafe details.</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ mt: 2, gap: 2, width: '100%' }}>
              <TextField
                label="Cafe ID"
                defaultValue={isEditMode ? cafe_data?.id : 'ID will be auto-generated upon submission'}
                disabled={true} // Disable if in edit mode
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
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
              <TextField 
                label="Description"
                {...register('description', {
                  maxLength: {
                    value: 256,
                    message: 'Maximum character count is 256.'
                  }
                })}
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : ''}
              />
              <TextField 
                label="Location"
                {...register('location', { required: '* Location is required' })}
                error={!!errors.location}
                helperText={errors.location ? errors.location.message : ''}
              />
              <Box sx={{ mt: 2, border: '1px' }}>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Logo
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(onFileChange)}
                  />
                </Button>
                <Typography sx={{ fontSize: 'small' }}>
                  { logo && <>{logo?.name} uploaded!</> }
                </Typography>
                <Typography sx={{ color: 'red', fontSize: 'small' }}>
                  { logoError && `*${logoError}` }
                </Typography>
              </Box>

              <Divider />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 1, gap: 1 }}>
                <ThemeProvider theme={{ buttonTheme }}>
                  <Button 
                    type="submit" 
                    color="primary" 
                    variant="contained" 
                    disabled={ !!logoError }
                  >
                    {isEditMode ? 'Update Cafe' : 'Add Cafe'}
                  </Button>
                  <Button 
                    color="secondary" 
                    variant="contained" 
                    onClick={confirmCloseModal}
                  >
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
