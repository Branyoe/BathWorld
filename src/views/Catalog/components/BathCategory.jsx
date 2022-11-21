import { Box, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BathroomsContext } from "../../../context";
import BathList from "./BathList";
import CloseIcon from '@mui/icons-material/Close';
import bathroomViewStore from "../../../stores/bathroomViewStore";
import appNavBarStore from "../../../stores/appNavBarStore";

const filterByCategory = (category, baths) => {
  let filterBaths = []
  baths.forEach((bath) => {
    if (bath.tags) {
      let foundTag;
      foundTag = bath.tags.find(tag => tag === category.toLowerCase());
      if (foundTag) return filterBaths.push(bath);
    }
  });
  return filterBaths
}

const BathCategory = () => {
  const { setRoute } = bathroomViewStore(state => ({
    setRoute: state.setRoute
  }))
  const { setShow } = appNavBarStore(state => ({
    setShow: state.setShow
  }));
  const { bathrooms: baths } = useContext(BathroomsContext);
  const [filterBaths, setFilterBaths] = useState([]);
  const { category } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    setShow(false);
    setRoute(`/catalog/${category}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!baths || !baths?.length) return;
    setFilterBaths(filterByCategory(category, baths));
  }, [baths, setFilterBaths, category])

  return (
    <Box
      sx={{
        p: 0,
        m: 0,
        width: "100%",
        height: "100vh",
        overflow: "scroll"
      }}
    >
      {/* titulo */}
      <Box sx={{
        position: "fixed",
        width: "100vw",
        bgcolor: '#fff',
        zIndex: 999
      }}>
        {/* title */}
        <Stack
          sx={{
            mx: 1,
            py: 1,
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center"
          }}
        >
          {/* boton cerrar */}
          <Box
            sx={{
              bgcolor: "#0147a8",
              height: "35px",
              width: "35px",
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999,
              color: "#eee"
            }}
          >
            <CloseIcon onClick={() => navigator("/catalog")} />

          </Box>
          <h2
            style={{
              fontFamily: '"Roboto", sans-serif',
              fontWeight: 700,
              fontSize: "2rem",
            }}
          >{category}</h2>
        </Stack>
      </Box>

      {/* cuerpo */}
      <Box width="100vw" >
        <Box height="65px" />
        <BathList baths={filterBaths} />
        <Box height="80px" />
      </Box>
    </Box>
  );
}

export default BathCategory