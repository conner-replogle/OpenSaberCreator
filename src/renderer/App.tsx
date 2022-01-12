import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Project from './Project';
import Settings from './Settings';
import { ipcRenderer } from 'electron';
import TopBar from './topbar';
import { useGlobalState,store } from 'state-pool';
store.setState("CurrentFile","NewProject",{persist:true})

const Main = () => {
    const [displayState, setDisplayState] = useGlobalState('CurrentFile');
    ipcRenderer.on('file', (_event, data) => {
        console.log('LOADED FILE', data);
        //TODO parse data into Project object JSON PARSER or sometjing use useState(PROJECT OBJ)
    });
    return (
        <>
        
        <div style={{ marginTop: 0,backgroundColor: "gray",padding:10}}>
            <TopBar  />
        </div>
        <div style={{width: '100%',height: '100%' }}>{displayState == 'project' ? <Project /> : <Settings />}</div>
        </>
    );
};

export default function App() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Main />} />
        </Routes>
        </Router>
    );
}
