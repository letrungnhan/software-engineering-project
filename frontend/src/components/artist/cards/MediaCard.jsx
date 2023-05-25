import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { setCurrentTrack } from "../../../redux/actions/audioActions";
import { formatTime } from "../../../utils/changeDuration";
import { formatMediumTime } from "../../../utils/formatTime";

function MediaCard({ item }) {
    const { audio } = useSelector(state => state);
    const dispatch = useDispatch();
    const [isPlaying, setIsPlaying] = useState(() => {
        return audio?.currentTrack?._id === item._id
    })

    useEffect(() => {
        setIsPlaying(audio?.currentTrack?._id === item._id)
    }, [audio?.currentTrack])

    function playTrack() {
        if (audio?.currentTrack?._id === item._id) return;
        const action = setCurrentTrack({ ...item, isPlaying: true });
        dispatch(action);
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            height: '56px',
            padding: '0 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0s',
            '&:hover': {
                background: 'rgba(255,255,255,.3)',
                transition: 'all 0.3s',
            },
            '&:hover svg': {
                visibility: 'visible',
                opacity: '1',
                display: 'inline-block',
            },
            '&:hover .item-index': {
                visibility: 'hidden',
                opacity: '0',
                display: 'none',
            }
        }}>
            {item.number &&
                <Box
                    component="div"
                    sx={{
                        color: '#b3b3b3',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px'
                    }}>
                    <PlayArrowRoundedIcon onClick={playTrack} sx={{
                        visibility: 'hidden',
                        display: 'none',
                        opacity: '0',
                        width: '100%',
                    }} />
                    {isPlaying && audio?.isPlaying ?
                        <Box className='item-index'
                            sx={{ width: '100%', textAlign: 'center' }}>
                            <Box component={"img"} sx={{
                                width: '16px', height: '16px'
                            }}
                                src={'https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif'}
                                alt={"equalizer"} />
                        </Box> :
                        <Box className='item-index'
                            sx={{ width: '100%', textAlign: 'center' }}>
                            {item.number}
                        </Box>
                    }
                </Box>
            }
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '0.75rem',
                width: '35%',
            }}>
                <Box
                    component="div"
                    sx={{
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        minHeight: '40px',
                        position: 'relative',
                        backgroundColor: '#333',
                        boxShadow: '0 4px 60px rgb(0 0 0 / 50%)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        component="img"
                        src={item.imageUrl}
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: '0',
                            left: '0',
                            objectFit: 'cover',
                            objectPosition: 'center center',
                            borderRadius: '4px'
                        }}
                    />
                </Box>
                <Box sx={{
                    fontSize: '1rem', lineHeight: '1.5rem', letterSpacing: 'normal', fontWeight: '500', flex: 1
                }}>
                    <Box component={Link} to={`/me/song/${item?._id}`} sx={{
                        WebkitBoxOrient: 'vertical',
                        color: 'white',
                        textDecoration: 'none',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: item.style === 'detail' ? '600px' : '350px',
                        '&:hover': {
                            color: 'var(--primary-color)'
                        }
                    }}>
                        {item?.title}
                    </Box>
                    <Box component="div" sx={{
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '350px'
                    }}>
                        {item?.artists?.length < 10 ? item?.artists?.map((artist, index) => {
                            return (
                                <Box key={index} component={Link} to={`/artist/${artist._id}`}
                                    sx={{
                                        fontSize: '.8rem',
                                        lineHeight: '1.5rem',
                                        height: '1.5rem',
                                        color: '#b3b3b3',
                                        textDecoration: 'none',
                                        transition: 'all .2s',
                                        zIndex: 1,
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            color: 'white'
                                        }
                                    }}>{index < item.artists.length - 1 ? `${artist.name}, ` : artist.name}</Box>)
                        }) :
                            <Box sx={{
                                fontSize: '.8rem',
                                lineHeight: '1.5rem',
                                color: '#b3b3b3',
                                textDecoration: 'none',
                            }}>
                                Various artists
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
            <Box
                component={Link}
                to={`/album/${item.album?.id}`}
                sx={{
                    textAlign: 'left',
                    width: '30%',
                    fontSize: '.9rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    color: '#b3b3b3',
                    transition: 'all .25s',
                    '&:hover': {
                        color: 'white', textDecoration: 'underline',
                    }
                }}
            >
                {item.album?.name}
            </Box>
            <Box
                sx={{
                    textAlign: 'left',
                    flex: 1,
                    fontSize: '.9rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    color: '#b3b3b3',
                    transition: 'all .25s',
                    '&:hover': {
                        color: 'white', textDecoration: 'underline',
                    }
                }}
            >
                {item.createdAt && formatMediumTime(item.createdAt)}
            </Box>
            <Box sx={{
                fontWeight: '500',
                color: '#b3b3b3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '110px'
            }}>
                <FavoriteBorderOutlinedIcon sx={{
                    fontSize: '1.2rem',
                    visibility: 'hidden',
                    opacity: '0',
                    transition: 'all 0s'
                }} />
                <Box sx={{
                    fontWeight: '500',

                }}>
                    {item.duration && formatTime(item.duration)}
                </Box>
                <MoreHorizIcon sx={{
                    fontSize: '1.2rem',
                    visibility: 'hidden',
                    opacity: '0',
                    transition: 'all 0s'
                }} />
            </Box>
        </Box>
    );
}

export default MediaCard;