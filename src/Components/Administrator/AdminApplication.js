import { Backdrop, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
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
import { useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Server from '../APIUrl';



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




  const dropdowntypes = [
    // { label: (<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}>Web</Typography>), value: ("web") },
    // { label: (<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}>Mobile</Typography>), value: ("mobile") },
    {label: ("Web")},
    {label: ("Mobile")}
]; 

export default function AdminApplication() {
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

    const [applicationData, setApplicationData] = React.useState({

      isLoading: true,
      isSuccess: false,
      isError: false,
      isSnackbarOpen: false,

  })

  //const handleOnClick = useCallback(() => history.push('/Applications/Radius'), [history]);

  const handleOnClick = e => {
    e.preventDefault();
    console.log(value)
    if(value === "1") {
      history.push({
        pathname: '/AxiomProtect/Applications/Custom'
      })
    }
    else if(value == "2") {
      history.push({
        pathname: '/AxiomProtect/Applications/Radius'
      })
    }
  }

    const handleChangePage = (event, newPage) =>  setPage(newPage);
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
      };

      React.useEffect(() => {
        // setApplicationData({ ...applicationData,isLoading: true })

        const fetchData = async () => {
          Server.get(`/user/getAssignedApplications?accountId=${accountId}&userId=${location.state.row.operatorid}&requestTime=${requestTime}`, {
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"

            },
        })
            .then((response) => {
               console.log(response.data)
        setApplicationData({ ...applicationData,isLoading: false })

               if(!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get applications")){
                setRows(response.data.resultData)

               }
                
            }).catch((err) => {
                console.log(err)
               setRows([])

               setApplicationData({
                
                isLoading: false,
                isSuccess: false,
                isError: true,
                isSnackbarOpen: true,
            })

            })
        };
        return fetchData();
      }, [])

      const handleStatusChange =async  (e, row) => {
        e.preventDefault();
        let index = rows.findIndex(x=> x.unitid === row.unitid);
    
        let status = e.target.value == "suspended" ? 1 : 0
        console.log(row);
    
        console.log("selcted value", e.target.value, "seleted row", row,rows)
       await Server.get(`/application/setStatus?accountId=${row.accountid}&appId=${row.appid}&status=${status}&requestTime=${requestTime}`,{
          headers: {
              'content-type': 'application/json',
               authToken: authtoken,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*"
          },
      })
          .then((response) => {
              console.log(response);
             if(response.data.resultCode == 0){
              if(e.target.value == "suspended"){
                setRows(rows=>[
                  
                       ...rows.slice(0,index),
                       Object.assign({}, rows[index], {row,status:1}),
                       ...rows.slice(index+1)
                ])
              }else 
                setRows(rows=>[
                  ...rows.slice(0,index),
                  Object.assign({}, rows[index], {row,status:0}),
                  ...rows.slice(index+1)
               ])
             }else Swal.fire("",response.data.resultMessage,"error")
    
          }).catch((err) => {
              console.log(err)
    
    
          })
      }

      const handleGetAppId =(e,row)=>{
        e.preventDefault();
        console.log("seleted appId",row)

        history.push({
          pathname:"/AxiomProtect/AssignUser",
          state:{
            row: row,
          }
      })
      }


      const handleSendToPolicy =(e,row)=>{
        e.preventDefault();
        console.log("seleted appId",row)

        history.push({
          pathname:"/AxiomProtect/Policy",
          state:{
            row: row,
          }
      })
      }

      

      const handleSendToAllAssignedUser =(e,row)=>{
        e.preventDefault();
        console.log("seleted appId",row)

        history.push({
          pathname:"/AxiomProtect/GetAllAssignedUser",
          state:{
            row: row,
          }
      })
      }

      const changeColor = (e) => {
        e.target.style.background = '#0D4990'
      }


      const [resultCode, setResultCode] = useState(0)

      const handleSubmit =async  (e,row) => {
        e.preventDefault()
        console.log(row)
        
       await Server.get(`/user/unassign?accountId=${accountId}&userId=${userId}&appId=${row.appid}&requestTime=${requestTime}`, {

            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*"
            },
        })
        .then((response) => {
    
        console.log(response.data)
        if(response.data.resultCode === 0  ){
            setResultCode(response.data.resultCode)
            setRows(rows.filter((item)=>item.userid != row.userid))
            Swal.fire(
                'Success',
                response.data.resultMessage,
                'success'
                )
            
            }else Swal.fire("",response.data.resultMessage,"error")

        
        }).catch((err) => {
            console.log(err)
            
        })
    }

  return (
      <>
        
        <div style={{ display: "flex", justifyContent: "flex-start",width:"fit-content" }}>
          
          {applicationData.isLoading ?
              <Backdrop
                  sx={{ color: 'green', zIndex: 3, backgroundColor: 'transparent' }}
                  open={applicationData.isLoading}
              >
                  <CircularProgress color="inherit" />
              </Backdrop>
              : <>
                  <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          
                          <StyledTableCell>App ID</StyledTableCell>
                          <StyledTableCell>App Logo</StyledTableCell>
                          <StyledTableCell align="center">App Name</StyledTableCell>
                          <StyledTableCell align="center">App Type</StyledTableCell>
                          <StyledTableCell align="center">Status</StyledTableCell>
                          {/* <StyledTableCell align="center">Activate</StyledTableCell>
                          <StyledTableCell align="center">Suspend</StyledTableCell> */}
                          <StyledTableCell align="center">Unassign</StyledTableCell>
                          

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell>{row.appid}</StyledTableCell>
                            <StyledTableCell component="th" scope="row"  >
                              
                              <img src={row.applogo} alt="app logo" style={{height:50,width:50,objectFit:"cover",borderRadius:"50%"}}/>
                            </StyledTableCell>
                            
                            {/* <StyledTableCell className="demoooo" onMouseHover={changeColor} align="center" style={{cursor:"pointer",}} onClick={(e)=>handleGetAppId(e,row)}>{row.appname}</StyledTableCell> */}
                            <StyledTableCell align="center">
                              {row.appname}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.apptype == 1 ? "Custom" :"Radius"}</StyledTableCell>
                            
                            <StyledTableCell align="center">
                                {row.status == 0 ? 
                                        
                                            'Active'
                                        
                                        :
                                        
                                            'Suspended'
                                        
                                    }
                            </StyledTableCell>
                            {/* <StyledTableCell align="center">{row.apptype == 1 ? "Custom" :"Radius"}</StyledTableCell>
                            <StyledTableCell align="center">{row.apptype == 1 ? "Custom" :"Radius"}</StyledTableCell> */}
                            <StyledTableCell align="center">
                                <Button variant="contained" color="success" style={{padding: '5px'}} onClick={(e) => handleSubmit(e,row)}>
                                    Mark as unassigned
                                </Button>
                            </StyledTableCell>
                            
                            
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


                  
                </>
            }
            
        </div>

        <br />
        {/* <h4>Recent Activity</h4>
        <div style={{ display: "flex", justifyContent: "flex-start",width:"fit-content" }}>
          
          {applicationData.isLoading ?
              <Backdrop
                  sx={{ color: 'green', zIndex: 3, backgroundColor: 'transparent' }}
                  open={applicationData.isLoading}
              >
                  <CircularProgress color="inherit" />
              </Backdrop>
              : <>
                  <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          
                          <StyledTableCell>Timestamp (UTC)</StyledTableCell>
                          <StyledTableCell>App Logo</StyledTableCell>
                          <StyledTableCell align="center">App Name</StyledTableCell>
                          <StyledTableCell align="center">App Type</StyledTableCell>
                          <StyledTableCell align="center">Access Device</StyledTableCell>
                          <StyledTableCell align="center">Result</StyledTableCell>
                          <StyledTableCell align="center">Second Factor</StyledTableCell>
                         
                          

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell>{row.appid}</StyledTableCell>
                            <StyledTableCell component="th" scope="row"  >
                              
                              <img src={row.applogo} alt="app logo" style={{height:50,width:50,objectFit:"cover",borderRadius:"50%"}}/>
                            </StyledTableCell>
                            
                           
                            <StyledTableCell align="center">
                              {row.appname}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.apptype == 1 ? "Custom" :"Radius"}</StyledTableCell>
                            
                            <StyledTableCell align="center">
                                {row.status == 0 ? 
                                        <Button variant="contained" color="success" style={{padding: '5px'}}>
                                            Assigned
                                        </Button>
                                        :
                                        <Button variant="contained" color="error" style={{padding: '5px', marginLeft: '5px'}}>
                                            Suspended
                                        </Button>
                                    }
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.apptype == 1 ? "Custom" :"Radius"}</StyledTableCell>
                            <StyledTableCell align="center">{row.apptype == 1 ? "Custom" :"Radius"}</StyledTableCell>
                            <StyledTableCell align="center">{row.apptype == 1 ? "Custom" :"Radius"}</StyledTableCell>
                            
                            
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


                  
                </>
            }
            
        </div> */}
        
        <br /><br /><br />
        </>
  );
}