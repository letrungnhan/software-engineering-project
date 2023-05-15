import React, {useEffect, useState} from 'react'
import Helmet from '../../../components/common/Helmet'
import Header from '../../../components/web/layout/Header'
import BackgroundColor from '../../../components/common/BackgroundColor'
import SpotifyService from "../../../services/SpotifyService";
import {Box, Button} from '@mui/material'
import Layout from "../../../components/web/layout/Layout";
import {useSelector} from "react-redux";
import TracksSection from "../../../components/web/sections/TracksSection";
import Details from "../../../components/common/Details";
import ButtonGroup from "../../../components/common/button-group-header";
import {Route, Routes} from "react-router-dom";
import Playlist from "../../web/Playlist";

import * as routesConfig from '../../../config/routes';

const spotifyService = new SpotifyService();

const links = [
    {title: 'Nhạc của tôi', url: `/me${routesConfig.listSongArtist}`},
    {title: 'Tải nhạc lên', url: `/me${routesConfig.uploadSongArtist}`},
]
const ListSong = () => {
    const {user} = useSelector(state => state);
    const [artist, setArtist] = useState({})
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        if (!user?.info?._id) return;
        spotifyService.getSongByArtistId(user.info._id)
            .then(res => {
                setTracks([...res.data.songs.map(song => ({...song, type: 'track'}))])
            })
            .catch(err => {
                setTracks([])
            })
    }, [user])

    return (
        <Helmet title={'Nhạc của tôi'} style={{position: 'relative'}}>
            <Layout>
                <Header>
                    <ButtonGroup links={links}/>
                </Header>
                <BackgroundColor/>
                <Box sx={{p: 3}}>
                    {artist && <Details info={{...user?.info, type: 'artist'}}/>}
                    <Box sx={{my: 5}}>
                        <TracksSection items={tracks} info={{createdAt: true}}/>
                    </Box>

                </Box>
            </Layout>
        </Helmet>

    );
};
export default ListSong;


