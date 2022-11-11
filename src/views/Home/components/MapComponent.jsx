/* eslint import/no-webpack-loader-syntax: off */
//@js-ignore
import { Map, Marker } from '!mapbox-gl';
import { Box } from '@mui/material';
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { BathroomsContext, MapContext } from '../../../context';
import UserLocationContext from '../../../context/userLocation/userLocationContext';
import GeolocationDot from './GeolocationDot';

const createBathMarker = (handleClick) => {
  const element = document.createElement('div');
  element.className = 'marker';
  element.style.backgroundImage = 'url(https://firebasestorage.googleapis.com/v0/b/bathworld-8b1e5.appspot.com/o/bathworld_icono.png?alt=media&token=a0b20773-4ef4-46e3-b97f-afb8b28c55ee)';
  element.style.width = `${60}px`;
  element.style.height = `${60}px`;
  element.style.backgroundSize = '100%';
  element.addEventListener('click', handleClick);
  // markerElement.addEventListener('click', e => {
  //   navigator(`/bathroom/${bathId}`)
  // });
  return new Marker({ element, anchor: 'bottom'})
}

const MapComponent = () => {
  const { bathrooms } = useContext(BathroomsContext);
  const { setMap, map, markers, isMapReady,setMarkers} = useContext(MapContext);
  const { userLocation, setIsErrorDialogOpen, queryLocation } = useContext(UserLocationContext);
  const navigator = useNavigate();

  const mapRef = useRef(null)

  useEffect(() => {
    queryLocation();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let i = 0;

  //inicializa y reutiliza el mapa 
  useLayoutEffect(() => {
    const initializeMap = ({ setMap, mapRef }) => {
      console.log("ww");
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
    if(isMapReady && bathrooms.length && !markers.length){
      markers.forEach(marker => marker.remove());
      console.log("marcadores agregados");
      bathrooms.forEach(bath => {
        const newMarker = createBathMarker(() => navigator(`/bathroom/${bath.id}`));
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
    if (userLocation) {
      dot.setLngLat(userLocation)
      dot.addTo(map)
      setIsErrorDialogOpen(false);
    } else {
      dot?.remove();
      setIsErrorDialogOpen(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation, map])


  return (
    <Box>
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