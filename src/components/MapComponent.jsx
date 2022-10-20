/* eslint import/no-webpack-loader-syntax: off */
//@js-ignore
import { Map } from '!mapbox-gl';
import React, { useContext, useLayoutEffect, useRef } from 'react'
import { BathroomsContext, MapContext } from '../context';
import { Loading } from './Loading';

export const MapComponent = () => {
  const { isLoading, userLocation } = useContext(BathroomsContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef(null)

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
        projection: 'globe' // display the map as a 3D globe
      });
      setMap(map)
      map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  if (isLoading) return <Loading />

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