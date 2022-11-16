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
import { ListItemButton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCommentByUserEmail } from '../../../DB';
import Comment from '../../BathroomView/components/Comment';
import { BathroomsContext } from '../../../context/bathrooms/BathroomsContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReviewsDialog({ open, setOpen, user }) {
  const {bathrooms} = React.useContext(BathroomsContext);
  const [comments, setComents] = React.useState([]);
  const navigator = useNavigate();

  const queryComment = React.useCallback(async () => {
    const foundComment = await getCommentByUserEmail(user.email);
    setComents(foundComment);
  }, [user])

  const findBathData = (id) => {
    return bathrooms.find(b => b.id === id);
  }

  React.useEffect(() => {
    queryComment();
  }, [queryComment])

  const handleClose = () => {
    setOpen(false);
  };

  

  const loadingManager = () => {
    return (
      <List>
        {comments.map((c) => (
          <Stack key={c.id}>
            <ListItemButton
              sx={{padding: 0}}
              onClick={() => {
                navigator(`/bathroom/${c.bathroomId}`)
              }}
            >
              <Comment data={c} bathName={findBathData(c.bathroomId).name}/>
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
              Tus Reseñas
            </Typography>
          </Toolbar>
        </AppBar>
        {loadingManager()}
      </Dialog>
    </div>
  );
}
