import React, { useCallback, useState, useEffect } from "react";
import Server from "../APIUrl";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
   
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Loader from "../Loader";
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

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

 

export default function CustomizedTables() {
  const location = useLocation();
  const history = useHistory();
  const requestTimess = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const requestTime = escape(requestTimess);
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const [loading, setLoading] = useState(false);
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      Server.get(
        `/application/getAssignedUsers?accountId=${accountId}&applicationId=${location.state.row.appid}&requestTime=${requestTime}`,
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
          setLoading(false);
          console.log(response.data);
          if (response.data.resultCode === 0) {
            setRows(response.data.resultData);
          } else {
            Swal.fire({
              icon: "warning",
              text: response.data.resultMessage,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setRows([]);
          setLoading(false);
        });
    };
    return fetchData();
  }, []);

  const handleUnAssignUser = (e, row) => {
    e.preventDefault();
    console.log("Details of User", row);
    console.log(authtoken);
    Server.get(
      `/user/unassign?accountId=${row.accountid}&userId=${row.userid}&appId=${location.state.row.appid}&requestTime=${requestTime}`,
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
          Swal.fire({
            title: "User has Successfully UnAssigned",
            text: "",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          }).then(() => {
            setRows((prevRows) =>
              prevRows.filter((item) => item.userid != row.userid)
            );
          });
        } else {
          Swal.fire({
            title: "Warning",
            text: response.data.resultMessage,
            icon: "warning",
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
  // search functionality
  const [filterList, setFilterList] = useState(rows);
  useEffect(() => {
    setFilterList(rows);
  }, [rows]);
  const handleSearchOnChange = (e) => {
    let data;
    if (e.target.value.length > 0) {
      data =
        filterList &&
        filterList.filter((user) => {
          return (
            user?.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
            user?.phone.toLowerCase().includes(e.target.value.toLowerCase()) ||
            user?.username.toLowerCase().includes(e.target.value.toLowerCase())
          );
        });
    } else {
      data = rows;
    }
    return setFilterList(data);
  };

  return (
    <>
      {/* <br /><br /><br /><br /> */}
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
                label="Assigned Users"
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
              <h4>Assigned Users</h4>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginLeft: 0,
              }}
            >
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
                    fontSize: 25,
                    color: "#707070",
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
          </Grid>
          <Grid item xs={12} md={6}>
            <div
              style={{
                justifyContent: "flex-end",
                display: "flex",
                width: "100%",
                float: "right",
                marginTop: "30px",
              }}
            >
              <input
                onChange={handleSearchOnChange }
                type="text"
                placeholder="Search with email, name and phone no..."
                style={{
                  width:"17rem",
                  borderRadius: "8px 8px",
                  border: "1px solid",
                  outline: "none",
                  padding: 12,
                }}
              />
            </div>
          </Grid>
        </Grid>
        <br />
        <div
          style={{
            display: "grid",
            width: "calc(100vw - 260px)",
            placeItems: "center",
            marginLeft: 0,
          }}
        >
          {/* <div style={{ justifyContent: "flex-end", display: "flex", width: "100%", float: 'right', marginBottom: 8 }}><input onChange={(e) => setRows(rows.filter((row) => row.appid == e.target.value))} type="text" placeholder="Search .." style={{ borderRadius: "8px 8px", border: "1px solid", outline: "none", padding: 12 }} /></div> */}

          {loading ? (
            <Loader />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Mobile No</StyledTableCell>
                    <StyledTableCell align="center">Email Id</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterList && filterList
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          {row.username}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.phone}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button
                            variant="contained"
                            onClick={(e) => handleUnAssignUser(e, row)}
                          >
                            UnAssign
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
          )}
        </div>
      </div>
    </>
  );
}
