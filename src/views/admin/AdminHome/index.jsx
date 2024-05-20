import React from 'react';
import BathItem from './BathItem';
import SearchBar from './SearchBar';
import { useState } from 'react';
import './AdminHome.css';

const AdminHome = () => {
  const user = 'Boyi';
  const baños = [
    { title: 'Baño 1', description: 'Baño principal' },
    { title: 'Baño 2', description: 'Baño de invitados' },
    { title: 'Baño 3', description: 'Baño infantil' },
  ];

  const handleAdd = () => {
    // Abrir modal o formulario para agregar un nuevo baño (kamey lo hizo)
    console.log('Agregar baño');
  };

  return (
    <div className="admin-home">
      <div className="header">
        <h1 className="logo">BathWorld</h1>
        <p className="welcome">Bienvenido, {user}</p>
      </div>
      <SearchBar placeholder="Buscar baños..." />
      <button className="add-button" onClick={handleAdd}>Agregar</button>

      <div className="main-content">
        <h2 className="section-title">Baños</h2>
        <div className="baths-section">
          {baños.map((baño) => (
            <BathItem key={baño.title} {...baño} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
