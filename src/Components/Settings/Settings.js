import React, { useCallback ,useEffect} from 'react'
import Server from '../APIUrl';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import './Setting.css'; 
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from "axios";
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import { Backdrop, CircularProgress } from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import { SUCCESSFULLY_ACTIVATED } from '../Routes';
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

function Setting() {
      const history = useHistory();
    const location = useLocation();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([])
    // const [jwtToken, setjwtToken] = React.useState(location.state.jwtToken);
    const [settingForm, setsettingForm] = React.useState({
    
        className: "com.mollatech.internal.handler.user.source.AxiomUser",
        databaseName: "",
        databaseType: "",
        ip: "",
        password: "",
        port: "",
        ssl: "",
        tableName: "",
        userId: "",
        isLoading: false,
        isSuccess: false,
        isError: false,
        isSnackbarOpen: false,
        
        
        
    })
    useEffect(() => {
        console.log(authtoken);   
        return () => {

        }
    }, [])


    React.useEffect(() => {
        

        Server.get(`/settings/getUserSourceSettings?accountId=${accountId}&requestTime=${requestTime}`, {
            headers: {
              'content-type': 'application/json',
              authToken: authtoken,
              "Access-Control-Allow-Origin":"*",
              "Access-Control-Allow-Methods":"*"

            },
        })
        
        .then((response) => {
          console.log(response.data)
        //    setRows([response.data.resultData])
        //setsettingForm(response.data.resultData)
        //     {...settingForm,
        //     databaseName:response.data,
        //     databaseType: "",
        //     ip: "",
        //     password: "",
        //     port: "",
        //     ssl: "",
        //     tableName: "",
        //     userId: "",
            
        // }
        // )
        if(!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to add user source settings")){
            setsettingForm(response.data.resultData)
        }

       
           
       }).catch((err) => {
           console.log(err)

          

       })
 }, [])

    const handleChangePage = (event, newPage) =>  setPage(newPage);
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
      };

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(settingForm)
        
        // const url = "http://demo.axiomprotect.com:1243/AxiomProtect/v1/operator/create?userCount=0&requestTime=2021-09-22+17%3A35%3A02.676"
        setsettingForm({ ...settingForm,isLoading: true })

        Server.post(`/settings/editUserSourceSettings?accountId=${accountId}&requestTime=${requestTime}`, settingForm, {
            
            
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
            },
        })
            .then((response) => {
                
                // history.push({
                //     pathname:"/Confirmidentity",
                //     state:{
                //     userId: response.data.resultData.operator.operatorid,
                //     jwtToken: response.data.resultData.jwtToken,
                //     }
                // })
                /*window.location.href="/Setpassword";*/
                //window.location.reload();
                console.log(response.data)
              if(response.data.resultCode === 0){
                  Swal.fire("",response.data.resultMessage,"success")
                setsettingForm({...settingForm,
                    isLoading: false,
                    isSuccess: true,
                    isError: false,
                    isSnackbarOpen: true
                    
                })
              }else { 
                  Swal.fire("",response.data.resultMessage,"error")
                setsettingForm({
                className: "",
                databaseName: "",
                databaseType: "",
                ip: "",
                password: "",
                port: "",
                ssl: "",
                tableName: "",
                userId: "",
                isLoading: false,
                isSuccess: false,
                isError: true,
                isSnackbarOpen: true
                
            })}
            }).catch((err) => {
                console.log(err)
                setsettingForm({
                    className: "",
                    databaseName: "",
                    databaseType: "",
                    ip: "",
                    password: "",
                    port: "",
                    ssl: "",
                    tableName: "",
                    userId: "",
                    isLoading: false,
                    isSuccess: false,
                    isError: true,
                    isSnackbarOpen: true,
                    
                    
                })
            })
    }
    

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setsettingForm({ ...settingForm, isSnackbarOpen: false });
    };  
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
                                label="User Source Configuration"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                    </Grid>
                 </Grid>
                 <br />
                <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                              <h4>User Source Configuration</h4>
                            </Typography>
                          </Grid>
                </Grid>
                    {/* <h3 class="title" style={{fontSize: '1.5rem'}}>Dashboard/Settings/User Source Configuration</h3> */}
                    {/* <h3 class="title">User Source Configuration</h3><br /> */}

                    <Stack sx={{ width: '99%' }} spacing={2}>
                        <Alert icon={false}>To facilitate internal/external user repository for user.
                               Please configure user repository.</Alert>
                    </Stack>
                </div>
                <br />

                <div style={{ marginLeft: '20px'}}>
                    <hr width="100%"/>
                    <br />
                            <Grid container spacing={3}>

                                <Grid item xs={12} md={2} style={{marginTop: 10}}>
                                    Database type:Host:Port
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <Select fullWidth size="small"
                                        value={settingForm.databaseType}
                                        name="databaseType"
                                        id="databaseType" onChange={(e) => setsettingForm({ ...settingForm, databaseType: e.target.value })}>
                                        
                                        <MenuItem value={'MYSQL'}>MYSQL</MenuItem>
                                        <MenuItem value={'ORACLE'}>ORACLE</MenuItem>
                                        <MenuItem value={'LDAP'}>LDAP</MenuItem>

                                    </Select>
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <TextField fullWidth size="small" type="text" name="ip" id="ip" label="ip" variant="outlined" value={settingForm.ip}
                                                        onChange={(e) => setsettingForm({ ...settingForm, ip: e.target.value })}/>
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <TextField fullWidth size="small" type="text" name="port" id="port" label="8080" variant="outlined" value={settingForm.port}
                                                        onChange={(e) => setsettingForm({ ...settingForm, port: e.target.value })}/>
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <Select fullWidth size="small"
                                        value={settingForm.ssl}
                                        name="ssl"
                                        id="ssl" onChange={(e) => setsettingForm({ ...settingForm, ssl: e.target.value })}>
                                        
                                        <MenuItem value={'true'}>Yes, SSL Enabled</MenuItem>
                                        <MenuItem value={'false'}>No, SSL Disabled</MenuItem>
                                        
                                    </Select>
                                </Grid>
                            </Grid>
                            <br />
                            {/* <hr width="100%"/> */}
                            <br />
                            <Grid container spacing={3}>

                                <Grid item xs={12} md={2} style={{marginTop: 8}}>
                                    Source Details
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth size="small" type="text" name="databaseName" id="databaseName" label="Database Name" variant="outlined" value={settingForm.databaseName}
                                                        onChange={(e) => setsettingForm({ ...settingForm, databaseName: e.target.value })}/>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth size="small" type="text" name="tableName" id="tableName" label="Table Name" variant="outlined" value={settingForm.tableName}
                                                        onChange={(e) => setsettingForm({ ...settingForm, tableName: e.target.value })}/>
                                </Grid>

                                
                            </Grid>
                            <br />
                            {/* <hr width="100%"/> */}
                            <br />
                            <Grid container spacing={3}>

                                <Grid item xs={12} md={2} style={{marginTop: 8}}>
                                    Authenticated with
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth size="small" type="text" name="userId" id="userId" label="User Id" variant="outlined" value={settingForm.userId}
                                                        onChange={(e) => setsettingForm({ ...settingForm, userId: e.target.value })}/>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth size="small" type="password" name="password" id="password" label="Password" variant="outlined" value={settingForm.password}
                                                        onChange={(e) => setsettingForm({ ...settingForm, password: e.target.value })}/>
                                </Grid>

                                
                            </Grid>
                            <br />

                            <hr width="100%"/>
                            <br />
                            <Grid container spacing={3} style={{display: 'none'}}>

                                <Grid item xs={12} md={2} style={{marginTop: 8}}>
                                    Implementation Class
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth size="small" type="text" name="className" id="className"  variant="standard" value={settingForm.className}
                                                        onChange={(e) => setsettingForm({ ...settingForm, className: e.target.value })}/>
                                </Grid>

                                
                            </Grid>
                            

                            <div style={{display:"grid",width:"calc(100vw - 260px)",placeItems:"center"}}></div>
           
                            {/* <TableContainer component={Paper} >
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Database Type</StyledTableCell>
                                        <StyledTableCell align="center">Port</StyledTableCell>
                                        <StyledTableCell align="center">Database Name</StyledTableCell>
                                        
                                        <StyledTableCell align="center">Table Name</StyledTableCell>
                                       
                                        
                                        <StyledTableCell align="center">IP</StyledTableCell>
                                        <StyledTableCell align="center">Password</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                    <StyledTableRow key={index}>
                                        
                                        <StyledTableCell align="center">{row.databaseType}</StyledTableCell>
                                        <StyledTableCell align="center">{row.port}</StyledTableCell>
                                        <StyledTableCell align="center">{row.databaseName}</StyledTableCell>
                                        
                                        <StyledTableCell align="center">{row.tableName}</StyledTableCell>
                                        
                                        <StyledTableCell align="center">{row.ip}</StyledTableCell>
                                        <StyledTableCell align="center">{row.password}</StyledTableCell>
                                    
                                    </StyledTableRow>
                                    ))}
                                </TableBody>
                                
                                </Table>
                                
                            </TableContainer> */}
                                
                            <Grid container spacing={2}>
                                
                                <Grid item xs={12} md={10}>
                                    <center>
                                        <Button variant="contained" onClick={(e) => handleSubmit(e)}>Save Changes</Button>
                                    </center>
                                </Grid>

                                {/* <Grid item xs={12} md={3}>
                                    <Button variant="contained" style={{marginTop: 10, float: 'left',backgroundColor: 'grey'}}>Test connection</Button>
                                </Grid> */}
                                
                            </Grid>
                            <br />

                       
                </div>

                
            </>
  );
}

export default Setting;