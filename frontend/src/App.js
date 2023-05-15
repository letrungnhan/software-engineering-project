import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import './assets/scss/index.scss';
import useAudio from "./hooks/useAudio";
import Router from "./routes/Router";


function App() {
    const { audio } = useSelector(state => state);
    const dispatch = useDispatch();
    const [setTrack] = useAudio();


    return (
        <Router />
    )
}

export default App;
