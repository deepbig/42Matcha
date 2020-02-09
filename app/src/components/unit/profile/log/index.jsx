import React, { useState, useEffect } from 'react';

import axios from 'axios';

import '../index.css';

const Log = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        axios.get('/logs')
        .then((res) => {
            setLogs(res.data);
        })
    }, []);

    return (
		<div className='profile-container'>
			<div className='profile-title'>Access Logs</div>
			<div className='profile-description'>Log description.</div>
			<div className='profile-section'>
				{logs.map((log, index) => 
					<div className='profile-log-container' key={index}>{log.time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{log.info}</div>
				)}
			</div>
		</div>
    )
}

export default Log;