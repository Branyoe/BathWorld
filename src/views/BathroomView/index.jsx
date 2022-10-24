import { Avatar, Button, Divider, Rating, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState, useCallback } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { addComment, watchComments } from "../../DB";
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as yup from "yup";
import { useFormik } from "formik";
// import Comments from "./components/Comments";
import { Loading } from "../../components";
import { useAuth } from "../../context/authContext"
// import { MapContext } from "../../context";

import "./index.css"
import { Comments } from "./components/Comments";

export default function BathroomView({ bathroom, setOpen }) {
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  // const { map } = useContext(MapContext);


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
      <Box className="main-container">
        <Box className="close-btn">
          <CloseIcon sx={{ color: "white" }} onClick={() => setOpen()} />
        </Box>
        <Box className="main-img-container">
          <Avatar variant="square" sx={{ height: "100%", width: "100%" }} src="/static/images/avatar/2.jpg" >B</Avatar>
        </Box>
        <div className="details-container">
          <Stack className="title-container">
            <div className="name-container">
              <i className="fa-solid fa-toilet toilet-icon"></i>
              <p className="name-text">{bathroom.name}</p>
            </div>
            <div>
              <p className="adress-label">Dirección</p>
              <p className="adress-text">{bathroom.address}</p>
            </div>
            <div>
              <p className="adress-label">Calificación</p>
              <div className="rating-container">
                <div className="rating-inp">
                  <Rating
                    name="simple-controlled"
                    size="large"
                    value={4}
                    defaultValue={4}
                  />
                </div>
                <div className="rating-label">
                  {4}
                </div>
              </div>
            </div>
          </Stack>
        </div>
        <div className="comments-container">
          <div className="comments-box">
            <div className="comments-inp">
              <Stack
                component="form"
                onSubmit={commentFormik.handleSubmit}
                noValidate
                sx={{ mt: 0 }}
                direction="column"
                justifyContent="center"
                alignItems="center"
                px={1}
              >
                <TextField
                  id="standard-number"
                  label="Escribe aquí tu comentario"
                  type="string"
                  fullWidth
                  variant="standard"
                  name="comment"
                  value={commentFormik.values.comment}
                  onChange={commentFormik.handleChange}
                  error={commentFormik.touched.comment && Boolean(commentFormik.errors.comment)}
                  helperText={commentFormik.touched.comment && commentFormik.errors.comment}
                />
                <Button type="submit">Enviar</Button>
              </Stack>
              <Divider />
            </div>
            <div className="comments-list">
              <Comments data={comments} />
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}