import React from 'react';
import notFoundImage from '../../../../assets/images/not-found.jpg';

import '../index.css';

const NotFound = () => {
    return (
        <div className='container-not-found'>
            <img src={notFoundImage} alt="No se econtraron baños" className='notfound-image' />
            <h1 className='error-title'>No se encontraron baños</h1>
            <h2 className='error-message'>Intenta con otro término de búsqueda</h2>
        </div>
    );
}

export default NotFound;