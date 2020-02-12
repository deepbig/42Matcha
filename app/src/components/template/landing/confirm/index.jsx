import React from 'react';

import Alert from '../../../util/alert';

import { useParams, Redirect } from 'react-router';

import axios from 'axios';

const Confirm = () => {
    const { email, uuid } = useParams();

    const confirmHandle = () => {
        const data = {
            email: email,
            uuid: uuid,
        }

        axios.get('/verifies/up', { params: data })
        .then((res) => {
            console.log('why');
            Alert(0, 'Your email is verified! Thank you! :>', 'Okay', null, null);
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='confirm'>
            {confirmHandle()}
            <Redirect to='/' />
        </div>
    )
}

export default Confirm;