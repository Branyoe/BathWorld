import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import BathList from "./BathList";

const filterByCategory = (category, baths) => {
  let filterBaths = [] 
  baths.foreach((bath) => {
    if (bath.tags){
      let foundTag;
      foundTag = bath.tags.find(tag => tag === category.toLowerCase());
      if(foundTag) return filterBaths.push(bath); 
    } 
  });
  return filterBaths
}

const BathCategory = ({ category, baths }) => {

  const [filterBaths, setFilterBaths] = useState([]);

  useEffect(() => {
    if (!baths || !baths?.length) return;
    setFilterBaths(filterByCategory(category, baths));
  }, [baths, setFilterBaths, category])

  return (
    <>
      <Box width="100vw">
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
          >{category}</h2>
        </Stack>

      </Box>
      <Box width="100vw" >
        <BathList baths={filterBaths} />
      </Box>
    </>
  );
}

export default BathCategory