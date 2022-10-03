import React, { useState, useCallback, useEffect } from "react";
import Server from "../../APIUrl";
import { Link, useHistory, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { WindowSharp } from "@mui/icons-material";
import DateRangePicker from "@mui/lab/DateRangePicker";
import cellLoader from "../../Loader2";
import Loader from "../../Loader";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: "background.paper",
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style1 = {
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

const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TokenizationMerchants() {
  const location = useLocation();
  const history = useHistory();
  
  const authtokenss = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [searchText, setSearchText] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const [cellLoading, setCellLoading] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const [openUc, setOpenUploadCert] = React.useState(false);
  const handleOpenModalUploadCertificate = () => setOpenUploadCert(true);
  const handleCloseModalUploadCertificate = () => setOpenUploadCert(false);

  const [openUAC, setOpenUploadAxiomCert] = React.useState(false);
  const handleOpenModalUploadAxiomCertificate = () => setOpenUploadAxiomCert(true);
  const handleCloseModalUploadAxiomCertificate = () => setOpenUploadAxiomCert(false);

  const [merchantId, setmerchantId] = React.useState("");
  const [merchantName, setmerchantName] = React.useState(" ");

  const [openEdit, setOpenEdit] = React.useState(false);

  const [tokenizationMerchantData, setTokenizationMerchantData] = React.useState({

    isLoading: true,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,
    data: [],
    editedRow:null

})

  const handleOpenEditModal = (e,row) =>{
    setTokenizationMerchantData({ ...tokenizationMerchantData,editedRow: row })
  
    setOpenEdit(true)
  };
  const handleCloseEditModal = () =>{ 
    setTokenizationMerchantData({ ...tokenizationMerchantData,editedRow: null })
  
    setOpenEdit(false);}

  useEffect(() => {
    console.log(location.state)
    if(!location.state || !location.state?.clientname) history.push("/AxiomProtect/DashBoard")
  }, [])


  React.useEffect(() => {
    setTokenizationMerchantData({ ...tokenizationMerchantData,isLoading: true })

    const fetchData = async () => {
      setLoading(true)
     await Server.get(`/tokenization/merchant/getAll?accountId=${accountId}&requestTime=${requestTime}`, {
        headers: {
            'content-type': 'application/json',
            authToken: authtokenss,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"

        },
    })
        .then((response) => {
          console.log(response.data)
          setTokenizationMerchantData({ ...tokenizationMerchantData,isLoading: false,data:response.data.resultData })

           setLoading(false)
          

           if(response.data.resultCode === 0) {
            setRows([response.data.resultData]);
           }
            
        }).catch((err) => {
            console.log(err)
           setRows([])
           

           setTokenizationMerchantData({
            data:[],
            isLoading: false,
            isSuccess: false,
            isError: true,
            isSnackbarOpen: true,
        })

        })
    }
   fetchData();
  }, [])


    // After clicking on submit button ADD code
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log();
      setLoading(true);

      await Server.post(
        `/tokenization/merchant/add?accountId=${accountId}&clientName=${location.state.clientname}&merchantId=${merchantId}&merchantName=${merchantName}&requestTime=${requestTime}`,
        {},
        {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
            authToken: authtokenss,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      )
        .then((response) => {
          setLoading(false);
          if (response.data.resultCode === 0) {
            console.log(response.data);
            Swal.fire({
              title: "Successfully Added",
              icon: "success",
              showCancelButton: true,
              
            });
            setTokenizationMerchantData({ ...tokenizationMerchantData,isLoading: true })

            const fetchData = async () => {
              setLoading(true)
            await Server.get(`/tokenization/merchant/getAll?accountId=${accountId}&requestTime=${requestTime}`, {
                headers: {
                    'content-type': 'application/json',
                    authToken: authtokenss,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*"

                },
            })
                .then((response) => {
                  console.log(response.data)
                  setTokenizationMerchantData({ ...tokenizationMerchantData,isLoading: false,data:response.data.resultData })

                  setLoading(false)
                  

                  if(response.data.resultCode === 0) {
                    setRows([response.data.resultData]);
                  }
                    
                }).catch((err) => {
                    console.log(err)
                  setRows([])
                  

                  setTokenizationMerchantData({
                    data:[],
                    isLoading: false,
                    isSuccess: false,
                    isError: true,
                    isSnackbarOpen: true,
                })

                })
            }
            fetchData();
           
          } else {
            Swal.fire({
              title: response.data.resultMessage,
              icon: "warning",
              showCancelButton: true,
              
            });
          }
          
        })
        .catch((err) => {
          console.log(err);
         
          setLoading(false);
          Swal.fire({
            title: "Error",
            icon: "error",
            text: err,
          });
        });
  
        handleCloseModal();
    };


    const handleSubmitDelete = (e, row) => {
      e.preventDefault();
      console.log("Please delete Specific Row", row);
      // console.log(row.unitid);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Server.delete(
            `/tokenization/merchant/delete?accountId=${accountId}&clientName=${location.state.clientname}&merchantName=${row.merchantname}&requestTime=${requestTime}`,
            {
              headers: {
                "content-type": "application/json",
                authToken: authtokenss,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
              },
            }
          )

            .then((response) => {
              console.log(response.data);
              if (response.data.resultCode === 0) {
                setSearchResult([]);
                Swal.fire("Deleted!", response.data.resultMessage, "success");
              } else {
                Swal.fire("Error!", response.data.resultMessage, "error");
              }

              const fetchData = async () => {
                setLoading(true)
              await Server.get(`/tokenization/merchant/getAll?accountId=${accountId}&requestTime=${requestTime}`, {
                  headers: {
                      'content-type': 'application/json',
                      authToken: authtokenss,
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Methods": "*"
  
                  },
              })
                  .then((response) => {
                    console.log(response.data)
                    setTokenizationMerchantData({ ...tokenizationMerchantData,isLoading: false,data:response.data.resultData })
  
                    setLoading(false)
                    
  
                    if(response.data.resultCode === 0) {
                      setRows([response.data.resultData]);
                    }
                      
                  }).catch((err) => {
                      console.log(err)
                    setRows([])
                    
  
                    setTokenizationMerchantData({
                      data:[],
                      isLoading: false,
                      isSuccess: false,
                      isError: true,
                      isSnackbarOpen: true,
                  })
  
                  })
              }
              fetchData();
            })
            .catch((err) => {
              console.log(err);
              setRows([]);
            });
        }
      });
    };


  const handleOnClickRedirect = (e,row)=>history.push({
    pathname:"/AxiomProtect/TokenizationSetting",state:{
      merchantid:row.merchantid
    }
  })

  const [userData, setUserData] = React.useState({
    isLoading: true,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,
  });

  //Change Status

    // Change Status 

    const handleStatusChange =async   (e, row) => {
      e.preventDefault();
     
  
      let status = e.target.value
      console.log(row);
  
      console.log("selcted value", e.target.value, "seleted row", row,rows)
     await Server.post(`/tokenization/merchant/setStatus?accountId=${row.accountid}&id=${row.merchantid}&status=${status}&requestTime=${requestTime}`,{},{
        headers: {
            'content-type': 'application/json',
             authToken: authtokenss,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
  
        },
    })
        .then((response) => {
            console.log(response);
            if(response.data.resultCode===0){
              Swal.fire("Tokenization Merchant Status Updated Successfully!", "success");
            }else{
             Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: response.data.resultMessage,
             })
            }
        }).catch((err) => {
            console.log(err)
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: err,
            })
  
        })
    }


    const handleEditSubmit = async (event) => {
      event.preventDefault()
  
      await Server.post(`/tokenization/merchant/edit?accountId=${accountId}&clientName=${location.state.clientname}&merchantId=${merchantId}&merchantName=${merchantName}&requestTime=${requestTime}`,
      {},{
          headers: {
            'content-type': 'application/json',
            authToken: authtokenss,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
      })
      .then((response) => {
  
          if(response.data.resultCode == 0){
  
              console.log(response.data)
              Swal.fire({
                  text: response.data.resultMessage,
                  icon: 'success',
                  showCancelButton: true,
              })
    
          }else{
              Swal.fire({
                  title: response.data.resultMessage,
                  icon: 'error',
                  showCancelButton: true,
              })
          }
      }).catch((err) => {
        Swal.fire({
          title:err,
          icon: 'error',
          showCancelButton: true,
      })
          console.log(err)
      })
  }
 
  const [loadingSearch, setLoadingSearch] = useState(false)

  
  return (
    <div style={{ paddingTop: "90px", paddingLeft: "20px" }}>
      <div style={{display:"grid",width:"calc(100vw - 260px)",placeItems:"center"}}></div>
      {/* <Container sx={{width: '1980px'}}> */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              //href="/DashBoard"
              onClick={useCallback(() =>
                history.push("/AxiomProtect/DashBoard")
              )}
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="TokenizationMerchants" deleteIcon={<ExpandMoreIcon />} />
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} md={6}>
          <div sx={{paddingLeft: '0px', paddingTop: '0px'}}>
            <Button variant="contained" sx={{fontFamily: 'Jost', float: 'right'}} onClick={handleOpenModal}>Add New Merchants</Button></div>
              <Modal open={open}
                  
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
              >
                  <Box sx={style1} >
                    
                      <Typography id="modal-modal-title" variant="h6" component="h6" sx={{fontFamily:'Jost'}}>
                          Add New Tokenization Merchant
                      </Typography>
                      <br />
                      <Divider sx={{borderColor: '#CECECE'}}/>
                      <br />
                      <Container>
                          <Grid container spacing={2}>

                              <Grid item xs={12} md={3} style={{marginTop: 1}}>
                                 Merchant ID
                              </Grid>

                              <Grid item xs={12} md={9}>
                                  <TextField fullWidth size="small" type="text" name="merchantID" id="merchantID" label="Merchant ID" variant="outlined" onChange={(e) => setmerchantId(e.target.value)}/>
                              </Grid>
                              
                              <Grid item xs={12} md={3} style={{marginTop: 1}}>
                                Merchant Name
                              </Grid>

                              <Grid item xs={12} md={9}>
                                <TextField fullWidth size="small" type="text" name="merchantName" id="merchantName" label="Merchant Name" variant="outlined" onChange={(e) => setmerchantName(e.target.value)}/>
                              </Grid>
                          </Grid>
                      </Container>
                      <br />
                      <Divider sx={{borderColor: '#BABABA'}}/>
                      <br />
                      <Grid container spacing={4} sx={{marginLeft: '68%'}}>
                          <Grid item >
                              <Button variant="contained" sx={{fontFamily: 'Jost'}} onClick={handleCloseModal}>Close</Button>

                              <Button variant="contained" sx={{fontFamily: 'Jost', marginLeft: '10px' }} onClick={handleSubmit}>Create Merchants</Button>
                          </Grid>
                      </Grid>
                      {/* </Form> */}
                  </Box>
              </Modal>
          </Grid>
      </Grid>

      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >
            <h4>TokenizationMerchants</h4>
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <div
            style={{
              justifyContent: "flex-end",
              display: "flex",
              width: "100%",
              float: "right",
              paddingTop: "20px",
              // marginRight: "10px",
            }}
          >
            <input
              type="search"
              placeholder="Search by app name and appid .."
             
              style={{
                borderRadius: "8px 8px",
                border: "1px solid",
                outline: "none",
                padding: 12,
                width:"15rem"
              }}
            />
          </div>
          </Grid>
      </Grid>
      
      <Divider sx={{ borderColor: "#BABABA" }} />
      <br />
      {searchResult && (
        <div>
          {/* {searchResult.map((user, idx) => ( */}
          <>
            <div
              style={{
                marginTop: 12,
                display: "grid",
                width: "calc(100vw - 260px)",
                placeItems: "center",
                marginLeft: 0,
              }}
            >

              {loadingSearch ? (
                <Loader />
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 900 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">No</StyledTableCell>
                        <StyledTableCell align="center">Merchant Id</StyledTableCell>
                        <StyledTableCell align="center">Merchant Name</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Tokenization Setting</StyledTableCell>
                        <StyledTableCell align="center">Created On</StyledTableCell>
                        <StyledTableCell align="center">Updated On</StyledTableCell>
                        <StyledTableCell align="center">Manage</StyledTableCell>
                        
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {tokenizationMerchantData.data.length > 0 && tokenizationMerchantData.data
                              .map((row, index) => (
                          
                          <StyledTableRow key={index}>
                            {/* <StyledTableCell align="center">{row.userid}</StyledTableCell> */}
                            <StyledTableCell align="center">{row.srno}</StyledTableCell>
                            <StyledTableCell align="center">{row.merchantid}</StyledTableCell>
                            <StyledTableCell align="center">{row.merchantname}</StyledTableCell>
                            <StyledTableCell align="center">
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"

                                // label="Status"
                                defaultValue={row.status}
                                onChange={(e)=>handleStatusChange(e,row)}
                                style={{ width: 100, height: 40, flex:1 }}> 
                                
                                <MenuItem value={1} >
                                  Active
                                </MenuItem>
                                <MenuItem value={-1} >
                                 Suspended
                                </MenuItem>
                                
                              </Select>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Chip label="View" size="small" color="primary" variant="outlined" onClick={(e)=>handleOnClickRedirect(e,row)}/>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {moment(row.creationdatetime).format(
                                "D-M-YYYY, h:mm:ss"
                              )}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {moment(row.expirydatetime).format(
                                "D-M-YYYY, h:mm:ss"
                              )}
                            </StyledTableCell>

                            <StyledTableCell>
                              <IconButton aria-label="delete">
                                <DeleteIcon size="small" style={{ color: '#D2042D' }} onClick={(e)=>handleSubmitDelete(e,row)}/>
                              </IconButton>
                              <IconButton aria-label="edit">
                                <EditIcon size="small" style={{ color: '#9c27b0'}} onClick={(e)=>handleOpenEditModal(e,row)}/>

                              {openEdit&& tokenizationMerchantData.editedRow&&
                                <Modal open={openEdit}
                  
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style1} >
                                        
                                        <Typography id="modal-modal-title" variant="h6" component="h6" sx={{fontFamily:'Jost'}}>
                                            Edit New Tokenization Merchant
                                        </Typography>
                                        <br />
                                        <Divider sx={{borderColor: '#CECECE'}}/>
                                        <br />
                                        <Container>
                                            <Grid container spacing={2}>

                                                <Grid item xs={12} md={3} style={{marginTop: 1}}>
                                                    Merchant ID
                                                </Grid>

                                                <Grid item xs={12} md={9}>
                                                    <TextField fullWidth size="small" type="text" name="merchantID" id="merchantID" label="Merchant ID" variant="outlined" 
                                                      value={tokenizationMerchantData.editedRow.merchantid}
                                                      onChange={(e)=>setTokenizationMerchantData({...tokenizationMerchantData,editedRow:{
                                                        ...tokenizationMerchantData.editedRow,
                                                        merchantid:e.target.value
                                                      }})}
                                                    />
                                                </Grid>
                                                
                                                <Grid item xs={12} md={3} style={{marginTop: 1}}>
                                                    Merchant Name
                                                </Grid>

                                                <Grid item xs={12} md={9}>
                                                    <TextField fullWidth size="small" type="text" name="merchantName" id="merchantName" label="Merchant Name" variant="outlined" 
                                                      value={tokenizationMerchantData.editedRow.merchantname}
                                                      onChange={(e)=>setTokenizationMerchantData({...tokenizationMerchantData,editedRow:{
                                                        ...tokenizationMerchantData.editedRow,
                                                        merchantname:e.target.value
                                                      }})}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Container>
                                        <br />
                                        <Divider sx={{borderColor: '#BABABA'}}/>
                                        <br />
                                        <Grid container spacing={4} sx={{marginLeft: '68%'}}>
                                            <Grid item >
                                                <Button variant="contained" sx={{fontFamily: 'Jost'}} onClick={handleCloseEditModal}>Close</Button>

                                                <Button variant="contained" sx={{fontFamily: 'Jost', marginLeft: '10px' }} onClick={(e)=>handleEditSubmit(e,row)}>Edit Merchants</Button>
                                            </Grid>
                                        </Grid>
                                        {/* </Form> */}
                                    </Box>
                                </Modal>
                              }

                              </IconButton>
                            </StyledTableCell>
                           
                          </StyledTableRow>
                    ))}
                       
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
}
