import { Fab } from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Stack } from "@mui/system";
import { useContext } from "react";
import { BathroomsContext, MapContext } from "../../context";

export const BtnMyLocation = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation, queryLocation } = useContext(BathroomsContext);

  const handleClick = () => {
    if(!isMapReady) throw new Error('Mapa no está listo');
    // if(!userLocation) throw new Error('Hubicación de usuario inexistente');
    if(!userLocation) {
      queryLocation();
      return
    }
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
        <Fab onClick={handleClick} size="medium" color="primary" aria-label="add">
          <MyLocationIcon />
        </Fab>
      </Stack>
    </>
  );
}