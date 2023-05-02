import * as types from "../constants/ActionType";

const userReducers = (state = {}, action) => {
    switch (action.type) {
        case types.audio.SET_AUDIO:
            if (!state.currentTrack) return {...state}
            return {...state, ...action.payload}
        case types.audio.CHANGE_CURRENT_TIME:
            if (!state.currentTrack) return {...state}
            return {...state, currentTime: action.payload.currentTime, currentTimePercent: action.payload.currentTimePercent}
        case types.audio.SET_CURRENT_TRACK:
            return {...state, currentTrack: action.payload.track, isPlaying: action.payload.isPlaying}
        case types.audio.PAUSE_TRACK:
            if (!state.currentTrack) return {...state}
            return {...state, isPlaying: false}
        case types.audio.PLAY_TRACK:
            if (!state.currentTrack) return {...state}
            return {...state, isPlaying: true}
        default:
            return state
    }
}

export default userReducers;