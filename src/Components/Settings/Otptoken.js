import React, { useCallback } from 'react'
import Server from '../APIUrl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import axios from "axios";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import Chip from '@mui/material/Chip';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
});

const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

 function Otptoken() {
    const history = useHistory();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");

    const [otptokenForm, setotptokenForm] = React.useState({
        
        bSilentCall: "",
        duration: "",
        hashAlgo: "",
        otpAttempts: "",
        otpLength: "",
        validationSteps: "",
        
    })
  
    React.useEffect(() => {
        
        Server.get(`/settings/getOTPTokenSettings?accountId=${accountId}&requestTime=${requestTime}`, {
            headers: {
              'content-type': 'application/json',
              authToken: authtoken,
              "Access-Control-Allow-Origin":"*",
              "Access-Control-Allow-Methods":"*"

            },
        })
        
        .then((response) => {
          console.log(response.data)
        
        if((response.data.resultCode == 0 || response.data.resultMessage == "OTP settings fetch successfully")){
            setotptokenForm(response.data.resultData)
        }
           
       }).catch((err) => {
           console.log(err)

       })
    }, [])
          
      const handleSubmit = (e) => {
        e.preventDefault()
        console.log("otptokenForm",otptokenForm)
        Server.post(`/settings/editOTPTokenSettings?accountId=${accountId}&requestTime=${requestTime}`, otptokenForm, {
            
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*"
            },
        })
            .then((response) => {
                
               console.log(response.data)
                if(response.data.resultCode == 0){
                    Swal.fire("","Changes has been saved successfully","success")
                    setotptokenForm({...otptokenForm,
                        isLoading: false,
                        isSuccess: true,
                        isError: false,
                        isSnackbarOpen: true
                        
                    })
                }else setotptokenForm({
                    bSilentCall: false,
                    duration: "",
                    hashAlgo: "",
                    otpAttempts: false,
                    otpLength: "",
                    validationSteps: "",
                    
                })

                
            
            }).catch((err) => {
                console.log(err)
                setotptokenForm({
                    bSilentCall: false,
                    duration: "",
                    hashAlgo: "",
                    otpAttempts: false,
                    otpLength: "",
                    validationSteps: "",
                    
                })
            })
    }
    return (
       <div style={{paddingTop: '90px', marginLeft: '20px'}}>
        <div style={{display:"grid",width:"calc(100vw - 260px)",placeItems:"center"}}></div>
                <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <StyledBreadcrumb
                                component="a"
                                //href="/DashBoard"
                                onClick={useCallback(() => history.push('/AxiomProtect/DashBoard'))}
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                label="OTP Token"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                    </Grid>
                 </Grid>
                 <br />
                <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                              <h4>OTP Token</h4>
                            </Typography>
                          </Grid>
                </Grid>
            
            <div style={{paddingTop: '0px'}}>
                <div style={{paddingLeft: '0px', lineHeight:'25px'}}>
                    <div>
                        {/* <p style={{ color:'#5C5C5C', fontSize: 25}}>OTP Token</p> */}
                        <hr />
                        <br />
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={3} style={{marginTop: 10}}>OTP length is </Grid>

                            <Grid item xs={12} md={3}>
                                <Select fullWidth size="small"
                                        labelId="demo-simple-select-label"
                                        id="otpLength"
                                        name="otpLength"
                                        value={otptokenForm.otpLength} onChange={(e) => setotptokenForm({ ...otptokenForm, otpLength: e.target.value })}
                                        label="OTP Length"
                                        
                                    >
                                        <MenuItem value={4}>4 digits</MenuItem>
                                        <MenuItem value={6}>6 digits</MenuItem>
                                        <MenuItem value={8}>8 digits</MenuItem>
                                </Select>
                            </Grid>

                            <Grid item xs={12} md={3} style={{marginTop: 10}}>With OAUTH Algo is</Grid>

                            <Grid item xs={12} md={3}>
                                <TextField fullWidth size="small" type="text" name="hashAlgo" id="hashAlgo" label="Hash Algo" variant="outlined" value={otptokenForm.hashAlgo} onChange={(e) => setotptokenForm({ ...otptokenForm, hashAlgo: e.target.value })}/>
                            </Grid>
                        </Grid>
                        <br />
                        {/* <hr /> */}
                        <br />
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={3} style={{marginTop: 0}}>Number of attempts allowed are </Grid>

                            <Grid item xs={12} md={3}>
                                <Select fullWidth size="small"
                                        labelId="demo-simple-select-label"
                                        id="otpAttempts"
                                        name="otpAttempts"
                                        value={otptokenForm.otpAttempts} onChange={(e) => setotptokenForm({ ...otptokenForm, otpAttempts: e.target.value })}
                                        label="OTP Attempts"
                                        
                                    >
                                        <MenuItem value={3}>3 Attempt</MenuItem>
                                        <MenuItem value={5}>5 Attempt</MenuItem>
                                        <MenuItem value={7}>7 Attempt</MenuItem>
                                </Select>
                            </Grid>

                            <Grid item xs={12} md={3} style={{marginTop: 0}}>With total number of validation steps is</Grid>

                            <Grid item xs={12} md={3}>
                                <Select fullWidth size="small"
                                        labelId="demo-simple-select-label"
                                        id="validationSteps"
                                        name="validationSteps"
                                        value={otptokenForm.validationSteps} onChange={(e) => setotptokenForm({ ...otptokenForm, validationSteps: e.target.value })}
                                        label="Validation Steps"
                                        
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <br />
                        {/* <hr /> */}
                        <br />

                        <Grid container spacing={3}>

                            <Grid item xs={12} md={3} style={{marginTop: 10}}>Along with duration </Grid>

                            <Grid item xs={12} md={3}>
                                <Select fullWidth size="small"
                                        labelId="demo-simple-select-label"
                                        id="duration"
                                        name="duration"
                                        value={otptokenForm.duration} onChange={(e) => setotptokenForm({ ...otptokenForm, duration: e.target.value })}
                                        label="Duration"
                                        
                                    >
                                        <MenuItem value={10}>10 seconds</MenuItem>
                                        <MenuItem value={30}>30 seconds</MenuItem>
                                        <MenuItem value={60}>60 seconds</MenuItem>
                                        <MenuItem value={120}>120 seconds</MenuItem>
                                        <MenuItem value={180}>180 seconds</MenuItem>
                                </Select>
                            </Grid>

                            <Grid item xs={12} md={3} style={{marginTop: 10}}>And silent call is</Grid>

                            <Grid item xs={12} md={3}>
                                <Select fullWidth size="small"
                                        labelId="demo-simple-select-label"
                                        id="bSilentCall"
                                        name="bSilentCall"
                                        value={otptokenForm.bSilentCall} onChange={(e) => setotptokenForm({ ...otptokenForm, bSilentCall: e.target.value })}
                                        label="Silent Call"
                                        
                                    >
                                        <MenuItem value={'true'}>True</MenuItem>
                                        <MenuItem value={'false'}>False</MenuItem>
                                        
                                </Select>
                            </Grid>
                        </Grid>
                        <br />
                        <hr />
                        
                        <br />          
                        <div>
                            <center><Button variant="contained" style={{color:'#FFFFFF', backgroundColor:'#206BC4'}} onClick={(e) => handleSubmit(e)}>Save Setting Now</Button></center>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        
        </div>
    );
  }

  export default Otptoken;