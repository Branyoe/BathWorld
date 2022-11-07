const GeolocationDot = document.createElement('div');

const SIZE = 60;

const width = SIZE;
const height = SIZE;

GeolocationDot.className = 'marker';
GeolocationDot.style.backgroundImage = 'url(https://firebasestorage.googleapis.com/v0/b/bathworld-8b1e5.appspot.com/o/iconoUbicacion.png?alt=media&token=3bb7b17d-fcd1-4cf7-a0e4-f29432efacd2)';
GeolocationDot.style.width = `${width}px`;
GeolocationDot.style.height = `${height}px`;
GeolocationDot.style.backgroundSize = '100%';

export default GeolocationDot;