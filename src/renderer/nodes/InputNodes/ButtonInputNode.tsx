import { Typography } from "@mui/material";
import { InputNodeConfig } from "../InputNode";
export interface Data{
    pin: number;

}
export function Card(props:{config:InputNodeConfig,data:Data}){
    return (
    <>
    <div>
        <Typography variant="h6" component="h6">{props.config.nickname}</Typography>
        <Typography variant="subtitle2" >{props.config.type}</Typography>
        <Typography variant="subtitle2" >Pin: {props.data.pin}</Typography>
    </div>
    </>)
}
export function Settings(){
    return (
        <>
            <Typography variant="subtitle2" >Main Settings</Typography>

        </>
    )
}



