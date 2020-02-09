import React from 'react';

import { useDispatch } from 'react-redux';
import { user_data } from '../../../../actions';

import axios from 'axios';
import Logout_P from '../../../util/pull/logout';
import Alert from '../../../util/alert';

import '../index.css';

const Close = () => {
	const dispatch = useDispatch();
	
	const _handleClose = () => {
		Alert(1, 'Are you sure you want to close your account?', 'No, Thanks', 'Close My Account', _closeAccount);
	}

	const _closeAccount = () => {
		axios.delete('/users')
		.then(res => {
			if(res.data) {
				Alert(0, 'User information has been updated!', 'Okay', null, null);
				dispatch(user_data({}));
			} else {
				Alert(0, 'Session is invalid. Please signin again.', 'Okay', null, null);
				Logout_P(dispatch);
			}
		});
	}

	return (
		<div className='profile-container'>
			<div className='profile-title'>Close Account</div>
			<div className='profile-description'>I am sorry to make you leave... I will do better next time ;(</div>
			<div className='profile-section'>
				<input type='submit' className='profile-submit' value='CLOSE MY ACCOUNT' onClick={ () => _handleClose() }/>
			</div>
		</div>
	);
}

export default Close;