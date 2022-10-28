import { Box } from "@mui/material";
import { LngLatBounds, Map, Marker } from "mapbox-gl";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Loading } from "../../components";
import { getBathroom } from "../../DB";
import CloseIcon from '@mui/icons-material/Close';
import { BathroomsContext } from "../../context";
import { directionsApi } from "../../apis/directionsApi";

export const RouteView = () => {

  const { id } = useParams()
  const navigator = useNavigate();

  const { userLocation } = useContext(BathroomsContext);

  const [bathroom, setBathroom] = useState();
  const [map, setMap] = useState();

  useEffect(() => {
    const getB = async () => {
      const b = await getBathroom(id);
      setBathroom({ id: b.id, ...b.data() });
    }
    getB();
  }, [id]);

  const getRouteBetweenPoints = async (start, end) => {
    const resp = await directionsApi.get(`/${start.join(',')};${end.join(',')}`);

    // const { distance, duration, geometry } = resp.data.routes[0];
    const { geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;

    // let kms = distance / 1000;
    // kms = Math.round(kms * 100);
    // kms /= 100;

    // let min = Math.floor(duration / 60);

    const bounds = new LngLatBounds(
      start,
      start
    )

    for (const coord of coords) {
      bounds.extend(coord)
    }

    map?.fitBounds(bounds, {
      padding: 50
    })

    //poliline
    const sourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }
    map.addSource('RouteString', sourceData)

    map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'blue',
        'line-width': 3
      }
    })
  }

  // const getRoute = (bathroom) => {
  //   getRouteBetweenPoints(userLocation, [bathroom.lng, bathroom.lat]);
  // }


  const mapContainer = useRef(null)

  useEffect(() => {
    if (!bathroom) return
    const map = new Map({
      container: mapContainer.current, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: userLocation, // starting position [lng, lat]
      zoom: 12, // starting zoom
      scroll: false,
      projection: 'globe' // display the map as a 3D globe
    });

    
    map.on('style.load', () => {
      setMap(map)
      // map.setFog({});
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
    newMarker.addTo(map)

    const el = document.createElement('div');
    const width = 60;
    const height = 60;
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://firebasestorage.googleapis.com/v0/b/bathworld-8b1e5.appspot.com/o/iconoUbicacion.png?alt=media&token=3bb7b17d-fcd1-4cf7-a0e4-f29432efacd2)';
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = '100%';
    new Marker({ element: el })
      .setLngLat(userLocation)
      .addTo(map)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bathroom])

  useEffect(() => {
    if (map) getRouteBetweenPoints(userLocation, [bathroom.lng, bathroom.lat]);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, getRouteBetweenPoints, bathroom])

  if (!bathroom) return <Loading />
  return (
    <Box>
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
        <CloseIcon color="#000" onClick={() => navigator(`/bathroom/${bathroom.id}`)} />
      </Box>
      <div
        ref={mapContainer}
        style={
          {
            height: '100vh',
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100vw',
          }
        }
      >
      </div>
    </Box>
  )
}