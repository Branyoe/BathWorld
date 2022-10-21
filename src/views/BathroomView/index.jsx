import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState, useCallback } from "react";
// import { useAuth } from "../../context/authContext";
import { addComment, watchComments } from "../../DB";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as yup from "yup";
import { useFormik } from "formik";
import Comments from "./components/Comments";
import { Loading } from "../../components";
import { useAuth } from "../../context/authContext"

export default function BathroomView({bathroom, setOpen}) {
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  

  const queryComments = useCallback(async () => {
    await watchComments(bathroom.id, setComments);
  }, [setComments, bathroom.id])

  useEffect(() => {
    queryComments()
  }, [queryComments])

  const validationSchema = yup.object({
    calf: yup
      .number('solo numeros')
      .required('campo requerido')
      .min(0, "valores del 0 al 5")
      .max(5, "valores del 0 al 5")
  });

  const formik = useFormik({
    initialValues: {
      calf: 0
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

    },
  });

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
      <Box sx={{ bgcolor: "#eee", height: "100vh", width: "100vw" }}>
        <Box sx={{ padding: 1, paddingTop: 1 }}>
          <Stack mb={3}>
            <Grid container spacing={1}>
              <Grid maxHeight="85px" item xs={4}>
                <Box onClick={() => {
                  setOpen()
                }} sx={{ height: "100%", bgcolor: "white", p: 1, borderRadius: 3 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.primary"
                    fontWeight={600}
                    align="center"
                  >
                    Calificación
                  </Typography>
                  <Typography
                    variant="h4"
                    align="center"
                  >
                    4
                  </Typography>
                </Box>
              </Grid>
              <Grid maxHeight="85px" item xs={8}>
                <Box overflow="scroll" sx={{ height: "100%", bgcolor: "white", p: 1, borderRadius: 3 }}>

                  <Typography
                    variant="h6"
                    color="text.primary"
                    fontWeight={500}
                  >
                    {bathroom.name}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Stack>
          <Stack
            bgcolor="white"
            mb={2}
            borderRadius={3}
            p={1}
          >
            <Stack>
              <Typography
                variant="subtitle2"
              >
                Tipo
              </Typography>
              <Stack direction="row" alignItems="center">
                <AttachMoneyIcon fontSize="large" />
                <Typography variant="h5" >{bathroom.type}</Typography>
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
                Ubicación
              </Typography>
              <Stack direction="row" alignItems="center">
                <LocationOnIcon fontSize="large" />
                <Typography variant="subtitle2" >{bathroom.lat}, {bathroom.lng}</Typography>
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