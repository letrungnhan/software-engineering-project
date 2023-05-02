import {memo, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import Helmet from '../../../components/web/common/Helmet'
import Header from '../../../components/web/layout/Header'
import BackgroundColor from '../../../components/web/common/BackgroundColor'
import SpotifyService from "../../../services/SpotifyService";
import {Box} from '@mui/material'
import Layout from "../../../components/web/layout/Layout";
import Details from '../../../components/web/common/Details';
import TracksSection from "../../../components/web/sections/TracksSection";

const spotifyService = new SpotifyService();
const TrackDashboard = () => {
    const {id} = useParams();
    const [track, setTrack] = useState(null);

    useEffect(() => {
        // let content = document.querySelector('.container__content');
        // content.style.scrollBehavior = 'auto';
        // content.scrollTop = 0;
        // content.style.scrollBehavior = 'smooth';
    }, [id])

    useEffect(() => {
        spotifyService.getSongById(id)
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
                    {/*<Box sx={{mt: '5rem'}}>*/}
                    {/*    {data.albums &&*/}
                    {/*        <CardSection items={data.albums.items || []} title={data.albums.title}/>*/}
                    {/*    }*/}
                    {/*    {data.artists &&*/}
                    {/*        <CardSection items={data.artists.items || []} title={data.artists.title}/>*/}
                    {/*    }*/}
                    {/*</Box>*/}
                </Box>
            </Layout>
        </Helmet>

    );
};
export default memo(TrackDashboard);


