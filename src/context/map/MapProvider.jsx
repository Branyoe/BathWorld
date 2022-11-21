
// import { Marker } from '!mapbox-gl';
import { useReducer } from "react";
// import { BathroomsContext } from "../bathrooms/BathroomsContext";
import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";

const INITIAL_STATE = {
  isMapReady: false,
  map: undefined,
  miniMap: null,
  isMiniMapReady: false,
  miniMapMarker: [],
  markers: [],
  locationMarker: undefined,
  reset: false
}

// const createBathMarker = (handleClick) => {
//   const element = document.createElement('div');
//   element.className = 'marker';
//   element.style.backgroundImage = 'url(https://firebasestorage.googleapis.com/v0/b/bathworld-8b1e5.appspot.com/o/bathworld_icono.png?alt=media&token=a0b20773-4ef4-46e3-b97f-afb8b28c55ee)';
//   element.style.width = `${60}px`;
//   element.style.height = `${60}px`;
//   element.style.backgroundSize = '100%';
//   element.addEventListener('click', handleClick);
//   return new Marker({ element})
// }

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const setMarkers = (data) => {
    dispatch({ type: 'setMarkers', payload: data })
  }

  const setReset = (state) => {
    dispatch({ type: 'setReset', payload: state})
  }

  const setMiniMapMarker = (data) => {
    dispatch({ type: 'setMiniMapMarker', payload: data })
  }

  const setMap = map => {
    dispatch({ type: 'setMap', payload: map });
  }
  
  const setMiniMap = map => {
    dispatch({ type: 'setMiniMap', payload: map });
  }

  const setLocationMarker = marker => {
    dispatch({ type: 'setLocationMarker', payload: marker })
  }

  return (
    <MapContext.Provider value={{ ...state, setReset, setMap, setMiniMapMarker,setMiniMap,setMarkers, setLocationMarker }}>
      {children}
    </MapContext.Provider>
  );
}