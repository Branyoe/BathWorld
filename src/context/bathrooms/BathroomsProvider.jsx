import { useCallback, useEffect, useReducer } from "react";
import { getUserLocation } from "../../helpers";
import { BathroomsContext } from "./BathroomsContext";
import { BathroomsReducer } from "./BathroomsReducer";
import { watchBathrooms } from "../../DB"

const INITIAL_STATE = {
  isLoading: true,
  userLocation: undefined,
  bathrooms: []
}

export const BathroomsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BathroomsReducer, INITIAL_STATE)
  getUserLocation()
    .then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))

  const queryLocation = () => {
    getUserLocation()
      .then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))
  }

  
  const queryBathrooms = useCallback(async () => {
    const setBathrooms = (data) => {
      dispatch({ type: 'setBathrooms', payload: data})
    }
    await watchBathrooms(setBathrooms);
  }, [])

  useEffect(() => {
    queryBathrooms()
  }, [queryBathrooms])

  return (
    <BathroomsContext.Provider value={{ ...state, queryLocation}}>
      {children}
    </BathroomsContext.Provider>
  );
}