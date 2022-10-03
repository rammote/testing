import React,{useEffect} from 'react';
import Server from '../APIUrl';
import './style.css'; 
import axiom_protect_logo from "../../Assets/axiom_protect_logo.png";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Swal from "sweetalert2";

import { Link, Redirect,useHistory,useLocation } from 'react-router-dom';
import axios from "axios";
import Button from '@mui/material/Button';
import appleAppStore from '../../Assets/appleAppStore.png';
import googlePlayStore from '../../Assets/googlePlayStore.png';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);
const downloadContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }

function QRcodeenable() {
    const history = useHistory();
    const [QRcodeImage, setQRcodeImage] = React.useState("");
    const location = useLocation();
    const [accountId,setaccountId] = React.useState(location.state.accountId);
    const [userID, setUserID] = React.useState(location.state.userId);
    const [jwtToken, setjwtToken] = React.useState(location.state.jwtToken);

    const [name, setname] = React.useState(location.state.name);
    const [emailid, setemailid] = React.useState(location.state.emailid);
        
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }
    
      const openInNewTab1 = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    console.log(location);
    // useEffect(() => {
        
    //     Server.post(`/absolute/getTrustedQRCode?userId=${location.state.userId}&appId=${location.state.appId}&silentRegistrationFlag=${location.state.silentRegistrationFlag}&requestTime=${requestTime}`,{}, {
        
    //         headers: {
    //             'content-type': 'application/json',
    //             authToken: location.state.jwtToken,
    //             "Access-Control-Allow-Origin":"*",
    //             "Access-Control-Allow-Methods":"*"

    //         },
    //     })
    //         .then((response) => {
    //             // history.push("/Enterotp");  
    //             setQRcodeImage(response.data.resultData) 
    //             console.log(response);
    //         }
    //         )
    //         .catch((err) => {
    //             console.log(err)
    //         })
        
    // }, [])

    useEffect(() => {
        
        
        Server.post(`/absolute/generateToken?id=${location.state.userId}&accountId=${accountId}`,{}, {
        
            headers: {
                'content-type': 'application/json',
                authToken: location.state.jwtToken,
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

    return (
    <div>
       {/* {location.state==undefined && <Redirect to="/" />} */}
       <Grid container spacing={3} style={{marginTop: 50}}>
            <Grid item xs={3}>
                
            </Grid>
            <Grid item xs={6}>
            <center><img src={axiom_protect_logo} style={{width: 50, height: 50}}/></center>
            <center><h3 className="page_title">Axiom protect 2.0</h3></center>
                <Card className="" variant="outlined">
                    <CardContent>
                    <center><p className="user_name">{location.state.name}<br />
                    {/* <span>{location.state.emailid}</span> */}
                    </p></center>
                    <hr />

                        <center><p className="message">Lets bring for authentication. Use your smartphone to download the axiom protect 2.0 app and scan the below barcode.</p></center>
                        <center><img src={QRcodeImage} style={{width: 200, height: 150}}/></center>
                        
                    </CardContent>

                    <Box>
                        
                        {/* <Grid container spacing={1} style={{float: "center"}} > */}
                            <center>
                            {/* <Grid item xs={3}> */}
                                <Link to={{
                                    pathname:"/AxiomProtect/Enterotp",
                                    state:{
                                        userId: location.state.userId,
                                        jwtToken: jwtToken,
                                        name: name,
                                        emailid: emailid,
                                        accountId: accountId,
                                    }
                                }}>
                                    <Button style={{width: 180}} variant="contained" >Activate</Button>
                                </Link>
                            {/* </Grid> */}
                            </center>
                            {/* <Grid item xs={3}> */}
                            <center style={{marginTop: 10}}>
                                <Link to={{
                                    pathname:"/AxiomProtect/EmailMe",
                                    state:{
                                        userId: location.state.userId,
                                        jwtToken: jwtToken,
                                        name: name,
                                        emailid: emailid,
                                        accountId: accountId,
                                    }
                                }}>
                                    <Button style={{width: 180}} variant="contained" >Skip</Button>
                                </Link>
                            </center>
                            <h4 style={{color: '#0D4990', borderColor: '#0D4990', textAlign:"center", marginBottom:"0"}}>Download app from app store and scan the QR code.</h4>
                            <div style={downloadContainerStyle}>
              <a href='https://play.google.com/store/apps/details?id=com.bluebricks.absolutetoken' target="_blank" rel="noopner noreferrer">
                <img src={googlePlayStore} alt="googlePlayStore" width="120" />
              </a>

              <a href='https://apps.apple.com/us/app/absolute-token/id1564689079' target="_blank" rel="noopner noreferrer">
                <img src={appleAppStore} alt="appleAppStore" width="120" />
              </a>

            </div>
                            {/* </Grid> */}

                            {/* <Grid item xs={4}>

                            </Grid> */}
                            
                        {/* </Grid> */}
                    </Box>
                    <br />
                </Card>
                
            </Grid>
            <Grid item xs={3}>
                
            </Grid>
            
        </Grid>
        <br /><br /><br />
    </div>
  );
}

export default QRcodeenable;