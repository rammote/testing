import React, { useCallback } from 'react'
import Server from '../APIUrl';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useLocation, useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import Swal from 'sweetalert2';
import TablePagination from '@mui/material/TablePagination';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';

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

const label = { inputProps: {'aria-label': 'Checkbox demo' }};
const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#728FCE",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function RadiusServerConfig() {
    const location = useLocation();
    const history = useHistory();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    // console.log()
    const [show, setShow] = React.useState(false)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([])

    const [radiuserverconfigForm, setradiuserverconfigForm] = React.useState({
        
        accountEnabled: false,
        accountIp: "",
        accountPort: "",
        authEnabled: false,
        authIp: "",
        authPort: "",
        ldapSearchPath: "",
        ldapServerIp: "",
        ldapServerPassword: "root",
        ldapServerPort: "",
        ldapServerUsername: "ajjjjj",
        isLoading: false,
        
    })



    const [radiuservertestForm, setradiuservertestForm] = React.useState([])
    const [appIDValue, setAppIDValue] = React.useState("")
    // const [jwtToken, setjwtToken] = React.useState(location.state.jwtToken);


    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(radiuserverconfigForm)
        let valueOfRadiuserverconfigForm ={...radiuserverconfigForm,isLoading: true}

        if(!valueOfRadiuserverconfigForm.accountEnabled){
            valueOfRadiuserverconfigForm={ ...valueOfRadiuserverconfigForm, accountPort:"",accountIp:"" }
        } 

        if(!valueOfRadiuserverconfigForm.authEnabled){
            valueOfRadiuserverconfigForm={ ...valueOfRadiuserverconfigForm, authIp:"",authPort:"" }
        }

        console.log("valueOfRadiuserverconfigForm",valueOfRadiuserverconfigForm)
        // // const url = "http://demo.axiomprotect.com:1243/AxiomProtect/v1/operator/create?userCount=0&requestTime=2021-09-22+17%3A35%3A02.676"
        // // POST /v1/settings/addRadiusServiceSettings
        Server.post(`/radius/addRadiusServiceConfiguration?accountId=${accountId}&requestTime=${requestTime}`, valueOfRadiuserverconfigForm, {
            
            
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*"
            },
        })
            .then((response) => {
                
                console.log(response.data)

                
                //history.push("/RadiusServerConfig")
                /*window.location.href="/Setpassword";*/
               console.log(response.data)

                if(response.data.resultCode == 0){
                    Swal.fire("Radius Server Setting Saved","Changes has been saved successfully","success")
                    setradiuserverconfigForm({...radiuserverconfigForm,
                        isLoading: false,
                        isSuccess: true,
                        isError: false,
                        isSnackbarOpen: true
                        
                    })
                }else setradiuserverconfigForm({
                    accountEnabled: true,
                    accountIp: "",
                    accountPort: "",
                    authEnabled: "true",
                    authIp: "",
                    authPort: "",
                    ldapSearchPath: "",
                    ldapServerIp: "",
                    ldapServerPassword: "root",
                    ldapServerPort: "",
                    ldapServerUsername: "ajjjjj",
                    isLoading: false,
                    
                })
            
            }).catch((err) => {
                console.log(err)
                setradiuserverconfigForm({
                    accountEnabled: true,
                    accountIp: "",
                    accountPort: "",
                    authEnabled: "true",
                    authIp: "",
                    authPort: "",
                    ldapSearchPath: "",
                    ldapServerIp: "",
                    ldapServerPassword: "root",
                    ldapServerPort: "",
                    ldapServerUsername: "ajjjjj",
                    isLoading: false,
                    
                })
            })
    }

      React.useEffect(() => {
        

        Server.get(`/radius/getRadiusServiceConfiguration?accountId=${accountId}&requestTime=${requestTime}`, {
            headers: {
              'content-type': 'application/json',
              authToken: authtoken,
              "Access-Control-Allow-Origin":"*",
              "Access-Control-Allow-Methods":"*"

            },
        })
        .then((response) => {
          console.log(response.data)
          if(!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get radius service settings")){
            setradiuserverconfigForm(response.data.resultData)
        }

           
       }).catch((err) => {
           console.log(err)
          setRows([])

          

       })
 }, [])


 React.useEffect(() => {
        

    Server.get(`/radius/getRadiusServiceStatus?requestTime=${requestTime}`, {
        headers: {
          'content-type': 'application/json',
          authToken: authtoken,
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Methods":"*"

        },
    })
    .then((response) => {
      console.log(response.data)
      if(!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get radius service settings")){
        setradiuserverconfigForm(response.data.resultData)
    }

       
   }).catch((err) => {
       console.log(err)
      setRows([])

      

   })
}, [])



 const startstopRadiusServerConfig=(e)=>{
    console.log(e);
    if(e == true){
        Server.post(`/radius/startRadiusService?type=1&requestTime=${requestTime}`,{}, {
        headers: {
          'content-type': 'application/json',
          authToken: authtoken,
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Methods":"*"

        },
    })
    .then((response) => {
       
      console.log(response.data)
      Swal.fire("Radius service started successfully!!!","","success")

       
   }).catch((err) => {
       console.log(err)
   })
       
       console.log( "call app")
    }else{
        Server.post(`/radius/stopRadiusService?type=1&requestTime=${requestTime}`,{}, {
        headers: {
          'content-type': 'application/json',
          authToken: authtoken,
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Methods":"*"

        },
    })
    .then((response) => {
       
      console.log(response.data)
      Swal.fire("Radius service Stop successfully!!!","","success")

       
   }).catch((err) => {
       console.log(err)
   })
    }
   
}





 const handleServerTest=(e)=>{
    e.preventDefault()
    if(!show){
        Server.get(`/application/getApplicationByType?accountId=${accountId}&type=1&requestTime=${requestTime}`, {
        headers: {
          'content-type': 'application/json',
          authToken: authtoken,
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Methods":"*"

        },
    })
    .then((response) => {
        setShow(show => !show)
      console.log(response.data)
      if(response.data.resultCode == 0 ){
        setradiuservertestForm(response.data.resultData)
    }

       
   }).catch((err) => {
       console.log(err)
      setRows([])

      

   })
       
       console.log( "call app")
    }else   setShow(show => !show)
   
}
    
  return (
    <>
            <div style={{paddingTop: '90px', marginLeft: '20px'}}>
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
                                label="Radius Server Configuration"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                    </Grid>
                 </Grid>
                 <br />
                <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                              <h4>Radius Server Configuration</h4>
                            </Typography>
                          </Grid>
                </Grid>
                <Stack sx={{ width: '99%' }} spacing={2}>
                        <Alert icon={false}>To Facilitate RADIUS support for authentication AXIOM Protect exposes RADIUS interface that can 
                        be used for RADIUS compliant systems like VPN etc.</Alert>
                    </Stack>
                    </div>
                    <br />
                    <div style={{ marginLeft: '20px'}}>
                        {/* <p style={{ color:'#5C5C5C', fontSize: 25}}>Radius Server Configuration</p> */}
                        
                        {/* <h3> <Checkbox {...label} defaultUnChecked size="medium" />Enable Radius</h3>
                        
                        <hr />
                        <br />
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={2} style={{marginTop: 1}}>
                                Host/IP :Port
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth size="small" type="text" name="ip" id="p" label="Host/IP" variant="outlined" />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth size="small" type="text" name="port" id="port" label="Port" variant="outlined" />
                            </Grid>

                        </Grid> */}
                        <hr width="100%"/>
                        <br />
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={2} style={{marginTop: 10}}>
                                Server : IP
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth size="small" name="serverIp" id="serverIp" label="" variant="outlined" value={radiuserverconfigForm.serverIp} onChange={(e) => setradiuserverconfigForm({ ...radiuserverconfigForm, serverIp: e.target.value })}/>
                                {/* <TextField fullWidth size="small" name="accountPort" id="accountPort" label="Host" variant="outlined" value={radiuserverconfigForm.accountPort} onChange={(e) => setradiuserverconfigForm({ ...radiuserverconfigForm, accountPort: e.target.value })}/> */}
                            </Grid>

                            {/* <Grid item xs={12} md={6}>
                                <TextField fullWidth size="small" type="text" name="accountPort" id="accountPort" label="Host" variant="outlined" value={radiuserverconfigForm.accountPort} onChange={(e) => setradiuserverconfigForm({ ...radiuserverconfigForm, accountPort: e.target.value })}/>
                            </Grid> */}

                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={2}>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Checkbox checked={radiuserverconfigForm.accountEnabled} onChange={(e)=>setradiuserverconfigForm({ ...radiuserverconfigForm,accountEnabled: e.target.checked })} {...label} defaultUnChecked size="medium" />Accounting Details
                            </Grid>
                        </Grid>
                            {/* <hr width="100%"/> */}
                            <br />
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={2} style={{marginTop: 10}}>
                                Host : Port
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth size="small" name="accountPort" id="accountPort" label="Host" variant="outlined" value={radiuserverconfigForm.accountPort} onChange={(e) => setradiuserverconfigForm({ ...radiuserverconfigForm, accountPort: e.target.value })}/>
                            </Grid>

                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={2}>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Checkbox checked={radiuserverconfigForm.authEnabled} onChange={(e)=>setradiuserverconfigForm({ ...radiuserverconfigForm,authEnabled: e.target.checked })} {...label} defaultUnChecked size="medium" />Authentication Details
                            </Grid>
                        </Grid>
                            {/* <hr width="100%"/> */}
                            <br />
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={2} style={{marginTop: 10}}>
                                Host : Port
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth size="small" name="authPort" id="authPort" label="Host" variant="outlined" value={radiuserverconfigForm.authPort} onChange={(e) => setradiuserverconfigForm({ ...radiuserverconfigForm, authPort: e.target.value })}/>
                            </Grid>

                        </Grid>


                            {/* <h4>Password Verification</h4>
                            <hr width="120%"/>
                            <br />
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={4} style={{marginTop: 15}}>
                                LDAP Host/IP
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth size="small" type="text" name="ldapServerIp" id="ldapServerIp" label="IP" variant="outlined" value={radiuserverconfigForm.ldapServerIp} onChange={(e) => setradiuserverconfigForm({ ...radiuserverconfigForm, ldapServerIp: e.target.value })}/>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth size="small" type="text" name="ldapServerPort" id="ldapServerPort" label="Host" variant="outlined" value={radiuserverconfigForm.ldapServerPort} onChange={(e) => setradiuserverconfigForm({ ...radiuserverconfigForm, ldapServerPort: e.target.value })}/>
                            </Grid>

                        </Grid>
                        <br />
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={4} style={{marginTop: 15}}>
                                LDAP Search Path
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth size="small" type="text" name="ldapSearchPath" id="ldapSearchPath" label="Name" variant="outlined" value={radiuserverconfigForm.ldapSearchPath} onChange={(e) => setradiuserverconfigForm({ ...radiuserverconfigForm, ldapSearchPath: e.target.value })}/>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth size="small" type="text" name="tableName" id="tableName" label="Leave Blank is no Authentication" variant="outlined" value={radiuserverconfigForm.tableName} onChange={(e) => setradiuserverconfigForm({ ...radiuserverconfigForm, tableName: e.target.value })}/>
                            </Grid>

                        </Grid> */}
                        <br />
                        <hr width="100%"/>

                        {/* Radius Server Status<Switch {...label} onChange={(e) => startstopRadiusServerConfig(e.target.checked )} color="secondary" />     */}
                        


                        <div style={{display:"grid",width:"calc(100vw - 260px)",placeItems:"center"}}></div>
           
                        {/* <TableContainer component={Paper} >
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Account Ip</StyledTableCell>
                                        <StyledTableCell align="center">Account Port</StyledTableCell>
                                        <StyledTableCell align="center">Auth Ip</StyledTableCell>
                                        <StyledTableCell align="center">Auth Port</StyledTableCell>
                                        <StyledTableCell align="center">LDAP Search Path</StyledTableCell>
                                        <StyledTableCell align="center">LDAP Server Ip</StyledTableCell>
                                        <StyledTableCell align="center">LDAP Server Port</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                    <StyledTableRow key={index}>
                                        
                                        <StyledTableCell align="center">{row.accountIp}</StyledTableCell>
                                        <StyledTableCell align="center">{row.accountPort}</StyledTableCell>
                                        <StyledTableCell align="center">{row.authIp}</StyledTableCell>
                                        <StyledTableCell align="center">{row.authPort}</StyledTableCell>
                                        <StyledTableCell align="center">{row.ldapSearchPath}</StyledTableCell>
                                        <StyledTableCell align="center">{row.ldapServerIp}</StyledTableCell>
                                        <StyledTableCell align="center">{row.ldapServerPort}</StyledTableCell>
                                    
                                    </StyledTableRow>
                                    ))}
                                </TableBody>
                                
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableContainer>*/} 

                        <div>
                            <center>
                                {/* <Button variant="contained" style={{color:'#FFFFFF', backgroundColor:'#206BC4'}} onClick={(e) => handleSubmit(e)}>Save Setting Now</Button> */}
                                {/* <Button variant="contained" style={{color:'#FFFFFF', backgroundColor:'#707070', marginLeft: 10}} onClick={(e)=>handleServerTest(e)}>Radius Server Test</Button> */}
                            </center>
                            {/* <Button style={{color:'#FFFFFF', backgroundColor:'#206BC4'}} onClick={this.addApp}>Create custom integration</Button> */}
                        </div>

                        {show?
                        
                        <div >
                            <br /><br />
                            <Grid container spacing={3}>

                                <Grid item xs={12} md={2} style={{marginTop: 10}}>
                                    App Id
                                </Grid>

                                <Grid item xs={12} md={2}>
                                <Select fullWidth size="small"
                                    value={appIDValue}
                                        name="appId"
                                        id="appId"
                                         onChange={(e) => setAppIDValue(e.target.value)}
                                         >
                                             {console.log(radiuservertestForm)}
                                        
                                        {radiuservertestForm.map((app,idx)=>
                                           
                                            
                                                <MenuItem key={idx} value={app.appId}>{app.appId}</MenuItem>
                                                   
                                        )}
                                        

                                    </Select>
                                </Grid>

                                <Grid item xs={12} md={2} style={{marginTop: 10}}>
                                    Shared Seceret
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <TextField fullWidth size="small" type="text" name="sharedSeceret" id="sharedSeceret" label="Shared Seceret" variant="outlined"/>
                                </Grid>

                            </Grid>
                            <br />
                            
                            <Grid container spacing={3}>

                                <Grid item xs={12} md={2} style={{marginTop: 15}}>
                                    UserName
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <TextField fullWidth size="small" type="text" name="userName" id="userName" label="UserName" variant="outlined"/>
                                </Grid>

                                <Grid item xs={12} md={2} style={{marginTop: 15}}>
                                    Password
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <TextField fullWidth size="small" type="text" name="password" id="password" label="Password" variant="outlined"/>
                                </Grid>

                            </Grid>
                            <br /><br />
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8}>
                                <center>
                                    <Button variant="contained" style={{color:'#FFFFFF', backgroundColor:'#206BC4'}}>Save</Button>
                                </center>
                                {/* <Button style={{color:'#FFFFFF', backgroundColor:'#206BC4'}} onClick={this.addApp}>Create custom integration</Button> */}
                                </Grid>
                            </Grid>
                        </div>
                        : null
                        }
                        <br /><br />
                    </div>
                
            </>
  );
}

export default RadiusServerConfig;