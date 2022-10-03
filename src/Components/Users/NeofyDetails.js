import { withStyles } from "@material-ui/core";
import CancelIcon from '@mui/icons-material/Cancel';
// import google_map from './google_map.jpg'
// import pancard from './pancard.jpg'
// import signature from './signature.jpg'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Server from '../APIUrl';
import GetSonicQRCode from './GetSonicQRCode';
import appleAppStore from '../../Assets/appleAppStore.png';
import googlePlayStore from '../../Assets/googlePlayStore.png';
import Swal from 'sweetalert2';

const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

const downloadContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}
const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#fff",
      color: "#fff",
      boxShadow: theme.shadows[1],
      fontSize: 15,
      color: "#000",
      maxWidth: "520"
    },
  }))(Tooltip);

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

export default function AllUserDetails({appId}) {

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

    const [openDevice, setOpenDevice] = React.useState(false);
    const handleOpenDevice = () => setOpenDevice(true);
    const handleCloseDevice = () => setOpenDevice(false);

    const [DocImage, setDocImage] = React.useState("");

    const [applicationData, setApplicationData] = React.useState({

      isLoading: true,
      isSuccess: false,
      isError: false,
      isSnackbarOpen: false,

  })

  //const handleOnClick = useCallback(() => history.push('/Applications/Radius'), [history]);

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

    const openInNewTab = (url) => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }
  
    const openInNewTab1 = (url) => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }

      // React.useEffect(() => {
      //   // setApplicationData({ ...applicationData,isLoading: true })

      //   Server.get(`/geotrack/getByUserid?accountId=${accountId}&userId=${location.state.row.userid}&appId=${appId}&requestTime=${requestTime}`, {
      //       headers: {
      //           'content-type': 'application/json',
      //           authToken: authtoken,
      //           "Access-Control-Allow-Origin": "*",
      //           "Access-Control-Allow-Methods": "*"

      //       },
      //   })
      //       .then((response) => {
      //          console.log(response.data)
      //           setgeoLocationData({ ...geoLocationData,isLoading: false })

      //          if((response.data.resultCode == 0 || response.data.resultMessage == "Success")){
      //           setRows(response.data.resultData)

      //          }
                
      //       }).catch((err) => {
      //           console.log(err)
      //          setRows([])

      //          setgeoLocationData({
                
      //           isLoading: false,
      //           isSuccess: false,
      //           isError: true,
      //           isSnackbarOpen: true,
      //       })

      //       })
      // }, [])

      const handleSonicReverify = (e) => {
        
        
        Server.post(
          `/sonicKYC/reVerify?userId=${location.state.row.userid}&appId=${appId}&requestTime=${requestTime}`,{},
          {
            headers: {
              "content-type": "application/json",
              authToken: authtoken,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
            },
          }
        )
          .then((res) => {
           if(res.data.resultCode ===0){
             Swal.fire(res.data.resultMessage, "", "success");

             window.location.reload(true);

           }else{
             Swal.fire(res.data.resultMessage, "", "warning");
           }
          })
          .catch((err) => {
            console.log(err);
    
            Swal.fire({
              title: "Error",
              text: err,
              icon: "erro",
            });
          });
      };
    





      

      const [documentsDetails, setDocumentsDetails] = useState([]);

      console.log("appid",appId)
      React.useEffect(() => {

       const fetchData = async ()=>{
        await Server.get(`/NeofyController/getEnrollmentDetails?userId=${location.state.row.userid}&appId=${appId}&requestTime=${requestTime}`, {
          headers: {
              'content-type': 'application/json',
              authToken: authtoken,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*"

          },
      })
          .then((response) => {
             console.log('VerifData',response.data.resultData)
          //    setgeoLocationData({ ...geoLocationData,isLoading: false })

               if((response.data.resultCode == 0 || response.data.resultMessage == "Success")){
                let parsedData = response.data.resultData; 
                try {
                  // let docs = JSON.parse(parsedData.devicepayload);
                  // parsedData.devicepayload = docs;
                  let docs2 = JSON.parse(parsedData.faceidmatchresponse);
                  parsedData.faceidmatchresponse = docs2;
                  let docs3 = JSON.parse(parsedData.documents);
                  parsedData.documents = docs3;
                  let docs4 = JSON.parse(parsedData.livenessresponse);
                  parsedData.livenessresponse = docs4;
                  let docs5 = JSON.parse(parsedData.ocrresponse);
                  parsedData.ocrresponse = docs5;
                  let docs6 = JSON.parse(parsedData.consentresponse);
                  parsedData.consentresponse = docs6;
                  let docs7 = JSON.parse(parsedData.devicepayload);
                  parsedData.devicepayload = docs7;
                } catch(e) {
                  console.log("PARSE CATCH", e);
                }
                //parsedData.documents = parsedData.documents.replace(/\[|\]/g, "").split("},").map(str => str.trim());
                console.log("PARSED DATA :", parsedData);
                setData(parsedData ?? [])

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

console.log({documentsDetails})
  //     const [deviceData, setDeviceData] = React.useState({

  //       isLoading: true,
  //       isSuccess: false,
  //       isError: false,
  //       isSnackbarOpen: false,
  
  //     })

  //     React.useEffect(() => {
  //       // setApplicationData({ ...applicationData,isLoading: true })

  //       Server.get(`/device/getDevicesByuserId?accountId=${accountId}&userId=${location.state.row.userid}&appId=${appId}&requestTime=${requestTime}`, {
  //           headers: {
  //               'content-type': 'application/json',
  //               authToken: authtoken,
  //               "Access-Control-Allow-Origin": "*",
  //               "Access-Control-Allow-Methods": "*"

  //           },
  //       })
  //           .then((response) => {
  //              console.log(response.data)
  //              setDeviceData({ ...deviceData,isLoading: false })

  //              if(!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get applications")){
  //               setRowsss(response.data.resultData)

  //              }
                
  //           }).catch((err) => {
  //               console.log(err)
  //               setRowsss([])

  //              setDeviceData({
                
  //               isLoading: false,
  //               isSuccess: false,
  //               isError: true,
  //               isSnackbarOpen: true,
  //           })

  //           })


  //   }, [])


  //   const [tokenData, setTokenData] = React.useState(
  //     {

  //     isLoading: true,
  //     isSuccess: false,
  //     isError: false,
  //     isSnackbarOpen: false,

  //   }
  //   )

  //   const [otpTokenDetails, setOtpTokenDetails] = useState([
  //     {
  //       category: 1,
  //       isOTPGenarated :false
  //     },
  //     {
  //       category: 2,
  //       isOTPGenarated :false

  //     },
  //     {
  //       category: 3,
  //       isOTPGenarated :false
  //     },
  //     {
  //       category: 4,
  //       isOTPGenarated :false

  //     }
  //   ])

  //   React.useEffect(() => {
  //     // setApplicationData({ ...applicationData,isLoading: true })

  //     Server.post(`/token/getOTPTokens?accountId=${accountId}&userId=${location.state.row.userid}&appId=${appId}&requestTime=${requestTime}`,{}, {
  //         headers: {
  //             'content-type': 'application/json',
  //             authToken: authtoken,
  //             "Access-Control-Allow-Origin": "*",
  //             "Access-Control-Allow-Methods": "*"

  //         },
  //     })
  //         .then((response) => {
  //            console.log(response.data)
  //            let updatedArray = [...otpTokenDetails]
  //            for (let index = 0; index < response.data.resultData.length; index++) {
  //              const element = response.data.resultData[index];
  //              let updatedTokenIDX= otpTokenDetails.findIndex((item)=>item.category == element.category)
  //              updatedArray[updatedTokenIDX].isOTPGenarated =true
  //              setOtpTokenDetails(updatedArray)
  //            }
  //            setTokenData({ ...deviceData,isLoading: false })

  //            if(!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get applications")){
  //             setRowsssss(response.data.resultData)

  //            }
              
  //         }).catch((err) => {
  //             console.log(err)
  //             setRowsss([])

  //             setTokenData({
              
  //             isLoading: false,
  //             isSuccess: false,
  //             isError: true,
  //             isSnackbarOpen: true,
  //         })

  //         })
  // }, [])

  console.log("Sonic data", data)
  return (
      <>
        {/* <Button variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Profile Details</Button><br /><br />
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
        <div style={{ height: '50vh', width: '95%' }}>
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
                </div> */}
            {/* <br /><br />
        <div style={{ display: "flex", justifyContent: "flex-start"}}>
        
        <div style={{ height: '50vh', width: '100%' }}>
              {rows.length > 0 && <MyMapComponent
                isMarkerShown
                rows={rows}
              />}
              </div>
        </div> */}
  <h4 style={{color: '#0D4990', borderColor: '#0D4990'}}>Download app from app store and scan the QR code.</h4>
        <Stack  spacing={2}>
        <Alert  sx={{ width: 'fit-content' }} icon={false}>
            <div style={downloadContainerStyle}>
              <a href='' target="_blank" rel="noopner noreferrer">
                <img src={googlePlayStore} alt="googlePlayStore" width="120" />
              </a>

              <a href='' target="_blank" rel="noopner noreferrer">
                <img src={appleAppStore} alt="appleAppStore" width="120" />
              </a>
              {/* <GetSonicQRCode userID={location.state.row.userid} appId={appId}/> */}
            </div>
            
          </Alert>
         
        </Stack>
        <br />
        {/* <br />
        <Button onClick={(e) => handleSonicReverify()} variant="outlined">Sonic Reverify</Button>
        <br /> */}
        <br />
        <h3  style={{color: '#0D4990', borderColor: '#0D4990'}}>Identity Documents</h3><br />

        <div style={{ display: "flex", justifyContent: "flex-start"}}>
          {console.log("data",data.documents)}
            <Grid container spacing={3}>

                {data && data.documents && data.documents.map((item,i) => (
                    <Grid item xs={12} md={4} lg={4} key={i}>
                      <h6>{item.docName}</h6>
                        <img src={item.docPath} style={{ width: 300, height: 180 }} />
                    </Grid>
                  )
                )}
            </Grid>
        </div>
        <br />
        <hr />
        <br />
        <h3 variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Device Payload</h3><br />
        <div style={{ display: "flex", justifyContent: "flex-start",width:"fit-content" }}>
        
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 950 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  
                  <StyledTableCell>Device ID</StyledTableCell>
                  
                  <StyledTableCell>OS Name</StyledTableCell>
                  <StyledTableCell>VPN Usage</StyledTableCell>
                  <StyledTableCell>KYC Done Time</StyledTableCell>
                  <StyledTableCell>Updated Time</StyledTableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {data.devicepayload &&
                <StyledTableRow>
                  <StyledTableCell>{data.devicepayload.deviceId}</StyledTableCell>
                  <StyledTableCell>{data.devicepayload.osName}</StyledTableCell>
                  <StyledTableCell>
                    { data.devicepayload.isVpnUsed ? 
                      <CheckCircleOutlineRoundedIcon color="success" />
                        :<CancelIcon color="error" />
                    }
                  </StyledTableCell>
                  <StyledTableCell>{data.devicepayload.kycDoneTime}</StyledTableCell>
                  <StyledTableCell>{data.devicepayload.timeStamp}</StyledTableCell>
                  
                </StyledTableRow>
}
              
              </TableBody>
            </Table>
          </TableContainer>
        </div>
          {/* <div style={{ height: '50vh', width: '95%' }}>
              <br />
              {data.devicepayload.length == "0" ? 
              <div style={{marginTop: "100px"}}><center>No data found</center></div>
              : <MyMapComponent
                isMarkerShown
                rows={data.devicepayload}
              />}
          </div> */}
          <br />
    <div style={{ display: "flex", justifyContent: "flex-start",width:"fit-content" }}>
        
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 950 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          
                          <StyledTableCell>IP Address</StyledTableCell>
                          <StyledTableCell>Latitude</StyledTableCell>
                          <StyledTableCell>Longitude</StyledTableCell>
                          <StyledTableCell>Build Type</StyledTableCell>
                          <StyledTableCell>Build Version</StyledTableCell>
                          
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          data.devicepayload &&

                          <StyledTableRow>
                            <StyledTableCell>{data.devicepayload.ip2Address}</StyledTableCell>
                            <StyledTableCell>{data.devicepayload.latitude}</StyledTableCell>
                            <StyledTableCell>{data.devicepayload.longitude}</StyledTableCell>
                            <StyledTableCell>{data.devicepayload.buildType}</StyledTableCell>
                            <StyledTableCell>{data.devicepayload.buildVersion}</StyledTableCell>
                            
                          </StyledTableRow>
}
                      </TableBody>
                    </Table>
                  </TableContainer>
        </div> 
        <br />
        <hr />
        <br />
        <h3 variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Face Id Match Response</h3><br />
        <div style={{ display: "flex", justifyContent: "flex-start",width:"fit-content" }}>
        
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 950 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell>Gender</StyledTableCell>
                          <StyledTableCell>Gender Confidence</StyledTableCell>
                          <StyledTableCell>Age Range</StyledTableCell>
                          <StyledTableCell>Age Confidence</StyledTableCell>
                          
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.faceidmatchresponse &&
                        <StyledTableRow>
                          <StyledTableCell>{ data.faceidmatchresponse.name}</StyledTableCell>
                          <StyledTableCell>{data.faceidmatchresponse.gender}</StyledTableCell>
                          <StyledTableCell>{data.faceidmatchresponse.genderConfidence}</StyledTableCell>
                          <StyledTableCell>{data.faceidmatchresponse.ageRange}</StyledTableCell>
                          <StyledTableCell>{data.faceidmatchresponse.ageConfidence}</StyledTableCell>
                          
                        </StyledTableRow>
}
                      
                      </TableBody>
                    </Table>
                  </TableContainer>
        </div>
        <br />
        <hr />
        <br />
        <h3 variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Liveliness Response</h3><br />
        <Grid container spacing={3}>
          <Grid item xs={3} md={6}>
        <Card>
          <CardContent>
            <Grid container spacing={10}>
              <Grid item xs={3} md={6}>
                <Typography component="div">
                  Smile
                </Typography>
              </Grid>
              <Grid item xs={3} md={6}>
                {data.livenessresponse &&
                <Typography component="div">
                  { data.livenessresponse.smile ? 
                    <CheckCircleOutlineRoundedIcon color="success" />
                    :<CancelIcon color="error" />
                  }
                </Typography>
                }
              </Grid>
            </Grid>
            <hr/>
            <Grid container spacing={10}>
              <Grid item xs={3} md={6}>
                <Typography component="div">
                  LookLeft
                </Typography>
              </Grid>
              <Grid item xs={3} md={6}>
              {data.livenessresponse &&
                <Typography component="div">
                  { data.livenessresponse.lookLeft ? 
                    <CheckCircleOutlineRoundedIcon color="success" />
                    :<CancelIcon color="error" />
                  }
                </Typography>
                }
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={10}>
              <Grid item xs={3} md={6}>
                <Typography component="div">
                  LookRight
                </Typography>
              </Grid>
              <Grid item xs={3} md={6}>
              {data.livenessresponse &&
                <Typography component="div">
                  { data.livenessresponse.lookRight ? 
                    <CheckCircleOutlineRoundedIcon color="success" />
                    :<CancelIcon color="error" />
                  }
                </Typography>
                }
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={10}>
              <Grid item xs={3} md={6}>
                <Typography component="div">
                  Hands
                </Typography>
              </Grid>
              <Grid item xs={3} md={6}>
              {data.livenessresponse &&
                <Typography component="div">
                  { data.livenessresponse.hand ? 
                    <CheckCircleOutlineRoundedIcon color="success" />
                    :<CancelIcon color="error" />
                  }
                </Typography>
                }
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={10}>
              <Grid item xs={3} md={6}>
                <Typography component="div">
                  AnyEyeClose
                </Typography>
              </Grid>
              <Grid item xs={3} md={6}>
              {data.livenessresponse &&
                <Typography component="div">
                  { data.livenessresponse.anyEyeClose ? 
                    <CheckCircleOutlineRoundedIcon color="success" />
                    :<CancelIcon color="error" />
                  }
                </Typography>
              }
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </Grid>
        </Grid>
        <br />
        <hr />
        <br />
        <h3 variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Consent OCR Response</h3><br />
        <div style={{ display: "flex", justifyContent: "flex-start",width:"fit-content" }}>
        
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 950 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          
                          <StyledTableCell>IsConsent</StyledTableCell>
                          <StyledTableCell>ORI OCR</StyledTableCell>
                          <StyledTableCell>OCR</StyledTableCell>
                          
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.consentresponse &&
                        <StyledTableRow>
                          <StyledTableCell>
                            { data.consentresponse.isConsent ? 
                            <CheckCircleOutlineRoundedIcon color="success" />
                            :<CancelIcon color="error" />
                            }
                          </StyledTableCell>
                          <StyledTableCell>{data.consentresponse.oriOcr}</StyledTableCell>
                          <StyledTableCell>{data.consentresponse.ocr}</StyledTableCell>
                          
                        </StyledTableRow>
}
                      
                      </TableBody>
                    </Table>
                  </TableContainer>
        </div>
        <br />
        <hr />
        <br />
        {/* {console.log("------------",data.ocrresponse.docFace)} */}
        { data && data?.ocrresponse && data?.ocrresponse?.docFace && data?.ocrresponse?.docMrz && data?.ocrresponse?.docClassification ?
        <>
        <h3 variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Document Response</h3><br />
        <Grid container spacing={3}>
          <Grid item xs={3} md={4}>
            <Card>
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={3} md={6}>
                    <Typography component="div">
                      Doc Face
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                    {data.ocrresponse &&
                    <Typography component="div">
                      { data?.ocrresponse?.docFace?.isDocHasFace ? 
                        <CheckCircleOutlineRoundedIcon color="success" />
                        :<CancelIcon color="error" />
                      }
                    </Typography>
                    }
                  </Grid>
                </Grid>
                <hr/>
                <Grid container spacing={6}>
                  <Grid item xs={3} md={6}>
                    <Typography component="div">
                      ID Match
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                  {data.ocrresponse &&
                    <Typography component="div">
                      { data.ocrresponse.docFace.faceIdMatch 
                      }
                    </Typography>
                    }
                  </Grid>
                </Grid>
                <hr />
                <Grid container spacing={6}>
                  <Grid item xs={3} md={6}>
                    <Typography component="div">
                      Distance
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                  {data.ocrresponse &&
                    <Typography component="div">
                      { data.ocrresponse.docFace.faceIdMatchDistance
                      }
                    </Typography>
                    }
                  </Grid>
                </Grid>
                <hr />
                <Grid container spacing={6}>
                  <Grid item xs={3} md={6}>
                    <Typography component="div">
                      Confidence
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                  {data.ocrresponse &&
                    <Typography component="div">
                      { data.ocrresponse.docFace.faceIdMatchConfidence
                      }
                    </Typography>
                    }
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} md={4}>
            <Card>
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={3} md={6}>
                    <Typography component="div">
                      Doc MRZ
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                    {data.ocrresponse &&
                    <Typography component="div">
                      { data.ocrresponse.docMrz.isDocHasMrz ? 
                        <CheckCircleOutlineRoundedIcon color="success" />
                        :<CancelIcon color="error" />
                      }
                    </Typography>
                    }
                  </Grid>
                </Grid>
                <hr/>
                <Grid container spacing={10}>
                  <Grid item xs={3} md={6}>
                    <Typography component="div">
                      Row MRZ
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                  {data.ocrresponse &&
                    <Typography component="div">
                      { data.ocrresponse.docMrz.rowMrzData ? "-" : ""
                      }
                    </Typography>
                    }
                  </Grid>
                </Grid>
                <hr />
                <Grid container spacing={10}>
                  <Grid item xs={3} md={6}>
                    <Typography component="div">
                      Parser MRZ
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                  {data.ocrresponse &&
                    <Typography component="div">
                      { data.ocrresponse.docMrz.parserMrzData
                      }
                    </Typography>
                    }
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} md={4}>
            <Card>
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={3} md={6}>
                    <Typography component="div">
                      Doc Type
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                    {data.ocrresponse &&
                    <Typography component="div">
                      { data.ocrresponse.docClassification.docType
                      }
                    </Typography>
                    }
                  </Grid>
                </Grid>
                <hr/>
                <Grid container spacing={10}>
                  <Grid item xs={3} md={6}>
                    <Typography component="div">
                      Predict Confidence
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                  {data.ocrresponse &&
                    <Typography component="div">
                      { data.ocrresponse.docClassification.docPredictConfidence 
                      }
                    </Typography>
                    }
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid> 
        </>
        : ""}
        {/* <hr />
        <br />

        <Button variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Signature</Button><br /><br />

        <div style={{ display: "flex", justifyContent: "flex-start"}}>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={4}>
                    <img src={data.signimage} style={{ width: 300, height: 180 }}/>
                </Grid>

            </Grid>
        </div> */}
        {/* <br />
        <hr />
        <br />

        <Button variant="outlined" style={{color: '#0D4990', borderColor: '#0D4990'}}>Video Call</Button><br /><br />
        <div style={{ display: "flex", justifyContent: "flex-start"}}>
            <iframe width="853" height="480" src={data.videocalldetails} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br /> */}
        {/* <hr />
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
        </TableContainer> */}
        <br /><br /><br />
        </>
  );
}