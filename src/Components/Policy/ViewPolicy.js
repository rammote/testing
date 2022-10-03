import React, { useState, Component, useCallback } from 'react';
import Server from '../APIUrl';
import {  useLocation, useHistory } from 'react-router-dom';
import Popup from './Popup';
import './style.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'; 
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
   
import { Backdrop, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';

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

export default function Editpolicy() {
    const location = useLocation();
    console.log(location)
    const history = useHistory();
    const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
    const requestTime = escape(requestTimess);
    const authtoken = localStorage.getItem("jwtToken");
    const accountId = localStorage.getItem("accountId");
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([])
  
    const [roles, setRoles] = React.useState("");
    const [auth, setAuth] = React.useState("");
    const [country, setCountry] = React.useState(location.state.row.locationPolicy.countryName);
    const [countryaccess, setCountryaccess] = React.useState("");
    const [myip, setMyip] = React.useState(location.state.row.networkPolicy.allowedIps);
    const [mfaip, setMfaip] = React.useState(location.state.row.networkPolicy.mfaRequiredIps);
    
    var cromeosallow,allaccessdeny=location.state.row.osPolicy.allowAndroid,androidallow=location.state.row.osPolicy.allowAndroid,bballow=location.state.row.osPolicy.allowBlackberry,iosallow=location.state.row.osPolicy.allowIOS,linuxallow=location.state.row.osPolicy.allowLinux,macallow=location.state.row.osPolicy.allowMAC,otherallow=location.state.row.osPolicy.allowOtherOS,windowallow=location.state.row.osPolicy.allowWindows,windowphoneallow=location.state.row.osPolicy.allowWindowsPhone,allv=location.state.row.osPolicy.allowAllOtherBrowsers,cromev=location.state.row.osPolicy.allowChrome,cromemobilev=location.state.row.osPolicy.allowChromeMobile,edgev=location.state.row.osPolicy.allowEdge,firefoxv=location.state.row.osPolicy.allowFirefox,iev=location.state.row.osPolicy.allowIE,mobilrsafariv=location.state.row.osPolicy.allowMobileSafari,safariv=location.state.row.osPolicy.allowSafari;

    
  React.useEffect(() => {


    Server.get(`/policy/getAll?accountId=${accountId}&requestTime=${requestTime}`, {
      headers: {
        'content-type': 'application/json',
        authToken: authtoken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"

      },
    })
      .then((response) => {
        console.log(response.data)
        setRows(response.data.resultData)


      }).catch((err) => {
        console.log(err)
        setRows([])



      })
  }, [])

  
const allowandroid = (e) => {
    if(e.checked)
    { 
      androidallow = "true"
    }
    else
    {
      androidallow = "false"
    }
  }
  const allowbb = (e) => {
    if(e.checked)
    { 
      bballow = "true"
    }
    else
    {
      bballow = "false"
    }
  }
  
  const allowcromeos = (e) => {
    if(e.checked)
    { 
      cromeosallow = "true"
    }
    else
    {
      cromeosallow = "false"
    }
  }
  
  const allowios = (e) => {
    if(e.checked)
    { 
      iosallow = "true"
    }
    else
    {
      iosallow = "false"
    }
  }
  
  const allowlinux = (e) => {
    if(e.checked)
    { 
      linuxallow = "true"
    }
    else
    {
      linuxallow = "false"
    }
  }
  
  const allowmac = (e) => {
    if(e.checked)
    { 
      macallow = "true"
    }
    else
    {
      macallow = "false"
    }
  }
  
  const allowwindow = (e) => {
    if(e.checked)
    { 
      windowallow = "true"
    }
    else
    {
      windowallow = "false"
    }
  }
  
  const allowwindowphone = (e) => {
    if(e.checked)
    { 
      windowphoneallow = "true"
    }
    else
    {
      windowphoneallow = "false"
    }
  }
  const allowother = (e) => {
    if(e.checked)
    { 
      otherallow = "true"
    }
    else
    {
      otherallow = "false"
    }
  }
  
  
  
  const crome = (e) => {
    if(e.checked)
    { 
      cromev = "true"
    }
    else
    {
      cromev = "false"
    }
  }
  const cromemobile = (e) => {
    if(e.checked)
    { 
      cromemobilev = "true"
    }
    else
    {
      cromemobilev = "false"
    }
  }
  const edge = (e) => {
    if(e.checked)
    { 
      edgev = "true"
    }
    else
    {
      edgev = "false"
    }
  }
  const firefox = (e) => {
    if(e.checked)
    { 
      firefoxv = "true"
    }
    else
    {
      firefoxv = "false"
    }
  }
  const ie = (e) => {
    if(e.checked)
    { 
      iev = "true"
    }
    else
    {
      iev = "false"
    }
  }
  const mobilrsafari = (e) => {
    if(e.checked)
    { 
      mobilrsafariv = "true"
    }
    else
    {
      mobilrsafariv = "false"
    }
  }
  const safari = (e) => {
    if(e.checked)
    { 
      safariv = "true"
    }
    else
    {
      safariv = "false"
    }
  }
  const all = (e) => {
    if(e.checked)
    { 
      allv = "true"
    }
    else
    {
      allv = "false"
    }
  }
  
  
  const denyallaccess = (e) => {
    if(e.checked)
    { 
      allaccessdeny = "true"
    }
    else
    {
      allaccessdeny = "false"
    }
  }
  
  // var allaccessdeny="false",androidallow="false",bballow="false",iosallow="false",linuxallow="false",macallow="false",otherallow="false",windowallow="false",windowphoneallow="false",allv="false",cromev="false",cromemobilev="false",edgev="false",firefoxv="false",iev="false",mobilrsafariv="false",safariv="false";
  

  const handleSubmit = event => {
    event.preventDefault()
    if(roles == '1')
    {
      var allowAccessWithoutMFA= "false"
      var denyAccessForUnenrolledUsers = "false"
      var requiredEnrollment= "true"
    }else if(roles == '2' )
    {
      var allowAccessWithoutMFA= "true"
      var denyAccessForUnenrolledUsers = "false"
      var requiredEnrollment= "false"
    }else if(roles == '3' )
    {
      var allowAccessWithoutMFA= "false"
      var denyAccessForUnenrolledUsers = "true"
      var requiredEnrollment= "false"
    }
    if(auth == '1')
    {
      var denyAccess = "false"
      var enforceMFA = "true"
    }else if(auth == '2' )
    {
      var denyAccess = "true"
      var enforceMFA = "false"
    }
    var pname="abcd";
    console.log(allowAccessWithoutMFA,denyAccessForUnenrolledUsers,requiredEnrollment)
    console.log(denyAccess,enforceMFA)
    let result = Server.post(`/policy/update?accountId=${accountId}&policyName=${pname}&requestTime=${requestTime}`,
    {
      "authPolicy": {
        "bypassMFA": true,
        "denyAccess": denyAccess,
        "enforceMFA": enforceMFA
      },
      "locationPolicy": {
        "action": countryaccess,
        "countryName": country
      },
      "networkPolicy": {
        "allowAnonymousNetworks": allaccessdeny,
        "allowedIps": myip,
        "mfaRequiredIps": mfaip
      },
      "osPolicy": {
        "allowAllOtherBrowsers": allv,
        "allowAndroid": androidallow,
        "allowAndroidDevicesfulldiskEncryption": true,
        "allowBiometricVerification": true,
        "allowBlackberry": bballow,
        "allowChrome": cromev,
        "allowChromeMobile": cromemobilev,
        "allowEdge": edgev,
        "allowFirefox": firefoxv,
        "allowIE": iev,
        "allowIOS": iosallow,
        "allowLinux": linuxallow,
        "allowMAC": macallow,
        "allowMobileSafari": mobilrsafariv,
        "allowOtherOS": otherallow,
        "allowSafari": safariv,
        "allowTamperedDevices": true,
        "allowWindows": windowallow,
        "allowWindowsPhone": windowphoneallow
      },
      "userPolicy": {
        "allowAccessWithoutMFA": allowAccessWithoutMFA,
        "denyAccessForUnenrolledUsers": denyAccessForUnenrolledUsers,
        "requiredEnrollment": requiredEnrollment
      }
    }
    ,{
      
        headers: {
            authToken: authtoken,
        },
    })
    .then((response) => {
      console.log(response.data.resultMessage)
      var errormsg = response.data.resultMessage
      Swal.fire(
        errormsg
      )
      
    })
    // console.log(result)  
}


        return (
            <div style={{paddingTop: '90px', paddingLeft: "20px"}}>
              {/* <Grid container spacing={3}>
                <Grid item xs={12} md={6}> */}
                  <Breadcrumbs aria-label="breadcrumb" >
                    <StyledBreadcrumb
                      component="a"
                      //href="/DashBoard"
                      onClick={useCallback(() => history.push('/AxiomProtect/DashBoard'))}
                      label="Dashboard"
                      icon={<HomeIcon fontSize="small" />}
                    />
                    <StyledBreadcrumb
                      component="a"
                      //href="/DashBoard"
                      onClick={useCallback(() => history.push('/AxiomProtect/Applications'))}
                      label="Applications"
                    />
                    <StyledBreadcrumb
                      label="View Policy"
                      deleteIcon={<ExpandMoreIcon />}
                    />
                  </Breadcrumbs>
                {/* </Grid>
              </Grid> */}
              <br />
            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}><h3>View Policy</h3></Typography>
            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Policy Name : {location.state.row.policyname}</Typography><hr />
            <div style={{float:'left', width:'23%'}}>
            New User policy
            <br /><br />
            Authentication policy
            <br /><br />
            User location
            <br /><br />
            {/* Device Health application
            <br /><br />
            Remembered devices
            <br /><br /> */}
            Operating systems
            <br /><br />
            Browsers
            <br /><br />
            {/* Plugins
            <br /><br /> */}
            Authorized networks
            <br /><br />
            {/* Anonymous networks
            <br /><br />
            Authentication methods
            <br /><br />
            Mobile app
            <br /><br />
            Tampered devices
            <br /><br />
            Full-disk encryption
            <br /><br />
            Screen lock
            <br /><br />
            Screen lock
            <br /> */}
        </div>
        <div class="vl"></div>
        <div style={{float:'right', width:'75%'}}>
            <div class="inboxbox">
            <br />
            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>New User Policy</Typography>
              <br />
              <FormControl>
                  <RadioGroup
                    name="Roles"
                    onChange={(e)=>setRoles(e.target.value)}
                    // value={row.roles}
                    defaultValue={location.state.row.userPolicy.allowAccessWithoutMFA == true ? "2" : location.state.row.userPolicy.requiredEnrollment == true ? "1" : "3"}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Require enrollment" />
                    <div class="info" style={{paddingLeft:'30px', fontSize:'12px'}}>Prompt unenrolled users to enroll whenever possible.</div>

                    <FormControlLabel value="2" control={<Radio />} label=" Allow access without 2FA" />
                    <div class="info" style={{paddingLeft:'30px', fontSize:'12px'}}>Allow users unknown to   to pass through without two-factor authentication. Users who exist in   and have not enrolled will be required to enroll.</div>
                  
                    <FormControlLabel value="3" control={<Radio />} label="Deny access" />
                    <div class="info" style={{paddingLeft:'30px', fontSize:'12px'}}>Deny authentication to unenrolled users. This controls what happens after an unenrolled user passes primary authentication</div>
                  
                  </RadioGroup>
              </FormControl>
              
            </div>
            <br />
            <hr/>
            <div class="inboxbox">
            <br />
            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Authentication Policy</Typography>
              <br />
              <FormControl>
                  <RadioGroup
                    name="Roles"
                    onChange={(e)=>setAuth(e.target.value)}
                    defaultValue={location.state.row.userPolicy.denyAccess == true ? "2" : "1"}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Enforce 2FA" />
                    <div class="info" style={{paddingLeft:'30px', fontSize:'12px'}}>Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.</div>

                    <FormControlLabel value="2" control={<Radio />} label=" Deny access" />
                    <div class="info" style={{paddingLeft:'30px', fontSize:'12px'}}>Deny authentication to all users.When enabled, this affects all users</div>
                  
                  </RadioGroup>
              </FormControl>
            </div>
            <br />
            <hr/>
            <div class="inboxbox">
              <br />
              <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>User location</Typography>
                <br />
                <FormControl variant="filled" sx={{ minWidth: 350 }}>
                <InputLabel id="demo-simple-select-standard-label">Select Country</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="country"
                  onChange={(e)=>setCountry(e.target.value)}
                >
                  <MenuItem value="all">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Cambodia'>Cambodia</MenuItem>
                  <MenuItem value='Canada'>Canada</MenuItem>
                  <MenuItem value='China'>China</MenuItem>
                  <MenuItem value='Finland'>Finland</MenuItem>
                  <MenuItem value='India'>India</MenuItem>
                  <MenuItem value='Singapore'>Singapore</MenuItem>
                </Select>
              </FormControl>
              <br />
              <br />
              {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 350 }}>
                <InputLabel id="demo-simple-select-filled-label" >No action</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}
              
              <div><TextField
                fullWidth
                size="small"
                width='350px'
                disabled
                id="outlined-disabled"
                label=""
                placeholder="Selected countries..."
                value={country}
              />
              <br />
              <br />
              <FormControl variant="filled" sx={{ minWidth: 350 }}>
                <InputLabel id="demo-simple-select-filled-label">No action</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={(e)=>setCountryaccess(e.target.value)}
                  value={location.state.row.locationPolicy.action}
                >
                  <MenuItem value="Deny Access">Deny Access</MenuItem>
                  <MenuItem value="Allow Access">Allow Access</MenuItem>
                </Select>
              </FormControl></div>
            </div>

            {/* <div class="inboxbox">
            <br /><br />
            Device Health application
                <br /><br />
                <hr />
                <br /> MAC OS <br />

                <FormControl>
                  <RadioGroup
                    name="macos"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Don't require users to have the app" />
                    
                    <FormControlLabel value="2" control={<Radio />} label=" Require users to have the app" />
                    <div style={{paddingLeft: '20px'}}><FormGroup>
                      <FormControlLabel control={<Checkbox  />} label="Block access if firewall is off." />
                      <FormControlLabel control={<Checkbox  />} label="Block access if FileVault is off." />
                      <FormControlLabel control={<Checkbox  />} label="Block access if system password is not set." />
                      
                    </FormGroup></div>
                  </RadioGroup>
              </FormControl>
              <br />
              <br />
              <br /> WINDOWS <br /><br />

                <FormControl>
                  <RadioGroup
                    name="windowsos"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Don't require users to have the app" />
                    
                    <FormControlLabel value="2" control={<Radio />} label=" Require users to have the app" />
                    <div style={{paddingLeft: '20px'}}><FormGroup>
                      <FormControlLabel control={<Checkbox  />} label="Block access if firewall is off." />
                      <FormControlLabel control={<Checkbox  />} label="Block access if FileVault is off." />
                      <FormControlLabel control={<Checkbox  />} label="Block access if system password is not set." />
                      
                    </FormGroup></div>
                  </RadioGroup>
              </FormControl>

            </div>
            <div class="inboxbox">
            <br /><br />
            Remembered devices
                <br /><br />
                <hr />
                <p style={{lineHeight: '20px'}}>Remembered devices allow users to skip subsequent 2FA requests. Remembered devices can only be enabled on browser-based applications.</p>
                <FormControl>
                  <RadioGroup
                    name="rememberdevice"
                  >
                    <FormControlLabel value="1" control={<Radio />} label=" Do not remember devices" />
                    
                    <FormControlLabel value="2" control={<Radio />} label="Users may choose to remember their device for" />
                    
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 100 }}>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Age"
                      >
                        <MenuItem value={10}>1</MenuItem>
                        <MenuItem value={20}>2</MenuItem>
                        <MenuItem value={30}>3</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-filled-label">Days</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>1</MenuItem>
                        <MenuItem value={20}>2</MenuItem>
                        <MenuItem value={30}>3</MenuItem>
                      </Select>
                    </FormControl>

                    <div style={{paddingLeft: '20px'}}><RadioGroup
                      name="dd"
                      >
                        <FormControlLabel value="11" control={<Radio />} label=" Per each application" />
                      
                        <FormControlLabel value="12" control={<Radio />} label="For all protected web applications" />
                      
                      </RadioGroup></div>
                  </RadioGroup>
              </FormControl>
            </div> */}
            <br />
            <hr/>
            <div class="inboxbox">
            <br />
            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Operating systems</Typography>
                <br />
                <Stack sx={{ width: '98%' }} spacing={2}>
                <Alert icon={false}>This section affects devices used to access applications protected by 's browser-based authentication prompt, and mobile devices using Mobile as a second factor. Learn more about operating system policies .</Alert>
              </Stack>
              <br />
              <FormGroup>
                <FormControlLabel control={<Checkbox />} checked={androidallow} label="Allow android Devices" onClick={(e)=>allowandroid(e.target)}/>
                {/* <FormControlLabel control={<Checkbox />} checked={bballow} label="Allow blackberry devices" onClick={(e)=>allowbb(e.target)} /> */}
                {/* <FormControlLabel control={<Checkbox />} checked={location.state.row.osPolicy.allowAndroid} label="Allow crome os devices" onClick={(e)=>allowcromeos(e.target)} /> */}
                <FormControlLabel control={<Checkbox />} checked={iosallow} label="Allow ios devices" onClick={(e)=>allowios(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={linuxallow} label="Allow linux device" onClick={(e)=>allowlinux(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={macallow} label="Allow mac os devices" onClick={(e)=>allowmac(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={windowphoneallow} label="Allow windows devices" onClick={(e)=>allowwindow(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={windowallow} label="Allow windows phone devices" onClick={(e)=>allowwindowphone(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={otherallow} label="Allow other os devices" onClick={(e)=>allowother(e.target)} />
              </FormGroup>
            </div> 
            <br />
            <hr/>
            <div class="inboxbox">
            <br />
            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Browsers</Typography>
                <br />
                <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}><Alert icon={false}>Always block</Alert></Typography>
              <br />
              <FormGroup>
                <FormControlLabel control={<Checkbox />} checked={cromev} label="Crome" onClick={(e)=>crome(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={cromemobilev} label="Crome mobile" onClick={(e)=>cromemobile(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={edgev} label="Edge " onClick={(e)=>edge(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={firefoxv} label="Firefox" onClick={(e)=>firefox(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={iev} label="Internet explore" onClick={(e)=>ie(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={mobilrsafariv} label="Mobile safari" onClick={(e)=>mobilrsafari(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={safariv} label="Safari" onClick={(e)=>safari(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={allv} label="All other browsers" onClick={(e)=>all(e.target)} />
              </FormGroup>
              {/* <hr color="#CECECE"/>
              <FormGroup><div>
                <FormControlLabel control={<Checkbox />} label="Wran user if browser is out of date" /><br />
                <FormControlLabel control={<Checkbox />} label="And block them if more than" />

                
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{width: '50px'}}
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                  </Select>Out of date</div>
              </FormGroup>  */}
             </div> 
            {/* <div class="inboxbox">
            <br /><br />
              Plugins
              <br /><br />
              <hr />
              Flash <br /><br />
              <FormControl>
                  <RadioGroup
                    name="flash"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow all versions" />

                    <FormControlLabel value="2" control={<Radio />} label=" Warn user if there browser out of date " />
                  
                        <FormGroup><div>
                          <FormControlLabel control={<Checkbox />} label="And block them if more than" />

                          
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              style={{width: '50px'}}
                            >
                              <MenuItem value={10}>1</MenuItem>
                              <MenuItem value={20}>2</MenuItem>
                              <MenuItem value={30}>3</MenuItem>
                            </Select>Out of date</div>
                        </FormGroup>

                    <FormControlLabel value="3" control={<Radio />} label="Block all versions" />
                    
                  
                  </RadioGroup>
              </FormControl>
              <br /><br />
              java<br /><br />
              <FormControl>
                  <RadioGroup
                    name="flash"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow all versions" />

                    <FormControlLabel value="2" control={<Radio />} label=" Warn user if there browser out of date " />
                  
                        <FormGroup><div>
                          <FormControlLabel control={<Checkbox />} label="And block them if more than" />

                          
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              style={{width: '50px'}}
                            >
                              <MenuItem value={10}>1</MenuItem>
                              <MenuItem value={20}>2</MenuItem>
                              <MenuItem value={30}>3</MenuItem>
                            </Select>Out of date</div>
                        </FormGroup>

                    <FormControlLabel value="3" control={<Radio />} label="Block all versions" />
                    
                  
                  </RadioGroup>
              </FormControl>
              
            </div> */}
            <br />
            <hr/>
            <div class="inboxbox">
            <br />
            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Authorized Networks</Typography>
              <br />
              <Stack sx={{ width: '98%' }} spacing={2}>
                <Alert icon={false}>Specify networks using a comma-separated list of IP addresses, IP ranges, or CIDRs. These must be public IP addresses, and not local or private IP addresses.</Alert>
              </Stack>
              <br/>
              <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Your IP address is</Typography>
              <br/>
              <TextField id="outlined-basic" variant="outlined" style={{width: '60%'}}  onChange={(e)=>setMyip(e.target.value)} value={location.state.row.networkPolicy.allowedIps}/>
              {/* <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Requires enrollment from these users" />
              </FormGroup> */}
              <br/>
              <br/>
              <br />
              <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Require 2FA from these networks:</Typography>
              <TextField id="outlined-basic" variant="outlined" style={{width: '60%'}}  onChange={(e)=>setMfaip(e.target.value)} value={location.state.row.networkPolicy.mfaRequiredIps}/>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} checked={location.state.row.networkPolicy.allowAnonymousNetworks} label="Deny access from all the other users"  onClick={(e)=>denyallaccess(e.target)} />
              </FormGroup>

            </div>
              <hr />
            {/* <div class="inboxbox">
            <br /><br />
            Anonymous networks<br /><br />
            <hr />
            For users that request access through proxies, Tor, or VPN: 
            <FormGroup><div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{width: '60%'}}
                >
                 <MenuItem value={10}>proxies</MenuItem>
                 <MenuItem value={20}>Tor</MenuItem>
                 <MenuItem value={30}>VPN</MenuItem>
                </Select></div>
            </FormGroup>

            </div>

            <div class="inboxbox">
            <br /><br />
            Authentication methods<br /><br />
            <hr />
            <p>Only allow users to authenticate with:</p>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Push" />
                <FormControlLabel control={<Checkbox />} label="Mobile passcode" />
                <FormControlLabel control={<Checkbox />} label="SMS passcode" />
                <FormControlLabel control={<Checkbox />} label="Security key U2F" />
                <FormControlLabel control={<Checkbox />} label="Web Authn" />
                <FormControlLabel control={<Checkbox />} label="Touch ID" style={{paddingLeft: '30px'}}/>
                <FormControlLabel control={<Checkbox />} label="Security Keys (WebAuthn)" style={{paddingLeft: '30px'}}/>
                <FormControlLabel control={<Checkbox />} label="Hardware tokens" />
              </FormGroup>

            </div>

            <div class="inboxbox">
            <br /><br />
            Mobile app<br /><br />
            <hr />
            <FormControl>
                  <RadioGroup
                    name="mobile app"
                  >
                    <FormControlLabel value="1" control={<Radio />} label=" Require up-to-date security patches for axiom Mobile." />

                    <FormControlLabel value="2" control={<Radio />} label=" Don't require up-to-date security patches for axiom Mobile. " />
                
                  </RadioGroup>
              </FormControl>
            </div>

            <div class="inboxbox">
            <br /><br />
            Tampered devices<br /><br />
            <hr />
            <FormControl>
                  <RadioGroup
                    name="tempered devices"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow authentication from tampered devices." />

                    <FormControlLabel value="2" control={<Radio />} label="Don't allow authentication from tampered devices.." />

                    Only applies to iOS and Android.
                
                  </RadioGroup>
              </FormControl>
            </div>

            <div class="inboxbox">
            <br /><br />
            Full-disk encryption<br /><br />
            <hr />
            <FormControl>
                  <RadioGroup
                    name="full disk"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow authentication from Android devices without full-disk encryption." />

                    <FormControlLabel value="2" control={<Radio />} label="Don't allow authentication from Android devices without full-disk encryption.." />

                    Only applies to Android.
                
                  </RadioGroup>
              </FormControl>
            </div>

            <div class="inboxbox">
            <br /><br />
            Screen lock<br /><br />
            <hr />
            <FormControl>
                  <RadioGroup
                    name="full disk"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow authentication from devices without a screen lock." />

                    <FormControlLabel value="2" control={<Radio />} label="Don't allow authentication from devices without a screen lock." />

                    Only applies to iOS and Android.
                
                  </RadioGroup>
              </FormControl>
            </div>

            <div class="inboxbox">
            <br /><br />
            Mobile device biometrics<br /><br />
            <hr />
            <p style={{lineHeight: '20px'}}>Apple Touch ID, Face ID and Android Fingerprint can be required as an additional verification when approving Push login requests on supported devices. Any device's passcode can be used as a fallback when biometric verification fails or is unavailable.</p>
            <FormControl>
                  <RadioGroup
                    name="full disk"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow authentication from devices without a screen lock." />

                    <FormControlLabel value="2" control={<Radio />} label="Don't allow authentication from devices without a screen lock." />
                    Only applies to iOS and Android.
                
                  </RadioGroup>
              </FormControl>
            </div> */}
        <br />
        </div>
        {/* <br />
        <div>
        <center>
        <Button type="submit" variant="contained" onClick={handleSubmit}>Save Changes</Button>
        </center>
        </div> */}
            </div>
        )
}