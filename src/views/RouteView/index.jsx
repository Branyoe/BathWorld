/* eslint import/no-webpack-loader-syntax: off */
import { BottomNavigation, Box, Grid, Stack } from "@mui/material";
//@js-ignore
import { LngLatBounds, Map, Marker } from "!mapbox-gl";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Loading } from "../../components";
import { getBathroom } from "../../DB";
import CloseIcon from '@mui/icons-material/Close';
import { directionsApi } from "../../apis/directionsApi";
import appNavBarStore from "../../stores/appNavBarStore";
import UserLocationContext from "../../context/userLocation/userLocationContext";
import ErrorComponent from "../Home/components/ErrorComponent";
import GeolocationErrorSource from "../../assets/geolocationErrorSource.svg"

export const RouteView = () => {
  const { setShow } = appNavBarStore(state => ({
    setShow: state.setShow
  }));
  const [routeMetadata, setRouteMetadata] = useState({});

  const { id } = useParams()
  const navigator = useNavigate();

  const { userLocation } = useContext(UserLocationContext);

  const [bathroom, setBathroom] = useState();
  const [map, setMap] = useState();

  useEffect(() => setShow(false), [setShow]);

  useEffect(() => {
    const getB = async () => {
      const b = await getBathroom(id);
      setBathroom({ id: b.id, ...b.data() });
    }
    getB();
  }, [id]);

  const getRouteBetweenPoints = async (start, end) => {
    const resp = await directionsApi.get(`/${start.join(',')};${end.join(',')}`);

    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;

    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;
    let min = Math.floor(duration / 60);
    setRouteMetadata({ kms, min })

    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) { bounds.extend(coord) }

    map?.fitBounds(bounds, { padding: 100 });

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

  const mapContainer = useRef(null)

  useEffect(() => {
    if (!bathroom || !userLocation) return
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
      map.setFog({});
    });

    const markerElement = document.createElement('div');
    markerElement.className = 'marker';
    markerElement.style.backgroundImage = 'url(https://firebasestorage.googleapis.com/v0/b/bathworld-8b1e5.appspot.com/o/bathworld_icono.png?alt=media&token=a0b20773-4ef4-46e3-b97f-afb8b28c55ee)';
    markerElement.style.width = `${60}px`;
    markerElement.style.height = `${60}px`;
    markerElement.style.backgroundSize = '100%';
    const newMarker = new Marker({ element: markerElement, anchor: 'bottom' })
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
    if (map && userLocation) getRouteBetweenPoints(userLocation, [bathroom.lng, bathroom.lat]);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bathroom, map])

  if (!bathroom) return <Loading />
  return (
    <Box>
      {/* //Botón cerrar */}
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
        <CloseIcon color="#000" onClick={() => navigator(-1)} />
      </Box>
      {
        userLocation
          ?
          <>
            {/* //Mapa */}
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
            {/* //Detalles contenedor */}
            <Box
              sx={{
                position: "absolute",
                bottom: 3,
                width: "100%",
              }}
            >
              <Stack
                sx={{
                  margin: 1,
                }}
              >
                <BottomNavigation
                  sx={{
                    height: 100,
                    width: "auto",
                    borderRadius: "10px",
                    boxShadow: "0px 10px 26px -3px rgba(0, 0, 0, 0.31);"
                  }}
                >
                  <Grid container spacing={1}
                    sx={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <Grid item xs="auto">
                      <Stack pl={1} height="100%"
                        sx={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h1
                          style={{
                            fontFamily: '"Nunito", sans-serif',
                            fontWeight: 800,
                          }}
                        >
                          {`${routeMetadata.min} min`}
                        </h1>
                        <h2
                          style={{
                            fontFamily: '"Nunito", sans-serif',
                            fontWeight: 600,
                            color: "#565656"
                          }}
                        >
                          {`${routeMetadata.kms} km`}
                        </h2>
                      </Stack>
                    </Grid>
                    <Grid item xs="auto" fontSize="60px">
                      <Stack
                        sx={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <i className="fa-solid fa-person-walking"></i>
                      </Stack>
                    </Grid>
                    <Grid item >
                      <Stack height="100%" pl={2}
                        sx={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            fontFamily: '"Nunito", sans-serif',
                            fontWeight: 800,
                          }}
                        >
                          <h3>Destino:</h3>
                        </div>
                        <div
                          style={{
                            width: "150px",
                            maxHeight: "70px",
                            overflow: "scroll",
                            fontFamily: '"Nunito", sans-serif',
                            fontWeight: 600,
                            color: "#565656"
                          }}
                        >
                          <p style={{ overflow: "scroll" }} >{bathroom.name}</p>
                        </div>
                      </Stack>
                    </Grid>
                  </Grid>
                </BottomNavigation>
              </Stack>
            </Box>
          </>
          :
          <Box
            height="100vh"
            width="100vw"
          >
            <ErrorComponent
              source={GeolocationErrorSource}
              msg="Hubo un error con tu localización"
            />
          </Box>
      }
    </Box>
  )
}