import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
// icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function AppMenu({ open, setOpen, items = [] }) {

  const navigate = useNavigate();

  const toggleMenu = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleItemClick = (path) => {
    navigate(path);
    toggleMenu(false)();
  }

  const MenuList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleMenu(false)}
      height={'100%'}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          p={1}
        >
          <AccountCircleIcon fontSize='large' />
          <Typography variant="h6">
            Admin
          </Typography>
        </Stack>
        <Divider />
        <List>
          {items.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => handleItemClick(item.path)}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: "#1976D2" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Stack p={2}>
        <Button variant="contained" color='error'>Cerrar sesión</Button>
      </Stack>
    </Box>
  );

  return (
    <Drawer open={open} onClose={toggleMenu(false)}>
      {MenuList}
    </Drawer>
  );
}
