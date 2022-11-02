import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import BottomNavigation from "./BottomNavigation";

const style = {
  mainContainer: {

  }
}

export const NavigationBar = () => {
  return (
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
        <BottomNavigation/>
      </Stack>
    </Box>
  );
}