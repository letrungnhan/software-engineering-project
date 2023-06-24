import {Box} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import TracksSection from "./TracksSection";
import BackgroundColor from '../../../components/common/background-color';
import Details from "../../../components/common/Details";
import Helmet from '../../../components/common/Helmet';
import Header from '../../../components/web/layout/Header';
import Layout from "../../../components/web/layout/Layout";
import SpotifyService from "../../../services/SpotifyService";
import ButtonGroupService from '../../../components/artist/button-group-service';
import {useParams} from 'react-router-dom';


function Album() {
    const {id} = useParams();
    const {user} = useSelector(state => state);
    const [songs, setSongs] = useState([]);
    const [info, setInfo] = useState({})
    useEffect(() => {
        SpotifyService.getAlbumById(id)
            .then(res => {
                const {_id, title} = res.data.album
                setInfo({...res.data.album, type: 'album'})
                setSongs(res.data.album.songs.map(song => ({...song, album: {_id, title}})))
            })
            .catch(err => {
                setInfo({})
                setSongs([])
            })
    }, [id])

    return (
        <Helmet title={'Nhạc của tôi'} style={{position: 'relative'}}>
            <Layout>
                <Header>
                    <ButtonGroupService/>
                </Header>
                <BackgroundColor/>
                <Box sx={{p: 3}}>
                    <Details info={{...info}}/>
                    <Box sx={{my: 5}}>
                        <TracksSection items={songs || []} createdAt={true} hasAlbum={true}/>
                    </Box>
                </Box>
            </Layout>
        </Helmet>

    );
};
export default Album;


