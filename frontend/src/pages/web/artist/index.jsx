import {memo, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import Helmet from '../../../components/common/Helmet'
import Header from '../../../components/web/layout/Header'
import BackgroundColor from '../../../components/common/BackgroundColor'
import SpotifyService from "../../../services/SpotifyService";
import {Box} from '@mui/material'
import Layout from "../../../components/web/layout/Layout";
import Details from '../../../components/common/Details';
import TracksSection from "../../../components/web/sections/TracksSection";

const ArtistDashboard = () => {
    const {id} = useParams();
    const [track, setTrack] = useState(null);
    const [tracks, setTracks] = useState(null);

    useEffect(() => {
        SpotifyService.getSongById(id)
            .then(res => {
                setTrack({...res.data.song, type: 'track'})
                console.log(res)
            })
            .catch(err => {

            })
    }, [id])

    return (
        <Helmet title={track?.title} style={{position: 'relative'}}>
            <Layout>
                <Header/>
                <BackgroundColor/>
                <Box sx={{p: 3}}>
                    {track && <Details info={track}/>}
                    {track &&
                        <Box sx={{my: 5}}>
                            <TracksSection items={[track]} info={track}/>
                        </Box>
                    }
                </Box>
            </Layout>
        </Helmet>

    );
};
export default ArtistDashboard;


