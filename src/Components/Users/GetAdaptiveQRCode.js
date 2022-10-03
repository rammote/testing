import QrCodeIcon from '@mui/icons-material/QrCode';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Swal from "sweetalert2";
import Server from '../APIUrl';
const requestTimess = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function GetAdaptiveQRCode({ userID, appId }) {

   
    const authtoken = sessionStorage.getItem("jwtToken");
    const [QRcodeImage, setQRcodeImage] = React.useState("");
 
    const [open, setOpen] = React.useState(false);
   

   

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGetQR = (e) => {
        e.preventDefault()
        console.log("getqrc", userID)
        Server.post(`/adaptivetoken/getTrustedQRCode?userId=${userID}&appId=${appId}&requestTime=${requestTime}`, {}, {

            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"

            },
        })
            .then((response) => {
                // history.push("/Enterotp");  
                if (response.data.resultCode === 0) {
                    setQRcodeImage(response.data.resultData)
                    handleClickOpen()
                    console.log(response);
                    console.log({ qrCoded: response.data.resultData });
                } else {
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
                    icon: "error"
                })
            })

    }

    function getQRCode() {
        return (
            <>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Adaptive QR Code</DialogTitle>
                    <DialogContent>
                        <center><img src={QRcodeImage} style={{ width: 250, height: 250 }} alt="qrCode" /></center>
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
            <Button variant="contained" onClick={(e) => handleGetQR(e)} style={{ marginLeft: "0.6rem", marginTop: "-0.3rem" }} startIcon={<QrCodeIcon />}>Get QR Code</Button>
            {getQRCode()}
        </div>
    )
}   