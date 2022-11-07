import React from 'react'
import { BathroomsProvider, MapProvider } from './context'
import { AuthProvider } from './context/authContext';
import UserLocationProvider from './context/userLocation/userLocationProvider';
import './dbConf';
import Routes from './routes';

export default function BathWorldApp() {
  return (
    <AuthProvider>
      <BathroomsProvider>
        <UserLocationProvider>
          <MapProvider>
            <Routes />
          </MapProvider>
        </UserLocationProvider>
      </BathroomsProvider>
    </AuthProvider>
  )
}
