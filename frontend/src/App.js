import React, {useEffect, useState} from 'react';
import './assets/scss/index.scss'
import Router from "./routes/Router";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {useDispatch, useSelector} from "react-redux";
import useAudio from "./hooks/useAudio";


function App() {
    const {audio} = useSelector(state => state);
    const dispatch = useDispatch();
    const [ setTrack] = useAudio();


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Router/>
        </LocalizationProvider>
    )
}

export default App;
 