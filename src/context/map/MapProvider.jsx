/* eslint import/no-webpack-loader-syntax: off */
//@js-ignore

import { useReducer } from "react";
// import { directionsApi } from "../../apis/directionsApi";
import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";

const INITIAL_STATE = {
  isMapReady: false,
  map: undefined,
  markers: [],
  locationMarker: undefined
}

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const setMarkers = (data) => {
    dispatch({ type: 'setMarkers', payload: data })
  }

  const setMap = map => {
    dispatch({ type: 'setMap', payload: map });
  }

  const setLocationMarker = marker => {
    dispatch({ type: 'setLocationMarker', payload: marker })
  }

  // const getRouteBetweenPoints = async (start, end) => {
  //   const resp = await directionsApi.get(`/${ start.join(',') };${ end.join(',') }`);
  //   console.log(resp);
  // }

  return (
    <MapContext.Provider value={{ ...state, setMap, setMarkers, setLocationMarker }}>
      {children}
    </MapContext.Provider>
  );
}