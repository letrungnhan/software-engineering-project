import * as types from "../constants/ActionType";

const userReducers = (state = {volume: 100}, action) => {
    switch (action.type) {
        case types.audio.SET_AUDIO:
            if (!state.currentTrack) return {...state}
            return {...state, ...action.payload}
        case types.audio.CHANGE_CURRENT_TIME:
            if (!state.currentTrack) return {...state}
            return {
                ...state,
                currentTime: action.payload.currentTime,
                currentTimePercent: action.payload.currentTimePercent
            }
        case types.audio.SEEK_AUDIO:
            if (!state.currentTrack) return {...state}
            return {
                ...state,
                seeking: true,
                currentTime: action.payload.currentTime,
                currentTimePercent: action.payload.currentTimePercent
            }
        case types.audio.SEEK_AUDIO_RESET:
            return {...state, seeking: false}
        case types.audio.SET_CURRENT_TRACK:
            return {...state, currentTrack: action.payload.track, isPlaying: action.payload.isPlaying}
        case types.audio.CHANGE_VOLUME:
            return {...state, volume: action.payload.volume}
        case types.audio.PAUSE_TRACK:
            if (!state.currentTrack) return {...state}
            return {...state, isPlaying: false}
        case types.audio.PLAY_TRACK:
            if (!state.currentTrack) return {...state}
            return {...state, isPlaying: true}
        case types.user.USER_LOGOUT:
            return {}
        case types.user.CHECK_TOKEN_FAILED:
            return {}
        case types.user.USER_LOGIN_FAILED:
            return {}
        default:
            return state
    }
}

export default userReducers;