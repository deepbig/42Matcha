import React from 'react';

import { useDispatch } from 'react-redux';
import { ui_landing } from '../../../../actions';

import axios from 'axios';
import User_P from '../../../util/pull/user';

import { deviceType, osName, osVersion, browserName, browserVersion } from 'react-device-detect';

import Alert from '../../../util/alert';

import '../index.css';

const In = () => {
    const dispatch = useDispatch();

    const _handleForm = (e) => {
        e.preventDefault();

        const data = {
            email: document.signin.email.value,
            password: document.signin.password.value,
            info: `[${ deviceType === '' ? 'PC' : deviceType.toUpperCase() }] ${osName} ${osVersion} - ${browserName} ${browserVersion}`
        };

        axios.get('/auth/in', {params: data})
        .then(res => {
            if(res.data === 1) {
                User_P(dispatch);
            } else if(res.data === 2) {
                Alert(0, 'Email is not vaild', 'Okay', null, null);
            } else if(res.data === 3) {
                Alert(0, 'Password is not vaild', 'Okay', null, null);
            } else if(res.data === 4) {
                Alert(1, 'Your email is not verified yet.', 'Okay', 'Send me email again', _handleResendVerifyingEmail);
            }
        });
    }

    const _handleResendVerifyingEmail = () => {
        const data = {
            email: document.siginin.email.value
        };

        axios.get('/mail/reverify', {
            params: data
        })
        .then(res => {
            if(res.data) {
                Alert(0, 'Email sent! Check your mailbox :>', 'Okay', null, null);
            } else {
                Alert(0, 'Email is not vaild', 'Okay', null, null);
            }
        });
    }

    return (
        <form name='siginin' onSubmit={_handleForm}>
            <div className='landing-in-title'>Welcom to M@TCH@!</div>
            <div className='landing-in-description'>
                Are you ready to start?
            </div>
            <label className='landing-in-label'>
                <span>Email</span>
                <input className='landing-in-input' type='email' name='email' required />
            </label>
            <label className='landing-in-label'>
                <span>Password</span>
                <input className='landing-in-input' type='password' name='password' required />
            </label>
            <input className='landing-in-sumbit' type='submit' value='SUBMIT' />
            <input className='landing-in-button' type='button' value='SIGNUP' onClick={ () => dispatch(ui_landing(2)) } />
            <input className='landing-in-button' type='button' value='FORGOT PASSWORD' onClick={ () => dispatch(ui_landing(3)) } />
        </form>
    );
}

export default In;