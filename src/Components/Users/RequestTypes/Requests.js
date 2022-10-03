import React, { useState, useCallback, useEffect } from 'react';
import Server from '../../APIUrl';
import axios from 'axios'
import { useLocation, useHistory, NavLink } from 'react-router-dom';
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
import UpdateProfile from './UpdateProfile';
import VideoCall from './VideoCall';
import SendMessage from './SendMessage';
import SendVideoMessage from './SendVideoMessage';
import Swal from "sweetalert2";

const requestTimess = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function Requests({ appId }) {

    const history = useHistory();
    const location = useLocation();
    const authToken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const emailId = sessionStorage.getItem("emailId");
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

    const [ip, setIP] = useState('');

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data);
        setIP(res.data.IPv4)
    }

    const [device, deviceDetails] = useState('');
    const getDeviceDetails = () => {

        'use strict';

        var module = {
            options: [],
            header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
            dataos: [
                { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
                { name: 'Windows', value: 'Win', version: 'NT' },
                { name: 'iPhone', value: 'iPhone', version: 'OS' },
                { name: 'iPad', value: 'iPad', version: 'OS' },
                { name: 'Kindle', value: 'Silk', version: 'Silk' },
                { name: 'Android', value: 'Android', version: 'Android' },
                { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
                { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
                { name: 'Macintosh', value: 'Mac', version: 'OS X' },
                { name: 'Linux', value: 'Linux', version: 'rv' },
                { name: 'Palm', value: 'Palm', version: 'PalmOS' }
            ],
            databrowser: [
                { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
                { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
                { name: 'Safari', value: 'Safari', version: 'Version' },
                { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
                { name: 'Opera', value: 'Opera', version: 'Opera' },
                { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
                { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
            ],
            init: function () {
                var agent = this.header.join(' '),
                    os = this.matchItem(agent, this.dataos),
                    browser = this.matchItem(agent, this.databrowser);

                return { os: os, browser: browser };
            },
            matchItem: function (string, data) {
                var i = 0,
                    j = 0,
                    html = '',
                    regex,
                    regexv,
                    match,
                    matches,
                    version;

                for (i = 0; i < data.length; i += 1) {
                    regex = new RegExp(data[i].value, 'i');
                    match = regex.test(string);
                    if (match) {
                        regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                        matches = string.match(regexv);
                        version = '';
                        if (matches) {
                            if (matches[1]) {
                                matches = matches[1];
                            }
                        }
                        if (matches) {
                            matches = matches.split(/[._]+/);
                            for (j = 0; j < matches.length; j += 1) {
                                if (j === 0) {
                                    version += matches[j] + '.';
                                } else {
                                    version += matches[j];
                                }
                            }
                        } else {
                            version = '0';
                        }
                        return {
                            name: data[i].name,
                            version: parseFloat(version)
                        };
                    }
                }
                return { name: 'unknown', version: 0 };
            }
        };

        var e = module.init(),
            debug = '';

        debug += 'os.name = ' + e.os.name + '<br/>';
        debug += 'os.version = ' + e.os.version + '<br/>';
        debug += 'browser.name = ' + e.browser.name + '<br/>';
        debug += 'browser.version = ' + e.browser.version + '<br/>';

        debug += '<br/>';
        debug += 'navigator.userAgent = ' + navigator.userAgent + '<br/>';
        debug += 'navigator.appVersion = ' + navigator.appVersion + '<br/>';
        debug += 'navigator.platform = ' + navigator.platform + '<br/>';
        debug += 'navigator.vendor = ' + navigator.vendor + '<br/>';

        device = e.os.name + "" + e.os.version + "" + e.browser.name;
        deviceDetails(device);
        console.log(device);
        //    document.getElementById('log').innerHTML = debug;
    };

    useEffect(() => {
        //passing getData method to the lifecycle method
        getData()
        //getDeviceDetails();

    }, [])


    const [formData, setFormData] = React.useState({

        device: device,
        expirytimeInMins: 0,
        ip: ip,
        appId: appId,
        consentRequester: emailId,
        requestType: "3",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        handleClose();
        // if(formData.consentRequester === "" && formData.consetPurpose==="" && formData.appId === appId && formData.requestType==="3"){
        //   Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
        //     text: "Please fill all the fields",
        //   });

        // }else{
        await Server.post(
            `/authenticator/sendPush?userId=${location.state.row.userid}&requestTime=${requestTime}`,
            formData,
            {
                headers: {
                    "content-type": "application/json",
                    authToken: authToken,
                },
            }
        )
            .then((response) => {
                // console.log('Hello');
                if (response.data.resultCode == 0) {
                    Swal.fire({
                        title: "Success",
                        text: response.data.resultMessage,
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.data.resultMessage,
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                    });
                }
                //history.push("/AxiomProtect/Groups")
                console.log(response.data);

                setFormData({
                    amount: "",
                    appUrl: "",
                    device: "",
                    expirytimeInMins: 0,
                    fromAccount: "",
                    ip: "",
                    message: "",
                    options: "",
                    pushMessageType: 0,
                    title: "",
                    toAccount: "",
                    updatePushRequestBefore: "",
                    appId: appId,
                    consentRequester: "",
                    consetPurpose: "",
                    requestType: "3",
                });
            })
            .catch((err) => {
                console.log(err);
                setFormData({
                    amount: "",
                    appUrl: "",
                    device: "",
                    expirytimeInMins: 0,
                    fromAccount: "",
                    ip: "",
                    message: "",
                    options: "",
                    pushMessageType: 0,
                    title: "",
                    toAccount: "",
                    updatePushRequestBefore: "",
                    appId: appId,
                    consentRequester: "",
                    consetPurpose: "",
                    requestType: "3",
                });
            });
    };

    function handleConsentRequest() {
        return (
            <>
                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle sx={{ textAlign: "center" }}>Consent Request</DialogTitle>
                        <DialogContent sx={{ width: 400 }}>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="demo-simple-select-label">*Please Select</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="*Please Select"
                                    value={formData.consetPurpose}
                                    onChange={(e) =>
                                        setFormData({ ...formData, consetPurpose: e.target.value })
                                    }
                                    required
                                >
                                    <MenuItem value={"Kyc"}>Kyc Documents</MenuItem>
                                    <MenuItem value={"Statement"}>Last 3 months statement</MenuItem>
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained">Submit</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </>
        )
    }

    return (
        <div>
            <br />
            <Grid container spacing={4}>
                <Grid item xs={4} md={6}>
                    <Button variant="contained" onClick={handleClickOpen} style={{ color: '#0D4990', backgroundColor: '#f4f6fa' }}>Consent Request</Button><br />
                    {handleConsentRequest()}
                </Grid>
                <Grid item xs={4} md={6}>
                    <UpdateProfile appId={appId} />
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={4}>
                <Grid item xs={4} md={6}>
                    <VideoCall appId={appId} />
                </Grid>
                <Grid item xs={4} md={6}>
                    <SendMessage appId={appId} />
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={4}>
                <Grid item xs={4} md={6}>
                    <SendVideoMessage appId={appId} />
                </Grid>
            </Grid>

        </div>
    )
}   