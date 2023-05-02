import * as types from "../constants/ActionType";

const userReducers = (state = {}, action) => {
    switch (action.type) {
        case types.audio.SET_CURRENT_TRACK:
            return {...state, currentTrack: {...action.payload}}
        case types.audio.PAUSE_TRACK:
            if (!state.currentTrack) return {...state}
            return {...state, currentTrack: {...state.currentTrack, isPlaying: false}}
        case types.audio.PLAY_TRACK:
            if (!state.currentTrack) return {...state}
            return {...state, currentTrack: {...state.currentTrack, isPlaying: true}}
        default:
            return state
    }
}

export default userReducers;