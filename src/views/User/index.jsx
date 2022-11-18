import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { useAuth } from "../../context/authContext";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HistoryIcon from '@mui/icons-material/History';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LogoutIcon from '@mui/icons-material/Logout';
import VisistsDialog from "./components/VisitsDialog";
import { useEffect, useState } from "react";
import appNavBarStore from "../../stores/appNavBarStore";
import bathroomViewStore from "../../stores/bathroomViewStore";
import ReviewsDialog from "./components/ReviewsDialog";

export const UserView = () => {
  const { user, logOut } = useAuth();
  const [openVisits, setOpenVisits] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);
  const {setShow, setValue} = appNavBarStore(state => ({
    setShow: state.setShow,
    setValue: state.setCurrent
  }));
  const { setRoute } = bathroomViewStore(state => ({
    setRoute: state.setRoute
  }))
  
  useEffect(() => {
    setShow(true);
    setRoute("/user");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    setShow(true);
    setValue("profile");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogOutBtn = async () => {
    await logOut();
  }

  return (
    <Box>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3
        }}
      >
        <Avatar sx={{ width: "30vw", height: "30vw" }} />
      </Stack>
      <Stack>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem >
              <ListItemIcon>
                <AlternateEmailIcon />
              </ListItemIcon>
              <ListItemText primary="Correo electrónico" secondary={user.email} />
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenVisits(true)}>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Baños visitados" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenReviews(true)}>
                <ListItemIcon>
                  <ReviewsIcon />
                </ListItemIcon>
                <ListItemText primary="Tus reseñas" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogOutBtn}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Stack>
      <VisistsDialog open={openVisits} setOpen={setOpenVisits} user={user}/>
      <ReviewsDialog open={openReviews} setOpen={setOpenReviews} user={user}/>
    </Box>
  );
}