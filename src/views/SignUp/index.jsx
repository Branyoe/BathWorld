import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import L from '@mui/material/Link';
import appNavBarStore from '../../stores/appNavBarStore';
import LogoTest from "../../assets/logoTestF.jpg"
import { MapContext } from '../../context/map/MapContext';


const theme = createTheme();

export default function SignUp() {
  const {setReset} = React.useContext(MapContext)
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const {setShow} = appNavBarStore(state => ({
    setShow: state.setShow
  }));
  
  React.useEffect(() => {
    setShow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validationSchema = yup.object({
    email: yup
      .string('Sólo texto')
      .required('Campo requerido'),
    password: yup
      .string('Sólo texto')
      .min(8, "Mínimo 8 caracteres")
      .required("Campo requerido"),
    confirmPassword: yup
      .string('Sólo texto')
      .required("Campo requerido")
      .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
  });

  const dbErrors = {
    "Firebase: Error (auth/email-already-in-use).": "Error de autenticación",
    "Firebase: Error (auth/invalid-email).":  "Error de autenticación",
    "Firebase: Error (auth/network-request-failed).":  "Error de autenticación"
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await signUp(values.email, values.password);
        setIsLoading(false);
        setReset(true);
        window.localStorage.removeItem('TOUR_KEY')
        navigate('/')
      } catch (e) {
        setError(dbErrors[e.message] ? dbErrors[e.message] : e.message)
        setIsLoading(false);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar 
            sx={{ m: 1 }}
            src={LogoTest}
            variant="rounded"
          />
          <Typography component="h1" variant="h5">
            Regístrate
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  autoComplete="email"
                  id="email"
                  label="Correo electrónico"
                  autoFocus
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  autoComplete="new-password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  autoComplete="new-password"
                  label="Confirmar contraseña"
                  type="password"
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                {error && <Alert severity="error">{error}</Alert>}
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              loading={isLoading}
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Continuar
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-in">
                  <L component={Box} variant="body2">
                    ¿Ya tienes una cuenta? Inicia sesión.
                  </L>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
