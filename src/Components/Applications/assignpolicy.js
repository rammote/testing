import React, { useCallback } from "react";
import Server from "../APIUrl";
import { useLocation, useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";

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

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Assignpolicy() {
  const history = useHistory();
  const location = useLocation();
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [searchText, setSearchText] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  console.log(requestTime);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleUserAssign = (e, user) => {
    e.preventDefault();
    console.log("Details of User", user);
    console.log(user.policyid);
    console.log(location.state.row.appid);
    console.log(location.state.row.accountid);
    console.log(authtoken);
    Server.get(
      `/application/setPolicy?accountId=${location.state.row.accountid}&applicationId=${location.state.row.appid}&policyId=${user.policyid}&requestTime=${requestTime}`,
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
        if (response.data.resultCode == "-5") {
          Swal.fire({
            title: "Policy has Already Assigned",
            text: "",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        } else {
          Swal.fire({
            title: "Policy has successfully Assigned",
            text: "",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    isSame: function (str1, str2) {
      return str1 === str2;
    },
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
    } else {
      apiCall({ searchFor: searchText, type: 3 });
    }
  };

  const apiCall = (body) => {
    Server.get(
      `/policy/getByName?accountId=${accountId}&requestTime=${requestTime}&policyName=${body.searchFor}`,
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
        if (response.data.resultCode == 0) {
          setSearchResult([response.data.resultData]);
        } else {
          setSearchResult([]);
          Swal.fire({
            title: "Policy not present",
            text: "The data you have entered may not present !!!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log({searchResult})
  return (
    <>
      <div style={{ paddingTop: "90px", paddingLeft: "20px" }}>
        <Grid container spacing={3}>
          <Grid item>
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
                onClick={useCallback(() =>
                  history.push("/AxiomProtect/Applications")
                )}
                label="Applications"
                deleteIcon={<ExpandMoreIcon />}
              />
              <StyledBreadcrumb
                label="Assign Policy"
                deleteIcon={<ExpandMoreIcon />}
              />
            </Breadcrumbs>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
            >
              <h4>Assign Policy</h4>
            </Typography>
          </Grid>
        </Grid>
        {/* <div style={{ paddingLeft: '20px', lineHeight: '25px', width: '1100px' }}> */}
        <div>
          {/* <p style={{ color: '#5C5C5C', fontSize: "1.5rem"}}>Assign Policy</p> */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div>
              <img
                src={location.state.row.applogo}
                alt="App Logo"
                style={{
                  height: 80,
                  width: 80,
                  objectFit: "cover",
                  border: "2px solid #EAEAEA",
                }}
              />
            </div>
            <div style={{ display: "grid", width: 250 }}>
              <span
                style={{
                  margin: 0,
                  padding: "8px 0px 0px 16px",
                  fontSize: "1rem",
                }}
              >
                {location.state.row.appname}
              </span>
              <span
                style={{
                  margin: 0,
                  padding: "0px 0px 4px 18px",
                  color: "green",
                  fontSize: "0.8rem",
                  position: "relative",
                  top: -10,
                }}
              >
                {location.state.row.status == 0 ? "Active" : "Suspended"}
              </span>
            </div>
          </div>

          {/**/}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              margin:"1rem 0"
            }}
          >
            <TextField
              type="text"
              size="small"
              style={{ width: "700px" }}
              name="search"
              id="outlined-basic"
              label="Search and assign policy by name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value.trim())}
            />

            <Button
              onClick={handleSearch}
              sx={{ ml: 5 }}
              color="primary"
              variant="contained"
            >
              Search
            </Button>
          </div>

          {/* </div> */}
        </div>

        {searchResult && (
          <div>
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "fit-content",
                }}
              >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 850 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          Policy ID
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Policy Name
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Created On
                        </StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
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
                            <StyledTableCell align="center">
                              {row.policyid}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.policyname}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {moment(row.createdOn).format(
                                "D-M-YYYY, h:mm:ss"
                              )}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Button
                                variant="contained"
                                onClick={(e) => handleUserAssign(e, row)}
                              >
                                Assign
                              </Button>
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
    </>
  );
}

export default Assignpolicy;
