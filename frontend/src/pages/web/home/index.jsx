import React, {useState, useEffect} from 'react'
import Helmet from '../../../components/web/common/Helmet'
import Header from '../../../components/web/layout/Header'
import CardSection from '../../../components/web/sections/CardSection'
import BackgroundColor from '../../../components/web/common/BackgroundColor'
import {Box} from '@mui/material'
import Layout from "../../../components/web/layout/Layout";
import {protectedRequest} from "../../../utils/requestMethod";
import {useSelector} from "react-redux";
import SpotifyService from "../../../services/SpotifyService";

const spotifyService = new SpotifyService();

const Home = () => {
    const {user} = useSelector(state => state);
    const [newReleases, setNewReleases] = useState()
    const [playlist, setPlaylist] = useState()
    const [myPlaylist, setMyPlaylist] = useState()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (loaded) return;
        if (!user?.token) return setLoaded(true);
        // protectedRequest().get(`/users/user/${user.info._id}`)
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        spotifyService.getAllSongs()
            .then(res => {
                setNewReleases({
                    title: 'Bản phát hành mới phổ biến',
                    items: res.data.songs
                })
            })
            .catch(err => {
                console.log(err)
            })

        // spotifyApi.getFeaturedPlaylists({limit: 6, country: 'VN', locale: 'vi_VN'})
        //     .then((data) => {
        //         setPlaylist({
        //             title: data.body.message,
        //             items: data.body.playlists.items.map(item => ({
        //                 id: item.id,
        //                 name: item.name,
        //                 desc: item.description,
        //                 images: item.images,
        //                 type: item.type
        //             }))
        //         })
        //     })
        //     .catch(() => setLoaded(!loaded))
        //
        // spotifyApi.getMe()
        //     .then(data => {
        //         spotifyApi.getUserPlaylists({userId: data.id, limit: 6})
        //             .then(data => {
        //                 setMyPlaylist({
        //                     title: 'Playlist của bạn',
        //                     desc: '',
        //                     items: data.body.items.map(item => ({
        //                         id: item.id,
        //                         name: item.name,
        //                         desc: item.description,
        //                         images: item.images,
        //                         type: item.type
        //                     }))
        //                 })
        //             })
        //             .catch(() => setLoaded(!loaded))
        //     })
        //     .catch(() => setLoaded(!loaded))
    }, [loaded])

    return (
        <Helmet title="Trình phát trên web" style={{position: 'relative'}}>
            <Layout>
                <Header></Header>
                <BackgroundColor/>
                <Box sx={{p: 3}}>
                    {newReleases &&
                        <CardSection title={newReleases.title} desc={newReleases.desc} items={newReleases.items}
                                     type={"track"}/>}
                    {playlist &&
                        <CardSection title={playlist.title} desc={playlist.desc} items={playlist.items}/>}
                    {myPlaylist &&
                        <CardSection title={myPlaylist.title} desc={myPlaylist.desc} items={myPlaylist.items}/>}
                </Box>
            </Layout>
        </Helmet>

    );
};


export default Home;