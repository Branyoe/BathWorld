import { Box, Paper } from "@mui/material";
import { Stack } from "@mui/system";

const createCategoryTile = (name, img) => {
  return (
    <Paper
      sx={{
        height: 60,
        width: 60,
      }}
    >
      {name}
    </Paper>
  );
}

const categories = [
  {
    name: "Paga",
    img: "w"
  },
  {
    name: "Gratis",
    img: "w"
  },
  {
    name: "Paga",
    img: "w"
  },
] 
const CatalogView = () => {

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw"
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2
        }}
      >
        {
          categories.map(({name, img}) => (
            createCategoryTile(name, img)
          ))
        }
      </Stack>
    </Box>
  );
}

export default CatalogView;