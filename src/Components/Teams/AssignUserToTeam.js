import React, { useCallback, useState } from "react";
import Server from "../APIUrl";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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

function AssignUser() {
  const location = useLocation();
  const history = useHistory();
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [searchText, setSearchText] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleStatusChange = (e, row) => {
    e.preventDefault();
    console.log("selcted value", e.target.value, "seleted row", row);
  };

  const handleUserAssign = async (e, user) => {
    e.preventDefault();
    console.log("Details of User", user);
    console.log(location.state.row.appid);
    console.log(sessionStorage.getItem("token"));
    await Server.get(
      `/unit/assignToUnit?accountId=${user.accountid}&unitId=${location.state.row.unitid}&operatorId=${user.operatorid}&requestTime=${requestTime}`,
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
        if (response.data.resultCode == 0) {
          Swal.fire({
            title: "Operator has successfully Assigned",
            text: "",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.resultMessage,
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Operator has Already Assigned",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
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
    isName: function (str) {
      var pattern = /^[\w\-\s]+$/;
      return pattern.test(str);
    },
    isSame: function (str1, str2) {
      return str1 === str2;
    },

  };
  const [loading, setLoading] = useState(false)
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("clicked");
    setLoading(true)
    //for number
    if (validation.isNumber(searchText)) {
      apiCall({ searchFor: searchText?.trim(), type: 2 });
    } //for email ID
    else if (validation.isEmailAddress(searchText)) {
      apiCall({ searchFor: searchText?.trim(), type: 1 });
    }
    else if (validation.isName(searchText)) {
      apiCall({ searchFor: searchText?.trim(), type: 4 });
    }
    else {
      apiCall({ searchFor: searchText?.trim(), type: 3 });
    }
  };

  const apiCall = async (body) => {
    await Server.get(
      `/operator/getBy?requestTime=${requestTime}&accountId=${accountId}&type=${body.type}&searchFor=${body.searchFor}`,
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
        setLoading(false)
        if (response.data.resultCode == 0) {
          setSearchResult((searchResult) => [response.data.resultData]);
        } else {
          Swal.fire({
            title: "Operator not present",
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
        setLoading(false)
      });
  };

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
                onClick={useCallback(() => history.push("/AxiomProtect/Teams"))}
                label="Teams"
                deleteIcon={<ExpandMoreIcon />}
              />
              <StyledBreadcrumb
                label="Assign Operator"
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
              <h4>Assign Operator To Team Unit</h4>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* <p style={{ color: '#5C5C5C',fontSize: "1.5rem",padding: "8px 0px 0px 16px" }}>Assign Operator To Team Unit</p> */}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ display: "grid", width: 580 }}>
                {/* <span style={{ margin: 0, padding: "0px 0px 0px 0px",color: "#707070", fontSize: "1.2rem" }}>Unit ID : {location.state.row.unitid}{location.state.row.appid}</span> */}
                <span
                  style={{
                    margin: 0,
                    padding: "8px 0px 0px 0px",
                    color: "#707070",
                    fontSize: "1.2rem",
                    position: "relative",
                    top: 5,
                  }}
                >
                  Team Unit name : {location.state.row.name}
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
        {/**/}
        <br />
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
            required
            style={{ width: "700px" }}
            name="search"
            id="outlined-basic"
            label="Search  team user using email, phone no and name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.trimStart())}
          />

          <LoadingButton
            loading={loading}
            type="submit"
            sx={{ ml: 5 }}
            color="primary"
            variant="contained"
          >
            Search
          </LoadingButton>
        </form>

        {searchResult.length > 0 && (
          <div >
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "fit-content",
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 960 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">Email ID</StyledTableCell>
                      <StyledTableCell align="center">Phone No</StyledTableCell>
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
                          {/* <StyledTableCell align="center">{row.unitid}</StyledTableCell> */}
                          <StyledTableCell align="center">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.emailid}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.phone}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              variant="contained"
                              onClick={(e) => handleUserAssign(e, row)}
                            >
                              Assign
                            </Button>
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
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AssignUser;
