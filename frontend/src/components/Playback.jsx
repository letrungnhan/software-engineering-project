import React, {useEffect, useState} from 'react';
import {spotifyApi} from "../utils/spotify";

import SpotifyPlayer from "react-spotify-web-playback";

function Playback() {
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState({state: true})
    useEffect(() => {
        if (!loading.state) return;
        const ac = sessionStorage.getItem("token");
        if (ac) {
            setToken(ac);
            setLoading({state: false})
        }
    }, [])
    // useEffect(() => {
    //     if (!loading.state) return;
    //     const getMyDevice = async () => {
    //         // console.log(spotifyApi.)
    //         const device = await spotifyApi.getMyDevices();
    //         console.log(device)
    //     }
    //
    //     if (spotifyApi.getAccessToken()) {
    //         getMyDevice().then(()=>{setLoading({state:false})})
    //     }
    // }, [loading])
    if (!token) return <div>asd</div>
    return (
        <div>
            <SpotifyPlayer token={token} uris={['0bC7GKnxh9W9JIvJ6HVWxc?si=b41d592f3bee4a3d']} play={true}
                           showSaveIcon={true}/>
        </div>
    );
}

export default Playback;