import * as React from 'react';
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
import { ResultsList } from './ResultsList';
import { BathroomsContext } from '../../../context';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TraceRouteDialog() {
  const {bathrooms} = React.useContext(BathroomsContext);
  const { isOpen, setIsOpen } = traceRouteDialogStore(state => ({
    isOpen: state.isOpen,
    setIsOpen: state.setIsOpen
  }))
  const [endInpValue, setEndInpValue] = React.useState("");
  const navigator = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEndInpChange = ({ target: { value } }) => {
    setEndInpValue(value);
    console.log(endInpValue);
  }

  const handleItemClick = bath => {
    navigator(`/route/${bath.id}`)
  }

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
              value={endInpValue}
              onChange={handleEndInpChange}
            />
          </Stack>
          <Stack>
            {
              endInpValue 
              && 
              <ResultsList 
                searchValue={endInpValue} 
                data={bathrooms}
                onItemClick={handleItemClick}
              />
            }
          </Stack>
        </List>
      </Dialog>
    </div>
  );
}
