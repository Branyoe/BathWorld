import styled from "@emotion/styled";
import { Avatar, Badge, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BathList from "./BathList";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 35,
  height: 35,
  // border: `2px solid ${theme.background.paper}`,
}));

const orderRating = (baths) => {
  let x = baths.sort((function (a, b) {
    if (!a.totalRating) a.totalRating = 0;
    if (!b.totalRating) b.totalRating = 0;
    if (a.totalRating > b.totalRating) {
      return -1;
    }
    if (a.totalRating < b.totalRating) {
      return 1;
    }
    return 0;
  }));
  return x;
}

const getTop10 = (baths) => {
  let top = [];
  for (let i = 0; i < 10; i++) {
    top.push(baths[i]);
  }
  return top;
}

const getTopResidue = (baths) => {
  let top = [];
  for (let i = 10; i < baths.length; i++) {
    top.push(baths[i]);
  }
  return top;
}

const BathsTop = ({ bathrooms }) => {
  const [top10, setTop10] = useState([]);
  const [topResidue, setTopResidue] = useState([]);
  const navigator = useNavigate();

  const handleBathOnClick = (id) => {
    navigator(`/bathroom/${id}`);
  }

  useEffect(() => {
    if (!bathrooms || !bathrooms?.length) return;
    setTop10(getTop10(orderRating(bathrooms)));
    setTopResidue(getTopResidue(orderRating(bathrooms)));
  }, [bathrooms, setTop10])

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
          >Top 10</h2>
        </Stack>
        <Stack
          direction="row"
          overflow="scroll"
        >
          {
            top10.map((bath, i) => (
              <Stack key={bath.id} >
                <Badge
                  onClick={() => handleBathOnClick(bath.id)}
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={<SmallAvatar sx={{ bgcolor: '#0164ec' }} src="12" alt={`${i + 1}`} />}
                >
                  <Avatar sx={{ width: "100px", height: "100px", margin: "0 15px" }} alt="1" src={bath.mainPhoto} />
                </Badge>
                <Stack
                  height="1rem"
                  width="100px"
                  px={1}
                  pt="4px"
                >
                  <p
                    style={{
                      fontFamily: '"Nunito", sans-serif',
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      fontWeight: 800,
                      fontSize: ".8rem",
                    }}
                  >{bath.name}</p>
                </Stack>
              </Stack>
            ))
          }
        </Stack>
      </Box>
      <Box width="100vw" >
        <BathList baths={topResidue} />
      </Box>
    </>
  );
}

export default BathsTop;