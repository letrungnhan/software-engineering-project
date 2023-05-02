import React from 'react';
import './assets/scss/index.scss'
import Router from "./routes/Router";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

function App() {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Router/>
        </LocalizationProvider>
    )
}

export default App;
 