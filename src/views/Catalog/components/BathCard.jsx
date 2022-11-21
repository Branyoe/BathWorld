import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Avatar, Grid, Paper, Skeleton } from '@mui/material';

export default function BathCard({ bath }) {
  const navigator = useNavigate();

  const handleBathOnClick = (id) => {
    navigator(`/bathroom/${id}`);
  }

  return (
    <>
      <Paper 
        elevation={2} 
        sx={{ marginBottom: "8px" }}
        onClick={() => handleBathOnClick(bath.id)}
      >
        <Grid container >
          <Grid item xs={8} p={1}>
            <Typography component="div" sx={{
              // fontFamily: '"Nunito", sans-serif',
              width: "auto",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              fontWeight: 600,
              fontSize: "1rem",
            }}>
              {bath.name}
            </Typography>
            <Box sx={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <p className="adress-text">
                <i
                  className="fa-solid fa-poop"
                  style={{
                    marginRight: ".3rem",
                    color: "#745e3d"
                  }}
                ></i>
                {bath.totalRating ? bath.totalRating.toFixed(1) : "S/N"}
              </p>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Avatar
              sx={{
                width: "100%",
                height: "80px"
              }}
              variant="square"
              src={bath.mainPhoto}
            >
              <Skeleton 
                width="100%" 
                height="100%" 
                variant="rectangular"
                animation="wave"
              />
            </Avatar>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
