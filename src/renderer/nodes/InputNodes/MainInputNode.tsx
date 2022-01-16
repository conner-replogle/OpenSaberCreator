import { Button, ClickAwayListener, Input, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import  { Handle } from 'react-flow-renderer';
import SettingsIcon from '@mui/icons-material/Settings';


const customNodeStyles = {
    background: '#9CA8B3',
    color: '#FFF',
    padding: 10,
    width:"200px"
};
export type InputNodeConfig = {
    nickname: string
    type:string
}

function InputOverlay(props:{config:InputNodeConfig,onChangeConfig:Function}){
    return (<>
        <InputLabel variant="standard" htmlFor="NickName">
            Nickname
        </InputLabel>
        <TextField  onChange={(event) => {props.onChangeConfig({...props.config,nickname:event.target.value}); console.log(event.target.value)}} id="NickName" label={props.config.nickname} variant="filled" />

    </>)

}
const defaultConfig: InputNodeConfig = {
    nickname: "Apple",
    type:"Main"
}



function InputNode({ data }) {
    const [config,setConfig] = useState(defaultConfig);
    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(!open);
    };

    const handleTooltipOpen = () => {
        setOpen(!open);
    };
    const Card = Nodes[config.type].card

    return (

        <>
            <div style={customNodeStyles}>
                <Card config={config}/>
                <div>
                <Tooltip
                    PopperProps={{
                    disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={<InputOverlay config={config} onChangeConfig={setConfig}/>}
                >
                    <SettingsIcon style={{position: 'absolute',right: '10px',top: '10px'}} onClick={handleTooltipOpen}/>
                </Tooltip>
                </div>


                <Handle
                    type="source"
                    position={"bottom"}
                    id="a" />
            </div>
        </>

    );
};


export default InputNode;
