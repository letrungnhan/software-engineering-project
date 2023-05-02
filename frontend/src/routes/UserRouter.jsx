import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import {useSelector} from "react-redux";
import {NotFound} from "./Router";
import {isArtist, isRole} from "../services/auth";
import * as config from "../config/routes";

const Login = lazy(() => import('../pages/web/login'));
const Register = lazy(() => import('../pages/web/register'));

const Home = lazy(() => import('../pages/web/home'));
const Track = lazy(() => import('../pages/web/track'));
// const Collection = lazy(() => import('../pages/web/Collection'));
// const Dashboard = lazy(() => import('../pages/web/Dashboard'));
// const Genre = lazy(() => import('../pages/web/Genre'));
// const Playlist = lazy(() => import('../pages/web/Playlist'));
// const Search = lazy(() => import('../pages/web/Search'));


const routes = [
    {path: config.login, element: Login},
    {path: config.signup, element: Register},
];


const userRoutes = [
    {path: '/', element: Home},
    {path: config.home, element: Home},
    {path: config.track, element: Track},
    // {path: '/search', element: Search},
    // {path: '/genre/:id', element: Genre},
    // {path: '/:type/:id', element: Playlist},
];

function UserRouter() {
    const {user} = useSelector(state => state);

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} path={route.path} element={<route.element/>}/>
            ))}
            {userRoutes.map(route => (
                <Route key={route.path} path={route.path} element={
                    <ProtectedRoute isAccepted={() => isRole(user)} to={"/login"}>
                        <route.element/>
                    </ProtectedRoute>
                }/>
            ))}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default UserRouter;