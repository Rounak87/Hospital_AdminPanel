import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        className: 'rounded-2xl bg-blue-50',
        style: { borderRadius: 20 }
      }}
    >
      <DialogTitle>
        <span className="text-xl font-bold text-teal-700">{title}</span>
      </DialogTitle>
      <Divider />
      <DialogContent className="!bg-blue-50">
        <DialogContentText className="text-blue-900">{description}</DialogContentText>
      </DialogContent>
      <DialogActions className="!bg-blue-50 pb-4 pr-6">
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderRadius: '0.75rem',
            color: '#0ea5e9',
            borderColor: '#0ea5e9',
            textTransform: 'none',
            fontWeight: 600,
            mr: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{
            borderRadius: '0.75rem',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            boxShadow: 2,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
