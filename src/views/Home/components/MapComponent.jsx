/* eslint import/no-webpack-loader-syntax: off */
//@js-ignore
import { Map, Marker } from '!mapbox-gl';
import { Box } from '@mui/material';
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { BathroomsContext, MapContext } from '../../../context';
import UserLocationContext from '../../../context/userLocation/userLocationContext';
import GeolocationDot from './GeolocationDot';

const createBathMarker = (handleClick, identifier) => {
  const element = document.createElement('div');
  if (identifier) {
    element.setAttribute('id', 'bath-icon');
  }
  element.className = 'marker';
  element.style.backgroundImage = 'url(https://firebasestorage.googleapis.com/v0/b/bathworld-8b1e5.appspot.com/o/bathIconOff.png?alt=media&token=dc9e11ff-aec0-4153-ae16-e709f8b7b2c7)';
  element.style.width = `${40}px`;
  element.style.height = `${40}px`;
  element.style.backgroundSize = '100%';
  element.addEventListener('click', handleClick);
  // markerElement.addEventListener('click', e => {
  //   navigator(`/bathroom/${bathId}`)
  // });
  return new Marker({ element, anchor: 'bottom' })
}

const MapComponent = () => {
  const { bathrooms } = useContext(BathroomsContext);
  const { setMap, map, markers, isMapReady, setMarkers, setReset, reset } = useContext(MapContext);
  const { userLocation } = useContext(UserLocationContext);
  const navigator = useNavigate();

  const mapRef = useRef(null)

  useEffect(() => {
    if (reset && isMapReady) {
      map.setCenter([-103.7232060376975, 19.24529521526917]);
      map.setZoom(11);
      setReset(false);
    }
  }, [reset, isMapReady, map, setReset]);

  let i = 0;

  //inicializa y reutiliza el mapa 
  useLayoutEffect(() => {
    const initializeMap = ({ setMap, mapRef }) => {
      const map = new Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-103.7232060376975, 19.24529521526917],
        zoom: 11,
        projection: 'globe'
      });
      map.on('style.load', () => {
        map.setFog({});
      });
      setMap(map);
      i++;
    }
    if (!isMapReady && i === 0) initializeMap({ setMap, mapRef })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, setMap]);

  // Pinta los marcadores
  useEffect(() => {
    let aux = [];
    if (isMapReady && bathrooms.length && !markers.length) {
      markers.forEach(marker => marker.remove());
      bathrooms.forEach(bath => {
        let newMarker
        if (bath.id === "Cf6yHd5QtOLuc8PU5H7k") {
          newMarker = createBathMarker(() => navigator(`/bathroom/${bath.id}`), true);
        } else {
          newMarker = createBathMarker(() => navigator(`/bathroom/${bath.id}`));
        }
        newMarker.setLngLat([bath.lng, bath.lat]);
        newMarker.addTo(map);
        aux.push(newMarker);
      });
      setMarkers(aux);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bathrooms, isMapReady, markers]);

  //evalúa que el mapa no se sobreescribra
  useEffect(() => {
    if (map) document.getElementById("mainMap").replaceWith(map.getContainer());
  }, [map])

  //maneja el punto indicador de ubucación del usuario
  const dot = new Marker({ element: GeolocationDot });
  useEffect(() => {
    // if (userLocation) {
    //   dot.setLngLat(userLocation)
    //   dot.addTo(map)
    //   setIsErrorDialogOpen(false);
    // } else {
    //   dot?.remove();
    //   setIsErrorDialogOpen(true);
    // }
    if (isMapReady) {
      dot.setLngLat(userLocation);
      dot.addTo(map);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, map, isMapReady]);


  return (
    <Box style={
      {
        height: '100vh',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100vw',
      }
    }>
      <Box
        id="mainMap"
        ref={mapRef}
        style={
          {
            height: '100vh',
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100vw',
          }
        }
      />
    </Box>
  );
}

export default MapComponent;