import { Avatar, Button, Divider, Rating, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState, useCallback } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { addComment, watchComments } from "../../DB";
import * as yup from "yup";
import { useFormik } from "formik";
import { Loading } from "../../components";
import { useAuth } from "../../context/authContext"
import { Comments } from "./components/Comments";
import { SendRounded } from "@mui/icons-material";

import "./index.css"

export default function BathroomView({ bathroom, setOpen }) {
  const [comments, setComments] = useState([]);
  const [ratingValue, setRatingValue] = useState(0);
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
              <p className="adress-label">Califíca este baño</p>
              <div className="rating-container">
                <div className="rating-inp">
                  <Rating
                    name="simple-controlled"
                    size="large"
                    value={ratingValue}
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                      
                    }}
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
                <Button  type="submit"><SendRounded /></Button>
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

// {/* <Stack mb={5}>
//             <Grid container spacing={1}>
//               <Grid maxHeight="85px" item xs={4}>
//                 <Box sx={{ height: "100%", bgcolor: "white", p: 1, borderRadius: 3 }}>
//                   <Avatar sx={{ height: 100, width: 100 }} src="/static/images/avatar/2.jpg" >B</Avatar>
//                 </Box>
//               </Grid>
//               <Grid maxHeight="85px" item xs={8}>
//                 <Box overflow="scroll" sx={{ maxHeight: "80px", bgcolor: "", p: 1 }}>
//                   <Typography
//                     variant="h6"
//                     fontWeight={600}
//                   >
//                     {bathroom.name}
//                   </Typography>
//                 </Box>
//                 <Stack>
//                   <Stack direction="row" alignItems="center">
//                     <AttachMoneyIcon fontSize="large" />
//                     <Typography variant="h6" >{bathroom.type}</Typography>
//                   </Stack>
//                 </Stack>
//               </Grid>
//               <Grid item xs={12} mt={8}>
//                 <Stack justifyContent="center" alignItems="center">
//                   <Typography mb={2} variant="h4" component="legend">5</Typography>
//                   <Rating
//                     name="simple-controlled"
//                     value={5}
//                     onChange={(event, newValue) => {
//                       // setValue(newValue);
//                     }}
//                   />
//                   <Typography mt={1} component="legend">Califica este baño</Typography>
//                 </Stack>
//               </Grid>
//             </Grid>
//           </Stack>
//           <Stack
//             bgcolor="white"
//             borderRadius={3}
//             mb={2}
//             p={1}
//             onClick={() => {
//               setOpen();
//               map?.flyTo({
//                 zoom: 16,
//                 center: [bathroom.lng, bathroom.lat]
//               })
//             }}
//           >
//             <Stack>
//               <Typography
//                 variant="subtitle2"
//               >
//                 Ubicación
//               </Typography>
//               <Stack direction="row" alignItems="center">
//                 <LocationOnIcon fontSize="large" />
//                 <Typography variant="subtitle2" >{bathroom.address}</Typography>
//               </Stack>
//             </Stack>
//           </Stack>
//           <Stack
//             bgcolor="white"
//             borderRadius={3}
//             mb={2}
//             p={1}
//           >
//             <Stack>
//               <Typography
//                 variant="subtitle2"
//               >
//                 Comentarios
//               </Typography>
//               <Stack
//                 component="form"
//                 onSubmit={commentFormik.handleSubmit}
//                 noValidate
//                 sx={{ mt: 0 }}
//                 direction="column"
//                 justifyContent="center"
//                 alignItems="center"
//                 pt={2}
//                 px={1}
//               >
//                 <TextField
//                   id="standard-number"
//                   label="Escribe aquí tu comentario"
//                   type="string"
//                   fullWidth
//                   variant="standard"
//                   name="comment"
//                   value={commentFormik.values.comment}
//                   onChange={commentFormik.handleChange}
//                   error={commentFormik.touched.comment && Boolean(commentFormik.errors.comment)}
//                   helperText={commentFormik.touched.comment && commentFormik.errors.comment}
//                 />
//                 <Button type="submit">Enviar</Button>
//               </Stack>
//               <Divider />
//               <Stack direction="row" alignItems="center">
//                 <Comments data={comments} />
//               </Stack>
//             </Stack>
//           </Stack> */}