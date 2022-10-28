/* eslint import/no-webpack-loader-syntax: off */
//@js-ignore
import { Map, Marker } from '!mapbox-gl';
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { BathroomsContext, MapContext } from '../context';
// import currentBathroomStore from '../stores/currentBathroomStore'

export const MapComponent = () => {
  const { isLoading, userLocation, bathrooms } = useContext(BathroomsContext);
  const navigator = useNavigate();
  const { setMap, map, isMapReady, markers, setMarkers, setLocationMarker, locationMarker } = useContext(MapContext);
  // const { setIsOpen, setData } = currentBathroomStore(state => ({
  //   setIsOpen: state.setIsOpen,
  //   setData: state.setData
  // }))

  const mapDiv = useRef(null)

  useLayoutEffect(() => {

    const map = new Map({
      container: mapDiv.current, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-103.7232060376975, 19.24529521526917], // starting position [lng, lat]
      zoom: 11, // starting zoom
      projection: 'globe' // display the map as a 3D globe
    });
    map.on('style.load', () => {
      map.setFog({});
      // Set the default [-103.7366491808968, 19.283594842470652]ere style
    });
    setMap(map)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    markers.forEach(marker => marker.remove());
    let newMarkers = [];
    bathrooms.forEach(bathroom => {
      const markerElement = document.createElement('div');
      markerElement.className = 'marker';
      markerElement.style.backgroundImage = 'url(https://firebasestorage.googleapis.com/v0/b/bathworld-8b1e5.appspot.com/o/bathworld_icono.png?alt=media&token=a0b20773-4ef4-46e3-b97f-afb8b28c55ee)';
      markerElement.style.width = `${60}px`;
      markerElement.style.height = `${60}px`;
      markerElement.style.backgroundSize = '100%';
      markerElement.addEventListener('click', e => {
        // setData(bathroom)
        // setIsOpen(true);
        navigator(`/bathroom/${bathroom.id}`)
      });
      const newMarker = new Marker({ element: markerElement })
      newMarker.setLngLat([bathroom.lng, bathroom.lat])
      newMarker.addTo(map)
      newMarkers.push(newMarker);
    });
    setMarkers(newMarkers);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bathrooms, map])

  const el = document.createElement('div');
  const width = 60;
  const height = 60;
  el.className = 'marker';
  el.style.backgroundImage = 'url(https://firebasestorage.googleapis.com/v0/b/bathworld-8b1e5.appspot.com/o/iconoUbicacion.png?alt=media&token=3bb7b17d-fcd1-4cf7-a0e4-f29432efacd2)';
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
  el.style.backgroundSize = '100%';

  useEffect(() => {
    if (isMapReady && isLoading) {
      map.flyTo({
        zoom: 11,
        center: [-103.7232060376975, 19.24529521526917]
      })
    }
    if (!isLoading) {
      locationMarker?.remove()
      const marker = new Marker({element: el})
        .setLngLat(userLocation)
        .addTo(map)
      setLocationMarker(marker)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapReady, isLoading, userLocation, map])



  return (
    <div
      ref={mapDiv}
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
  );
}