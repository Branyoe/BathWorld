import React from 'react'
import GeolocationErrorDialog from './components/GeolocationErrorDialog';
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
            <GeolocationErrorDialog />
          </MapProvider>
        </UserLocationProvider>
      </BathroomsProvider>
    </AuthProvider>
  )
}
