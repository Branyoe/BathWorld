export const getUserLocation = () => {
  // return new Promise((resolve, reject) => {
  //   navigator.geolocation.watchPosition(
  //     ({coords}) => {
  //       resolve([coords.longitude, coords.latitude])
  //     },
  //     (err) => {
  //       reject(err); 
  //     },
  //     {enableHighAccuracy: true}
  //   )
  // })

  return [-103.69741979884205, 19.249016823028587];

  // return new Promise((resolve, reject) => {
  //   resolve([-103.69741979884205, 19.249016823028587]);
  // })
}