import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import traceRouteDialogStore from '../../../stores/traceRouteDialogStore';
import { InputAdornment, Stack, TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TraceRouteDialog() {
  const { isOpen, setIsOpen } = traceRouteDialogStore(state => ({
    isOpen: state.isOpen,
    setIsOpen: state.setIsOpen
  }))

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Trazar Ruta
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Ir
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Stack
            sx={{
              p: 1
            }}
          >
            <TextField
              id="outlined-required"
              label="Inicio"
              defaultValue="Tu ubicación"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MyLocationIcon />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
            />
          </Stack>
          <Divider />
          <Stack
            sx={{
              p: 1,
              mt: 1
            }}
          >
            <TextField
              id="outlined-required"
              label="Fin"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <i className="fa-solid fa-toilet"></i>
                  </InputAdornment>
                )
              }}
            />
          </Stack>
        </List>
      </Dialog>
    </div>
  );
}
