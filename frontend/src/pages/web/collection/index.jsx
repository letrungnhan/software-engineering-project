import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BackgroundColor from '../../../components/common/BackgroundColor';
import Helmet from '../../../components/common/Helmet';
import Header from '../../../components/web/layout/Header';
import Layout from '../../../components/web/layout/Layout';
import SpotifyService from '../../../services/SpotifyService';
import Playlist from './Playlist';

const Collection = () => {
    const { user } = useSelector(state => state)
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        if (!user?.info?._id) return setPlaylists([]);
        SpotifyService.getPlaylistByUser(user.info._id)
            .then(res => {
                setPlaylists(res.data.playLists.map(playlist => ({ ...playlist, type: 'playlist' })))
            })
            .catch(err => {
                console.log(err);
            })
    }, [user])

    return (
        <Helmet title="Collection">
            <Layout>
                <Header />
                <BackgroundColor />
                <Box p={3}>
                    <Playlist title={'Playlist'} items={playlists} type={"playlist"} />
                </Box>
            </Layout>
        </Helmet>

    );
}

export default Collection;
