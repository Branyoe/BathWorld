import React from 'react'
import { BtnMyLocation, MapComponent } from '../../components';
import { BathroomDetailDrawer } from './components/BathroomDetailDrawer';
import { SearchBar } from './components/SearchBar';

export const HomeView = () => {


  return (
    <>
      <MapComponent />
      <BtnMyLocation/>
      <SearchBar/>
      <BathroomDetailDrawer/>
    </>
  );
}