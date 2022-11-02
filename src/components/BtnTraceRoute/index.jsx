import { Fab } from "@mui/material";
import MyLocationIcon from '@mui/icons-material/Directions';
import { Stack } from "@mui/system";
import traceRouteDialogStore from "../../stores/traceRouteDialogStore";

export const BtnTraceRoute = () => {
  const { setIsOpen} = traceRouteDialogStore(state => ({
    setIsOpen: state.setIsOpen
  }))

  const handleClick = () => {
    setIsOpen(true);
  }

  return (
    <>
      <Stack
        sx={{
          position: "absolute",
          top: "calc(100% - 130px)",
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