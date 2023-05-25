import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Helmet from '../../../components/common/Helmet'
import CardSection from '../../../components/web/sections/CardSection'
import MediaSection from '../../../components/web/sections/MediaSection'
import ResultCard from '../../../components/web/cards/ResultCard'
import Searching from '../../../components/common/Searching'
import Header from '../../../components/web/layout/Header'
import { Box, Grid, Typography } from '@mui/material';
import Layout from "../../../components/web/layout/Layout";
import SpotifyService from '../../../services/SpotifyService';

const Search = () => {
    const [topSearch, setTopSearch] = useState()
    const [tracks, setTracks] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [textSearch, setTextSearch] = useState('')
    const handleSearchResults = (searching) => {
        setTextSearch(searching || null)
    }

    useEffect(() => {
        if (!textSearch) {
            setTracks([])
            setPlaylists([])
            setArtists([])
            setAlbums([])
            return;
        }
        SpotifyService.search(textSearch)
            .then(res => {
                const { songs, albums, artists, playlists } = res.data.result;
                setTracks(songs);
                setAlbums(albums);
                setArtists(artists);
                setPlaylists(playlists.map(playlist => ({ ...playlist, type: 'playlist' })));
                handleSetTopSearch({ songs, albums, artists, playlists })
            })
            .catch(err => {
                setTopSearch(null)
                setTracks([])
                setPlaylists([])
                setArtists([])
                setAlbums([])
            })
    }, [textSearch])

    function handleSetTopSearch({ songs, albums, artists, playlists }) {
        if (songs && songs.length > 0) {
            setTopSearch({
                id: songs[0]._id,
                desc: songs[0].description,
                artists: songs[0].artists,
                name: songs[0].name || songs[0].title,
                imageUrl: songs[0].imageUrl,
                type: 'track',
            })
        } else if (albums && albums.length > 0) {
            setTopSearch({
                id: albums[0]._id,
                desc: albums[0].description,
                artists: albums[0].artists,
                name: albums[0].title,
                imageUrl: albums[0].imageUrl,
                type: 'album',
            })
        } else if (artists && artists.length > 0) {
            setTopSearch({
                id: artists[0]._id,
                desc: artists[0].description,
                artists: artists[0].artists,
                name: artists[0].title,
                imageUrl: artists[0].imageUrl,
                type: 'artist',
            })
        } else if (playlists && playlists.length > 0) {
            setTopSearch({
                id: playlists[0]._id,
                desc: playlists[0].description,
                name: playlists[0].name,
                imageUrl: playlists[0].imageUrl,
                type: 'playlist',
            })
        }
    }

    return (
        <Helmet title="Tìm kiếm">
            <Layout>
                <Header>
                    <Searching handleSearchResults={handleSearchResults} />
                </Header>
                {textSearch ?
                    <Box sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xl={4} lg={5} md={6} sm={7}>
                                {topSearch && <ResultCard item={topSearch} />}
                            </Grid>
                            <Grid item xl={8} lg={7} md={6} sm={12}>
                                {tracks?.length > 0 && <MediaSection title="Bài hát" items={tracks.slice(0, 4)} />}
                            </Grid>
                        </Grid>
                        {artists?.length > 0 && <CardSection items={artists} title="Nghệ sĩ" />}
                        {playlists?.length > 0 && <CardSection items={playlists} title="Playlist" />}
                        {albums?.length > 0 && <CardSection items={albums} title="Album" />}
                    </Box> :
                    <Categories />
                }
            </Layout>
        </Helmet>
    )
}
const colors = [
    'rgb(71, 125, 149)', 'rgb(141, 103, 171)', 'rgb(140, 25, 50)',
    'rgb(141, 103, 171)', 'rgb(230, 30, 50)', 'rgb(30, 50, 100)',
    'rgb(225, 17, 139)', 'rgb(13, 115, 236)', 'rgb(119, 119, 119)',
    'rgb(220, 20, 140)', 'rgb(255, 70, 50)', 'rgb(160, 195, 210)',
    'rgb(186, 93, 7)', 'rgb(45, 70, 185)', 'rgb(175, 40, 150)',
    'rgb(215, 242, 125)', 'rgb(225, 51, 0)', 'rgb(141, 103, 171)',
    'rgb(186, 93, 7)', 'rgb(30, 50, 100)', 'rgb(245, 155, 35)'
]

const Categories = () => {
    const [categories, setCategories] = useState([])
    const randomColor = () => colors[Math.floor(Math.random() * colors.length)]

    useEffect(() => {
        // spotifyApi.getCategories({limit: 50, country: 'VN'})
        //     .then(data => {
        //         setCategories(data.body.categories.items.map(item => {
        //                 return {
        //                     id: item.id,
        //                     name: item.name,
        //                     icon: item.icons[0]?.url || ''
        //                 }
        //             }
        //         ))
        //     })
        //     .catch(() => setCategories([]))
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography gutterBottom variant="h2" component="div"
                sx={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    lineHeight: '28px',
                    letterSpacing: '-.04em',
                    mb: 5
                }}>
                Duyệt tìm tất cả
            </Typography>
            <Grid container spacing={3}>
                {categories?.map(category => {
                    return (
                        <Grid item key={category.id} xl={2} lg={3} md={4} sm={6}>
                            <Box component={Link} to={`/genre/${category.id}`}
                                sx={{
                                    width: '100%',
                                    background: randomColor(),
                                    paddingTop: '100%',
                                    display: 'flex',
                                    borderRadius: '8px',
                                    position: 'relative',
                                    overflow: 'hidden',

                                }}>
                                <Typography sx={{
                                    fontSize: '1.25rem',
                                    letterSpacing: '.5px',
                                    fontWeight: '600',
                                    maxWidth: '100%',
                                    overflowWrap: 'break-word',
                                    padding: '16px',
                                    position: 'absolute', top: '0', left: '0',
                                    zIndex: '1',
                                    color: 'white',
                                    textShadow: '2px 4px 3px rgba(0,0,0,0.3)'

                                }}>{category.name}</Typography>
                                <Box component='img' src={category.icon}
                                    sx={{
                                        position: 'absolute',
                                        bottom: '0',
                                        right: '0',
                                        boxWhadow: ' 0 2px 4px 0 rgb(0 0 0 / 20 %)',
                                        height: '100px',
                                        width: '100px',
                                        transform: 'rotate(25deg) translate(18%,-2%)'
                                    }} />
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}
export default Search;