/* eslint import/no-webpack-loader-syntax: off */
//@js-ignore
import { Map, Marker } from '!mapbox-gl';
import { Avatar, Button, Divider, IconButton, Rating, styled, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState, useCallback, useLayoutEffect, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { addComment, watchComments } from "../../DB";
import * as yup from "yup";
import { useFormik } from "formik";
import { Loading } from "../../components";
import { useAuth } from "../../context/authContext"
import { Comments } from "./components/Comments";
import { SendRounded } from "@mui/icons-material";

import "./index.css"
import { RatingDrawer } from "./components/RatingDrawer";
import { CommentsAndLocationTabs } from "./components/CommentsAndLocationTabs.jsx";

const LABEL_STYLES = {
  margin: 0,
  fontWeight: 600,
  fontFamily: '"Poppins", sans-serif',
  color: "#606060"
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'brown',
  },
  '& .MuiRating-iconHover': {
    color: 'brown',
  },
});


export default function BathroomView({ bathroom, setOpen }) {
  const [comments, setComments] = useState([]);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingDrawerOpen, setRatingDrawerOpen] = useState(false);
  const [miniMap, setMiniMap] = useState(null);
  const { user } = useAuth();


  const queryComments = useCallback(async () => {
    await watchComments(bathroom.id, setComments);
  }, [setComments, bathroom.id])

  useEffect(() => {
    queryComments()
  }, [queryComments])


  const commentVlidationSchema = yup.object({
    comment: yup
      .string('solo textor')
      .required('esto no puede estar vacio')
      .min(10, "mínimo 10 caracteres")
      .max(200, "maximo 200 caracteres")
  });

  const commentFormik = useFormik({
    initialValues: {
      comment: ""
    },
    validationSchema: commentVlidationSchema,
    onSubmit: async ({ comment }) => {
      await addComment(bathroom.id, user.email, comment);
      commentFormik.resetForm();
    }
  });

  if (!bathroom) return <Loading />

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          bgcolor: "#f0f0f0",
          overflow: "scroll"
        }}
      >
        {/* botón cerrar */}
        <Box
          sx={{
            position: "fixed",
            top: "10px",
            left: "2%",
            bgcolor: "#fff",
            height: "35px",
            width: "35px",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999
          }}
        >
          <CloseIcon color="#000" onClick={() => setOpen()} />
        </Box>
        {/* contenedor img */}
        <Box height="25vh" >
          <Avatar variant="square" sx={{ height: "100%", width: "100%" }} src={bathroom.mainPhoto}>
            <i style={{ color: "#fff", fontSize: "3rem" }} className="fa-solid fa-toilet"></i>
          </Avatar>
        </Box>
        {/* contenedor principal */}
        <Box sx={{
          height: "calc(100vh - 25vh)",
          px: 2.5
        }}>
          {/* contenedor nombre */}
          <Stack >
            <div className="name-container">
              <p className="name-text">{bathroom.name}</p>
            </div>
          </Stack>
          {/* contenedor detalles */}
          <Stack>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                bgcolor: 'background.paper',
                color: 'text.secondary',
                '& svg': {
                  m: 1.5,
                },
                '& hr': {
                  mx: 0.5,
                },
              }}
            >
              <Box mr={1}>
                <p style={LABEL_STYLES}>Valoración</p>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <p className="adress-text">
                    <i
                      className="fa-solid fa-poop"
                      style={{
                        marginRight: "10px",
                        color: "brown"
                      }}
                    ></i>
                    4.5
                  </p>
                </Box>
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box ml={1}>
                <p style={LABEL_STYLES}>Precio</p>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <p className="adress-text">
                    <i
                      className="fa-solid fa-tag"
                      style={{
                        marginRight: "10px"
                      }}
                    ></i>
                    {bathroom.type}
                  </p>
                </Box>
              </Box>
            </Box>
          </Stack>
          {/* contenedor calificacion */}
          <Stack mb={3}>
            <p style={LABEL_STYLES}>Califíca este baño</p>
            <Stack mt={.3}>
              <StyledRating
                name="simple-controlled"
                size="large"
                icon={<i className="fa-solid fa-poop"></i>}
                emptyIcon={<i className="fa-solid fa-poop"></i>}
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                  // setRatingDrawerOpen(true);
                }}
              />
            </Stack>
          </Stack>
          <CommentsAndLocationTabs
            address={bathroom.address}
            coords={[bathroom.lng, bathroom.lat]}
            miniMap={miniMap}
            setMiniMap={setMiniMap}
          />
        </Box>
        {/* <div className="comments-container">
          <div className="comments-box">
            <div className="comments-inp">
              <Stack
                component="form"
                onSubmit={commentFormik.handleSubmit}
                noValidate
                sx={{ mt: 0 }}
                direction="row"
                p={1}
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  id="standard-number"
                  label="Escribe aquí tu comentario"
                  type="string"
                  fullWidth
                  autoComplete="off"
                  variant="standard"
                  name="comment"
                  value={commentFormik.values.comment}
                  onChange={commentFormik.handleChange}
                  error={commentFormik.touched.comment && Boolean(commentFormik.errors.comment)}
                  helperText={commentFormik.touched.comment && commentFormik.errors.comment}
                />
                <Button type="submit"><SendRounded /></Button>
              </Stack>
              <Divider />
            </div>
            <div className="comments-list">
              <Comments data={comments} />
            </div>
          </div>
        </div> */}
        <RatingDrawer isOpen={ratingDrawerOpen} setIsOpen={setRatingDrawerOpen} />
      </Box>
    </>
  );
}