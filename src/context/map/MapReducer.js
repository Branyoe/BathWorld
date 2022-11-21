export const mapReducer = (state, action) => {
  switch (action.type) {
    case 'setMap':
      return {
        ...state,
        isMapReady: true,
        map: action.payload
      }
    case 'setReset':
      return {
        ...state,
        reset: action.payload
      }
    case 'setMarkers':
      return {
        ...state,
        markers: action.payload
      }
    case 'setMiniMap':
      return {
        ...state,
        isMiniMapReady: true,
        miniMap: action.payload
      }
    case 'setMiniMapMarker':
      return {
        ...state,
        miniMapMarker: action.payload
      }
    case 'setLocationMarker':
      return {
        ...state,
        locationMarker: action.payload
      }

    default:
      return state;
  }
}