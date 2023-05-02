import * as types from '../constants/ActionType'

export const setCurrentTrack = (track) => {
    return {
        type: types.audio.SET_CURRENT_TRACK,
        payload: {...track, isPlaying: true},
    };
}
export const playTrack = () => {
    return {type: types.audio.PLAY_TRACK};
}
export const pauseTrack = () => {
    return {type: types.audio.PAUSE_TRACK};
}