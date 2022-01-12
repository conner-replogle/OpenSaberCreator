import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { ipcRenderer } from "electron";
import { useState } from "react";
import { useGlobalState } from "state-pool";



export default function TopBar(props){
    const [tempProjName, setTempProjName] = useState('');
    const [open, setOpen] = useState(false);
    const [filePromptError, setfilePromptError] = useState('');
    const [displayState, setDisplayState] = useGlobalState('CurrentFile');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const goToSettings = () => {
        if (displayState == 'project') {
        setDisplayState('settings');
        } else {
        setDisplayState('project');
        }
    };
    const saveProject = () => {
        ipcRenderer.send('saveFile', {
        name: 'test.txt',
        content: 'IT FUCKING WORKEF',
        });
        //TODO save project object
    };
    const loadProject = (file_name: string) => {
        ipcRenderer.send('openFile', file_name);
    };
    ipcRenderer.on('savefileStatus', (_event, data) => {
        console.log(data);
        if (data.success) {
        console.log('Succefully saved file');
        alert('Succefully saved project');
        } else {
        console.log('Error saving file ', data.error);
        }
    });
    ipcRenderer.on('openfileStatus', (_event, data) => {
        if (data.success) {
            console.log('Succefully opened file');
            handleClose();
        } else {
            setfilePromptError(data.error);
            console.log('Error saving file ', data.error);
        }
    });


    return (<>
    <Stack spacing={2} direction="row">
    <Button variant="contained" onClick={handleClickOpen}>
        LoadProject
    </Button>

    <Button variant="contained" onClick={saveProject}>
        SaveProject
    </Button>
    <Button variant="contained" onClick={goToSettings}>
        {displayState == 'project' ? 'Settings' : 'Project'}
    </Button>
    </Stack>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Load Project</DialogTitle>
    <DialogContent>
        <DialogContentText>
        Name of project or specfic file path to project.
        </DialogContentText>
        {filePromptError != '' && (
        <Typography color="red" variant="body1">
            {filePromptError}
        </Typography>
        )}
        <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Project name or path to project"
        type="name"
        fullWidth
        variant="standard"
        onChange={(event) => {
            setTempProjName(event.target.value);
        }}
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
        onClick={() => {
            loadProject(tempProjName);
        }}
        >
        Load Project
        </Button>
    </DialogActions>
    </Dialog></>)
}