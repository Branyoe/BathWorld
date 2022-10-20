import { useEffect, useReducer } from "react";
import { getUserLocation } from "../../helpers";
import { BathroomsContext } from "./BathroomsContext";
import { BathroomsReducer } from "./BathroomsReducer";

const INITIAL_STATE = {
  isLoading: true,
  userLocation: undefined
}

export const BathroomsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BathroomsReducer, INITIAL_STATE)

  useEffect(() => {
    getUserLocation()
      .then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))
  }, [])

  return (
    <BathroomsContext.Provider value={{ ...state }}>
      {children}
    </BathroomsContext.Provider>
  );
}