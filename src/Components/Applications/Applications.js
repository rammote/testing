import React, { useState, useCallback, useEffect } from 'react';
import Server from '../APIUrl';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link, useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Loader from '../Loader'
import GetNeofyQRCode from '../Users/GetNeofyQRCode';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  // height: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  fontFamily: 'Jost',
};

const style1 = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  backgroundColor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 0,
  p: 4,
};

const dropdowntypes = [
  // { label: (<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}>Web</Typography>), value: ("web") },
  // { label: (<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}>Mobile</Typography>), value: ("mobile") },
  { label: ("Web") },
  { label: ("Mobile") }
];

export default function CustomizedTables() {
  const history = useHistory();

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
  const [loading, setLoading] = useState(false)
  const [valueDate, setValueDate] = React.useState([null, null]);
  const [openM, setOpenM] = React.useState(false);
  const handleClickOpen = () => setOpenM(true);
  const handleClickClose = () => setOpenM(false);
  //const handleOnClick = useCallback(() => history.push('/Applications/Radius'), [history]);

  const handleOnClick = e => {
    e.preventDefault();
    console.log(value)
    if (value === "1") {
      history.push({
        pathname: '/AxiomProtect/Applications/Custom'
      })
    }
    else if (value == "2") {
      history.push({
        pathname: '/AxiomProtect/Applications/Radius'
      })
    }
    else if (value == "3") {
      history.push({
        pathname: '/AxiomProtect/Applications/SSO'
      })
    }else{
      setOpen(false)
      Swal.fire("Warning", "Please select given option", "warning")
    }
  }

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  React.useEffect(() => {
    setApplicationData({ ...applicationData, isLoading: true })

    const fetchData = async () => {
      setLoading(true)
      await Server.get(`/application/getAll?accountId=${accountId}&requestTime=${requestTime}`, {
        headers: {
          'content-type': 'application/json',
          authToken: authtoken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"

        },
      })
        .then((response) => {
          console.log(response.data)
          setApplicationData({ ...applicationData, isLoading: false })
          setLoading(false)
          setOpenM(false)
          if (response.data.resultCode === 0) {
            setRows(response.data.resultData)
          }

        }).catch((err) => {
          console.log(err)
          setRows([])
          setLoading(false)
          setOpenM(false)

          setApplicationData({

            isLoading: false,
            isSuccess: false,
            isError: true,
            isSnackbarOpen: true,
          })

        })
    }
    return fetchData();
  }, [])


  // search functionality 
  const [filterList, setFilterList] = useState(rows);
  useEffect(() => {
    setFilterList(rows);
  }, [rows]);
  const handleSearchOnChange = (e) => {
    let data;
    if (e.target.value.length > 0) {
      data = filterList && filterList.filter((app) => {
        return app?.appid.toLowerCase().includes(e.target.value.toLowerCase()) || app?.appname.toLowerCase().includes(e.target.value.toLowerCase())
      });
    } else {
      data = rows;
    }
    return setFilterList(data);
  };

  const handleStatusChange = async (e, row) => {
    e.preventDefault();


    let status = e.target.value
    console.log(row);

    console.log("selcted value", e.target.value, "seleted row", row, rows)
    await Server.get(`/application/setStatus?accountId=${row.accountid}&appId=${row.appid}&status=${status}&requestTime=${requestTime}`, {
      headers: {
        'content-type': 'application/json',
        authToken: authtoken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"

      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.resultCode === 0) {
          Swal.fire("Application Status Updated Successfully!", "success");
          //return toast.success('Success !');
        } else {
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

  const handleGetAppId = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row)

    history.push({
      pathname: "/AxiomProtect/AssignUser",
      state: {
        row: row,
      }
    })
  }

  // const [page, setPage] = React.useState(0);
  const [rowssPerPage, setRowssPerPage] = React.useState(5);
  const [rowss, setRowss] = React.useState([])
  //const [open, setOpen] = React.useState(false);

  const handleGetAudit = (e, row) => {
    e.preventDefault();
    let index = rows.findIndex(x => x.unitid === row.unitid);
    console.log("seleted audit", row)
    // console.log(valueDate[0]);
    // console.log(valueDate[1]);
    var startDate = valueDate[0].toISOString().replaceAll("T", " ").replaceAll("Z", "");
    var endDate = valueDate[1].toISOString().replaceAll("T", " ").replaceAll("Z", "");
    // console.log(startDate)
    // console.log(endDate)
    let itemtype = "4";
    Server.get(`/audits/getAuditByitemTypeByDate?accountId=${accountId}&requestTime=${requestTime}&startDate=${startDate}&endDate=${endDate}&itemType=${itemtype} `, {
      headers: {
        'content-type': 'application/json',
        authToken: authtoken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      },
    })
      .then((response) => {
        console.log(response.data.resultData)
        //setRowss(rowss.filter((item)=>item.userid != row.userid))
        setOpenM(false)

        if (response.data.resultCode == 0) {

          history.push({
            pathname: "/AxiomProtect/ApplicationAudit",
            state: {
              data: response.data.resultData,
            }
          })
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: response.data.resultMessage,
          })
        }
      }).catch((err) => {
        console.log(err)
        setRows([])
        Swal.fire("Error", err, "error");
      })

  }

  const handleAdaptiveRules = (e, row) => {
    e.preventDefault();
    history.push({
      pathname: "/AxiomProtect/RBAManagement",
      state: {
        row: row,
      }
    })
  }

  const handleSendToPolicy = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row)
    if (row.policyid == null) {
      history.push({
        pathname: "/AxiomProtect/assignpolicy",
        state: {
          row: row,
        }
      })
    }
    else {
      Server.get(`/policy/getById?accountId=${accountId}&policyId=${row.policyid}&requestTime=${requestTime}`, {
        headers: {
          'content-type': 'application/json',
          authToken: authtoken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"

        },
      })
        .then((response) => {
          console.log("----------", response.data)
          history.push({
            pathname: "/AxiomProtect/ViewPolicy",
            state: {
              row: response.data.resultData,
            }
          })

        }).catch((err) => {
          console.log(err)
          setRows([])

        })
    }

  }

  const handleremovepolicy = (e, row) => {
    e.preventDefault();
    Server.get(`/application/unassignPolicy?accountId=${accountId}&applicationId=${row.appid}&requestTime=${requestTime}`, {
      headers: {
        'content-type': 'application/json',
        authToken: authtoken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"

      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.resultCode == "-50") {
          Swal.fire({
            title: 'User has Already Assigned',
            text: "",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          })
        } else {
          Swal.fire({
            title: 'Policy Removed',
            text: "",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          })
          window.location.reload();
        }

      }).catch((err) => {
        console.log(err)

      })
  }

  const handleSendToAllAssignedUser = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row)

    history.push({
      pathname: "/AxiomProtect/GetAllAssignedUser",
      state: {
        row: row,
      }
    })
  }

  const changeColor = (e) => {
    e.target.style.background = '#0D4990'
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
    }).then((result) => {
      if (result.isConfirmed) {

        Server.delete(`/application/delete?accountId=${accountId}&appId=${row.appid}&requestTime=${requestTime}`, {
          headers: {
            'content-type': 'application/json',
            authToken: authtoken,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"

          },
        })
          .then((response) => {
            console.log(response.data)
          if(response?.data?.resultCode ===0){
            setRows(rows.filter((item) => item.appid != row.appid))
            Swal.fire(
              'Deleted!', 
              response?.data?.resultMessage,
              'success'
            )
          }else{
            Swal.fire(
              'Warning!',
              response?.data?.resultMessage,
              'warning'
            )
          }

          }).catch((err) => {
            Swal.fire(
              'Error!',
              err?.response?.data?.resultMessage || err.message || err,
              'error'
            )
            setRows([])
          })

      }
    })

  }

  const EditApplication = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row)

    if (row.apptype == "1") {
      history.push({
        pathname: "/AxiomProtect/EditCustomApp",
        state: {
          row: row,
        }
      })
    } else if (row.apptype == "5") {
      let clientId= typeof row?.subtype === "string" ? (row?.subtype.length>5 ? row?.subtype : row?.secretkey  ): row?.secretkey 
      history.push({
        pathname: `/AxiomProtect/Applications/OpenIdApp/${clientId}`,
        state:{
          row:row
        }
      })
    } else if (row.apptype == "6") {
      history.push({
        pathname: `/AxiomProtect/Applications/EditSAMLApp/${row?.appid}`,
        state: {
          row: row,
          appid:row?.appid
        }
      })
    } else {
      history.push({
        pathname: "/AxiomProtect/EditRadiusApp",
        state: {
          row: row,
        }
      })
    }
  }


  return (
    <div style={{ paddingTop: '90px', paddingLeft: "20px" }}>
      {/* <br /><br /><br /> */}
      {/* <p style={{ color: '#5C5C5C', fontSize: 25, marginLeft: 20 }}>Application List </p> */}
      <Grid container spacing={3}>
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
              label="Applications"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} md={6}>
          <div sx={{ paddingLeft: '0px', paddingTop: '0px' }}>
            <Button variant="contained" sx={{ fontFamily: 'Jost', float: 'right' }} onClick={handleOpenModal}>+ Add New</Button></div>
          <Modal
            open={open}
            // onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} >
              {/* <Form onSubmit={this.handleSubmit}> */}
              <Typography id="modal-modal-title" variant="h6" component="h6" sx={{ fontFamily: 'Jost' }}>
                Create New Application Integration
              </Typography>
              <br />
              <Divider sx={{ borderColor: '#CECECE' }} />
              <br />
              <Container>
                {/* <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Platform</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Autocomplete
                                                disablePortal
                                                size="small"
                                                id="combo-box-demo"
                                                options={dropdowntypes}
                                                renderInput={(params) => <TextField {...params} label={<Typography sx={{fontFamily: 'Jost'}}>Type</Typography>}/>}
                                                />
                                            </Grid>
                                        </Grid>
                                        <br /> */}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography sx={{ fontFamily: 'Jost', color: '#232E3C' }}>Sign On Method</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="apps"
                        onChange={(e) => setValue(e.target.value)}
                        name="radio-buttons-group"
                      >
                        {/* <FormControlLabel value="4" disabled={true} control={<Radio />} label={<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}>Secure web authentication (SWA) - SCIM</Typography>} />
                                                        <Typography sx={{fontFamily: 'Jost'}}>Uses credential to sign in. This integration works with most apps</Typography>
                                                        
                                                        <FormControlLabel value="3" disabled={true}  control={<Radio />} label={<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}>SMAL 2.0</Typography>} />
                                                        <Typography sx={{fontFamily: 'Jost'}}>Uses credential to sign in. This integration works with most apps</Typography> */}

                        <FormControlLabel value="2" control={<Radio />} label={<Typography sx={{ fontFamily: 'Jost', color: '#232E3C' }}>Radius</Typography>} />
                        <Typography sx={{ fontFamily: 'Jost' }}>Description text will appear here</Typography>

                        <FormControlLabel value="1" control={<Radio />} label={<Typography sx={{ fontFamily: 'Jost', color: '#232E3C' }}>Custom</Typography>} />
                        <Typography sx={{ fontFamily: 'Jost' }}>Description text will appear here</Typography>

                        <FormControlLabel value="3" control={<Radio />} label={<Typography sx={{ fontFamily: 'Jost', color: '#232E3C' }}>Single Sign-on(SSO)</Typography>} />
                        <Typography sx={{ fontFamily: 'Jost' }}>Description text will appear here</Typography>

                        {/* <FormControlLabel value="5" disabled={true} control={<Radio />} label={<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}>Custom with Sonic</Typography>} />
                                                        <Typography sx={{fontFamily: 'Jost'}}>Description text will appear here</Typography> */}

                        {/* <FormControlLabel value="6" disabled={true} control={<Radio />} label={<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}>OIDC - OpenID Connect</Typography>} />
                                                        <Typography sx={{fontFamily: 'Jost'}}>Uses credential to sign in. This integration works with most apps</Typography> */}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Container>
              <br />
              <Divider sx={{ borderColor: '#BABABA' }} />
              <br />
              <Grid container spacing={4} sx={{ marginLeft: '75%' }}>
                <Grid item >
                  <Button variant="text" sx={{ fontFamily: 'Jost' }} onClick={handleCloseModal}>Cancel</Button>
                </Grid>
                <Grid item >
                  <Button type="submit" variant="contained" sx={{ fontFamily: 'Jost' }} onClick={handleOnClick}>Next</Button>
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
          <Typography sx={{ fontFamily: 'Jost', fontSize: '20px', color: '#000000' }}>
            <h4>Applications</h4>
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
            }}
          >
            <input
              type="search"
              placeholder="Search by app name and appid .."
              onChange={handleSearchOnChange}
              style={{
                borderRadius: "8px 8px",
                border: "1px solid",
                outline: "none",
                padding: 12,
                width: "15rem"
              }}
            />
          </div>
        </Grid>
      </Grid>

      <div style={{ display: "grid", width: "calc(100vw - 260px)", placeItems: "center", marginLeft: 0 }}>
        {/* <div style={{justifyContent:"flex-end",display:"flex",width:"100%",float: 'right',marginBottom:8}}><input  onChange={(e)=>setRows(rows.filter((row)=>row.appid == e.target.value))} type="text" placeholder="Search .." style={{borderRadius:"8px 8px",border:"1px solid",outline:"none",padding:12}}/></div> */}

        {loading ?
          <Loader />
          : <>
            <TableContainer component={Paper} >
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>App Logo</StyledTableCell>
                    <StyledTableCell align="center">App Name (appId)</StyledTableCell>
                    <StyledTableCell align="center">App Type</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Users</StyledTableCell>
                    <StyledTableCell align="center">Policy</StyledTableCell>
                    <StyledTableCell align="center">Audit</StyledTableCell>
                    <StyledTableCell align="center">Created On</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterList && filterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row"  >

                          <img src={row.applogo} alt="app logo" style={{ height: 50, width: 50, objectFit: "scale-down", borderRadius: "50%" }} />
                        </StyledTableCell>

                        {/* <StyledTableCell className="demoooo" onMouseHover={changeColor} align="center" style={{cursor:"pointer",}} onClick={(e)=>handleGetAppId(e,row)}>{row.appname}</StyledTableCell> */}
                        <StyledTableCell align="center">
                          {row.subtype == "4" && row.apptype == "1" ?
                            <GetNeofyQRCode row={row} /> :
                           <>
                            <Button onClick={(e) => handleGetAppId(e, row)} type="text">{row?.appname}</Button> ({row?.appid})
                           </>
                              }
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.apptype == 1 ? "Custom" : row.apptype == 5 ? "OIDC" : row.apptype == 6 ? "SAML" : "Radius"}</StyledTableCell>

                        <StyledTableCell align="center">
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"

                            // label="Status"
                            defaultValue={row.status}
                            onChange={(e) => handleStatusChange(e, row)}
                            style={{ width: 100, height: 40, flex: 1 }}>

                            <MenuItem value={0} >
                              Active
                            </MenuItem>
                            <MenuItem value={1} >
                              Suspended
                            </MenuItem>

                          </Select>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Chip label="View" size="small" color="success" variant="outlined" onClick={(e) => handleSendToAllAssignedUser(e, row)} />
                        </StyledTableCell>

                        <StyledTableCell align="center" style={{ width: 100, flex: 1 }}>
                          {/* {row.subtype == 3 ?
                              <Chip label="View" size="small" color="primary" variant="outlined" onClick={(e)=>handleAdaptiveRules(e,row)} sx={{ m:'2px' }}/>
                              : */}
                          <Chip label={row.policyid == null ? "Assign" : "View"} size="small" color="primary" variant="outlined" onClick={(e) => handleSendToPolicy(e, row)} sx={{ m: '2px' }} />
                          {/* } */}
                          {/* <Chip label="Remove" disabled="true" color="error" variant="outlined" onClick={(e)=>handleremovepolicy(e,row)}/> */}
                          {row.policyid == null ?
                            <Chip label="Remove" size="small" disabled="true" color="error" variant="outlined" onClick={(e) => handleremovepolicy(e, row)} sx={{ m: '2px' }} />
                            :
                            <Chip label="Remove" size="small" color="error" variant="outlined" onClick={(e) => handleremovepolicy(e, row)} sx={{ m: '2px' }} />
                          }
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Chip label="Audit" size="small" color="success" variant="outlined" onClick={handleClickOpen} />
                          <Modal
                            open={openM}
                            onClose={handleClickClose}

                          >
                            <Box sx={style1}>
                              <Typography sx={{ fontFamily: 'Jost', color: '#232E3C' }} id="modal-modal-title" variant="h6" component="h2">
                                Enter Duration
                              </Typography>
                              <br />
                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateRangePicker
                                  calendars={1}
                                  value={valueDate}
                                  onChange={(newValue) => {
                                    setValueDate(newValue);
                                  }}
                                  renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                      <TextField {...startProps} />
                                      <Box sx={{ mx: 2 }}> to </Box>
                                      <TextField {...endProps} />
                                    </React.Fragment>
                                  )}
                                />
                                <br />
                              </LocalizationProvider>
                              <Button
                                type="submit"
                                size="small"
                                variant="contained"
                                sx={{ fontFamily: "Jost", marginLeft: '15rem' }}
                                onClick={handleClickClose}
                              >
                                Cancel
                              </Button>
                              <Button type="submit" size="small" variant="contained" sx={{ fontFamily: 'Jost', float: "right" }} onClick={(e) => handleGetAudit(e, row)}>Show Audit</Button>
                            </Box>
                          </Modal>
                        </StyledTableCell>

                        <StyledTableCell align="center">{moment(row.updatedoon).format('D-M-YYYY, h:mm:ss')}</StyledTableCell>

                        <StyledTableCell align="center">
                          <IconButton aria-label="delete" onClick={(e) => deletespecificRow(e, row)}>
                            <DeleteIcon style={{ color: '#D2042D' }} />
                          </IconButton>
                          {row.subtype == 3 ?
                            <IconButton aria-label="delete" onClick={(e) => handleAdaptiveRules(e, row)} style={{ marginLeft: 10 }}>
                              <EditIcon style={{ color: '#9c27b0' }} />
                            </IconButton>
                            :
                            <IconButton aria-label="delete" onClick={(e) => EditApplication(e, row)} style={{ marginLeft: 10 }}>
                              <EditIcon style={{ color: '#9c27b0' }} />
                            </IconButton>
                          }
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
    </div>
  );
}