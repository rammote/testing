import React, { useState, useCallback, useEffect } from 'react';
import Server from '../../APIUrl';
import axios from 'axios'
import { useLocation,useHistory,NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material'
import Swal from "sweetalert2";
import { v4 as uuid } from 'uuid';

const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function VideoCall({appId}) {

    const history = useHistory();
    const location = useLocation();
    const authToken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const [open, setOpen] = React.useState(false);
    const [locationCord, setLocationCord] = useState({longitude: '',latitude: ''})
    
    const [uniqueDeviceId, setuniqueDeviceId] = useState("");
    const [URL, setURL] = useState("");
    const [Token, setToken] = useState("")
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
              {name: 'Windows Phone', value: 'Windows Phone', version: 'OS'},
              {name: 'Windows', value: 'Win', version: 'NT'},
              {name: 'iPhone', value: 'iPhone', version: 'OS'},
              {name: 'iPad', value: 'iPad', version: 'OS'},
              {name: 'Kindle', value: 'Silk', version: 'Silk'},
              {name: 'Android', value: 'Android', version: 'Android'},
              {name: 'PlayBook', value: 'PlayBook', version: 'OS'},
              {name: 'BlackBerry', value: 'BlackBerry', version: '/'},
              {name: 'Macintosh', value: 'Mac', version: 'OS X'},
              {name: 'Linux', value: 'Linux', version: 'rv'},
              {name: 'Palm', value: 'Palm', version: 'PalmOS'}
          ],
          databrowser: [
              {name: 'Chrome', value: 'Chrome', version: 'Chrome'},
              {name: 'Firefox', value: 'Firefox', version: 'Firefox'},
              {name: 'Safari', value: 'Safari', version: 'Version'},
              {name: 'Internet Explorer', value: 'MSIE', version: 'MSIE'},
              {name: 'Opera', value: 'Opera', version: 'Opera'},
              {name: 'BlackBerry', value: 'CLDC', version: 'CLDC'},
              {name: 'Mozilla', value: 'Mozilla', version: 'Mozilla'}
          ],
          init: function () {
              var agent = this.header.join(' '),
                      os = this.matchItem(agent, this.dataos),
                      browser = this.matchItem(agent, this.databrowser);
  
              return {os: os, browser: browser};
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
              return {name: 'unknown', version: 0};
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

    useEffect( () => {
        //passing getData method to the lifecycle method
        getData()
    
    }, [])

    const [formData, setFormData] = React.useState({
        
        appUrl: "",
        expirytimeInMins: 2,
        ip: ip,
        message: "",
        appId: appId,
        requestType: "5",
    });

    const [videoURL, setVideoURL] = useState("")

    var geocoder;

    
    //Get the latitude and the longitude;
    function successFunction(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        setLocationCord({latitude: lat, longitude: lng})
        console.log(lat, lng)
    }

    

    // React.useEffect(() => {
    const handleSubmit = async () => {
        console.log(formData);
        const DeviceId = localStorage.getItem('deviceId')
        console.log({DeviceId});
        if(DeviceId){
          setuniqueDeviceId(DeviceId);
        }
        if(!DeviceId){
            const deviceId = uuid(15);
            localStorage.setItem('deviceId',deviceId)
        }
        handleClose();
         setFormData({
          ...formData,
          device: uniqueDeviceId,
          
        })
        console.log({uniqueDeviceId});
        await Server.post(
            `/authenticator/sendPush?userId=${location.state.row.userid}&requestTime=${requestTime}`,
            {...formData,device: uniqueDeviceId},
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
                
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(successFunction);
                } 

                setURL(response.data.resultData.meeturl);
                setToken(response.data.resultData.authToken);
                // Swal.fire({
                //   title: "Success",
                //   text: response.data.resultMessage,
                //   icon: "success",
                //   showCancelButton: false,
                //   confirmButtonColor: "#3085d6",
                //   cancelButtonColor: "#d33",
                // });
                console.log(response.data.resultData)
                setVideoURL(response.data.resultData)
                // window.open( 
                //   `https://access.axiomprotect.com:4472/${videoURL}`, "_blank");
                setOpen(true);
                
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
                device: uniqueDeviceId,
                expirytimeInMins: 2,
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
                requestType: "5",
              });
            })
            .catch((err) => {
              console.log(err);
              setFormData({
                amount: "",
                appUrl: "",
                device: uniqueDeviceId,
                expirytimeInMins: 2,
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
                requestType: "5",
              });
            });
    };



    // function videoCall() {
    //     return(
    //         <>
    //             <Dialog open={open} onClose={handleClose} >
    //                 <DialogTitle>Video Call </DialogTitle>
    //                 <DialogContent>
    //                   {/* <video width="500" height="500" src={"https://demo.valydate4u.com:4472/f5997c55bd2ffffcdc622a0a7edd0c1c1032b3cf" ?? ""} style={{border:"1px solid grey"}}  controls>
    //                     Your browser does not support the video element.
    //                   </video> */}
    //                   <iframe
    //                     width="500"
    //                     height="450"
    //                     src={`https://access.axiomprotect.com:4472/${videoURL}` ?? ""}
    //                     title="YouTube video player" 
    //                     frameborder="0"
    //                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //                     allowfullscreen
    //                   ></iframe>
    //                 </DialogContent>
    //                 <DialogActions>
    //                     <Button onClick={handleClose}>Cancel</Button>
    //                     {/* <Button onClick={handleSubmit}>Submit</Button> */}
    //                 </DialogActions>
    //             </Dialog>
    //         </>
    //     )
    // }

    // window.addEventListener('DOMContentLoaded', (event) => {

    //   const pathname = window.location.pathname.split("/")[1]

    //   vConnect.loadMeet(pathname);
    // });

    return (
        <div>
            <Button variant="contained" onClick={handleSubmit} style={{color: '#0D4990', backgroundColor: '#f4f6fa'}}>Video Call Request</Button><br />
            {/* {videoCall()} */}
            <Dialog open={open} onClose={handleClose} >
                    <DialogTitle>Video Call </DialogTitle>
                    <DialogContent id="webRTC-call">
                      {/* <video width="500" height="500" src={`https://access.axiomprotect.com:4472/${videoURL}` ?? ""} style={{border:"1px solid grey"}}  controls>
                        Your browser does not support the video element.
                      </video> */}
                      <iframe
                        width="800px"
                        height="500px"
                        // src={`${URL}?deviceId=${uniqueDeviceId}&longitude=${locationCord.longitude}&latitude=${locationCord.latitude}&token=${Token}`}
                        src={`https://meet.passwordless.com.au/connect?deviceId=${uniqueDeviceId}&longitude=${locationCord.longitude}&latitude=${locationCord.latitude}&token=${Token}`}
                        title="YouTube video player" 
                        frameborder="0"
                        allowfullscreen
                        allow="camera; microphone"
                      ></iframe>
                      <div id="webRTC-call">

                      </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        {/* <Button onClick={handleSubmit}>Submit</Button> */}
                    </DialogActions>
                </Dialog>
        </div>
    )
}   