import React from 'react'
import { BathroomsProvider, MapProvider } from './context'
import { HomeView } from './views'

export default function BathWorldApp() {
  return (
    <BathroomsProvider>
      <MapProvider>
        <HomeView />
      </MapProvider>
    </BathroomsProvider>
  )
}
