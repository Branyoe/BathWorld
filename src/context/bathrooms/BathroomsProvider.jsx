import { useCallback, useEffect, useReducer } from "react";
import { BathroomsContext } from "./BathroomsContext";
import { BathroomsReducer } from "./BathroomsReducer";
import { watchBathrooms } from "../../DB"

const INITIAL_STATE = {
  isLoading: true,
  userLocation: [-103.69741979884205, 19.249016823028587],
  bathrooms: []
}

export const BathroomsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BathroomsReducer, INITIAL_STATE);
  // getUserLocation()
  //   .then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))
  //   .catch(() => dispatch({ type: 'setUserLocation', payload: null }))

  // const queryLocation = () => {
  //   getUserLocation()
  //     .then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))
  // }

  
  const queryBathrooms = useCallback(async () => {
    const setBathrooms = (data) => {
      dispatch({ type: 'setBathrooms', payload: data})
    }
    await watchBathrooms(setBathrooms);
  }, [])

  useEffect(() => {
    queryBathrooms()
  }, [queryBathrooms]);

  return (
    <BathroomsContext.Provider value={{ ...state}}>
      {children}
    </BathroomsContext.Provider>
  );
}