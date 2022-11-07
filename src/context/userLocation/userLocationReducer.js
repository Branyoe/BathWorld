const UserLocationReducer = (state, action) => {
  switch (action.type) {
    case 'setUserLocation':
      return {
        ...state,
        userLocation: action.payload
      }
    case 'setHasError':
      return {
        ...state,
        setHasError: true,
        error: action.payload,
        userLocation: null
      }
    case 'setIsErrorDialogOpen':
      return {
        ...state,
        isErrorDialogOpen: action.payload,
      }
    default:
      return state;
  }
}

export default UserLocationReducer;