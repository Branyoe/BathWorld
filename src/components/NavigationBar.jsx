import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import BottomNavigation from "./BottomNavigation";

export const NavigationBar = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 3,
        width: "100%",
      }}
    >
      <Stack>
        <BottomNavigation/>
      </Stack>
    </Box>
  );
}