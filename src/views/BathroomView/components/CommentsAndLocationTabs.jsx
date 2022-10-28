/* eslint import/no-webpack-loader-syntax: off */
//@js-ignore
import { Map, Marker } from '!mapbox-gl';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import { Comments } from "../components/Comments";
import DirectionsIcon from '@mui/icons-material/AssistantDirectionRounded';
import { useNavigate } from 'react-router-dom';
//@js-ignore
import mapboxgl from '!mapbox-gl';

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

export const CommentsAndLocationTabs = ({ bathroom, miniMap, setMiniMap, data }) => {
  const [value, setValue] = React.useState(0);
  const navigator = useNavigate();
  mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhbnlvZSIsImEiOiJjbDlncTVwaWowOWtrM3Vtd2R2aDZ3c3o0In0.MoFF_EjlzMATPJDHr-zqXA';


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const mapContainer = React.useRef(null);

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

      const markerElement = document.createElement('div');
      markerElement.className = 'marker';
      markerElement.style.backgroundImage = 'url(https://firebasestorage.googleapis.com/v0/b/bathworld-8b1e5.appspot.com/o/bathworld_icono.png?alt=media&token=a0b20773-4ef4-46e3-b97f-afb8b28c55ee)';
      markerElement.style.width = `${60}px`;
      markerElement.style.height = `${60}px`;
      markerElement.style.backgroundSize = '100%';
      const newMarker = new Marker({ element: markerElement })
      newMarker.setLngLat([bathroom.lng, bathroom.lat])
      newMarker.addTo(map);
    }
    if (!miniMap) initializeMap({ setMiniMap, mapContainer });
  }, [miniMap, setMiniMap, bathroom]);


  React.useEffect(() => {
    if (miniMap && value === 0) {
      document.getElementById("map").replaceWith(miniMap.getContainer());
    }
  }, [value, miniMap])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{ fontFamily: '"Poppins", sans-serif' }} label="Dirección" {...a11yProps(0)} />
          <Tab label="Comentarios" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack>
          {/* <p style={LABEL_STYLES}>Direccion</p> */}
          <p style={TEXT_STYLES}>{bathroom.address}</p>
        </Stack>
        <Box sx={{
          position: 'fixed',
          top: "calc(100% - 200px)",
          left: "calc(100% - 55px)",
          // bgcolor:"white",
          borderRadius: "50%",
          zIndex: 999,
          width: "30px",
          height: "30px",

        }}
          onClick={() => {
            navigator(`/route/${bathroom.id}`);
          }}
        >
          <DirectionsIcon sx={{ padding: 0, backgroundColor: 'white', borderRadius: '50%', width: "40px", height: "40px" }} color="primary" />
        </Box>
        <Box
          id="map"
          ref={(el) => mapContainer.current = el}
          sx={
            {
              mt: 2,
              height: '25vh',
              width: '100%',
            }
          }
        >
        </Box>
      </TabPanel >
      <TabPanel value={value} index={1}>
        <Comments data={data} />
      </TabPanel>
    </Box >
  );
}
