import { useCallback, useEffect, useReducer } from "react";
import { BathroomsContext } from "./BathroomsContext";
import { BathroomsReducer } from "./BathroomsReducer";
import { watchBathrooms, deleteBathroom } from "../../DB"

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

  const handleDeleteBath = async (id) => {
    try {
      await deleteBathroom(id);
      dispatch({ type: 'deleteBath', payload: id });
    } catch (error) {
      console.error('Error deleting bathroom', error);
    }
  }

  return (
    <BathroomsContext.Provider value={{ ...state, handleDeleteBath}}>
      {children}
    </BathroomsContext.Provider>
  );
}