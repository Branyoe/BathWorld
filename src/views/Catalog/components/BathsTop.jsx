import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { ImageList, ImageListItem, ImageListItemBar, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MedalIcon from '../../../assets/medal.svg';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
  let t1 = []
  let t2 = []
  let t3 = []
  let t4 = []
  let t5 = []
  for (let i = 0; i < 10; i++) {
    if (i >= 0 && i < 2) {
      t1.push({...baths[i], podium: i});
    }
    if (i >= 2 && i < 4) {
      t2.push({...baths[i], podium: i});
    }
    if (i >= 4 && i < 6) {
      t3.push({...baths[i], podium: i});
    }
    if (i >= 6 && i < 8) {
      t4.push({...baths[i], podium: i});
    }
    if (i >= 8 && i < 10) {
      t5.push({...baths[i], podium: i});
    }
  }
  top.push(t1, t2, t3, t4, t5);
  return top;
}

function SwipeableTextMobileStepper({ bathrooms }) {
  const theme = useTheme();
  
  const [top10, setTop10] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 5;
  const navigator = useNavigate();

  const handleBathOnClick = (id) => {
    navigator(`/bathroom/${id}`);
  }

  React.useEffect(() => {
    if (!bathrooms || !bathrooms?.length) return;
    setTop10(getTop10(orderRating(bathrooms)));
  }, [bathrooms, setTop10])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const stepperBtns = () => {
    return (
      <>
        {/* botón atras */}
        {activeStep !== 0 &&
          <Box
            sx={{
              height: 40,
              width: 30,
              borderRadius: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: "#fff",
              position: "absolute",
              zIndex: 999,
              top: 130,
              left: 5,
            }}
            onClick={handleBack}
          >
            <ArrowBackIosNewIcon />
          </Box>
        }
        {/* botón siguiente */}
        {activeStep !== maxSteps - 1 &&
          <Box
            sx={{
              height: 40,
              width: 30,
              borderRadius: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: "#fff",
              position: "absolute",
              zIndex: 999,
              top: 130,
              right: 5,
            }}
            onClick={handleNext}
          >
            <ArrowForwardIosIcon />
          </Box>
        }
      </>
    )
  }

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#161616",
          }}
        >
          Top 10 mejores calificados
        </Typography>
      </Paper>
      {stepperBtns()}
      <AutoPlaySwipeableViews
        interval={6000}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {top10.map((bathGroup, i) => (
          <ImageList key={i} sx={{ width: "100%", height: 200 }}>
            {bathGroup.map((bath, j) => (
              <ImageListItem key={bath.name} onClick={() => handleBathOnClick(bath.id)}>
                <img
                  src={bath.mainPhoto}
                  srcSet={bath.mainPhoto}
                  alt={bath.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={bath.name}
                  subtitle={
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'white',
                      width: 50,
                      borderRadius: 100,
                      height: 20,
                      p: .2
                    }}>
                      <p
                        style={{
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: 700,
                          fontSize: ".8rem",
                          color: "#161616",
                        }}
                      >
                        <i
                          className="fa-solid fa-poop"
                          style={{
                            marginRight: ".3rem",
                            color: "#745e3d"
                          }}
                        ></i>
                        {bath.totalRating ? bath.totalRating.toFixed(1) : "S/N"}
                      </p>
                    </Box>}
                />
                <Box
                  sx={{
                    height: 65,
                    width: 65,
                    right: 2,
                    position: "absolute",
                  }}
                >
                  <Box
                    sx={{
                      height: 30,
                      width: "100%",
                      top: 25,
                      position: "absolute",
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: 700,
                      fontSize: "2rem",
                      color: "#CB6D51",
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {bath.podium + 1}
                  </Box>
                  <img src={MedalIcon} alt="medal icon" />
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        ))}
      </AutoPlaySwipeableViews>
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
        />
      </Stack>
    </Box >
  );
}

export default SwipeableTextMobileStepper;
