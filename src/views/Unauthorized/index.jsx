import React from 'react';
import appNavBarStore from '../../stores/appNavBarStore';

import './index.css';

const Unauthorized = () => {

  const setShow = appNavBarStore(state => state.setShow);

    React.useEffect(() => {
        setShow(false);
    }, [setShow]);

    return (
        <div className='container'>
            <div className='unauthorized'>
                <h1 className='error-code'>401</h1>
                <h2 className='error-title'>No Autorizado</h2>
                <p className='error-message'>No tienes permiso de acceder a esta página</p>
                <button className='error-button' onClick={() => window.history.back()}>Atrás</button>
            </div>
        </div>
    );
}

export default Unauthorized;