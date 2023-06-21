import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import SpotifyService from "../../../services/SpotifyService";
import {useNavigate, useParams} from 'react-router-dom';
import CreateAlbum from "../create-album";
import Helmet from "../../../components/common/Helmet";

function Album() {
    const {id} = useParams();
    const [songs, setSongs] = useState([]);
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        SpotifyService.getAlbumById(id)
            .then(res => {
                setTitle(res.data.album.title)
                setImage(res.data.album.imageUrl)
                setSongs(res.data.album.songs)
            })
            .catch(err => {
                setSongs([])
            })
    }, [id])

    return (
        <Helmet title={title}>
            <CreateAlbum image={image} title={title} songs={songs}/>
        </Helmet>
    );
};
export default Album;


