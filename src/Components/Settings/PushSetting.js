import React, { useCallback } from 'react'
import Server from '../APIUrl';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material'
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useLocation, useHistory } from 'react-router-dom';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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

function PushSetting() {
    const location = useLocation();
    const history = useHistory();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    // console.log()
    const [show, setShow] = React.useState(false)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([])

    const [pushmsggatewayconfigForm, setpushmsggatewayconfigForm] = React.useState({
        
       
        hmsAppId: "",
        hmsAppSecret: "",
        hmsUrl: "",
        googleApiKey: "",
        fcmUrl: "",
        googleSenderId: "",
        retryCount: "",
        retryDuration: "",
        status: "",
        isLoading: false,
        
    })



    const [radiuservertestForm, setradiuservertestForm] = React.useState([])
    const [appIDValue, setAppIDValue] = React.useState("")
    // const [jwtToken, setjwtToken] = React.useState(location.state.jwtToken);


    const handleSubmit =async (e) => {
        e.preventDefault()
        console.log(pushmsggatewayconfigForm)
      
        Server.post(`/settings/editPushSettings?accountId=${accountId}&requestTime=${requestTime}`, pushmsggatewayconfigForm, {
            
            
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

                if(response.data.resultCode === 0){
                    Swal.fire("Success",response.data.resultMessage,"success")
                    setpushmsggatewayconfigForm({...pushmsggatewayconfigForm,
                        isLoading: false,
                        isSuccess: true,
                        isError: false,
                        isSnackbarOpen: true
                        
                    })
                }else setpushmsggatewayconfigForm({
                    hmsAppId: "",
                    hmsAppSecret: "",
                    hmsUrl: "",
                    googleApiKey: "",
                    fcmUrl: "",
                    googleSenderId: "",
                    retryCount: "",
                    retryDuration: "",
                    status: "",
                    isLoading: false,
                    
                })
            
            }).catch((err) => {
                console.log(err)
                setpushmsggatewayconfigForm({
                    hmsAppId: "",
                    hmsAppSecret: "",
                    hmsUrl: "",
                    googleApiKey: "",
                    fcmUrl: "",
                    googleSenderId: "",
                    retryCount: "",
                    retryDuration: "",
                    status: "",
                    isLoading: false,
                    
                })
            })
    }

      React.useEffect(() => {
        

        Server.get(`/settings/getPushSettings?accountId=${accountId}&requestTime=${requestTime}`, {
            headers: {
              'content-type': 'application/json',
              authToken: authtoken,
              "Access-Control-Allow-Origin":"*",
              "Access-Control-Allow-Methods":"*"

            },
        })
        .then((response) => {
          console.log(response.data)
          if((response.data.resultCode == 0 || response.data.resultMessage == "Success")){
            setpushmsggatewayconfigForm(response.data.resultData)
        }

           
       }).catch((err) => {
           console.log(err)
          setRows([])

          

       })
 }, [])

     
  return (
    <>
        <div style={{paddingTop: '90px', marginLeft: '20px',}}>
        <div style={{display:"grid",width:"calc(100vw - 260px)",placeItems:"center"}}></div>
            <Grid container spacing={3} >
                    <Grid item xs={12} md={8}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <StyledBreadcrumb
                                component="a"
                                //href="/DashBoard"
                                onClick={useCallback(() => history.push('/AxiomProtect/DashBoard'))}
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                label="Push MSG Gateway Configuration"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                    </Grid>
                 </Grid>
                 <br />
                <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                              <h4>Push MSG Gateway Configuration</h4>
                            </Typography>
                          </Grid>
                </Grid>
                        {/* <p style={{ color:'#5C5C5C', fontSize: 25}}>Push MSG Gateway Configuration</p> */}
                        
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
                        <hr />
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={1}>
                              <p>Status</p>
                            </Grid>
                            <Grid item xs={12} md={2} style={{marginTop: 10}}>
                              <Select fullWidth size="small"
                                      labelId="demo-simple-select-label"
                                      id="status"
                                      name="status"
                                      // label="Status"
                                      value={pushmsggatewayconfigForm.status} onChange={(e) => setpushmsggatewayconfigForm({ ...pushmsggatewayconfigForm, status: e.target.value })}
                                  >
                                      <MenuItem value={1}>Active</MenuItem>
                                      <MenuItem value={-1}>Suspended</MenuItem>
                              </Select>
                            </Grid> 
                            {/* <Grid item xs={12} md={1}></Grid> */}

                            <Grid item xs={12} md={2}>
                              <p>Retry Count</p>
                            </Grid>
                            <Grid item xs={12} md={2} style={{marginTop: 10}}>
                              <Select fullWidth size="small"
                                      labelId="demo-simple-select-label"
                                      id="retryCount"
                                      name="retryCount"
                                      // label="Retry Count"
                                      value={pushmsggatewayconfigForm.retryCount} onChange={(e) => setpushmsggatewayconfigForm({ ...pushmsggatewayconfigForm, retryCount: e.target.value })}
                                  >    
                                      <MenuItem value={1}>1 reteries</MenuItem>
                                      <MenuItem value={2}>2 reteries</MenuItem>
                                      <MenuItem value={3}>3 reteries</MenuItem>
                                      <MenuItem value={4}>4 reteries</MenuItem>
                                      <MenuItem value={5}>5 reteries</MenuItem>
                              </Select>
                            </Grid>

                            <Grid item xs={12} md={2}>
                              <p>Retry Duration</p>
                            </Grid>
                            <Grid item xs={12} md={2} style={{marginTop: 10}}>
                              <Select fullWidth size="small"
                                      labelId="demo-simple-select-label"
                                      id="retryDuration"
                                      name="retryDuration"
                                      // label="Retry Duration"
                                      value={pushmsggatewayconfigForm.retryDuration} onChange={(e) => setpushmsggatewayconfigForm({ ...pushmsggatewayconfigForm, retryDuration: e.target.value })}
                                  >
                                      <MenuItem value={5}>5 seconds</MenuItem>
                                      <MenuItem value={10}>10 seconds</MenuItem>
                                      <MenuItem value={15}>15 seconds</MenuItem>
                                      <MenuItem value={20}>20 seconds</MenuItem>
                              </Select>
                            </Grid>

                        </Grid>
                        <br />
                        {/* <hr /> */}
                            
                        <h3>Huawei Push MSG Gateway</h3>
                        {/* <br /> */}
                        <Grid container spacing={3}>

                          <Grid item xs={12} md={4}>
                              <TextField fullWidth size="small" type="text" name="hmsAppId" id="hmsAppId" label="App ID" variant="outlined" value={pushmsggatewayconfigForm.hmsAppId} onChange={(e) => setpushmsggatewayconfigForm({ ...pushmsggatewayconfigForm, hmsAppId: e.target.value })}/>
                          </Grid>

                          <Grid item xs={12} md={4}>
                              <TextField fullWidth size="small" type="text" name="hmsAppSecret" id="hmsAppSecret" label="App Seceret Key" variant="outlined" value={pushmsggatewayconfigForm.hmsAppSecret} onChange={(e) => setpushmsggatewayconfigForm({ ...pushmsggatewayconfigForm, hmsAppSecret: e.target.value })}/>
                          </Grid>

                          <Grid item xs={12} md={4}>
                              <TextField fullWidth size="small" type="text" name="hmsUrl" id="hmsUrl" label="HWS Url" variant="outlined" value={pushmsggatewayconfigForm.hmsUrl} onChange={(e) => setpushmsggatewayconfigForm({ ...pushmsggatewayconfigForm, hmsUrl: e.target.value })}/>
                          </Grid>
                        </Grid>
                        <br />
                        {/* <hr /> */}

                        <h3>Android/Apple/Web Push MSG Gateway</h3>
                        {/* <br /> */}
                        <Grid container spacing={3}>

                          <Grid item xs={12} md={4}>
                              <TextField fullWidth size="small" type="text" name="googleApiKey" id="googleApiKey" label="API Key" variant="outlined" value={pushmsggatewayconfigForm.googleApiKey} onChange={(e) => setpushmsggatewayconfigForm({ ...pushmsggatewayconfigForm, googleApiKey: e.target.value })}/>
                          </Grid>

                          <Grid item xs={12} md={4}>
                              <TextField fullWidth size="small" type="text" name="fcmUrl" id="fcmUrl" label="GCM Url" variant="outlined" value={pushmsggatewayconfigForm.fcmUrl} onChange={(e) => setpushmsggatewayconfigForm({ ...pushmsggatewayconfigForm, fcmUrl: e.target.value })}/>
                          </Grid>

                          <Grid item xs={12} md={4}>
                              <TextField fullWidth size="small" type="text" name="googleSenderId" id="googleSenderId" label="Google SenderId" variant="outlined" value={pushmsggatewayconfigForm.googleSenderId} onChange={(e) => setpushmsggatewayconfigForm({ ...pushmsggatewayconfigForm, googleSenderId: e.target.value })}/>
                          </Grid>
                        </Grid>
                        <br />
                        <hr /><br />    
                        <div>
                            <center>
                                <Button variant="contained" style={{color:'#FFFFFF', backgroundColor:'#206BC4'}} onClick={(e) => handleSubmit(e)}>Save Setting Now</Button>
                            </center>
                            {/* <Button style={{color:'#FFFFFF', backgroundColor:'#206BC4'}} onClick={this.addApp}>Create custom integration</Button> */}
                        </div>
                        
                        <br /><br />
            </div>
            </>
  );
}

export default PushSetting;