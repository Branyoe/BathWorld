import { Avatar, Box, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import PlazaIcon from "../../assets/categories/PlazaIcon.svg"
import SchoolIcon from "../../assets/categories/school.svg"
import RestaurantIcon from "../../assets/categories/RestaurantIcon.svg"
import GasolineraIcon from "../../assets/categories/gas-station-fuel-svgrepo-com.svg"
import StoreIcon from "../../assets/categories/store-svgrepo-com.svg"
import KioskoIcon from "../../assets/categories/KioskoIcon.png"
import OxxoIcon from "../../assets/categories/OxxoIcon.png"
import { BathroomsContext } from "../../context";
import { useContext } from "react";
import { useEffect } from "react";
import BathsTop from "./components/BathsTop";
import bathroomViewStore from "../../stores/bathroomViewStore";
import appNavBarStore from "../../stores/appNavBarStore";
import { useNavigate } from "react-router-dom";


const categories = [
  {
    name: "Escuela",
    img: SchoolIcon
  },
  {
    name: "Kiosko",
    img: KioskoIcon
  },
  {
    name: "Oxxo",
    img: OxxoIcon
  },
  {
    name: "Plaza",
    img: PlazaIcon
  },
  {
    name: "Restaurante",
    img: RestaurantIcon
  },
  {
    name: "Gasolinera",
    img: GasolineraIcon
  },
  {
    name: "Tienda",
    img: StoreIcon
  },
]

const createCategoryTile = (name, img, onClick, categoryActive) => {

  return (
    <Paper
      key={name}
      elevation={3}
      sx={{
        // m: 1,
        backgroundColor: categoryActive === name && "#1976d2"
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          py: 1,
          width: "100%",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "70%",
            mb: .5
          }}
        >
          <Avatar
            src={img}
            variant="rounded"
            sx={{
              witdh: "100%",
            }}
          />
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "30%",
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 500,
              fontSize: ".9rem",
              color: "#161616",
            }}
          >{name}</p>
        </Stack>
      </Box>
    </Paper>
  );
}

const CatalogView = () => {
  const { bathrooms } = useContext(BathroomsContext);
  const { setRoute } = bathroomViewStore(state => ({
    setRoute: state.setRoute
  }))
  const { setShow, setValue } = appNavBarStore(state => ({
    setShow: state.setShow,
    setValue: state.setCurrent
  }));
  const navigator = useNavigate();

  useEffect(() => {
    setShow(true);
    setValue("catalog");
    setRoute("/catalog");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "scroll"
      }}
    >
      {/* top 10 */}
      <BathsTop bathrooms={bathrooms} />

      {/* // Categorias */}
      <Box width="100" p={1}>
        {/* Titulo */}
        <Stack mx={1} py={1}>
          <p
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#161616",
            }}
          >Categorías</p>
        </Stack>
        {/* cuerpo */}
        <Grid container spacing={1.5}>
          {categories.map(({ name, img }) => (
            <Grid key={name} item xs={6}>
              {createCategoryTile(name, img, () => {
                navigator(`/catalog/${name}`)
              })}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box >
  );
}

export default CatalogView;