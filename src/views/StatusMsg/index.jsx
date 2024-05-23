import React from 'react';
import appNavBarStore from '../../stores/appNavBarStore';

import './index.css';

const StatusMsg = ({status, title, msg}) => {

  const setShow = appNavBarStore(state => state.setShow);

    React.useEffect(() => {
        setShow(false);
    }, [setShow]);

    return (
        <div className='container'>
            <div className='unauthorized'>
                <h1 className='error-code'>{status}</h1>
                <h2 className='error-title'>{title}</h2>
                <p className='error-message'>{msg}</p>
                <button className='error-button' onClick={() => window.history.back()}>Atrás</button>
            </div>
        </div>
    );
}

export default StatusMsg;