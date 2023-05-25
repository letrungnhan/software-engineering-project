import { combineReducers } from 'redux';
import userReducers from "./userReducers";
import audioReducers from "./audioReducers";
import playlistReducers from "./playlistReducers";

const rootReducer = combineReducers({
    user: userReducers,
    audio: audioReducers,
    playlist: playlistReducers,
})

export default rootReducer;
