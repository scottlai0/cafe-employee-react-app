import { Modal, Box, Typography, Button, Divider, TextField } from '@mui/material';

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

const ConfirmDeleteCafeModal = ({ open, onClose, onConfirm, selectedCafe }: any) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 'bold' }}>
          Confirm Deletion
        </Typography>
        <Divider />
        <Box sx={{ my: 2 }}>
          <Typography variant="body1">
            Are you sure you want to delete the following entry?
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 3, gap: 2, width: '100%' }}>
            <TextField
              label="Cafe ID"
              value={selectedCafe?.id || ''} // Use id for Cafe ID
              disabled={true}
            />
            <TextField
              label="Name"
              value={selectedCafe?.name || ''}
              disabled={true}
            />
            <TextField 
              label="Description"
              value={selectedCafe?.description || ''}
              disabled={true}
            />
            <TextField 
              label="Location"
              value={selectedCafe?.location || ''}
              disabled={true}
            />
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 1, gap: 1 }}>
          <Button 
            variant="outlined"
            onClick={onClose} 
            color="primary"
          >
            Cancel
          </Button>
          <Button 
            variant="outlined"
            onClick={() => {
              onConfirm(selectedCafe?.id); // Pass the cafe ID to the onConfirm function
            }} 
            color="secondary"
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteCafeModal;
