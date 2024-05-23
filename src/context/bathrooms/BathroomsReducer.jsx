export const BathroomsReducer = (state, action) => {
  switch (action.type) {
    case 'setUserLocation':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload
      }
    case 'setBathrooms':
      return {
        ...state,
        bathrooms: action.payload
      }
    case 'deleteBath':
        return {
          ...state,
          bathrooms: state.bathrooms.filter((bath) => bath.id !== action.payload)
        }
    default:
      return state;
  }
}