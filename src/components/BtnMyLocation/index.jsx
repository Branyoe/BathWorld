import { Fab } from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Stack } from "@mui/system";
import { useContext } from "react";
import { MapContext } from "../../context";
import UserLocationContext from "../../context/userLocation/userLocationContext";

export const BtnMyLocation = () => {
  const { map } = useContext(MapContext);
  const {userLocation, queryLocation, setIsErrorDialogOpen} = useContext(UserLocationContext);

  const handleClick = () => {
    if(!userLocation) {
      queryLocation();
      if(!userLocation) setIsErrorDialogOpen(true);
      return;
    }
    setIsErrorDialogOpen(false);
    map?.flyTo({
      zoom: 14,
      center: userLocation
    })
  }

  return (
    <>
      <Stack
        sx={{
          position: "absolute",
          top: "calc(100% - 190px)",
          left: "calc(100% - 60px)"
        }}
        justifyContent="end"
        alignItems="end" direction="column"
      >
        <Fab id="geolocate-btn" onClick={handleClick} size="medium" color="primary" aria-label="add">
          <MyLocationIcon />
        </Fab>
      </Stack>
    </>
  );
}