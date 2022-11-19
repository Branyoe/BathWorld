/* eslint import/no-webpack-loader-syntax: off */
//@js-ignore
import { Map, Marker } from '!mapbox-gl';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MapIcon from '@mui/icons-material/Map';
import { Stack } from '@mui/system';
import { Comments } from "../components/Comments";
import DirectionsIcon from '@mui/icons-material/AssistantDirectionRounded';
import { useNavigate } from 'react-router-dom';
//@js-ignore
import mapboxgl from '!mapbox-gl';
import UserLocationContext from '../../../context/userLocation/userLocationContext';
import { MapContext } from '../../../context';
import { Button, Grid } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// const LABEL_STYLES = {
//   margin: 0,
//   fontWeight: 600,
//   fontFamily: '"Poppins", sans-serif',
//   color: "#606060"
// }

const TEXT_STYLES = {
  margin: 0,
  fontWeight: 400,
  fontSize: ".9rem",
  fontFamily: '"Poppins", sans-serif'
}

const markerElement = document.createElement('div');
markerElement.className = 'marker';
markerElement.style.backgroundImage = 'url(https://firebasestorage.googleapis.com/v0/b/bathworld-8b1e5.appspot.com/o/bathworld_icono.png?alt=media&token=a0b20773-4ef4-46e3-b97f-afb8b28c55ee)';
markerElement.style.width = `${60}px`;
markerElement.style.height = `${60}px`;
markerElement.style.backgroundSize = '100%';

export const CommentsAndLocationTabs = ({ bathroom, data }) => {
  const { map, miniMap, setMiniMap, miniMapMarker } = React.useContext(MapContext);
  const { userLocation, queryLocation, setIsErrorDialogOpen } = React.useContext(UserLocationContext);

  const [value, setValue] = React.useState(0);
  const navigator = useNavigate();
  mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhbnlvZSIsImEiOiJjbDlncTVwaWowOWtrM3Vtd2R2aDZ3c3o0In0.MoFF_EjlzMATPJDHr-zqXA';


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const mapContainer = React.useRef(null);

  React.useEffect(() => {
    queryLocation();
  }, [queryLocation]);

  //agrega y limpia marcadores
  React.useLayoutEffect(() => {
    if (!miniMap) return;
    markerElement.addEventListener('click', e => {
      navigator(`/`);
      map.flyTo({
        center: [bathroom.lng, bathroom.lat],
        zoom: 16
      })
    });
    const newMarker = new Marker(markerElement)
    newMarker.setLngLat([bathroom.lng, bathroom.lat])
    newMarker.addTo(miniMap);
    miniMap.setCenter([bathroom.lng, bathroom.lat])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [miniMap, miniMapMarker])

  // React.useEffect(() => {
  //   // return () => {
  //   //   console.log(marker);
  //   //   // marker.remove()
  //   // }
  //   if (miniMapMarker) setTimeout(() => {
  //     console.log("eliminado");
  //     miniMapMarker.remove();
  //     setMiniMapMarker(null);
  //   }, 3000)
  // }, [miniMapMarker])

  //inicia mapa
  React.useEffect(() => {
    const initializeMap = ({ setMiniMap, mapContainer }) => {
      const map = new Map({
        container: mapContainer.current, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [bathroom.lng, bathroom.lat], // starting position [lng, lat]
        zoom: 15, // starting zoom
        scroll: false,
        projection: 'globe' // display the map as a 3D globe
      });
      map.scrollZoom.disable();
      map.boxZoom.disable();
      map.dragRotate.disable();
      map.dragPan.disable();
      map.keyboard.disable();
      map.doubleClickZoom.disable();
      map.touchZoomRotate.disable();

      map.on('style.load', () => {
        map.setFog({});
        setMiniMap(map);
        // Set the default [-103.7366491808968, 19.283594842470652]ere style
      });
    }
    if (!miniMap) initializeMap({ setMiniMap, mapContainer });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [miniMap, bathroom]);

  //evita la recarga del mapa
  React.useEffect(() => {
    if (miniMap && value === 0) document.getElementById("map").replaceWith(miniMap.getContainer());
  }, [miniMap, value])

  const handleRouteBtn = () => {
    if (!userLocation) {
      setIsErrorDialogOpen(true);
    } else {
      setIsErrorDialogOpen(false);
      navigator(`/route/${bathroom.id}`);
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{ fontFamily: '"Poppins", sans-serif' }} label="Dirección" {...a11yProps(0)} />
          <Tab label="Reseñas" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack>
          <p style={TEXT_STYLES}>{bathroom.address}</p>
        </Stack>
        <Box
          id="map"
          ref={mapContainer}
          sx={
            {
              mt: 2,
              height: '25vh',
              width: '100%',
            }
          }
        >
        </Box>
        <Grid
          container
          spacing={1}
          my={.3}
        >
          <Grid item xs>
            <Stack>
              <Button
                variant="contained"
                endIcon={<MapIcon />}
                onClick={() => {
                  navigator(`/`);
                  map.flyTo({
                    center: [bathroom.lng, bathroom.lat],
                    zoom: 16
                  })
                }}
              >
                Ver en mapa
              </Button>
            </Stack>
          </Grid>
          <Grid item xs>
            <Stack>
              <Button
                variant="contained"
                onClick={handleRouteBtn}
                endIcon={<DirectionsIcon />}
              >
                Trazar ruta
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </TabPanel >
      <TabPanel value={value} index={1}>
        <Comments data={data} />
      </TabPanel>
    </Box >
  );
}
