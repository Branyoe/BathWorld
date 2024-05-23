import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BathItem from './Components/BathItem';
import SearchBar from './Components/SearchBar';
import CategoryFilter from './Components/CategoryFilter';
import { BathroomsContext } from '../../../context/bathrooms/BathroomsContext';

import './index.css';

const BathListView = () => {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { bathrooms, isLoading } = useContext(BathroomsContext);

  const handleAdd = () => {
    navigate('/admin/baths/add');
  };

  const handleEditBath = ({ id }) => {
    return () => {
      navigate(`/admin/baths/edit/${id}`);
    };
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const handleDeleteBath = ({ id }) => {
    return () => {
      console.log('Delete bath with id:', id);
    }
  }

  const filteredBaths = bathrooms.filter((bath) => {
    const matchesSearch = bath.name.toLowerCase().includes(searchQuery) || bath.address.toLowerCase().includes(searchQuery);

    let matchesCategory = true;
    if (selectedCategory) matchesCategory = bath.tags.includes(selectedCategory);


    return matchesSearch && matchesCategory;
  });

  if (!isLoading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div className="bathlist">
      <div className="header">
        <h1 className="logo">Baños</h1>
        <CategoryFilter category={selectedCategory} onChange={handleCategoryChange} />
      </div>

      <SearchBar className="search-bar" placeholder="Buscar baños..." onChange={handleSearchChange} />

      <div className="main-content">
        <div>
          {filteredBaths.map((bath) => (
            <BathItem key={bath.id} {...bath} onEdit={handleEditBath(bath)} onDelete={handleDeleteBath(bath)}/>
          ))}
        </div>
        <div className="add-btn-container">
          <Fab color="primary" aria-label="add" onClick={handleAdd}>
            <AddIcon />
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default BathListView;