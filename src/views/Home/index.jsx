import React, { useEffect } from 'react'
import { BtnMyLocation } from '../../components';
import { BtnTraceRoute } from '../../components/BtnTraceRoute';
import appNavBarStore from '../../stores/appNavBarStore';
import bathroomViewStore from '../../stores/bathroomViewStore';
import MapComponent from './components/MapComponent';
import NavigationDrawer from './components/NavigationDrawer';
import { SearchBar } from './components/SearchBar';
import TraceRouteDialog from './components/TraceRouteDialog';
import useTour from '../../hooks/useTour';
import { Box, Typography } from '@mui/material';

const stepComponent = (title, body) => {
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 1
        }}
      >
        {title}
      </Typography>
      {body && <Typography variant="body1">{body}</Typography>}
    </Box>
  );
}

const STEPS = [
  {
    content: <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 1
        }}
      >
        Bienvenido a 
        <span style={{
          fontWeight: 700,
          color: '#0532FF'
        }}> BathWorld</span>
      </Typography>
      <Typography variant="body1">Encuentra un baño fácil y rápido.</Typography>
    </Box>,
    placement: 'center',
    target: 'body'
  },
  {
    content: stepComponent(
      'Pantalla de inicio',
      'Aquí puedes ver un mapa que indica la ubicación de todos los baños.'
    ),
    placement: 'center',
    target: 'body'
  },
  {
    content: stepComponent(
      'Barra de busqueda',
      'Úsala para buscar un baño en específico mediante palabras clave.'
    ),
    target: '#search'
  },
  {
    content: stepComponent(
      'Botón de localización',
      'Púlsalo y se enfocará tu ubicación en el mapa.'
    ),
    target: '#geolocate-btn'
  },
  {
    content: stepComponent(
      'Botón de ruta',
      'Úsalo cuando necesites trazar una ruta entre tu ubicación y un baño.'
    ),
    target: '#route-btn'
  },
  {
    content: stepComponent(
      'Barra de navegación',
      'Úsala para navegar entre las distintas páginas de la aplicación.'
    ),
    target: '#nav-bar'
  },
  {
    content: stepComponent(
      'Icono baño',
      'Representa la ubicación de un baño, púlsalo para ver mas información.'
    ),
    target: '#bath-icon'
  },
]

export const HomeView = () => {
  const { setShow } = appNavBarStore(state => ({
    setShow: state.setShow
  }));
  const { setRoute } = bathroomViewStore(state => ({
    setRoute: state.setRoute
  }))
  const tour = useTour(STEPS, 'TOUR_KEY')

  useEffect(() => {
    setShow(true);
    setRoute("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {tour}
      <MapComponent />
      <NavigationDrawer />
      <BtnMyLocation />
      <BtnTraceRoute />
      <SearchBar />
      {/* <GeolocationErrorDialog/> */}
      <TraceRouteDialog />
    </>
  );
}