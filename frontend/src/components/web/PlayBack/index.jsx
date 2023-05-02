import React, {useEffect, useRef} from 'react';
import {Box, IconButton, Slider} from "@mui/material";
import {PlayCircle, Repeat, Replay, SkipNext, SkipPrevious} from "@mui/icons-material";
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import {useDispatch, useSelector} from "react-redux";
import {pauseTrack, playTrack} from "../../../redux/actions/audioActions";

function PlayBack() {
    const {audio} = useSelector(state => state);
    const audioRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!audio.currentTrack) return;
        audioRef.current = new Audio(audio?.currentTrack?.songSrc);
        audioRef.current.play();
        return () => {
            audioRef.current.pause();
        }
    }, [audio?.currentTrack])

    function handleChange() {
        if (!audio.currentTrack) return;
        if (audio.currentTrack.isPlaying) {
            const action = pauseTrack()
            dispatch(action)
        } else {
            const action = playTrack();
            dispatch(action)
        }
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2
            }}>
                <IconButton sx={{color: '#b3b3b3'}} component="button">
                    < Repeat sx={{fontSize: '1.25rem'}}/>
                </IconButton>
                <IconButton sx={{color: '#b3b3b3'}} component="button">
                    < SkipPrevious sx={{fontSize: '1.25rem'}}/>
                </IconButton>
                <IconButton sx={{color: '#fff'}} className='button--play' component="button" onClick={handleChange}>
                    {audio.currentTrack?.isPlaying ?
                        <PauseCircleIcon sx={{fontSize: '2.5rem'}}/> :
                        <PlayCircle sx={{fontSize: '2.5rem'}}/>
                    }
                </IconButton>
                <IconButton sx={{color: '#b3b3b3'}} component="button">
                    <SkipNext sx={{fontSize: '1.25rem'}}/>
                </IconButton>
                <IconButton sx={{color: '#b3b3b3'}} component="button">
                    <Replay sx={{fontSize: '1.25rem'}}/>
                </IconButton>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <Box sx={{
                    color: '#b3b3b3',
                    fontSize: '.9rem',
                    fontWeight: '600',
                    letterSpacing: '.8px'
                }}>0:00</Box>
                <Slider
                    size="small"
                    defaultValue={0}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    sx={{color: '#b3b3b3', flex: '1'}}

                />
                <Box sx={{
                    color: '#b3b3b3',
                    fontSize: '.9rem',
                    fontWeight: '600',
                    letterSpacing: '.8px'
                }}>0:00</Box>
            </Box>

        </div>
    );
}

export default PlayBack;