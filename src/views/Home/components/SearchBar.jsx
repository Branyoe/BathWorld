import { AccountCircle, Search } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, InputAdornment, Menu, MenuItem, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Loading } from "../../../components";
import { useAuth } from "../../../context/authContext";
import { ResultsList } from "./ResultsList";

export const SearchBar = () => {
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
      <Stack>
        <TextField
          style={{ height: "30px" }}
          variant="standard"
          fullWidth
          id="fullWidth"
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircleIcon onClick={handleProfileMenuOpen} />
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