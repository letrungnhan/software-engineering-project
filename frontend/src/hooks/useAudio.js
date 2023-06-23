import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentTime, pauseTrack, resetSeekTrack, setAudio, setCurrentTrack} from "../redux/actions/audioActions";

const useAudio = () => {
    const audioState = useSelector(state => state.audio);
    const dispatch = useDispatch();
    const [audio] = useState(new Audio());

    const setTrack = (track) => {
        audio.src = track.songSrc;
        audioState.isPlaying ? audio.play() : audio.pause();
        dispatch(setAudio({duration: track.duration, currentTime: 0, currentTimePercent: 0}))
    }

    const setCurrentTime = (e) => {
        const currentTime = e.target.currentTime;
        const currentTimePercent = Math.round(currentTime * 100 / audio.duration);
        dispatch(changeCurrentTime({currentTimePercent, currentTime}))
    }

    const nextTrack = () => {
        const position = audioState.tracks.findIndex(track => track._id === audioState.currentTrack._id)
        return audioState.tracks[position + 1]
    }

    useEffect(() => {
        if (!audioState?.seeking) return;
        audio.currentTime = audioState.currentTime;
        dispatch(resetSeekTrack())
    }, [audioState?.seeking])

    useEffect(() => {
        if (!audioState?.currentTrack) return;
        setTrack(audioState.currentTrack)
    }, [audioState?.currentTrack])

    useEffect(() => {
        if (!audioState?.tracks || audioState?.tracks?.length <= 0) return;
        dispatch(setCurrentTrack(audioState?.tracks[0]))
    }, [audioState?.tracks])

    useEffect(() => {
        audioState.isPlaying ? audio.play() : audio.pause();
    }, [audioState?.isPlaying]);

    useEffect(() => {
        if (audioState?.volume) {
            const volume = audioState?.volume > 5 ? audioState?.volume / 100 : 0;
            audio.volume = volume;
            audio.muted = volume === 0;
        }
    }, [audioState?.volume]);

    useEffect(() => {
        const listenerEnded = () => {
            if (!audioState.tracks || audioState?.tracks.length <= 0) return dispatch(pauseTrack())
            dispatch(setCurrentTrack(nextTrack()))
        }
        audio.addEventListener('timeupdate', setCurrentTime);
        audio.addEventListener('ended', listenerEnded);
        return () => {
            pauseTrack();
            audio.src = null;
            audio.removeEventListener('timeupdate', setCurrentTime);
            audio.removeEventListener('ended', listenerEnded);
        };
    }, [audio]);

    return [setTrack];
};
export default useAudio;