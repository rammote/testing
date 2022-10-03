import React, { useState, useCallback,useEffect } from 'react';
import Server from '../APIUrl';
import { useLocation,useHistory,NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material'
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import QrCodeIcon from '@mui/icons-material/QrCode';

const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function GetSonicQRCode({userID, appId}) {

    const history = useHistory();
    const location = useLocation();
    const authtoken = sessionStorage.getItem("jwtToken");
    const [QRcodeImage, setQRcodeImage] = React.useState("");
    const authToken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        
        console.log("getqrc",userID)
        Server.post(`/sonicKYC/getTrustedQRCode?userId=${userID}&appId=${appId}&silentRegistrationFlag=${false}&requestTime=${requestTime}`,{}, {
        
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*"

            },
        })
            .then((response) => {
                // history.push("/Enterotp");  
                if(response.data.resultCode === 0)
                {
                    setQRcodeImage(response.data.resultData) 
                    console.log(response);
                    console.log({qrCoded: response.data.resultData});
                }else{
                    Swal.fire({
                        title: 'Warning',
                        text: response.data.resultMessage,
                        icon: 'warning',
                    })
                }
            }
            )
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    title: 'Error',
                    text: err,
                    icon:"error"
                })
            })
        
    }, [])

    function getQRCode() {
        return(
            <>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Sonic QR Code</DialogTitle>
                    <DialogContent>
                        <center><img src={QRcodeImage} style={{width: 250, height: 250}} alt="qrCode"/></center>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} style={{marginLeft:"0.6rem", marginTop:"-0.3rem"}} startIcon={<QrCodeIcon/>}>Get QR Code</Button>
            {getQRCode()}
        </div>
    )
}   