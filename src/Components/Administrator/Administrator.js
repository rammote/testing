import React, { useState, useCallback, useEffect } from "react";
import Server from "../APIUrl";
import {  useHistory, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

//import Autocomplete from '@mui/material/Autocomplete';
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
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
import DateRangePicker from "@mui/lab/DateRangePicker";
import Loader from "../Loader";
import {LoadingButton} from '@mui/lab'
import Swal from "sweetalert2";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 

export default function Administrator() {
  const history = useHistory();
  const requestTimess = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const requestTime = escape(requestTimess);
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const userId= sessionStorage.getItem("userId")
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const [searchText, setSearchText] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);

  const [value, setValue] = React.useState(null);
  const [value1, setValue1] = React.useState([null, null]);
  const [openM, setOpenM] = React.useState(false);
  const handleClickOpen = () => setOpenM(true);
  const handleClickClose = () => setOpenM(false);
  const [loading, setLoading] = useState(false);

  // const requestTime = escape(new Date().toISOString().replaceAll("T", " ").replaceAll("Z", ""));

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const [adminData, setAdminData] = useState([]);
  const [adminLabels, setAdminLabels] = useState([]);
  const handleOnClick = useCallback(() => history.push('/AxiomProtect/Administrator/AddTeamMember'), [history]);
  useEffect(() => {
    async function fetchAdminData() {
      setLoading(true);
      await Server.get(
        `/reports/getOperatorsCountByStatus?accountId=${accountId}&requestTime=${requestTime}&duration=0`,
        {
          headers: {
            "content-type": "application/json",
            authToken: authtoken,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      )
        .then((response) => {
          console.log("Admin", response.data?.resultData);
          setAdminData(response?.data?.resultData?.datasets[0]?.data);
          setAdminLabels(response?.data?.resultData?.labels);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    return fetchAdminData();
  }, []);

  const [adminResult, setAdminResult] = useState({});

  useEffect(() => {
    if (adminData.length === adminLabels.length && adminData.length > 0) {
      setAdminResult(
        Object.assign.apply(
          {},
          adminLabels.map((v, i) => ({ [v]: adminData[i] }))
        )
      );
    }
  }, [adminData, adminLabels]);

  console.log("resultData", adminResult);

  React.useEffect(() => {
    Server.get(
      `/operator/getAll?accountId=${accountId}&requestTime=${requestTime}`,
      {
        headers: {
          "content-type": "application/json",
          authToken: authtoken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        setRows(response.data.resultData);
      })
      .catch((err) => {
        console.log(err);
        setRows([]);
      });
  }, []);

  let validation = {
    isEmailAddress: function (str) {
      var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return pattern.test(str); // returns a boolean
    },
    isNotEmpty: function (str) {
      var pattern = /\S+/;
      return pattern.test(str); // returns a boolean
    },
    isNumber: function (str) {
      var pattern = /^\d+$/;
      return pattern.test(str); // returns a boolean
    },
    isName: function (str) {
      var pattern = /^[\w\-\s]+$/;
      return pattern.test(str);
    },
    isSame: function (str1, str2) {
      return str1 === str2;
    },
  };

  const handleSetRandomPasswordSubmit =async (e, row) => {
    e.preventDefault()
    
    await Server.get(`/operator/sendRandomPassword?accountId=${accountId}&operatorId=${row.operatorid}&requestTime=${requestTime}`, {
        
        headers: {
            'content-type': 'application/json',
            authToken: authtoken,
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*"   
        },
    })
        .then((response) => {
    
          if (response.data.resultCode === 0) {
            Swal.fire({
              title: "Password sent",
              text: "Password has been sent to the user's email address",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Something went wrong",
              icon: "error",
            });
          }
          console.log(response.data);

        
        }).catch((err) => {
            console.log(err)
        })
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("clicked");
    //for number
    if (validation.isNumber(searchText)) {
      apiCall({ searchFor: searchText, type: 2 });
    } //for email ID
    else if (validation.isEmailAddress(searchText)) {
      apiCall({ searchFor: searchText, type: 1 });
    } 
    else if (validation.isName(searchText)){
      apiCall({ searchFor: searchText, type: 4 });
    }
  };

  const apiCall = async (body) => {
    console.log("type : ",body)
    setLoading(true)
    await Server.get(
      `/operator/getBy?accountId=${accountId}&requestTime=${requestTime}&type=${body.type}&searchFor=${body.searchFor}`,
      {
        headers: {
          "content-type": "application/json",
          authToken: authtoken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then((response) => {
        setLoading(false)
        console.log(response.data);
        if (response.data.resultCode == 0) {
          setSearchResult((searchResult) => [
            response.data.resultData,
          ]);
        } else {
          setSearchResult([]);
          Swal.fire({
            title: "Operator not present",
            text: "The data you have entered may not be present !!!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            // confirmButtonText: 'Yes, delete it!'
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  };

  const handleGetTeamMemberId = (e, row) => {
    e.preventDefault();

    history.push({
      pathname: "/AxiomProtect/Editteammember",
      state: {
        row: row,
      },
    });
  };



  const handleGetAppId = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row);

    history.push({
      pathname: "/AxiomProtect/AdminDetails",
      state: {
        row: row,
      },
    });
  };

  const passrowdataonallAssignedUser = (e, row) => {
    e.preventDefault();
    console.log("seleted name", row);

    history.push({
      pathname: "/AxiomProtect/getallassigneduserforteam",
      state: {
        row: row,
      },
    });
  };

  const handleStatusChange = async (e, row) => {
    e.preventDefault();
    let index = rows.findIndex((x) => x.unitid === row.unitid);

    let status = e.target.value;

   if(userId === row?.operatorid && (status === 0 || status === -99 || status === -1)){
    Swal.fire("Warning", "You can not suspend, lock and trash your own account", "warning")
    return
   }else{
    console.log("selcted value", e.target.value, "seleted row", row, rows);
    await Server.get(
      `/operator/changeStatus?accountId=${accountId}&operatorId=${row.operatorid}&status=${status}&requestTime=${requestTime}`,

      {
        headers: {
          "content-type": "application/json",
          authToken: authtoken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "Status Changed",
          text: "Status Changed Successfully",
          icon: "success",
        })
        if (response.data.resultCode == 0) {
          if (e.target.value == "suspended") {
            setRows((rows) => [
              ...rows.slice(0, index),
              Object.assign({}, rows[index], { row, status: -1 }),
              ...rows.slice(index + 1),
            ]);
          } else if (e.target.value == "active") {
            setRows((rows) => [
              ...rows.slice(0, index),
              Object.assign({}, rows[index], { row, status: 1 }),
              ...rows.slice(index + 1),
            ]);
          } else
            setRows((rows) => [
              ...rows.slice(0, index),
              Object.assign({}, rows[index], { row, status: -55 }),
              ...rows.slice(index + 1),
            ]);
        } else Swal.fire("", response.data.resultMessage, "error");
      })
      .catch((err) => {
        console.log(err);
      });
   }

    // console.log(status);
    // console.log(result);
    //window.location.reload();
  };

  const handleRoleChange = async (e, row) => {
    e.preventDefault();

    console.log("selcted value", e.target.value, "seleted row", row, rows);
    await Server.get(
      `/operator/changeRole?accountId=${accountId}&operatorId=${row.operatorid}&roleId=${e.target.value}&requestTime=${requestTime}`,

      {
        headers: {
          "content-type": "application/json",
          authToken: authtoken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    ).then(response => {
      Swal.fire({
        title: "Role Changed",
        text: "Role Changed Successfully",
        icon: "success",
      })
    }).catch(err => {
      Swal.fire({
        title: "Role Not Changed",
        text: "Role Not Changed",
        icon: "error",
      })
    })
  };

  const deletespecificRow = (e, operatorid) => {

    e.preventDefault();
    // console.log(row.unitid);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then( (result) => {
      if (result.isConfirmed) {
         Server.delete(
          `/operator/delete?accountId=${accountId}&operatorId=${operatorid}&requestTime=${requestTime}`,
          {
            headers: {
              "content-type": "application/json",
              authToken: authtoken,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
            },
          }
        )
          .then((response) => {
            console.log(response.data);
            // setRows(rows.filter((item)=>item.operatorid !== row.operatorid))
            if(response.data.resultCode == 0){
              Swal.fire({
                title: "Deleted",
                text: response.data.resultMessage,
                icon: "success",
              })
              setSearchResult([]);
            }else{
              Swal.fire({
                title: "Not Deleted",
                text: response.data.resultMessage,
                icon: "error",
              })
            }
          })
          .catch((err) => {
            console.log(err);
            setRows([]);
          });
      }
    });
  };

  const EditTeamUnit = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row);

    history.push({
      pathname: "/AxiomProtect/EditTeamUnit",
      state: {
        row: row,
      },
    });
  };
  return (
    <div style={{ paddingTop: "90px", marginLeft: "20px" }}>
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
            <StyledBreadcrumb
              label="Administrator"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} md={6}>
          
            <Button
            onClick={handleOnClick}
              variant="contained"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#206BC4",
                float: "right",
              }}
            >
              + Add Team Member
            </Button>
 
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >
            <h4>Administrators</h4>
          </Typography>
        </Grid>
        {/* <Grid item xs={12} md={6}>
                            <div style={{ justifyContent: "flex-end", display: "flex", width: "100%", float: 'right', paddingTop: '20px' }}><input onChange={(e) => setRows(rows.filter((row) => row.appid == e.target.value))} type="text" placeholder="Search .." style={{ borderRadius: "8px 8px", border: "1px solid", outline: "none", padding: 12 }} /></div>
                          </Grid> */}
      </Grid>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={10}>
          {adminResult &&
            Object.keys(adminResult).map((key, index) => {
              return (
                <Grid item key={index}>
                  <Typography
                    sx={{
                      fontFamily: "Jost",
                      fontSize: "15px",
                      color: "#000000",
                    }}
                  >
                    <h4>{adminResult[key]}</h4>
                    <h4>{key}</h4>
                  </Typography>
                </Grid>
              );
            })}
        </Grid>
      )}
      <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
      <br />
      <form
      onSubmit={handleSearch}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              
            }}
          >
            <TextField
              type="text"
              size="small"
              style={{width:"700px"}}
              name="search"
              required
            InputProps={{
              min:1
            }}
              id="outlined-basic"
              label="Search team member using name / phone or email"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value.trimStart())}
            
            />

            <LoadingButton loading={loading} type="submit"  sx={{ml:5}} color="primary" variant="contained">
              Search
            </LoadingButton>
          </form>
          <br/>
      {searchResult && (
        <div>
          {/* {searchResult.map((user, idx) => ( */}
          <>
        
            {/* <p style={{ color: '#5C5C5C', fontSize: 25, marginLeft: 10 }}>Team <span><Link to="/Addteammember"><Button variant="contained" style={{ color: '#FFFFFF', backgroundColor: '#206BC4', float: 'right' }}>Add Team Member</Button></Link></span></p> */}
            <div
              style={{
                display: "grid",
                width: "calc(100vw - 260px)",
                placeItems: "center",
              }}
            >
              {/* <div style={{ justifyContent: "flex-end", display: "flex", width: "100%", float: 'right', marginBottom: 8 }}><input onChange={(e) => setRows(rows.filter((row) => row.appid == e.target.value))} type="text" placeholder="Search .." style={{ borderRadius: "8px 8px", border: "1px solid", outline: "none", padding: 12 }} /></div> */}

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      {/* <StyledTableCell align="center">Team Id</StyledTableCell> */}
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">Phone</StyledTableCell>
                      <StyledTableCell align="center">Email Id</StyledTableCell>
                      <StyledTableCell align="center">Role</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                      <StyledTableCell align="center">Password</StyledTableCell>
                      <StyledTableCell align="center">Audit</StyledTableCell>
                      <StyledTableCell align="center">
                        Created on
                      </StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchResult &&
                      searchResult
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                          <StyledTableRow key={index}>
                            {/* <StyledTableCell align="center">{row.unitid}</StyledTableCell> */}
                            <StyledTableCell align="center">
                              <Button
                                onClick={(e) => handleGetAppId(e, row)}
                                type="text"
                              >
                                {row.name}
                              </Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.phone}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.emailid}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // label="Status"
                                defaultValue={
                                  row.roleid
                            
                                }
                                onChange={(e) => handleRoleChange(e, row)}
                                style={{ width: 150, height: 30 }}
                              >
                                <MenuItem value={1}>Owner</MenuItem>
                                <MenuItem value={2}>Admin</MenuItem>
                                <MenuItem value={3}>
                                  User Manager
                                </MenuItem>
                                <MenuItem value={4}>
                                  Help Desk
                                </MenuItem>
                                <MenuItem value={5}>Billing</MenuItem>
                                <MenuItem value={6}>
                                  Read-only
                                </MenuItem>
                              </Select>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // label="Status"
                                defaultValue={
                                  row.status
                                }
                                onChange={(e) => handleStatusChange(e, row)}
                                style={{ width: 150, height: 30 }}
                              >
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={0}>
                                  Suspended
                                </MenuItem>
                                <MenuItem value={3}>Enrolled</MenuItem>
                                <MenuItem value={-1}>Locked</MenuItem>
                                <MenuItem value={-99}>Trash</MenuItem>
                              </Select>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Button variant="contained" 
                              size="small"
                                onClick={(e) => handleSetRandomPasswordSubmit(e,row)}
                              >Set Password</Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              
                              {/* Audit method adding */}
                              <Link
                          href={`/AxiomProtect/AdminAudit/${row.operatorid}`}
                        >
                        <Chip style={{cursor:"pointer"}} label="Audit" color="primary" />
                        </Link>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {moment(row.createdon).format(
                                "D-M-YYYY, h:mm:ss"
                              )}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              <IconButton
                                aria-label="delete"
                                onClick={(e) => {deletespecificRow(e, row?.operatorid)}}
                              >
                                <DeleteIcon style={{ color: "#D2042D" }} />
                              </IconButton>
                              {/* <IconButton aria-label="delete" style={{ marginLeft: 10 }}>
                                          <EditIcon style={{ color: '#9c27b0' }} onClick={(e)=>EditTeamUnit(e,row)}/>
                                        </IconButton> */}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                  </TableBody>
                </Table>

              </TableContainer>
            </div>
          </>
        </div>
      )}
    </div>
  );
}
