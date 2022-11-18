import { Avatar, Box, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import PlazaIcon from "../../assets/categories/PlazaIcon.svg"
import SchoolIcon from "../../assets/categories/school.svg"
import RestaurantIcon from "../../assets/categories/RestaurantIcon.svg"
import GasolineraIcon from "../../assets/categories/gas-station-fuel-svgrepo-com.svg"
import StoreIcon from "../../assets/categories/store-svgrepo-com.svg"
import KioskoIcon from "../../assets/categories/KioskoIcon.png"
import OxxoIcon from "../../assets/categories/OxxoIcon.png"
import { BathroomsContext } from "../../context";
import { useContext, useState } from "react";
import { useEffect } from "react";
import BathsTop from "./components/BathsTop";
import BathCategory from "./components/BathCategory";
import bathroomViewStore from "../../stores/bathroomViewStore";
import appNavBarStore from "../../stores/appNavBarStore";


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
        m: 1,
        backgroundColor: categoryActive === name && "#1976d2"
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          height: "80px",
          width: "90px",
          bgcolor: "transparent"
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "70%",
            width: "100%",
          }}
        >
          <Avatar
            src={img}
            variant="rounded"
            sx={{
              // height: "100%",
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
              fontFamily: '"Nunito", sans-serif',
              fontWeight: 700,
              fontSize: ".9rem",
            }}
          >{name}</p>
        </Stack>
      </Box>
    </Paper>
  );
}

const CatalogView = () => {
  const { bathrooms } = useContext(BathroomsContext);
  const [categoryActive, setCategoryActive] = useState("");
  const { setRoute } = bathroomViewStore(state => ({
    setRoute: state.setRoute
  }))
  const {setShow, setValue} = appNavBarStore(state => ({
    setShow: state.setShow,
    setValue: state.setCurrent
  }));

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
      {/* // Categorias */}
      <Box width="100">
        <Stack
          mx={2}
          py={1}
        >
          <h2
            style={{
              fontFamily: '"Nunito", sans-serif',
              fontWeight: 800,
              fontSize: "1.3rem",
            }}
          >Categorías</h2>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            overflow: "scroll",
          }}
        >
          {
            categories.map(({ name, img }) => (
              createCategoryTile(name, img, () => {
                if(categoryActive === ""){
                  setCategoryActive(name);
                }else{
                  if(categoryActive === name){
                    setCategoryActive("");
                  }else{
                    setCategoryActive(name);
                  }
                }
              }, categoryActive)
            ))
          }
        </Stack>
      </Box>
      {/* //top 10 */}
      {categoryActive === "" && <BathsTop bathrooms={bathrooms} />}
      {categoryActive !== "" && <BathCategory baths={bathrooms} category={categoryActive}/>}
      <Box height="70px" />
    </Box >
  );
}

export default CatalogView;