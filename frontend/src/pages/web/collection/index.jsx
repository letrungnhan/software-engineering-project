import React, {useState, useEffect} from 'react';
import {useParams, Route, NavLink, Routes} from 'react-router-dom'
import Helmet from '../../../components/common/Helmet'
import Header from '../../../components/web/layout/Header'
import BackgroundColor from '../../../components/common/BackgroundColor'
import Playlist from '../Playlist'
import {Box, Button} from '@mui/material'
import ButtonGroup from "../../../components/common/button-group-header";

const links = [
    {title: 'Playlist', url: '/collection/playlist'},
    {title: 'Podcast', url: '/collection/podcast'},
    {title: 'Nghệ sĩ', url: '/collection/artist'},
    {title: 'Album', url: '/collection/album'},
]
const Index = () => {
    const {type} = useParams('type')
    const [playlists, setPlaylists] = useState([])
    const [user, setUser] = useState({})
    useEffect(() => {
        const token = sessionStorage.getItem('token')
        // spotifyApi.setAccessToken(token)
        // spotifyApi.getMe()
        //     .then(data => {
        //         setUser(data.body)
        //     })
    }, [])
    useEffect(() => {
        // chỗ này thiểu default case
        switch (type) {
            case 'playlist':
            // spotifyApi.getUserPlaylists(user.id)
            //     .then(data => {
            //         setPlaylists(data.body.items.map(item => {
            //             return {
            //                 id: item.id,
            //                 name: item.name,
            //                 desc: "Của " + item.owner.display_name,
            //                 images: item.images,
            //                 type: item.type,
            //                 externalUrl: item.external_urls.spotify
            //             }
            //         }))
            //     })
        }
    }, [type, user])
    return (
        <Helmet title="Index">
            <Header>
                {type !== 'tracks' && <ButtonGroup links={links}/>}
            </Header>
            <BackgroundColor/>
            <Box p={3}>
                <Routes>
                    <Route exact path='/collection/tracks' component={Tracks}/>
                    <Route exact path='/collection/playlist' render={() => <Playlist items={playlists}/>}/>
                </Routes>
            </Box>
        </Helmet>

    );
}
const Tracks = () => {
    return (
        <div>tracks</div>
    )
}
export default Index;
