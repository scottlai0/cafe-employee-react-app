import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider } from '@mui/material';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export default function AddEditCafeModel({ open, onClose }) {
    return (
        <div>
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 'bold'}}>
                    Add New Cafe
                </Typography>
                <Divider />
                <Box sx={{ my: 2 }}>
                    ADSASD
                </Box>
                <Divider />
                <Box>
                    <Button>Add Entries</Button>
                </Box>
            </Box>
        </Modal>
    </div>
  );
}