import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import {useSelector} from "react-redux";
import {NotFound} from "./Router";
import {isArtist, isRole} from "../services/AuthService";
import * as config from "../config/routes";

const UploadSong = lazy(() => import('../pages/artist/upload-song'));
const Song = lazy(() => import('../pages/artist/song'));

const routes = [
    {path: config.detailSongArtistPage, element: Song},
    {path: config.uploadSong, element: UploadSong},
];

function ArtistRouter() {
    const {user} = useSelector(state => state);

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} path={route.path} exact={true} element={
                    <ProtectedRoute isAccepted={() => isRole(user)} to={"/login"}>
                        <route.element/>
                    </ProtectedRoute>
                }/>
            ))}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default ArtistRouter;