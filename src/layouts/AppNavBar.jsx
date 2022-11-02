import { Box, Stack } from "@mui/material";
import matchPath from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import appNavBarStore from "../stores/appNavBarStore";

export const AppNavBar = ({ children }) => {
  const { show } = appNavBarStore(state => ({
    show: state.show
  }));

  if (!show) return children
  return (
    <>
      {children}
      <Box
        sx={{
          position: "absolute",
          bottom: 3,
          width: "100%",
        }}
      >
        <Stack
          sx={{
            margin: 1
          }}
        >
          <BottomNavigation />
        </Stack>
      </Box>
    </>
  );
}