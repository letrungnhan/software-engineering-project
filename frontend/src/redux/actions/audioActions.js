import * as types from '../constants/ActionType'

export const setCurrentTrack = (track) => {
    return {
        type: types.audio.SET_CURRENT_TRACK,
        payload: {track, isPlaying: true},
    };
}
export const playTrack = () => {
    return {type: types.audio.PLAY_TRACK};
}
export const pauseTrack = () => {
    return {type: types.audio.PAUSE_TRACK};
}
export const changeCurrentTime = ({currentTimePercent, currentTime}) => {
    return {
        type: types.audio.CHANGE_CURRENT_TIME,
        payload: {currentTimePercent, currentTime},
    };
}
export const setAudio = ({duration, currentTime, currentTimePercent}) => {
    return {
        type: types.audio.SET_AUDIO,
        payload: {duration, currentTime, currentTimePercent},
    };
}