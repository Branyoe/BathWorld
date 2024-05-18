import React from 'react';
import './AdminHome.css';


const BathItem = ({ title, description, onEdit, onDelete }) => {
    return (
      <div className="bath-item">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="buttons">
          <button onClick={onEdit}>Editar</button>
          <button onClick={onDelete}>Eliminar</button>
        </div>
      </div>
    );
};

export default BathItem;