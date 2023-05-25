import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { Backdrop } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import BackgroundColor from "../../../components/common/BackgroundColor";
import Helmet from "../../../components/common/Helmet";
import CircularProgressWithLabel from "../../../components/web/CircularProgressWithLabel";
import Header from "../../../components/web/layout/Header";
import Layout from "../../../components/web/layout/Layout";
import * as routesConfig from '../../../config/routes';
import FirebaseService from "../../../services/FirebaseService";
import SpotifyService from "../../../services/SpotifyService";
import './style.scss';
import ButtonGroup from '../../../components/common/button-group-header';

const links = [
    { title: 'Nhạc của tôi', url: `/me${routesConfig.listSongArtist}` },
    { title: 'Album của tôi', url: `/me${routesConfig.albumArtist}` },
    { title: 'Tải nhạc lên', url: `/me${routesConfig.uploadSongArtist}` },
    { title: 'Tạo album', url: `/me${routesConfig.uploadSongArtist}` },
]

function Song() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);
    const [song, setSong] = useState(null);
    const [progressUploadSong, setProgressUploadSong] = useState(null);
    const audioRef = useRef(null);
    const audioSrcRef = useRef(null);
    const [artists, setArtists] = useState([]);
    const [track, setTrack] = useState({});

    useEffect(() => {
        SpotifyService.getSongById(id)
            .then(res => {
                const { title, songSrc, imageUrl, artists } = res.data.song;
                setTrack(res.data.song);
                setTitle(title);
                setArtists(artists)
                setSong({ url: songSrc })
                setImage({ url: imageUrl })
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    function openPopup() {
        setOpen(true)
    }

    async function handleUploadImage(e) {
        e.preventDefault();
        if (!e?.target?.files?.length) return;
        const file = e.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setImage({ url: objectUrl, isPreview: true, file });
    }

    async function handleUploadSong(e) {
        e.preventDefault();
        if (!e?.target?.files?.length) return;
        const file = e.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setSong({ url: objectUrl, isPreview: true, file });
        audioSrcRef.current.setAttribute('src', objectUrl);
        audioRef.current.load();
    }

    function handleAddArtist(e) {
        e.preventDefault();
    }

    async function handleSave() {
        if (!song?.file || !image?.file || !title) return;
        let uploadedImage, uploadedSong;
        await FirebaseService.uploadFile('images', image.file,
            (progress) => {
                setProgressUploadSong({ message: 'Uploading image', progress });
            },
            (error) => {
                console.log(error)
            },
            (uploadedURL) => {
                uploadedImage = uploadedURL;
            })
        await FirebaseService.uploadFile('tracks', song.file,
            (progress) => {
                setProgressUploadSong({ message: 'Uploading track', progress });
            },
            (error) => {
                console.log(error)
            },
            (uploadedURL) => {
                uploadedSong = uploadedURL;
            })
        const track = {
            title,
            artists,
            imageUrl: uploadedImage,
            songSrc: uploadedSong,
            duration: audioRef.current.duration
        }
        await SpotifyService.uploadTrack(track)
            .then((res) => {
                console.log(`/me/song/${res.song._id}`)
                navigate(`/me/song/${res.song._id}`);
            }).catch(err => {
                setOpen(false)
                setProgressUploadSong(null);
            });
    }

    return (
        <Helmet title="asd" style={{ position: 'relative' }}>
            <Layout>
                <Header>
                    <ButtonGroup links={links} />
                </Header>
                <BackgroundColor />
                <Box sx={{ p: 3 }}>
                    <div className="song">
                        <button type={"button"} className={"button-select-song"} onClick={openPopup}
                            style={{
                                backgroundImage: image?.url ? `url(${image?.url})` : 'none'
                            }}>
                            <div className={`icon`} style={{
                                visibility: image?.url ? "hidden" : "visible",
                                opacity: image?.url ? "0" : "100",
                            }}>
                                <LibraryMusicIcon />
                            </div>
                        </button>
                        <div className={"song__info"}>
                            <button type={"button"} onClick={openPopup} className={"song__info__name"}>
                                <Box sx={{
                                    fontSize: title?.length > 15 ? '2.5rem' : '5.5rem',
                                    fontWeight: '700',
                                    letterSpacing: '-0.04em'
                                }}>
                                    {title || 'Tên bài hát'}
                                </Box>
                            </button>
                            <div className={"song__info__artist"}>
                                <p className={"song__info__artist__title"}>Nghệ sĩ:</p>
                                <div className={"song__info__artist__names"}>
                                    {artists.map(artist => (
                                        <p key={artist._id} className={"song__info__artist__name"}>
                                            {artist.name}
                                        </p>
                                    ))}
                                    <button type={"button"} onClick={openPopup}
                                        className={"song__info__artist__name__select"}>
                                        <AddIcon className={"icon"} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${open ? 'open' : 'hidden'} popup`}>
                        <div className={"popup__header"}>
                            <h5>Upload Track</h5>
                            <button type={"button"} onClick={() => setOpen(false)}>
                                <CloseIcon className={"icon"} />
                            </button>
                        </div>
                        <div className={"popup__song__file"}>
                            <label htmlFor={"song"}>
                                <FileUploadIcon />
                                Upload bài hát
                            </label>
                            <audio ref={audioRef} controls>
                                <source src={song?.url} ref={audioSrcRef} />
                            </audio>
                            <input type={"file"} id={"song"} name={"song"} onChange={handleUploadSong}
                                accept="audio/mp3,audio/*;capture=microphone" />
                        </div>
                        <div className={"popup__body"}>
                            <label className={"button-select-song"} htmlFor={"image"}
                                style={{ backgroundImage: `url(${image?.url})` }}>
                                <input type={"file"} id={"image"} name={"image"} onChange={handleUploadImage}
                                    accept="image/png, image/jpeg" />
                                <div className={`icon`} style={{
                                    visibility: image?.url ? "hidden" : "visible",
                                    opacity: image?.url ? "0" : "100",
                                }}>
                                    <LibraryMusicIcon />
                                </div>
                            </label>
                            <div className={"popup__body__song"}>
                                <input type={"text"} className={"popup__body__song__name"} placeholder={"Tên bài hát"}
                                    value={title || ''} onChange={(e) => setTitle(e.target.value)} />

                                <div className={"popup__body__song__artist"}>
                                    <form className={"popup__body__song__artist__search"} onSubmit={handleAddArtist}>
                                        <input type={"text"} placeholder={"Thêm nghệ sĩ khác"} />
                                        <button type={"submit"}>
                                            <SearchIcon />
                                        </button>
                                    </form>
                                    <div className={"popup__body__song__artists"}>
                                        {artists.map(artist => (
                                            <div key={artist._id} className={"popup__body__song__artists__name"}>
                                                {artist.name}
                                                <button>
                                                    <RemoveCircleOutlineIcon />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <button type={"button"} className={"button-save"} onClick={handleSave}>
                                Lưu bài hát
                            </button>
                        </Box>
                        <Box sx={{
                            fontSize: '0.8rem', fontWeight: '600', width: '100%', mt: 2
                        }}>
                            By proceeding, you agree to give Spotify access to the image you choose to upload. Please
                            make sure you have the right to upload the image.
                        </Box>
                    </div>
                    <Backdrop open={!!progressUploadSong} sx={{ zIndex: 1001 }}>
                        <CircularProgressWithLabel value={progressUploadSong?.progress || 0}
                            message={progressUploadSong?.message} />
                    </Backdrop>
                    <Backdrop open={open} type={"button"} onClick={() => setOpen(false)} sx={{ zIndex: 999 }} />

                </Box>
                <Box sx={{ p: 3 }}>
                    ád
                </Box>
            </Layout>
        </Helmet>
    );
}

export default Song;