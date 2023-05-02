import React, {useState} from 'react';
import {Box, Grid, IconButton, Slider} from '@mui/material'
import {
    PlayCircle, SkipNext, SkipPrevious,
    Replay, Repeat, VolumeUp,
    VolumeDown, VolumeMute, VolumeOff,
    AirplaySharp, QueueMusicSharp
} from '@mui/icons-material/';
import PlayBack from "../PlayBack";

const Footer = () => {
    const [volume, setVolume] = useState(100);

    return (
        <Grid container sx={{px: 2}} alignItems='center' className='footer'>
            <Grid item sm={4}>
            </Grid>
            <Grid item sm={4}>
                <PlayBack/>
            </Grid>
            <Grid item sm={4}>
                {/*<Box sx={{*/}
                {/*    display: 'flex',*/}
                {/*    alignItems: 'center',*/}
                {/*    justifyContent: 'end'*/}
                {/*}}>*/}
                {/*    <IconButton sx={{color: '#b3b3b3'}} component="button">*/}
                {/*        < QueueMusicSharp/>*/}
                {/*    </IconButton>*/}
                {/*    <IconButton sx={{color: '#b3b3b3'}} component="button">*/}
                {/*        < AirplaySharp/>*/}
                {/*    </IconButton>*/}
                {/*    <IconButton sx={{color: '#b3b3b3'}} component="button">*/}
                {/*        {<Volume volume={volume}/>}*/}
                {/*    </IconButton>*/}
                {/*    <Box width={70} sx={{*/}
                {/*        display: 'flex',*/}
                {/*        alignItems: 'center',*/}
                {/*        justifyContent: 'end'*/}
                {/*    }}>*/}
                {/*        <Slider*/}
                {/*            size="small"*/}
                {/*            defaultValue={volume}*/}
                {/*            aria-label="Volume"*/}
                {/*            valueLabelDisplay="auto"*/}
                {/*            onChange={e => setVolume(e.target.value)}*/}
                {/*            sx={{color: '#b3b3b3'}}*/}
                {/*        />*/}

                {/*    </Box>*/}
                {/*</Box>*/}
            </Grid>
        </Grid>

    )
}

export default Footer;

const Volume = (props) => {
    let {volume} = props
    if (volume >= 80) return <VolumeUp sx={{transition: 'all .3s ease'}}/>
    if (volume >= 50) return <VolumeDown sx={{transition: 'all .3s ease'}}/>
    if (volume >= 0) return <VolumeMute sx={{transition: 'all .3s ease'}}/>
    return <VolumeOff sx={{transition: 'all .3s ease'}}/>

}