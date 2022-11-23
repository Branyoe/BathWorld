import { Rating, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#745e3d',
  },
  '& .MuiRating-iconHover': {
    color: '#745e3d',
  },
});


const labels = {
  1: 'Asqueroso',
  2: 'Malo',
  3: 'Ok',
  4: 'Bueno',
  5: 'Impecable',
};

export const MyRating = ({ size, disable, setLabel, label, ratingValue, setRatingValue, setOpenRatingDialog }) => {
  const [hover, setHover] = useState(-1);

  const handleOnChange = (newValue) => {
    setRatingValue(newValue);
    setOpenRatingDialog(true);
  }

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  if (disable) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: 'center',
        }}
      >
        <StyledRating
          sx={{ width: "fit-content" }}
          readOnly={true}
          name="simple-controlled"
          defaultValue={0}
          size={size ? size : "large"}
          icon={<i className="fa-solid fa-poop" style={{ marginRight: 5 }}></i>}
          emptyIcon={<i className="fa-solid fa-poop" style={{ marginRight: 5 }}></i>}
          value={ratingValue}
          onChange={(event, newValue) => handleOnChange(newValue)}
          getLabelText={getLabelText}
        />
        <Box sx={{ ml: 2 }}><Typography>{labels[ratingValue]}</Typography></Box>
      </Box>
    )
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: 'center',
        }}
      >
        <StyledRating
          sx={{ width: "fit-content" }}
          readOnly={false}
          name="simple-controlled"
          defaultValue={0}
          size={size ? size : "large"}
          icon={<i className="fa-solid fa-poop" style={{ marginRight: 5 }}></i>}
          emptyIcon={<i className="fa-solid fa-poop" style={{ marginRight: 5 }}></i>}
          value={ratingValue}
          onChange={(event, newValue) => handleOnChange(newValue)}
          getLabelText={getLabelText}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
            if (newHover !== -1) {
              setLabel(true);
            } else {
              setLabel(false);
            }
          }}
        />
        {label && <Box sx={{ ml: 2 }}><Typography>{labels[hover]}</Typography></Box>}
      </Box>
    )
  }

  // return (
  //   <StyledRating
  //     sx={{ width: "fit-content" }}
  //     readOnly={disable ? true : false}
  //     name="simple-controlled"
  //     defaultValue={0}
  //     size={size ? size : "large"}
  //     icon={<i className="fa-solid fa-poop" style={{ marginRight: 5 }}></i>}
  //     emptyIcon={<i className="fa-solid fa-poop" style={{ marginRight: 5 }}></i>}
  //     value={ratingValue}
  //     onChange={(event, newValue) => handleOnChange(newValue)}

  //   />
  // );
}