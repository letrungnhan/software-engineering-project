import React, { lazy } from 'react';
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { NotFound } from "./Router";
import { isArtist, isRole } from "../services/AuthService";
import * as config from "../config/routes";

const Login = lazy(() => import('../pages/web/login'));
const Register = lazy(() => import('../pages/web/register'));

const Home = lazy(() => import('../pages/web/home'));
const Track = lazy(() => import('../pages/web/track'));
const Playlist = lazy(() => import('../pages/web/playlist'));
const Artist = lazy(() => import('../pages/web/artist'));
const Collection = lazy(() => import('../pages/web/collection'));
const Search = lazy(() => import('../pages/web/search'));

const routes = [
    { path: config.login, element: Login },
    { path: config.signup, element: Register },
    { path: config.home, element: Home },
    { path: config.track, element: Track },
    { path: config.artist, element: Artist},
    { path: config.playlist, element: Playlist },
    { path: config.collection, element: Collection },
    { path: config.search, element: Search },
    { path: '/', element: Home },
];


const userRoutes = [ 
];

function UserRouter() {
    const { user } = useSelector(state => state);

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} path={route.path} element={<route.element />} />
            ))}
            {userRoutes.map(route => (
                <Route key={route.path} path={route.path} element={
                    <ProtectedRoute isAccepted={() => isRole(user)} to={"/login"}>
                        <route.element />
                    </ProtectedRoute>
                } />
            ))}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default UserRouter;