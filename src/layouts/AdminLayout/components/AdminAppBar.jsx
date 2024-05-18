import * as React from 'react';

import PropTypes from 'prop-types';

// material-ui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import { IconButton } from '@mui/material';
// stores
import adminAppBarStore from '../../../stores/adminAppBarStore';
// icons
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// components
import AppMenu from './AppMenu';
function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const AppMenuItems = [
  {
    text: "Inicio",
    path: "/admin",
    icon: <HomeIcon />,
  },
  {
    text: "Lista de Baños",
    path: "/admin/baths",
    icon: <FormatListBulletedIcon />,
  },
  {
    text: "Agregar Baño",
    path: "/admin/baths/add/",
    icon: <AddCircleOutlineIcon />,
  },
];

export default function AdminAppBar(props) {
  const [open, setOpen] = React.useState(false);

  const { title } = adminAppBarStore(state => ({
    title: state.title
  }));


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box sx={{ my: 2 }}>
          {/* ------[ Children here ]------ */}
          {props.children} 
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <AppMenu items={AppMenuItems} setOpen={setOpen} open={open} />
    </React.Fragment>
  );
}
