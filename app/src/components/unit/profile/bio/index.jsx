import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import User_P from '../../../util/pull/user';
import Logout_P from '../../../util/pull/logout';
import Alert from '../../../util/alert';

import '../index.css';

const Bio = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const _handleForm = (e) => {
		e.preventDefault();

		const data = {
			bio: document.profile_bio.bio.value
		};

		axios.put('/users/bio', data)
		.then(res => {
			if(res.data) {
				Alert(0, 'User information has been updated!', 'Okay', null, null);
				User_P(dispatch);
			} else {
				Alert(0, 'Session is invalid. Please sign in again :>', 'Okay', null, null);
				Logout_P(dispatch);
			}
		});
	}

	return (
		<div className='profile-container'>
			<div className='profile-title'>Bio</div>
			<div className='profile-description'>Show yourself :></div>
			<div className='profile-section'>
				<form name='profile_bio' onSubmit={_handleForm}>
					<div className='profile-input-title'>Bio</div>
					<textarea type='text' className='profile-textarea' name='bio' defaultValue={user.data.bio} />
					<input type='submit' className='profile-submit' value='UPDATE' />
				</form>
			</div>
		</div>
	);
}

export default Bio;