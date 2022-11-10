import { Rating, styled } from "@mui/material";

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#745e3d',
  },
  '& .MuiRating-iconHover': {
    color: '#745e3d',
  },
});


export const MyRating = ({size, disable, ratingValue, setRatingValue, setOpenRatingDialog }) => {
  
  
  const handleOnChange = (event, newValue) => {
    setRatingValue(newValue);
    setOpenRatingDialog(true);
  }

  return (
    <StyledRating
      readOnly={disable ? true : false}
      name="simple-controlled"
      defaultValue={0}
      size={size ? size : "large"}
      sx={{ gap: 1 }}
      icon={<i className="fa-solid fa-poop"></i>}
      emptyIcon={<i className="fa-solid fa-poop"></i>}
      value={ratingValue}
      onChange={(event, newValue) => handleOnChange(event, newValue)}
    />
  );
}