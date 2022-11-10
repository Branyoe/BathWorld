import * as React from 'react';
import BottomNav from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import appNavBarStore from '../stores/appNavBarStore';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export default function BottomNavigation() {
  // const [value, setValue] = React.useState('home');
  const { value, setValue } = appNavBarStore(state => ({
    setValue: state.setCurrent,
    value: state.current
  }))
  const navigator = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNav
      showLabels
      sx={{
        width: "auto",
        borderRadius: "10px",
        boxShadow: "0px 10px 26px -3px rgba(0, 0, 0, 0.31);"
      }}
      bgcolor="blue"
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Contacto"
        value="contact"
        icon={<SupportAgentIcon />}
        onClick={() => navigator('/contact')}
      />
      <BottomNavigationAction
        label="Catálogo"
        value="catalog"
        icon={<AutoStoriesIcon />}
        onClick={() => navigator('/catalog')}
      />
      <BottomNavigationAction
        label="Inicio"
        value="home"
        icon={<HomeIcon />}
        onClick={() => navigator('/')}
      />
      <BottomNavigationAction
        label="Perfil"
        value="profile"
        icon={<AccountCircleIcon />}
        onClick={() => navigator('/user')}
      />
    </BottomNav>
  );
}
