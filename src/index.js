/* eslint import/no-webpack-loader-syntax: off */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BathWorldApp from './BathWorldApp';
//@js-ignore
import mapboxgl from '!mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhbnlvZSIsImEiOiJjbDlncTVwaWowOWtrM3Vtd2R2aDZ3c3o0In0.MoFF_EjlzMATPJDHr-zqXA';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BathWorldApp />
  </React.StrictMode>
);
