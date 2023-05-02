import {combineReducers} from 'redux';
import userReducers from "./userReducers";
import audioReducers from "./audioReducers";

const rootReducer = combineReducers({
    user: userReducers,
    audio: audioReducers,
})

export default rootReducer;
