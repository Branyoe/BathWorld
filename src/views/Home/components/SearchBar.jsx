import { AccountCircle, Search } from "@mui/icons-material";
import { Avatar, IconButton, InputAdornment, Menu, MenuItem, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Loading } from "../../../components";
import { useAuth } from "../../../context/authContext";
import { ResultsList } from "./ResultsList";

import LogoTest from "../../../assets/logoTestF.jpg"
import navigationDrawerStore from "../../../stores/NavigationDrawerStore";

export const SearchBar = () => {
  const {setIsOpen} = navigationDrawerStore(state => ({
    setIsOpen: state.setIsOpen
  }))
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { logOut, loading } = useAuth();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogOutBtn = async () => {
    const x = await logOut();
    console.log(x);
    handleMenuClose();
  }

  if (loading) return <Loading/>

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogOutBtn}>Cerrar sesión</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className="search-bar">
      <Stack sx={{position: "absolute", bottom: 10, width: "90vw"}}>
        <TextField
          style={{ height: "30px"}}
          variant="standard"
          fullWidth
          id="fullWidth"
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
            startAdornment: (
              // <InputAdornment position="start">
              //   <AccountCircleIcon onClick={handleProfileMenuOpen} />
              // </InputAdornment>
              <InputAdornment sx={{mb: 2}} position="start">
                <Avatar
                  variant="rounded" 
                  src={LogoTest}
                  onClick={() => setIsOpen(true)}
                />
              </InputAdornment>
            ),
          }}
        />
        <div className="search-list" >
          {searchValue && <ResultsList inpValue={searchValue} />}
        </div>
        {renderMobileMenu}
        {renderMenu}
      </Stack>
    </div>
  );
}