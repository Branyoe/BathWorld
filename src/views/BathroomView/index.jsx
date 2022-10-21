import { Avatar, Button, Divider, Grid, Rating, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState, useCallback, useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { addComment, watchComments } from "../../DB";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as yup from "yup";
import { useFormik } from "formik";
import Comments from "./components/Comments";
import { Loading } from "../../components";
import { useAuth } from "../../context/authContext"
import { MapContext } from "../../context";

export default function BathroomView({ bathroom, setOpen }) {
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const {map} = useContext(MapContext);


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
      <Box sx={{ height: "100vh", width: "100vw" }}>
        <CloseIcon
          style={{ position: "fixed", top: 10, left: "90%" }}
          onClick={() => setOpen()}
        />
        <Box sx={{ padding: 1, paddingTop: 4 }}>
          <Stack mb={5}>
            <Grid container spacing={1}>
              <Grid maxHeight="85px" item xs={4}>
                <Box sx={{ height: "100%", bgcolor: "white", p: 1, borderRadius: 3 }}>
                  <Avatar sx={{ height: 100, width: 100 }} src="/static/images/avatar/2.jpg" >B</Avatar>
                </Box>
              </Grid>
              <Grid maxHeight="85px" item xs={8}>
                <Box overflow="scroll" sx={{ maxHeight: "80px", bgcolor: "", p: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                  >
                    {bathroom.name}
                  </Typography>
                </Box>
                <Stack>
                  <Stack direction="row" alignItems="center">
                    <AttachMoneyIcon fontSize="large" />
                    <Typography variant="h6" >{bathroom.type}</Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} mt={8}>
                {/* <Stack
                bgcolor="white"
                borderRadius={3}
                mb={2}
                p={1}
              >
                <Stack>
                  <Stack
                    component="form"
                    onSubmit={formik.handleSubmit}
                    noValidate sx={{ mt: 0 }}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <TextField
                      id="standard-number"
                      label="Califíca este baño"
                      type="number"
                      variant="standard"
                      name="calf"
                      value={formik.values.calf}
                      onChange={formik.handleChange}
                      error={formik.touched.calf && Boolean(formik.errors.calf)}
                      helperText={formik.touched.calf && formik.errors.calf}
                    />
                    <Button type="submit">Enviar</Button>
                  </Stack>
                </Stack>
              </Stack> */}
                <Stack justifyContent="center" alignItems="center">
                  <Typography mb={2} variant="h4" component="legend">5</Typography>
                  <Rating
                    name="simple-controlled"
                    value={5}
                    onChange={(event, newValue) => {
                      // setValue(newValue);
                    }}
                  />
                  <Typography mt={1} component="legend">Califica este baño</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
          <Stack
            bgcolor="white"
            borderRadius={3}
            mb={2}
            p={1}
            onClick={() => {
              setOpen();
              map?.flyTo({
                zoom: 14,
                center: [bathroom.lng, bathroom.lat]
              })
            }}
          >
            <Stack>
              <Typography
                variant="subtitle2"
              >
                Ubicación
              </Typography>
              <Stack direction="row" alignItems="center">
                <LocationOnIcon fontSize="large" />
                <Typography variant="subtitle2" >{bathroom.address}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            bgcolor="white"
            borderRadius={3}
            mb={2}
            p={1}
          >
            <Stack>
              <Typography
                variant="subtitle2"
              >
                Comentarios
              </Typography>
              <Stack
                component="form"
                onSubmit={commentFormik.handleSubmit}
                noValidate
                sx={{ mt: 0 }}
                direction="column"
                justifyContent="center"
                alignItems="center"
                pt={2}
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
              <Stack direction="row" alignItems="center">
                <Comments data={comments} />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
}