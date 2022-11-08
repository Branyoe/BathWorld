import { Search } from "@mui/icons-material";
import { Avatar, Grid, InputAdornment, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Loading } from "../../../components";
import { useAuth } from "../../../context/authContext";
import { ResultsList } from "./ResultsList";

import LogoTest from "../../../assets/logoTestF.jpg"
import { BathroomsContext } from "../../../context";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const { loading } = useAuth();
  const {bathrooms} = useContext(BathroomsContext);
  const [searchValue, setSearchValue] = useState("");
  const navigator = useNavigate();

  if (loading) return <Loading />

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  }

  const handleItemClick = bathroom => {
    navigator(`/bathroom/${bathroom.id}`);
  }

  return (
    <div className="search-bar">
      <Grid container spacing={3}>
        <Grid item xs={1.5}>
          <Avatar
            variant="rounded"
            src={LogoTest}
            // onClick={() => setIsOpen(true)}
          />
        </Grid>
        <Grid item xs>
          <TextField
            style={{ height: "30px" }}
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
                <InputAdornment sx={{ mb: 2 }} position="start">
                </InputAdornment>
              ),
              autoComplete: "off"
            }}
          />
        </Grid>
      </Grid>
      <div className="search-list" >
        {
          searchValue 
          && 
          <ResultsList
            searchValue={searchValue} 
            data={bathrooms}
            onItemClick={handleItemClick}
          />
        }
      </div>
    </div>
  );
}