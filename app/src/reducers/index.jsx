import { combineReducers } from 'redux';

import uiReducer from './ui';
import userReducer from './user';

const rootReducers = combineReducers({
    ui: uiReducer,
    user: userReducer,
})

export default rootReducers;