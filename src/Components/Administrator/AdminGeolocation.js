import React, { Component } from 'react';
import Server from '../APIUrl';
import { GoogleMap, LoadScript, Marker,withGoogleMap } from 'react-google-maps';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import axios from "axios";
import { Link, useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import { MyMapComponent } from './Test';


const AnyReactComponent = ({ text }) => <div>{text}</div>;


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

  const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
  const requestTime = escape(requestTimess);

function SimpleMap() {   


    const [geoLocationData, setgeoLocationData] = React.useState({

        isLoading: true,
        isSuccess: false,
        isError: false,
        isSnackbarOpen: false,
  
    })

    const location = useLocation();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([])
    const handleChangePage = (event, newPage) =>  setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };


    React.useEffect(() => {
        // setApplicationData({ ...applicationData,isLoading: true })

        Server.get(`/geotrack/getByUserId?accountId=${accountId}&userId=${location.state.row.operatorid}&appId=${location.state.row.appid}&requestTime=${requestTime}`, {
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"

            },
        })
            .then((response) => {
               console.log(response.data)
            //    setgeoLocationData({ ...geoLocationData,isLoading: false })

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
     

        return (
            // Important! Always set the container height explicitly
            <>
                <div style={{ maxHeight: '50vh', width: '95%' }}>
                  {/* {console.log("rows",rows.length)} */}
              
              {/* {rows.length > 0 && <MyMapComponent
                isMarkerShown
                rows={rows}
              />} */}
              {rows.length == "0" ? 
              <div style={{margin: "50px 0"}}><center>No data found</center></div>
              : <MyMapComponent
                isMarkerShown
                rows={rows}
              />}
                {/* <LoadScript
                        googleMapsApiKey='AIzaSyBIG7NI90M-f2RFWXxwWwCZL9tpowvBrKA'>
                            <GoogleMap
                            mapContainerStyle={mapStyles}
                            zoom={13}
                            center={defaultCenter}
                            defaultCenter={{ lat: -34.397, lng: 150.644 }}

                            />
                            {markers.map((marker,idx)=>(
                              <Marker key={idx}
                              position={{ lat: -34.397, lng: 150.644 }}              
                              // position={{ lat: marker.latitude, lng: marker.longitude }}

                            />  
                            ))}
                            
                        </LoadScript>
                 */}
                
                </div>
                <br />
                <div style={{ display: "flex", justifyContent: "flex-start",width:"fit-content" }}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 950 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                        
                            {/* <StyledTableCell>No.</StyledTableCell> */}
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
                            {/* <StyledTableCell>{row.appid}</StyledTableCell> */}
                            
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
                
                <br /><br />
            </>
        );
}

export default SimpleMap;