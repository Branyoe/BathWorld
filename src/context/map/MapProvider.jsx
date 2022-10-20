/* eslint import/no-webpack-loader-syntax: off */
//@js-ignore
import { Marker } from "!mapbox-gl";
import { useReducer } from "react";
import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";

const INITIAL_STATE = {
  isMapReady: false,
  map: undefined,
}

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const setMap = map => {
    new Marker().setLngLat(map.getCenter()).addTo(map)
    dispatch({ type: 'setMap', payload: map });
  }

  return (
    <MapContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapContext.Provider>
  );
}