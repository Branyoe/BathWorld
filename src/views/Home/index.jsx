import React, { useEffect } from 'react'
import { BtnMyLocation, MapComponent } from '../../components';
import { BtnTraceRoute } from '../../components/BtnTraceRoute';
import { NavigationBar } from '../../components/NavigationBar';
import appNavBarStore from '../../stores/appNavBarStore';
import bathroomViewStore from '../../stores/bathroomViewStore';
import NavigationDrawer from './components/NavigationDrawer';
import { SearchBar } from './components/SearchBar';
import TraceRouteDialog from './components/TraceRouteDialog';

export const HomeView = () => {
  const {setShow, setValue} = appNavBarStore(state => ({
    setShow: state.setShow,
    setValue: state.setCurrent
  }));
  const { setRoute } = bathroomViewStore(state => ({
    setRoute: state.setRoute
  }))
  
  useEffect(() => {
    setShow(true);
    setRoute("/")
  }, [])

  return (
    <>
      <MapComponent />
      <NavigationDrawer/>
      <BtnMyLocation/>
      <BtnTraceRoute/>
      <SearchBar/>
      {/* <NavigationBar/> */}
      <TraceRouteDialog/>
    </>
  );
}