import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserLocationContext from '../context/userLocation/userLocationContext';

export default function GeolocationErrorDialog() {
  const { isErrorDialogOpen: open, setIsErrorDialogOpen: setOpen } = React.useContext(UserLocationContext);

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
          {"Parece que tenemos problemas con tu localización"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>Te recomendamos:</span> <br />
            <span>* Verificar que tu dispositivo cuente con loacalizador.</span> <br />
            <span>* Activar la localización en tu dispositivo.</span>  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
