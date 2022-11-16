import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { BathroomsContext } from '../../../context';
import { ListItemButton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCommentByUserEmail } from '../../../DB';
import VisitsError from '../../../assets/VisitsError.svg'
import ErrorComponent from '../../Home/components/ErrorComponent';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VisistsDialog({ open, setOpen, user }) {
  const [comments, setComents] = React.useState([]);
  const { bathrooms } = React.useContext(BathroomsContext);
  const navigator = useNavigate();

  const queryComment = React.useCallback(async () => {
    const foundComment = await getCommentByUserEmail(user.email);
    setComents(foundComment);
  }, [user])

  React.useEffect(() => {
    queryComment();
  }, [queryComment])

  const getBathsData = () => {
    return comments.map(comment => {
      return bathrooms.find(bath => bath.id === comment.bathroomId);
    });
  }

  const handleClose = () => {
    setOpen(false);
  };

  const loadingManager = () => {
    if (!comments.length) return (
      <ErrorComponent
        source={VisitsError}
        msg="Aún no has visitado un baño"
      />
    );
    return (
      <List>
        {getBathsData().map((b) => (
          <Stack key={b.id}>
            <ListItemButton
              onClick={() => {
                navigator(`/bathroom/${b.id}`)
              }}
            >
              <ListItemText primary={b.name} secondary={b.address} />
            </ListItemButton>
            <Divider />
          </Stack>
        ))}
      </List>
    );
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
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
              Baños Visitados
            </Typography>
          </Toolbar>
        </AppBar>
        {loadingManager()}
      </Dialog>
    </div>
  );
}
