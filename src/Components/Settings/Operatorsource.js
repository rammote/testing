import React, { useCallback ,useEffect} from 'react'
import Server from '../APIUrl';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import './Setting.css'; 
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import { Backdrop, CircularProgress } from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Swal from 'sweetalert2';

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
},{index:1});

const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

function Setting() {
          const history = useHistory();
    const location = useLocation();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    // const [jwtToken, setjwtToken] = React.useState(location.state.jwtToken);
    const [rows, setRows] = React.useState([])
    const [OperatorsourceForm, setOperatorsourceForm] = React.useState({
        
       
        databaseName: "",
        host: "",
        password: "",
        port: "",
        sourceType: "",
        sslEnabled: "",
        tableName: "",
        userId: "",
        
    })
    useEffect(() => {
        console.log(authtoken);   
        return () => {

        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(OperatorsourceForm)
      
        Server.post(`/settings/editOperatorSourceSettings?accountId=${accountId}&requestTime=${requestTime}`, OperatorsourceForm, {
            
            
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
                    Swal.fire("Operator Source Setting Saved","Changes has been saved successfully","success")
                    setOperatorsourceForm({...OperatorsourceForm,
                        isLoading: false,
                        isSuccess: true,
                        isError: false,
                        isSnackbarOpen: true
                        
                    })
                }else setOperatorsourceForm({
                    databaseName: "",
                    host: "",
                    password: "",
                    port: "",
                    sourceType: "",
                    sslEnabled: "",
                    tableName: "",
                    userId: "",
                    
                })
            
            }).catch((err) => {
                console.log(err)
                setOperatorsourceForm({
                    databaseName: "",
                    host: "",
                    password: "",
                    port: "",
                    sourceType: "",
                    sslEnabled: "",
                    tableName: "",
                    userId: "",
                    
                })
            })
    }


    React.useEffect(() => {
        

        Server.get(`/settings/getOperatorSourceSettings?accountId=${accountId}&requestTime=${requestTime}`, {
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
            setOperatorsourceForm(response.data.resultData)
        }

           
       }).catch((err) => {
           console.log(err)
          setRows([])

          

       })
 }, [])

  return (
    <>
        <div style={{paddingTop: '90px', marginLeft: '20px'}}>
                <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <StyledBreadcrumb
                                component="a"
                                //href="/DashBoard"
                                onClick={useCallback(() => history.push('/DashBoard'))}
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                label="Operator Source Configuration"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                    </Grid>
                 </Grid>
                 <br />
                <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                              <h4>Operator Source Configuration</h4>
                            </Typography>
                          </Grid>
                </Grid>
                </div>
                       <div style={{ marginLeft: '20px'}}>
                        <hr width="100%"/><br />
                            {/* <Grid container spacing={3}>
                                <Grid item xs={12} md={4} style={{marginTop: 1}}>
                                    Operator Data Source
                                </Grid>
                                <Grid item xs={12} md={8} >
                                    <FormControl sx={{ m: 0, minWidth: 300 }}>
                                        <Select
                                        fullWidth
                                        size="small"
                                        labelId="demo-simple-select-helper-label"
                                        name="sourceType"
                                        id="sourceType"
                                        value={OperatorsourceForm.sourceType}
                                        onChange={(e) => setOperatorsourceForm({ ...OperatorsourceForm, sourceType: e.target.value })}>
                                            <MenuItem value={"External"}>External Data Source</MenuItem>
                                            <MenuItem value={"Internal"}>Internal Data Source</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br />
                            <hr width="150%;"/>
                            <br /><br /> */}
                            <Grid container spacing={3}>
                            
                                <Grid item xs={12} md={2} style={{marginTop: 10}}>
                                    Database type:Host:Port
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <Select fullWidth size="small"
                                        value={OperatorsourceForm.sourceType}
                                        name="databaseType"
                                        id="databaseType" onChange={(e) => setOperatorsourceForm({ ...OperatorsourceForm, sourceType: e.target.value })}>
                                        
                                        <MenuItem value={'MYSQL'}>MYSQL</MenuItem>
                                        <MenuItem value={'ORACLE'}>ORACLE</MenuItem>
                                        <MenuItem value={'LDAP'}>LDAP</MenuItem>

                                    </Select>
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <TextField fullWidth size="small" type="text" name="host" id="host" label="Localhost" variant="outlined" value={OperatorsourceForm.host}
                                                        onChange={(e) => setOperatorsourceForm({ ...OperatorsourceForm, host: e.target.value })}/>
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <TextField fullWidth size="small" type="text" name="port" id="port" label="8080" variant="outlined" value={OperatorsourceForm.port}
                                                        onChange={(e) => setOperatorsourceForm({ ...OperatorsourceForm, port: e.target.value })}/>
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <Select fullWidth size="small"
                                        //value="0" 
                                        value={OperatorsourceForm.sslEnabled}
                                        name="sslEnabled"
                                        id="sslEnabled" onChange={(e) => setOperatorsourceForm({ ...OperatorsourceForm, sslEnabled: e.target.value })}>
                                        
                                        <MenuItem value={'true'}>Yes, SSL Enabled</MenuItem>
                                        <MenuItem value={'false'}>No, SSL Disabled</MenuItem>
                                        
                                    </Select>
                                </Grid>
                            </Grid>
                            <br />
                            {/* <hr width="100%"/> */}
                            <br />
                            <Grid container spacing={3}>

                                <Grid item xs={12} md={2} style={{marginTop: 10}}>
                                    Source Details
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth size="small" type="text" name="databaseName" id="databaseName" label="Axiom Tomcat" variant="outlined" value={OperatorsourceForm.databaseName}
                                                        onChange={(e) => setOperatorsourceForm({ ...OperatorsourceForm, databaseName: e.target.value })}/>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth size="small" type="text" name="tableName" id="tableName" label="Ap Users" variant="outlined" value={OperatorsourceForm.tableName}
                                                        onChange={(e) => setOperatorsourceForm({ ...OperatorsourceForm, tableName: e.target.value })}/>
                                </Grid>

                                
                            </Grid>
                            <br />
                            {/* <hr width="100%;"/> */}
                            <br />
                            <Grid container spacing={3}>

                                <Grid item xs={12} md={2} style={{marginTop: 15}}>
                                    Authenticated with
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth size="small" type="text" name="userId" id="userId" label="root" variant="outlined" value={OperatorsourceForm.userId}
                                                        onChange={(e) => setOperatorsourceForm({ ...OperatorsourceForm, userId: e.target.value })}/>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth size="small" type="password" name="password" id="password" label="Password" variant="outlined" value={OperatorsourceForm.password}
                                                        onChange={(e) => setOperatorsourceForm({ ...OperatorsourceForm, password: e.target.value })}/>
                                </Grid>

                                
                            </Grid>
                            <br />
                            <hr width="100%"/>
                            <br />
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={10}>
                                    <center>
                                        <Button variant="contained" onClick={(e) => handleSubmit(e)}>Save Changes</Button>
                                    </center>
                                </Grid>
                            </Grid>
                            
                                    

                            <br />
                            {/* <Grid container spacing={3}>
                            
                                <Grid item xs={12} md={2} style={{marginTop: 1}}>
                                    Source Parameter
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <TextField fullWidth size="small" type="text" name="name" id="name" label="Operator Name" variant="outlined" />
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <TextField fullWidth size="small" type="text" name="mobile" id="mobile" label="Mobile" variant="outlined" />
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <TextField fullWidth size="small" type="text" name="mail" id="mail" label="Mail" variant="outlined" />
                                </Grid>

                            </Grid> */}
                            {/* <Grid container spacing={2}>
                                <Grid item xs={12} md={12}> */}
                                
                                {/* </Grid> */}

                                {/* <Grid item xs={12} md={3}>
                                    <Button variant="contained" style={{marginTop: 10, float: 'left',backgroundColor: 'grey'}}>Test connection</Button>
                                </Grid> */}
                            {/* </Grid> */}
                    
                </div>

                <div style={{display:"grid",width:"calc(100vw - 260px)",placeItems:"center"}}></div>
            </>
  );
}

export default Setting;