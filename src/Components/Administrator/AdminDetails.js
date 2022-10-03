import React, { Component, useCallback } from 'react'
import Server from '../APIUrl';
import {useHistory} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AdminGeolocation from './AdminGeolocation';
import AdminDevice from './AdminDevice';
import AdminCertificate from './AdminCertificate';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import AdminApplication from './AdminApplication';
import { useLocation } from 'react-router-dom';
import AdminToken from './AdminToken';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdminAllUserDetails from './AdminAllUserDetails';
import AdminSonicDetails from './AdminSonicDetails';

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
        backgroundColor: "#0D4990",
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

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function AdminDetails() {
    const history = useHistory();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const location = useLocation();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [saveuserDetailsForm, setsaveuserDetailsForm] = React.useState({
        
        emailid: location.state.row.emailid,
        phone: location.state.row.phone,
        name: location.state.row.name,
        operatorid: location.state.row.operatorid,
        accountid: location.state.row.accountid
        
    })

    const [data, setData] = React.useState([])
    const [verficationData, setVerificationData] = React.useState({
        isLoading: true,
        isSuccess: false,
        isError: false,
        isSnackbarOpen: false,
    })

    React.useEffect(() => {
        console.log("userId",location.state.row.userid)
      const fetchData = async () => {
        await Server.get(`/absolute/getUserKycDetails?userId=${location.state.row.operatorid}`, {
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"
    
            },
        })
            .then((response) => {
               console.log('VerifData',response.data)
            //    setgeoLocationData({ ...geoLocationData,isLoading: false })
    
               if(response.data.resultCode === 0 ){
                setData(response.data.resultData)
    
               }else{
                   setData([]);
                  
               }
                
            }).catch((err) => {
                console.log(err)
               setData([])
    
               setVerificationData({
                
                isLoading: false,
                isSuccess: false,
                isError: true,
                isSnackbarOpen: true,
            })
    
            })

      }
      return fetchData();
      }, [])

    const [dataSonic, setDataSonic] = React.useState([])

      React.useEffect(() => {

        const fetchSonicData = async () => {
           await Server.get(`/sonicKYC/getVerificationData?userId=${location.state.row.operatorid}&requestTime=${requestTime}`, {
                headers: {
                    'content-type': 'application/json',
                    authToken: authtoken,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*"
    
                },
            })
                .then((response) => {
                   console.log('VerifData',response.data)
                //    setgeoLocationData({ ...geoLocationData,isLoading: false })
    
                   if(response.data.resultCode === 0 ){
                    setDataSonic(response.data.resultData)
    
                   }else{
                       setDataSonic([]);
                   }
                    
                }).catch((err) => {
                    console.log(err)
                   setDataSonic([])
                    
                   setVerificationData({
                    
                    isLoading: false,
                    isSuccess: false,
                    isError: true,
                    isSnackbarOpen: true,
                })
       
                })

        }
        return fetchSonicData();
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(saveuserDetailsForm)
        
        await Server.post(`/operator/edit?requestTime=${requestTime}`, {...saveuserDetailsForm}, {
            
            
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*"
            },
        })
            .then((response) => {
        
            console.log(response.data)
            if(response.data.resultCode === 0 ){
                Swal.fire({
                    title: 'Success',
                    text: response.data.resultMessage,
                    icon: 'success',
                })
               
            }else{
                Swal.fire({
                    title: 'Error',
                    text: response.data.resultMessage,
                    icon: 'error',
                })
            }

            
            }).catch((err) => {
                console.log(err)
                setsaveuserDetailsForm({
                    email: "",
                    phone: "",
                    username: "",
                    
                })
                Swal.fire({
                    title: 'Error',
                    text: err,
                    icon: 'error',
                })
            })
    } 
    
    
    console.log("data",data)

        return (
            <div style={{paddingTop: '90px', paddingLeft: "20px"}}>
                <Grid container >
                    <Grid item>
                        <Breadcrumbs aria-label="breadcrumb">
                            <StyledBreadcrumb
                                component="a"
                                //href="/DashBoard"
                                onClick={useCallback(() => history.push('/AxiomProtect/DashBoard'))}
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb 
                                component="a" 
                                //href="/Users" 
                                onClick={useCallback(() => history.push('/AxiomProtect/Administrator'))}
                                label="Administrator" 
                                style={{cursor: 'pointer'}}
                            />
                            <StyledBreadcrumb
                                label="Admin Details"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                        <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                            <h4>Admin Details</h4>
                        </Typography>
                        

                                 
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    
                    <Grid item xs={12} md={6}>
                        <Typography sx={{fontFamily: 'Jost', fontSize: '15px', color: '#5C5C5C'}}>
                            Admin: {location.state.row.name}    
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{fontFamily: 'Jost', fontSize: '15px', color: '#5C5C5C'}}>    
                            Email: {location.state.row.emailid}
                        </Typography>
                    </Grid>
                    

                    

                    {/* <Grid item xs={12} md={4} >
                        <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                            <Button variant="contained" color="primary" onClick={(e) => handleSubmit(e)} style={{float: 'right'}}>
                            Save Changes
                            </Button>
                        </Typography>   
                    </Grid> */}
                 </Grid>
                <br />
                {/* <Divider sx={{borderColor: '#BABABA', width: '1160px'}}/> */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"sx={{width: "950px"}}>
                    <Tab  label= {<Typography sx={{fontFamily: 'Jost'}}>Admin Details</Typography>} {...a11yProps(0)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Applications</Typography>} {...a11yProps(1)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Token</Typography>} {...a11yProps(2)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Certificate</Typography>} {...a11yProps(3)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Geolocation</Typography>} {...a11yProps(4)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Device</Typography>} {...a11yProps(5)} />
                    {data.length == "0" ? " " :
                        <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Absolute Details</Typography>} {...a11yProps(6)} />
                    }
                    {dataSonic.length == "0" ? " " :
                        <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Sonic Details</Typography>} {...a11yProps(6)} />
                    }
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                <Grid container spacing={3}>
                    
                    
                    <Grid item xs={3} md={2}>
                        Operator ID
                    </Grid>

                    <Grid item xs={8} md={9}>
                        
                        <TextField fullWidth size="small" type="text" name="username" id="username"  variant="outlined" value={saveuserDetailsForm.operatorid} inputProps={{ readOnly: true, }} onChange={(e) => setsaveuserDetailsForm({ ...saveuserDetailsForm, operatorid: e.target.value })}/>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={3}>
                    
                    
                    <Grid item xs={3} md={2}>
                        Name
                    </Grid>

                    <Grid item xs={8} md={9}>
                        
                        <TextField fullWidth inputProps={{ readOnly: true, }} size="small" type="text" name="username" id="username"  variant="outlined" defaultValue={saveuserDetailsForm.name} onChange={(e) => setsaveuserDetailsForm({ ...saveuserDetailsForm, name: e.target.value })}/>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={3} md={2}>
                        Email
                    </Grid>

                    <Grid item xs={8} md={9}>
                        
                        <TextField inputProps={{ readOnly: true, }} fullWidth size="small" type="text" name="email" id="email"  variant="outlined" value={saveuserDetailsForm.emailid} onChange={(e) => setsaveuserDetailsForm({ ...saveuserDetailsForm, emailid: e.target.value })}/>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={3} md={2}>
                        Phone
                    </Grid>

                    <Grid item xs={8} md={9}>
                        
                        <TextField inputProps={{ readOnly: true, }} fullWidth size="small" type="text" name="phone" id="phone"  variant="outlined" defaultValue={saveuserDetailsForm.phone} onChange={(e) => setsaveuserDetailsForm({ ...saveuserDetailsForm, phone: e.target.value })}/>
                    </Grid>
                </Grid>
                <br />
                {/* <Grid container spacing={3}>
                    <Grid item xs={3} md={2}>
                        Password
                    </Grid>

                    <Grid item xs={8} md={2}>
                        <Button  type="text" style={{fontSize: '11px'}}>Unlock password</Button>
                    </Grid>

                    <Grid item xs={8} md={3}>
                        <Button  type="text" style={{fontSize: '11px'}}>Reset password via mobile</Button>
                    </Grid>

                    <Grid item xs={8} md={4}>
                        <Button  type="text" style={{fontSize: '11px'}} onClick={(e) => handleSetRandompasswordSubmit(e)}>Set random password</Button>
                    </Grid>

                    <Grid item xs={8} md={3}>
                        <Button  type="text" style={{fontSize: '11px'}}>Set random password via mobile</Button>
                    </Grid>
                </Grid>
                <br /> */}
                <br />
                {/* <Grid item xs={12} md={4} > */}
                        <center>
                            {/* <Button variant="contained" color="primary" onClick={(e) => handleSubmit(e)}>
                                Save Changes
                            </Button> */}
                        </center> 
                    {/* </Grid> */}

                {/* <br />
                <Grid container spacing={3}>
                    <Grid item xs={3} md={2}>
                        Address
                    </Grid>

                    <Grid item xs={8} md={3}>
                        
                        <TextField fullWidth size="small" type="text" name="srno" id="srno" label="Country" variant="outlined" value="" readonly/>
                    </Grid>

                    <Grid item xs={8} md={3}>
                        
                        <TextField fullWidth size="small" type="text" name="srno" id="srno" label="Address line 1" variant="outlined" value="" readonly/>
                    </Grid>

                    <Grid item xs={8} md={3}>
                        
                        <TextField fullWidth size="small" type="text" name="srno" id="srno" label="Address line 2" variant="outlined" value="" readonly/>
                    </Grid>
                </Grid>

                <br />
                <Grid container spacing={3}>
                    <Grid item xs={3} md={2}>
                        Organisation
                    </Grid>

                    <Grid item xs={8} md={3}>
                        
                        <TextField fullWidth size="small" type="text" name="srno" id="srno" label="Designation" variant="outlined" value="" readonly/>
                    </Grid>

                    <Grid item xs={8} md={3}>
                        
                        <TextField fullWidth size="small" type="text" name="srno" id="srno" label="Organisation name" variant="outlined" value="" readonly/>
                    </Grid>

                    <Grid item xs={8} md={3}>
                        
                        <TextField fullWidth size="small" type="text" name="srno" id="srno" label="Organisation unit" variant="outlined" value="" readonly/>
                    </Grid>
                </Grid> */}
                <br /><br />
                    
                
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AdminApplication />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <AdminToken data={location.state.row} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <AdminCertificate data={location.state.row}/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <AdminGeolocation data={location.state.row}/>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <AdminDevice data={location.state.row}/>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <AdminAllUserDetails data={location.state.row}/>
                </TabPanel>
                <TabPanel value={value} index={7}>
                    <AdminSonicDetails data={location.state.row}/>
                </TabPanel> 
            </div>
        )
}