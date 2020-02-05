import React from 'react';

import { useDispatch } from 'react-redux';
import { ui_landing } from '../../../../actions';

import axios from 'axios';

import Alert from '../../../util/alert';

const Fg = () => {
    const dispatch = useDispatch();

    const _handleForm = (e) => {
        e.preventDefault();

        const data = {
            email: document.forgot.email.value
        };

        axios.get('/mail/password', { params: data })
        .then(res => {
            if(res.data) {
                Alert(0, 'Check your email to confirm your request', 'Okay', null, null);
                dispatch(ui_landing(1));
            } else {
                Alert(0, 'Email is not valid', 'Okay', null, null);
            }
        });
    }

    return(
        <form name='forgot' onSubmit={_handleForm}>
            <div className='landing-in-title'>Did you forget your password? :O</div>
            <div className='landing-in-description'>Don't worry! We can help you to reset your password!</div>
            <label className='landing-in-label'>
                <span>Email</span>
                <input className='landing-in-input' type='email' name='email' required />
            </label>
            <input className='landing-in-submit' type='submit' value='SUBMIT' />
            <input className='landing-in-button' type='button' value='BACK' onClick={ () => dispatch(ui_landing(1)) } />
        </form>
    );
}

export default Fg;