import React, { useState, useCallback, useEffect } from "react";
import Server from "../APIUrl";
import { Link, useHistory, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
//import Autocomplete from '@mui/material/Autocomplete';
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
import cellLoader from "../Loader2";
import Loader from "../Loader";
import { LoadingButton } from "@mui/lab";
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

export default function Users() {
  const location = useLocation();
  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push("/AxiomProtect/Users/AddUser"),
    [history]
  );
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [searchText, setSearchText] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const [cellLoading, setCellLoading] = useState(false);
  // const [formData, setFormData] = React.useState({
  //     value: "",
  //     value2: "",
  // })
  const [loading, setLoading] = useState(false);
  const [openM, setOpenM] = React.useState(false);
  const handleClickOpen = () => setOpenM(true);
  const handleClickClose = () => setOpenM(false);

  const [value, setValue] = React.useState([null, null]);

  // const [startDate,setStartDate] = React.useState(null);
  // const [endDate,setEndDate] = React.useState(null)

  // const handleStartDate = (date) => {
  //     setStartDate(date);
  //     //setEndDate(null);
  // };

  // const handleEndDate = (date) => {
  //     setEndDate(date);
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const [saveuserDetailsForm, setsaveuserDetailsForm] = React.useState({
    // email: location.state.row.email,
    // phone: location.state.row.phone,
    // username: location.state.row.username,
    // userid: location.state.row.userid,
    // accountid: location.state.row.accountid
  });

  const [bodyData, setBodyData] = useState({})

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

  const handleStatusChange = (e, row) => {
    e.preventDefault();
    let index = rows.findIndex((x) => x.userid === row.userid);
    //let status = e.target.value

    console.log(row);

    console.log("selcted value", e.target.value, "seleted row", row, rows);

    Server.get(
      `/user/setStatus?accountId=${row.accountid}&userId=${row.userid}&status=${e.target.value}&requestTime=${requestTime}`,
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
        if (response.data.resultCode === 0) {
          Swal.fire("Sucess", response.data.resultMessage, "success");
        } else {
          Swal.fire("Error", response.data.resultMessage, "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //window.location.reload();
  };

  const deletespecificRow = (e, row) => {
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
          `/user/delete?accountId=${accountId}&userId=${row.userid}&requestTime=${requestTime}`,
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
            if (response.data.resultCode === 0) {
              setSearchResult([]);
              Swal.fire("Deleted!", response.data.resultMessage, "success");
            } else {
              Swal.fire("Error!", response.data.resultMessage, "error");
            }
          })
          .catch((err) => {
            console.log(err);
            setRows([]);
          });
      }
    });
  };

  const EditGroup = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row);

    history.push({
      pathname: "/AxiomProtect/UserDetails",
      state: {
        row: {...row,  ...bodyData},

      },
    });
  };

  const handleGetAppId = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row);

    history.push({
      pathname: "/AxiomProtect/UserDetails",
      state: {
        row: row,
      },
    });
  };

  const [rowssPerPage, setRowssPerPage] = React.useState(5);
  const [rowss, setRowss] = React.useState([]);

  const [usersCountData, setUsersCountData] = useState([]);
  const [usersCountLabels, setUsersCountLabels] = useState([]);
  useEffect(() => {
    async function fetchAdminData() {
      setLoading(true);
      await Server.get(
        `/reports/getUsersCountByStatus?accountId=${accountId}&requestTime=${requestTime}&duration=0`,
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
          console.log("Users",response.data?.resultData)
          if(response?.data?.resultData !== null && response?.data?.resultData !== undefined){
          setUsersCountData(response?.data?.resultData?.datasets[0]?.data);
          setUsersCountLabels(response?.data?.resultData?.labels);
          }else{
            setUsersCountData([0,0,0,0,0])
            setUsersCountLabels(["All Users",
              "Enroll Users",
              "Suspended Users",
              "Active Users",
              "Locked Users"])
          }
         setLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    return fetchAdminData();
  }, []);

  const [usersCountResult , setUsersCountResult] = useState({});

  useEffect(() => {
    if (usersCountData.length === usersCountLabels.length && usersCountData.length > 0) {
      setUsersCountResult(
        Object.assign.apply(
          {},
          usersCountLabels.map((v, i) => ({ [v]: usersCountData[i] }))
        )
      );
    }
  }, [usersCountData, usersCountLabels]);


  const handleGetAudit = (e, row) => {
    e.preventDefault();
    let index = rows.findIndex((x) => x.unitid === row.unitid);
    console.log("seleted audit", row);
    // console.log(formData)
    console.log(value[0]);
    console.log(value[1]);
    var startDate = value[0]
      .toISOString()
      .replaceAll("T", " ")
      .replaceAll("Z", "");
    var endDate = value[1]
      .toISOString()
      .replaceAll("T", " ")
      .replaceAll("Z", "");
    console.log(startDate);
    console.log(endDate);

    Server.get(
      `/audits/getAuditByUserIdByDate?accountId=${accountId}&userId=${row.userid}&requestTime=${requestTime}&startDate=${startDate}&endDate=${endDate} `,
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
        console.log(response.data.resultData);
        //setRows(rows.filter((item)=>item.userid != row.userid))
        if (response.data.resultCode == 0) {
          if (e.target.value == "suspended") {
            setRowss((rows) => [
              ...rowss.slice(0, index),
              Object.assign({}, rows[index], { row, status: 1 }),
              ...rowss.slice(index + 1),
            ]);
          } else
            setRowss((rowss) => [
              ...rowss.slice(0, index),
              Object.assign({}, rows[index], { row, status: 0 }),
              ...rowss.slice(index + 1),
            ]);
        }
        history.push({
          pathname: "/AxiomProtect/Audit",
          state: {
            data: response.data.resultData,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        setRows([]);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("clicked");
    //for number
    if (validation.isNumber(searchText)) {
      apiCall({ searchFor: searchText, type: 2 });
    } //for email ID
    else if (validation.isEmailAddress(searchText)) {
      apiCall({ searchFor: searchText, type: 1 });
    } // for name
    else if (validation.isName(searchText)){
      apiCall({ searchFor: searchText, type: 4 });
    }
    setSearchText([]);
  };

const [loadingSearch, setLoadingSearch] = useState(false)
  const apiCall = (body) => {
    setLoadingSearch(true);
    setBodyData(body)
    setSearchResult([]);
    Server.get(
      `/user/getUserByType?accountId=${accountId}&requestTime=${requestTime}&type=${body.type}&searchFor=${body.searchFor}`,
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
        setLoadingSearch(false);
        if (response.data.resultCode == 0) {
          setSearchResult([response.data.resultData]);
        } else {
          setSearchResult([]);

          Swal.fire({
            text: response.data.resultMessage,
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
        setLoadingSearch(false);
      });
  };

  const handleSetRandompasswordSubmit = (e, row) => {
    e.preventDefault();
    console.log(saveuserDetailsForm);
    setCellLoading(true);
    Server.get(
      `/user/sendRandomPassword?accountId=${accountId}&userId=${row.userid}&requestTime=${requestTime}`,
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

        setCellLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setsaveuserDetailsForm({
          email: "",
          phone: "",
          username: "",
        });
        Swal.fire({
          title: "Error",
          text: err,
          icon: "error",
        });
        setCellLoading(false);
      });
  };
  return (
    <div style={{ paddingTop: "90px", paddingLeft: "20px" }}>
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
            <StyledBreadcrumb label="User" deleteIcon={<ExpandMoreIcon />} />
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} md={6}>
          <div sx={{ paddingLeft: "10px", paddingTop: "0px" }}>
            <Button
              variant="contained"
              sx={{ fontFamily: "Jost", float: "right" }}
              onClick={handleOnClick}
            >
              + Add Users
            </Button>
          </div>
        </Grid>
      </Grid>
      <br/>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >
            <h4>Users</h4>
          </Typography>
        </Grid>
      </Grid>

      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={15} >
          {usersCountResult &&
            Object.keys(usersCountResult).map((key, index) => {
              return (
                <Grid item key={index}>
                  <Typography
                    sx={{
                      fontFamily: "Jost",
                      fontSize: "15px",
                      color: "#000000",
                    }}
                  >
                    <h4>{usersCountResult[key]}</h4>
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
          width:'800px',
        }}
      >
        <TextField
          type="text"
          size="small"
          required
          style={{ width: "100%" }}
          name="search"
          InputProps={{
            min:1
          }}
          id="outlined-basic"
          label="Search user using name / phone or email"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.trimStart())}
        />

        <LoadingButton
        loading={loadingSearch}
        type="submit"
          sx={{ ml: 5 }}
          color="primary"
          variant="contained"
        >
          Search
        </LoadingButton>
      </form>

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
              {/* <div>
                                                <li> {user.email}</li>
                                                <li> {user.username}</li>
                                            </div>
                                            <div style={{ display: "grid", width: 250, }}>
                                                <span style={{ margin: 0, padding: "8px 0px 0px 710px", fontSize: "1rem" }}>
                                                    <Button variant="contained" onClick={(e) => handleUserAssign(e, user)}>Assign</Button>
                                                </span>
                                            </div> */}

              {loadingSearch ? (
                <Loader />
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 900 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        {/* <StyledTableCell align="center">UserID</StyledTableCell> */}
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">
                          Email ID
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Phone No
                        </StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">
                          Password
                        </StyledTableCell>
                        <StyledTableCell align="center">Audit</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                        <StyledTableCell align="center">
                          Created On
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {searchResult
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                          <StyledTableRow key={index}>
                            {/* <StyledTableCell align="center">{row.userid}</StyledTableCell> */}
                            <StyledTableCell align="center">
                              <Button
                                onClick={(e) => handleGetAppId(e, row)}
                                type="text"
                              >
                                {row.username}
                              </Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.email}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.phone}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // label="Status"
                                defaultValue={row?.status ?? ""}
                                //value={row.status ==  "active" ? 1 : row.status == "suspended" ? 0  : row.status == "enrolled" ? 3  : row.status == "locked" ? -1 : row.status == "trash" ?  -99 : ""}
                                onChange={(e) => handleStatusChange(e, row)}
                                style={{ width: 100, height: 40 }}
                              >
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={0}>Suspended</MenuItem>
                                <MenuItem value={3}>Enrolled</MenuItem>
                                <MenuItem value={-1}>Locked</MenuItem>
                                <MenuItem value={-99}>Trash</MenuItem>
                              </Select>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {cellLoading && row ? (
                                "Loading..."
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={(e) =>
                                    handleSetRandompasswordSubmit(e, row)
                                  }
                                >
                                  Set Password
                                </Button>
                              )}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Chip
                                label="Audit"
                                color="success"
                                variant="outlined"
                                onClick={handleClickOpen}
                              />
                              <Modal
                                open={openM}
                                onClose={handleClickClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style}>
                                  <Typography
                                    sx={{
                                      fontFamily: "Jost",
                                      color: "#232E3C",
                                    }}
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                  >
                                    Enter Duration
                                  </Typography>
                                  <br />
                                  <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                  >
                                    <DateRangePicker
                                      calendars={1}
                                      value={value}
                                      onChange={(newValue) => {
                                        setValue(newValue);
                                      }}
                                      renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                          <TextField size="small" {...startProps} />
                                          <Box sx={{ mx: 2 }}> to </Box>
                                          <TextField size="small" {...endProps} />
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
                                  <Button
                                    type="submit"
                                    size="small"
                                    variant="contained"
                                    sx={{ fontFamily: "Jost", float: "right" }}
                                    onClick={(e) => handleGetAudit(e, row)}
                                  >
                                    Show Audit
                                  </Button>
                                </Box>
                              </Modal>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <IconButton
                                aria-label="delete"
                                onClick={(e) => deletespecificRow(e, row)}
                              >
                                <DeleteIcon style={{ color: "#D2042D" }} />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={(e) => EditGroup(e, row)}
                                style={{ marginLeft: 10 }}
                              >
                                <EditIcon
                                  style={{ color: "#9c27b0" }}
                                />
                              </IconButton>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {moment(row.createdon).format(
                                "D-M-YYYY, h:mm:ss"
                              )}
                            </StyledTableCell>
                            {/* <StyledTableCell align="center">{row.discription}</StyledTableCell>
                                                            <StyledTableCell align="center">
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">{row.createdOn}</StyledTableCell> */}
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
      {/* <Grid container>
                        <Grid item >
                            <Autocomplete
                                style={{width: 250}}
                                disablePortal
                                id="combo-box-demo"
                                size="small"
                                // options={dropdowntypes}
                                renderInput={(params) => <TextField {...params} label={<Typography sx={{fontFamily: 'Jost'}}>Select All</Typography>}/>}
                            />
                        </Grid>
                        <Grid item >
                            <Autocomplete
                                style={{width: 150}}
                                disablePortal
                                id="combo-box-demo"
                                size="small"
                                // options={dropdowntypes}
                                renderInput={(params) => <TextField {...params} label={<Typography sx={{fontFamily: 'Jost'}}>.....</Typography>}/>}
                            />
                        </Grid>
                    </Grid>
                    <br /> */}
      {/* <Grid container>
                        <Grid item>
                            <h4 sx={{fontFamily: 'Jost'}}>Show</h4>
                            <TextField size="small" type="text" name="name" id="email" label="10" variant="outlined" />
                        </Grid>
                        <Grid item sx={{marginLeft: '72rem'}}>
                            <h4 sx={{fontFamily: 'Jost'}}>Search</h4>
                            <TextField size="small" type="text" name="name" id="email" variant="outlined" />
                        </Grid>
                    </Grid>
                    <br /> */}
      {/* <br />
                    <Grid container>
                        <Grid item>
                            <div style={{ height: 400, width: '100rem' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <br /> */}
      <br />
      <br />
      {/* </Container> */}
    </div>
  );
}
