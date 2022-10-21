import React from 'react'
import { BathroomsProvider, MapProvider } from './context'
import { AuthProvider } from './context/authContext';
import './dbConf';
import Routes from './routes';

export default function BathWorldApp() {
  return (
    <AuthProvider>
      <BathroomsProvider>
        <MapProvider>
          <Routes />
        </MapProvider>
      </BathroomsProvider>
    </AuthProvider>
  )
}
