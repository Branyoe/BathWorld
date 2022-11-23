import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function SignOutDialog({ open, setOpen, signOut }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Seguro que quieres cerrar sesión?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Cancelar</Button>
          <Button onClick={signOut} variant="contained" color="error">
            Serrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}