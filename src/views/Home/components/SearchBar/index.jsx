import { Search } from "@mui/icons-material";
import { Avatar, Grid, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { Loading } from "../../../../components";
import { useAuth } from "../../../../context/authContext";
import { ResultsList } from "../ResultsList";
import CloseIcon from '@mui/icons-material/Close';

import LogoTest from "../../../../assets/logoTestF.jpg"
import { BathroomsContext } from "../../../../context";
import { useNavigate } from "react-router-dom";



export const SearchBar = () => {
  const { loading } = useAuth();
  const { bathrooms } = useContext(BathroomsContext);
  const [searchValue, setSearchValue] = useState("");
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const navigator = useNavigate();

  if (loading) return <Loading />

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  }

  const handleItemClick = bathroom => {
    navigator(`/bathroom/${bathroom.id}`);
  }

  const handleToggleSearchBar = () => {
    if (toggleSearchBar) return (
      <>
        <Grid container
          className="SearchBar"
          sx={{
            bgcolor: "#0147a8",
            width: "100%",
            mx: 1,
            p: .7,
            height: "55px",
            borderRadius: "10px",
            placeItems: "center",
            transition: "all .3s",
            boxShadow: "0px 10px 26px -3px rgba(0, 0, 0, 0.31)",
          }}
        >
          <Grid item xs={1.5}>
            <Avatar
              variant="rounded"
              src={LogoTest}
            />
          </Grid>
          <Grid item xs
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <input
              autoFocus
              autoComplete="off"
              onChange={handleSearch}
              placeholder="Busca un baño"
              className="searchInp"
            />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"
              onClick={() => {
                setToggleSearchBar(false)
                setSearchValue("");
              }}
            >
              <CloseIcon sx={{ color: "#eee" }} />
            </IconButton>
          </Grid>
        </Grid>

      </>
    );

    return (
      <Grid container
        id="search"
        sx={{
          bgcolor: "#0147a8",
          width: "100px",
          height: "45px",
          borderRadius: 10,
          placeItems: "center",
          transition: "all .3s",
          boxShadow: "0px 10px 26px -3px rgba(0, 0, 0, 0.31)",
        }}
      >
        <Grid item xs pl={.4}>
          <Avatar
            variant="circle"
            src={LogoTest}
          />
        </Grid>
        <Grid item xs
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"
            onClick={() => setToggleSearchBar(true)}
          >
            <Search sx={{ color: "#eee" }} />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <div className="search-bar">
        {handleToggleSearchBar()}
      </div>
      <div className="search-list" >
        {
          toggleSearchBar && searchValue
          &&
          <ResultsList
            searchValue={searchValue}
            data={bathrooms}
            onItemClick={handleItemClick}
          />
        }
      </div>
    </>
  );
}