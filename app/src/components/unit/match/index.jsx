import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Match_P from '../../util/pull/match';

import Card from './card';

import './index.css';

const Match = () => {
    const match = useSelector(state => state.match);
    const dispatch = useDispatch();

    useEffect(() => {
        Match_P(dispatch);
    }, [dispatch]);

    return (
        <div className='match'>
            { match.data.id !== undefined && match.data.id !== -1 ? <Card /> : '' }
            { match.data.id !== undefined && match.data.id === -1 ? <div className='match-inactive'>Matching is processing!</div> : '' }
            { match.data.id === undefined ? <div className='match-inactive'>We don't have any match for you at this moment.<br />Please try again later! :> </div> : ''}
        </div>
    );
}

export default Match;