import { useReducer } from "react";
import { getUserLocation } from "../../helpers";
import UserLocationReducer from "./userLocationReducer";
import UserLocationContext from "./userLocationContext";

const INITIAL_STATE = {
  error: "",
  hasError: false,
  userLocation: [-103.69741979884205, 19.249016823028587],
  isErrorDialogOpen: false,
}

const UserLocationProvider = ({children}) => {
  const [state, dispatch] = useReducer(UserLocationReducer, INITIAL_STATE);

  
  const queryLocation = () => {
    dispatch({type: 'setUserLocation', payload: getUserLocation()})
      // .then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))
      // .catch(err => dispatch({ type: 'setHasError', payload: err.message }))
  }

  const setIsErrorDialogOpen = (state) => {
    dispatch({type: 'setIsErrorDialogOpen', payload: state});
  }
  
  return (
    <UserLocationContext.Provider
      value={{
        ...state,
        queryLocation,
        setIsErrorDialogOpen,
      }}
    >
      {children}
    </UserLocationContext.Provider>
  )
}

export default UserLocationProvider;