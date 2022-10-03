import React, { useState, useEffect } from 'react'
import Server from '../APIUrl';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AdaptiveAuthData from './AdaptiveAuthData';

const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

const nav = navigator.userAgent;

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


function Device({appId}) {
    const location = useLocation();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const [ip, setIP] = React.useState("");
    const [rows, setRows] = React.useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [deviceData, setDeviceData] = React.useState({

        isLoading: true,
        isSuccess: false,
        isError: false,
        isSnackbarOpen: false,
  
    })

    const [resultCode, setResultCode] = useState(0)

    const handleChangePage = (event, newPage) =>  setPage(newPage);
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
      };

      //creating function to load ip address from the API
  const getData = async () => {
    const res = await Server.get("https://geolocation-db.com/json/");
    console.log("location",res.data);
    setIP(res.data.IPv4);
  };

      useEffect(() => {
        //passing getData method to the lifecycle method
        console.log(navigator.vendor, navigator.appVersion);
        getData();
        //getDeviceDetails();
      }, []);
    
    React.useEffect(() => {
        // setApplicationData({ ...applicationData,isLoading: true })

        Server.get(`/device/getDevicesByuserId?accountId=${accountId}&userId=${location.state.row.userid}&appId=${appId}&requestTime=${requestTime}`, {
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"

            },
        })
            .then((response) => {
               console.log(response.data)
               setDeviceData({ ...deviceData,isLoading: false })

               if(!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get applications")){
                setRows(response.data.resultData)

               }
                
            }).catch((err) => {
                console.log(err)
               setRows([])

               setDeviceData({
                
                isLoading: false,
                isSuccess: false,
                isError: true,
                isSnackbarOpen: true,
            })

            })
    }, [])



    const handleStatusChange = async (e, row) => {
        // console.log(row)
        e.preventDefault();
        let index = rows.findIndex(x=> x.deviceno === row.deviceno);
    
        let status = e.target.value == "suspended" ? -1 : 1
        console.log(rows,row,index);
    
        console.log("selcted value", e.target.value, "seleted row", row,rows)
        await Server.post(`/device/setStatus?accountId=${row.accountid}&deviceId=${row.deviceno}&appId=${appId}&status=${status}&requestTime=${requestTime}`,{},{
          headers: {
              'content-type': 'application/json',
               authToken: authtoken,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*"
    
          },
      })
          .then((response) => {
              console.log(response);
             if(response.data.resultCode === 0 ){
                setResultCode(response.data.resultCode)
                // if(row.status == -1)
                setRows(
                  [
                    ...rows.slice(0, index), 
                    {
                        ...rows[index],
                        status: status,
                    },
                    ...rows.slice(index + 1), // everything after
                ]
                )
                // else  setRows((prevRows) => ({...prevRows,status:-1}))
                Swal.fire(
                  'Success',
                  response.data.resultMessage,
                  'success'
                  )
                
             }else Swal.fire("",response.data.resultMessage,"error")
    
          }).catch((err) => {
              console.log(err)
              Swal.fire("",err,"error")
    
          })
      }

      const deletespecificRow = (e, row) => {
        e.preventDefault();
        console.log("Please delete Specific Row", row);
        // console.log(row.unitid);
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
    
             await Server.delete(`/device/remove?accountId=${accountId}&deviceId=${row.deviceno}&appId=${appId}&requestTime=${requestTime}`, {
              headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"
    
              },
            })
              .then((response) => {
                console.log(response.data)
                if(response.data.resultCode===0){
                 setRows(rows.filter((item)=>item.deviceno != row.deviceno))
                Swal.fire(
                  'Deleted!',
                  response.data.resultMessage,
                  'success'
                )
               }else{
                Swal.fire(
                  'Error',
                  response.data.resultMessage,
                  'error'
                )
               }
                
              }).catch((err) => {
                console.log(err)
                setRows([])
                Swal.fire(
                  'Error',
                  err,
                  'error'
                )
              })
          }
        })
    
      }
    
    return (
        <>
            <Box
                
            >
                
                 <div style={{ display: "flex", justifyContent: "flex-start",width:"fit-content" }}>
                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 940 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Device Id</StyledTableCell>
                                <StyledTableCell align="center">OS Detail</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Created on</StyledTableCell>
                                {/* <StyledTableCell align="center">Last access on</StyledTableCell> */}
                                <StyledTableCell align="center">Manage</StyledTableCell>
                                {/* <StyledTableCell align="center">Audit for</StyledTableCell>
                                <StyledTableCell align="center">Attempts taril</StyledTableCell> */}
                                <StyledTableCell align="center">Action</StyledTableCell>
                                
                            </TableRow>
                            </TableHead>
                            
                            <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell align="center">{row.deviceid}</StyledTableCell>
                            <StyledTableCell align="center">{row.osdetails}</StyledTableCell>
                            <StyledTableCell align="center">
                                {row.status == 1 ? 
                                    <Button variant="contained" color="success" style={{padding: '5px'}}>
                                        Active
                                    </Button>
                                    :
                                    <Button variant="contained" color="error" style={{padding: '5px', marginLeft: '5px'}}>
                                        Suspended
                                    </Button>
                                }

                            </StyledTableCell>
                            <StyledTableCell align="center">{moment(row.createdOn).format('D-M-YYYY, h:mm:ss')}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Select
                                    fullWidth size="large"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    
                                      style={{ width: 200, height: 40 }}
                                    //label="Status"
                                    value={row.status == 1 ? "active" :"suspended"}
                                    onChange={(e)=>handleStatusChange(e,row)}
                                    // style={{ width: 200, height: 40 }}
                                    > 
                                    
                                    <MenuItem value={"active"} >
                                        Mark As Active
                                    </MenuItem>
                                    <MenuItem value={"suspended"} >
                                        Mark As Suspended
                                    </MenuItem>
                                      
                                </Select>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <IconButton aria-label="delete" onClick={(e) => deletespecificRow(e, row)}>
                                <DeleteIcon style={{ color: '#D2042D' }} />
                                {/* <AdaptiveAuthData  data={row} appId={appId}/> */}
                              </IconButton>
                              
                            </StyledTableCell>
                            {/* <StyledTableCell align="center">{row.deviceid}</StyledTableCell>
                            <StyledTableCell align="center">{row.deviceid}</StyledTableCell>
                            <StyledTableCell align="center">{row.deviceid}</StyledTableCell> */}
                            
                            
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
                

            </Box>
        </>
    );
}

export default Device;