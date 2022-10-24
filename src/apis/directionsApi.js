import axios from "axios";

export const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/walking',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: 'pk.eyJ1IjoiYnJhbnlvZSIsImEiOiJjbDlncTVwaWowOWtrM3Vtd2R2aDZ3c3o0In0.MoFF_EjlzMATPJDHr-zqXA'
  }
})