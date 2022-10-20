export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.watchPosition(
      ({coords}) => resolve([coords.longitude, coords.latitude]),
      (err) => {
        console.log(err)
        reject(); 
      },
      {enableHighAccuracy: true}
    )
  })
}