import { Search } from "@mui/icons-material";
import { Avatar, Grid, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Loading } from "../../../components";
import { useAuth } from "../../../context/authContext";
import { ResultsList } from "./ResultsList";

import LogoTest from "../../../assets/logoTestF.jpg"

export const SearchBar = () => {
  const { loading } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  if (loading) return <Loading />

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
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
            }}
          />
        </Grid>
      </Grid>
      <div className="search-list" >
        {searchValue && <ResultsList inpValue={searchValue} />}
      </div>
    </div>
  );
}