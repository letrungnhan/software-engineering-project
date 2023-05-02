import React, {useState, useEffect} from 'react';
import {useParams, Route, NavLink, Routes} from 'react-router-dom'
import Helmet from '../../components/web/common/Helmet'
import Header from '../../components/web/layout/Header'
import BackgroundColor from '../../components/web/common/BackgroundColor'
import Playlist from './Playlist'
import {Box, Button} from '@mui/material'

const Collection = () => {
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
        <Helmet title="Collection">
            <Header>
                {type !== 'tracasdks' && <ButtonGroup type={type}/>}
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
const ButtonGroup = ({type}) => {
    const links = [
        {title: 'Playlist', url: '/collection/playlist'},
        {title: 'Podcast', url: '/collection/podcast'},
        {title: 'Nghệ sĩ', url: '/collection/artist'},
        {title: 'Album', url: '/collection/album'},
    ]
    return (
        <Box component='div'>
            {links.map(link => (
                <MyButton key={link.title} title={link.title} url={link.url}/>
            ))}
        </Box>
    )
}
const MyButton = (props) => {
    return (
        <Button
            variant="contained"
            sx={{
                backgroundColor: 'transparent',
                color: 'white',
                boxShadow: 'none',
                textTransform: 'none',
                fontWeight: '500',
                letterSpacing: '.8px',
                '&.active': {
                    transition: 'all .2 ease',
                    backgroundColor: 'rgba(13,13,13,.65)',
                    boxShadow: 'none',
                },
                '&:hover': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                }
            }}
            component={NavLink} to={props.url}
            activeClassName='active' exact='true'
        >

            {props.title}
        </Button>
    )
}
const Tracks = () => {
    return (
        <div>tracks</div>
    )
}
export default Collection;
