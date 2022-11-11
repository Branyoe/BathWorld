import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function BathCard({ bath }) {
  const navigator = useNavigate();

  const handleBathOnClick = (id) => {
    navigator(`/bathroom/${id}`);
  }

  return (
    <Card
      sx={{
        display: 'flex',
        mb: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alingItems: 'space-between',
      }}
      onClick={() => handleBathOnClick(bath.id)}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" sx={{
            fontFamily: '"Nunito", sans-serif',
            width: "200px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            fontWeight: 800,
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
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={bath.mainPhoto}
        alt="sin imagen"
      />
    </Card>
  );
}
