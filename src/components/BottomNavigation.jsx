import * as React from 'react';
import BottomNav from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useNavigate } from 'react-router-dom';
import appNavBarStore from '../stores/appNavBarStore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { styled } from '@mui/material/styles';
import AppIcon from '../assets/logoTestF.jpg'
import { Icon } from '@mui/material';

const NavAction = (props) => {
  const CustomBottomNavigationAction = styled(props => <BottomNavigationAction {...props} />)(
    () => ({
      '&.MuiBottomNavigationAction-root': {
        color: "#bbb",
        transition: "all .3s",
      },
      '&.Mui-selected': {
        color: "#eee",
        transition: "all .3s",
      },

    })
  )

  return <CustomBottomNavigationAction {...props} />
}

export default function BottomNavigation() {
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
      id="nav-bar"
      showLabels
      sx={{
        width: "auto",
        borderRadius: "10px",
        boxShadow: "0px 10px 26px -3px rgba(0, 0, 0, 0.31)",
        backgroundColor: "#0147a8",
        transition: "all .3s",
      }}
      value={value}
      onChange={handleChange}
    >
      <NavAction
        label="Contacto"
        value="contact"
        icon={<SupportAgentIcon />}
        onClick={() => navigator('/contact')}
      />
      <NavAction
        label="Catálogo"
        value="catalog"
        icon={<FormatListBulletedIcon />}
        onClick={() => navigator('/catalog')}
      />
      <NavAction
        label="Inicio"
        value="home"
        icon={
          <Icon>
            <img
              src={AppIcon}
              style={{
                width: "100%"
              }}
              alt="AppIcon"
            />
          </Icon>
        }
        onClick={() => navigator('/')}
      />
      <NavAction
        label="Perfil"
        value="profile"
        icon={<AccountCircleIcon />}
        onClick={() => navigator('/user')}
      />
    </BottomNav>
  );
}
