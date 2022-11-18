import React, { useEffect } from 'react'
import { BtnMyLocation } from '../../components';
import { BtnTraceRoute } from '../../components/BtnTraceRoute';
import appNavBarStore from '../../stores/appNavBarStore';
import bathroomViewStore from '../../stores/bathroomViewStore';
import MapComponent from './components/MapComponent';
import NavigationDrawer from './components/NavigationDrawer';
import { SearchBar } from './components/SearchBar';
import TraceRouteDialog from './components/TraceRouteDialog';

export const HomeView = () => {
  const { setShow } = appNavBarStore(state => ({
    setShow: state.setShow
  }));
  const { setRoute } = bathroomViewStore(state => ({
    setRoute: state.setRoute
  }))

  useEffect(() => {
    setShow(true);
    setRoute("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <MapComponent />
      <NavigationDrawer />
      <BtnMyLocation />
      <BtnTraceRoute />
      <SearchBar />
      {/* <GeolocationErrorDialog/> */}
      <TraceRouteDialog />
    </>
  );
}