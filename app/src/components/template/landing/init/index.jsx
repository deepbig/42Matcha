import React from 'react';

import { useDispatch } from 'react-redux';
import { ui_landing } from '../../../../actions';

import '../index.css';

const Init = () => {
    const dispatch = useDispatch();

    return (
        <div className='landing-init'>
            <div className='landing-init-title'>M@TCH@</div>
            <div className='landing-init-description'>Are you looking for a dating partner?</div>
            <div className='landing-init-button' onClick={() => dispatch(ui_landing(1))}>Let's Get Stated</div>
        </div> 
    );
}

export default Init;