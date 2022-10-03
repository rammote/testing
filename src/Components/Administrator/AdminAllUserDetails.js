import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import Server from '../APIUrl';

import Button from '@mui/material/Button';
import moment from 'moment';
import { useHistory, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
// import google_map from './google_map.jpg'
// import pancard from './pancard.jpg'
// import signature from './signature.jpg'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import PropTypes from 'prop-types';
import { MyMapComponent } from './Test';

const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);


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


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    // height: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    fontFamily: 'Jost',
};

  const dropdowntypes = [
    // { label: (<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}>Web</Typography>), value: ("web") },
    // { label: (<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}>Mobile</Typography>), value: ("mobile") },
    {label: ("Web")},
    {label: ("Mobile")}
]; 

export default function AllUserDetails() {
  const history = useHistory();
  const location = useLocation();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const userId = sessionStorage.getItem("userId");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    const [value, setValue] = React.useState("");
    const [rowsss, setRowsss] = React.useState([])

    const [rowsssss, setRowsssss] = React.useState([])
    const [data, setData] = React.useState([])

    const [DocImage, setDocImage] = React.useState("");

    const [applicationData, setApplicationData] = React.useState({

      isLoading: true,
      isSuccess: false,
      isError: false,
      isSnackbarOpen: false,

  })

  //const handleOnClick = useCallback(() => history.push('/Applications/Radius'), [history]);

  const [value1, setValue1] = React.useState(0);

  const handleChange = (event, newValue1) => {
    setValue1(newValue1);
  };

  const [value2, setValue2] = React.useState(0);

  const handleChangeSign = (event, newValue2) => {
    setValue2(newValue2);
  };

    const handleChangePage = (event, newPage) =>  setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };

    const [geoLocationData, setgeoLocationData] = React.useState({

        isLoading: true,
        isSuccess: false,
        isError: false,
        isSnackbarOpen: false,

    })

    const [verficationData, setVerificationData] = React.useState({
        isLoading: true,
        isSuccess: false,
        isError: false,
        isSnackbarOpen: false,
    })

      React.useEffect(() => {
        // setApplicationData({ ...applicationData,isLoading: true })

        Server.get(`/geotrack/getByUserId?accountId=${accountId}&userId=${location.state.row.operatorid}&appid=${location.state.row.appid}&requestTime=${requestTime}`, {
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"

            },
        })
            .then((response) => {
                setgeoLocationData({ ...geoLocationData,isLoading: false })

               if((response.data.resultCode == 0 || response.data.resultMessage == "Success")){
                setRows(response.data.resultData)

               }
                
            }).catch((err) => {
                console.log(err)
               setRows([])

               setgeoLocationData({
                
                isLoading: false,
                isSuccess: false,
                isError: true,
                isSnackbarOpen: true,
            })

            })
      }, [])

      React.useEffect(() => {
        Server.get(`/absolute/getUserKycDetails?userId=${location.state.row.operatorid}`, {
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"

            },
        })
            .then((response) => {
            //    setgeoLocationData({ ...geoLocationData,isLoading: false })

               if((response.data.resultCode == 0 || response.data.resultMessage == "Success")){
                setData(response.data.resultData)

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
      }, [])


      const [deviceData, setDeviceData] = React.useState({

        isLoading: true,
        isSuccess: false,
        isError: false,
        isSnackbarOpen: false,
  
      })

      React.useEffect(() => {
        // setApplicationData({ ...applicationData,isLoading: true })

        Server.get(`/device/getDevicesByuserId?accountId=${accountId}&userId=${location.state.row.operatorid}&appId=${location.state.row.appid}&requestTime=${requestTime}`, {
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"

            },
        })
            .then((response) => {
               setDeviceData({ ...deviceData,isLoading: false })

               if(!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get applications")){
                setRowsss(response.data.resultData)

               }
                
            }).catch((err) => {
                console.log(err)
                setRowsss([])

               setDeviceData({
                
                isLoading: false,
                isSuccess: false,
                isError: true,
                isSnackbarOpen: true,
            })

            })


    }, [])


    const [tokenData, setTokenData] = React.useState(
      {

      isLoading: true,
      isSuccess: false,
      isError: false,
      isSnackbarOpen: false,

    }
    )

    const [otpTokenDetails, setOtpTokenDetails] = useState([
      {
        category: 1,
        isOTPGenarated :false
      },
      {
        category: 2,
        isOTPGenarated :false

      },
      {
        category: 3,
        isOTPGenarated :false
      },
      {
        category: 4,
        isOTPGenarated :false

      }
    ])

    React.useEffect(() => {
      // setApplicationData({ ...applicationData,isLoading: true })

      Server.post(`/token/getOTPTokens?userId=${location.state.row.operatorid}&appId=${location.state.row.appid}&requestTime=${requestTime}`,{}, {
          headers: {
              'content-type': 'application/json',
              authToken: authtoken,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*"

          },
      })
          .then((response) => {
             let updatedArray = [...otpTokenDetails]
             for (let index = 0; index < response.data.resultData.length; index++) {
               const element = response.data.resultData[index];
               let updatedTokenIDX= otpTokenDetails.findIndex((item)=>item.category == element.category)
               updatedArray[updatedTokenIDX].isOTPGenarated =true
               setOtpTokenDetails(updatedArray)
             }
             setTokenData({ ...deviceData,isLoading: false })

             if(response.data.resultCode === 0 ){
              setRowsssss(response.data.resultData)

             }
              
          }).catch((err) => {
              console.log(err)
              setRowsss([])

              setTokenData({
              
              isLoading: false,
              isSuccess: false,
              isError: true,
              isSnackbarOpen: true,
          })

          })
  }, [])

  return (
      <>
        <Button variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Profile Details</Button><br /><br />
        <div style={{ display: "flex", justifyContent: "flex-start",width:"fit-content" }}>
        
          
                
                  <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 1050 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          
                          <StyledTableCell>UserName</StyledTableCell>
                          <StyledTableCell>Profile Icon</StyledTableCell>
                          <StyledTableCell >Email</StyledTableCell>
                          <StyledTableCell >Phone Number</StyledTableCell>
                          <StyledTableCell >Status</StyledTableCell>
                          {/* <StyledTableCell align="center">Activate</StyledTableCell>
                          <StyledTableCell align="center">Suspend</StyledTableCell> */}
                          <StyledTableCell >Create On</StyledTableCell>
                          <StyledTableCell >Certificate</StyledTableCell>
                          

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        
                          <StyledTableRow>
                            <StyledTableCell>{location.state.row.username}</StyledTableCell>
                            <StyledTableCell>{location.state.row.email}</StyledTableCell>
                            <StyledTableCell>{location.state.row.email}</StyledTableCell>
                            <StyledTableCell>{location.state.row.phone}</StyledTableCell>
                            <StyledTableCell>
                            {location.state.row.status == 1 ?
                                <Button variant="contained" color="success">
                                    Active
                                </Button>
                                :
                                <Button variant="contained" color="error">
                                    Suspended
                                </Button>
                            }       
                            </StyledTableCell>
                            <StyledTableCell>{moment(location.state.row.createdon).format('D-M-YYYY, h:mm:ss')}</StyledTableCell>
                            <StyledTableCell><Chip label="&nbsp;&nbsp;&nbsp;&nbsp;view&nbsp;&nbsp;&nbsp;&nbsp;" color="primary" variant="outlined"/></StyledTableCell>
                            
                            
                            
                            
                          </StyledTableRow>
                      
                      </TableBody>
                    
                    </Table>
                  </TableContainer>
              
            
        </div>
        <br />
        <hr />
        <br />
        <Button variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Geolocation</Button><br /><br />
        <div style={{  width: '95%' }}>
        {rows.length == "0" ? 
              <div style={{marginTop: "100px"}}><center>No data found</center></div>
              : <MyMapComponent
                isMarkerShown
                rows={rows}
              />}
        </div>
          <div style={{ display: "flex", justifyContent: "flex-start",width:"fit-content" }}>
            
        <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 1050 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                        
                            <StyledTableCell>IP addresses</StyledTableCell>
                            <StyledTableCell align="center">Latitude</StyledTableCell>
                            <StyledTableCell align="center">Longitude</StyledTableCell>
                            <StyledTableCell align="center">City</StyledTableCell>
                            <StyledTableCell align="center">State</StyledTableCell>
                            <StyledTableCell align="center">Country</StyledTableCell>
                            <StyledTableCell align="center">zipcode</StyledTableCell>
                            <StyledTableCell align="center">Type</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                        
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                        <StyledTableRow key={index}>
                            
                            <StyledTableCell>{row.ip}</StyledTableCell>
                            <StyledTableCell align="center">{row.lattitude}</StyledTableCell>
                            <StyledTableCell align="center">{row.longitude}</StyledTableCell>
                            <StyledTableCell align="center">{row.city}</StyledTableCell>
                            <StyledTableCell align="center">{row.state}</StyledTableCell>
                            <StyledTableCell align="center">{row.country}</StyledTableCell>
                            <StyledTableCell align="center">{row.zipcode}</StyledTableCell>
                            <StyledTableCell align="center">{row.txtype}</StyledTableCell>
                            <StyledTableCell align="center">{moment(row.executedOn).format('D-M-YYYY, h:mm:ss')}</StyledTableCell>
                            
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
                </TableContainer>
                </div>
            {/* <br /><br />
        <div style={{ display: "flex", justifyContent: "flex-start"}}>
        
        <div style={{ height: '50vh', width: '100%' }}>
              {rows.length > 0 && <MyMapComponent
                isMarkerShown
                rows={rows}
              />}
              </div>
        </div> */}
        <br />
        <hr />
        <br />

        <Button variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Identity Documents</Button><br /><br />

              {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value1} onChange={handleChange} aria-label="basic tabs example">
                    <Tab  label= {<Typography sx={{fontFamily: 'Jost'}}>Absolute KYC </Typography>} {...a11yProps(0)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Sonic KYC</Typography>} {...a11yProps(1)} />
                    </Tabs>
                </Box>

                <TabPanel value={value1} index={0}> */}
                  <div style={{ display: "flex", justifyContent: "flex-start"}}>

                      <Grid container spacing={3}>
                          <Grid item xs={12} md={4} lg={4}>
                              <img src={data.docimage} style={{ width: 300, height: 180 }}/>
                          </Grid>

                          <Grid item xs={12} md={4} lg={4}>
                              <img src={data.docverificationdetails} style={{ width: 300, height: 180 }}/>
                          </Grid>
                          
                      </Grid>
                  </div>
                {/* </TabPanel>
                <TabPanel value={value1} index={1}>
                  Item Two
                </TabPanel> */}
        
        <br />
        <hr />
        <br />

        <Button variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Signature</Button><br /><br />

              {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value2} onChange={handleChangeSign} aria-label="basic tabs example">
                    <Tab  label= {<Typography sx={{fontFamily: 'Jost'}}>Absolute KYC </Typography>} {...a11yProps(0)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Sonic KYC</Typography>} {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value2} index={0}> */}
                  <div style={{ display: "flex", justifyContent: "flex-start"}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} lg={4}>
                            <img src={data.signimage} style={{ width: 300, height: 180 }}/>
                        </Grid>
                    </Grid>
                    </div>
                {/* </TabPanel>
                <TabPanel value={value2} index={1}>
                  Item Two
                </TabPanel> */}
        
        <br />
        <hr />
        <br />

        <Button variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Video Call</Button><br /><br />
        <div style={{ display: "flex", justifyContent: "flex-start"}}>
            <iframe width="853" height="480" src={data.videocalldetails} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br />
        <hr />
        <br />

        <Button variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Tokens</Button><br /><br />
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 1050 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    
                    <StyledTableCell>Software Token</StyledTableCell>
                    <StyledTableCell>Hardware Token</StyledTableCell>
                    <StyledTableCell >OOB Token</StyledTableCell>
                    <StyledTableCell >Push Token</StyledTableCell>
                    
                </TableRow>
                </TableHead>
                <TableBody>
                
                  <StyledTableRow>
                {otpTokenDetails.map((item,idx)=>(

                    <StyledTableCell key={idx}>
                      {item.isOTPGenarated ? 
                      <CheckCircleOutlineRoundedIcon color="success" />
                        :<CancelIcon color="error" />
                    }
                      </StyledTableCell>
                ))}
                    
                    </StyledTableRow>
                    
               
                </TableBody>
            
            </Table>
        </TableContainer>

        <br />
        <hr />
        <br />
        <Button variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>User Device</Button><br /><br />
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 1050 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    
                    <StyledTableCell>Device</StyledTableCell>
                    <StyledTableCell>Plateform</StyledTableCell>
                    <StyledTableCell >Model</StyledTableCell>
                    <StyledTableCell >Version</StyledTableCell>
                    
                </TableRow>
                </TableHead>
                <TableBody>
                {rowsss.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((rowsss, index) => (
                    <StyledTableRow key={index}>
                    <StyledTableCell>{rowsss.deviceid}</StyledTableCell>
                    <StyledTableCell>{rowsss.allowedOS}</StyledTableCell>
                    <StyledTableCell>{rowsss.deviceDetails}</StyledTableCell>
                    <StyledTableCell>0</StyledTableCell>
                   
                    </StyledTableRow>
                ))}
                </TableBody>
            
            </Table>
        </TableContainer>
        <br /><br /><br />
        </>
  );
}