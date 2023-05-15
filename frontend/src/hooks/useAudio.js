import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentTime, pauseTrack, resetSeekTrack, setAudio} from "../redux/actions/audioActions";

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
        audio.addEventListener('ended', () => dispatch(pauseTrack()));
        audio.addEventListener('timeupdate', setCurrentTime);
        return () => {
            pauseTrack();
            audio.src = null;
            audio.removeEventListener('ended', () => dispatch(pauseTrack()));
            audio.removeEventListener('timeupdate', setCurrentTime);
        };
    }, [audio]);

    return [setTrack];
};
export default useAudio;