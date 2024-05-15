import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function AppMenu({ open, setOpen }) {

  const toggleMenu = (newOpen) => () => {
    setOpen(newOpen);
  };

  const MenuList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleMenu(false)}>
      <List>
        {['Inicio', 'Lista de baños', 'Agregar baño'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Drawer open={open} onClose={toggleMenu(false)}>
      {MenuList}
    </Drawer>
  );
}
