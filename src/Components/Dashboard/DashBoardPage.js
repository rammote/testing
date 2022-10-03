import React, { useState, useCallback, useEffect } from "react";
import Server from "../APIUrl";
import { Link, useHistory } from "react-router-dom";
import { Button, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import './DashBoardPage.css';
import Chart from "react-google-charts";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";
import { Form } from "react-bootstrap";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import Loader from "../Loader";
import DateWiseAuthReport from "./AuthReport";
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

function createData(name, view) {
  return { name, view };
}

export default function DashBoardPage() {
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [usersData, setUsersData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [duration, setDuration] = useState(0);
  const history = useHistory();
  const [resultData, setResultData] = useState({});
  const [adminData, setAdminData] = useState([]);
  const [adminLabels, setAdminLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setUsersLoading(true);
      await Server.get(
        `/reports/getUsersCountByStatus?accountId=${accountId}&requestTime=${requestTime}&duration=${duration}`,
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
          if (
            response?.data?.resultData !== null &&
            response?.data?.resultData !== undefined
          ) {
            console.log("DATA: ", response?.data?.resultData);
            setUsersData(response?.data?.resultData?.datasets[0]?.data);
            setLabels(response?.data?.resultData?.labels);
          } else {
            setUsersData([0, 0, 0, 0, 0]);
            setLabels([
              "All Users",
              "Enroll Users",
              "Suspended Users",
              "Active Users",
              "Locked Users",
            ]);
          }
          setUsersLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setUsersLoading(false);
        });
    }
    return fetchData();
  }, []);

  useEffect(() => {
    async function fetchAdminData() {
      setLoading(true);
      await Server.get(
        `/reports/getOperatorsCountByStatus?accountId=${accountId}&requestTime=${requestTime}&duration=${duration}`,
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
          if (
            response?.data?.resultData !== null &&
            response?.data?.resultData !== undefined
          ) {
            setAdminData(response?.data?.resultData?.datasets[0]?.data);
            setAdminLabels(response?.data?.resultData?.labels);
          } else {
            setAdminData([0, 0, 0, 0, 0]);
            setAdminLabels([
              "All Operators",
              "Enroll Operators",
              "Suspended Operators",
              "Active Operators",
              "Locked Operators",
            ]);
          }
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
    if (usersData.length === labels.length && usersData.length > 0) {
      setResultData(
        Object.assign.apply(
          {},
          labels.map((v, i) => ({ [v]: usersData[i] }))
        )
      );
    }
  }, [usersData, labels]);

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

  function MyNavLink(props) {
    return <NavLink {...props} activeClassName="active" />;
  }
  return (
    <div>
      <div style={{ padding: "90px 20px 0 20px" }}>
        {/* <br /><br /><br /> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                component="a"
                //href="/DashBoard"
                //onClick={useCallback(() => history.push('/DashBoard'))}
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ paddingTop: "15px" }}>
          <Grid item xs={12} md={12} mb={4}>
            <Typography
              sx={{
                fontFamily: "Jost",
                fontSize: "1.6rem",
                color: "#0D4990",
                fontWeight: "800",
              }}
              align="center"
            >
              Welcome to your trial of Axiom Protect
            </Typography>
          </Grid>
          {/* <Grid item  xs={12} md={4} >
                                <Chip sx={{fontFamily: 'Jost', backgroundColor: '#656D77', color: '#FFFFFF'}} label="25 days left" />
                            </Grid> */}
        </Grid>

        <hr color="#F0EFEF" />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography
              sx={{ fontFamily: "Jost", fontSize: "18px", color: "#000000" }}
            >
              <h3
                style={{
                  margin: "0.2rem auto",
                  textAlign: "center",
                }}
              >
                Users Details
              </h3>
            </Typography>
            <TableContainer component={Paper} sx={{ overflowX: "hidden" }}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableBody>
                  {usersLoading ? (
                    <Loader />
                  ) : (
                    <>
                      {resultData &&
                        Object.keys(resultData).map((key, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                align="left"
                              >
                                {key}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {resultData[key]}
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                align="right"
                              >
                                <Button
                                  onClick={() =>
                                    history.push({
                                      pathname: "/AxiomProtect/UserManagement",
                                      state: { key },
                                    })
                                  }
                                  //onClick={}
                                  color="primary"
                                  size="small"
                                  variant="contained"
                                >
                                  View
                                </Button>
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography
              sx={{ fontFamily: "Jost", fontSize: "18px", color: "#000000" }}
            >
              <h3
                style={{
                  margin: "0.2rem auto",
                  textAlign: "center",
                }}
              >
                {" "}
                Administrators Details
              </h3>
            </Typography>
            <TableContainer component={Paper} sx={{ overflowX: "hidden" }}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableBody>
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      {adminResult &&
                        Object.keys(adminResult).map((key, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                align="left"
                              >
                                {key}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {adminResult[key]}
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                align="right"
                              >
                            {key === "All Operators"  &&  <Button
                                  onClick={() => history.push({pathname: '/AxiomProtect/OperatorTable',state: {key}})} 
                                  color="primary"
                                  size="small"
                                  variant="contained"
                                >
                                  View
                                </Button>}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* <Grid  item xs={12} sm={12} md={4} lg={4}>
                            <Typography sx={{fontFamily: 'Jost', fontSize: '18px', color: '#000000'}}>
                               ABC
                            </Typography>
                            <TableContainer component={Paper} sx={{overflowX: 'hidden'}}>
                                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row" sx={{color: '#5C5C5C', fontFamily: 'Jost', fontSize: '15px'}}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right" sx={{color: '#206BC4'}}>{row.view}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid> */}
        </Grid>
        <br />
        {/* <Grid container spacing={3}>
                <Grid item xs={12} md={12}> */}
        <DateWiseAuthReport />
        {/* </Grid>
                </Grid> */}
      </div>
      <div
        style={{
          display: "grid",
          width: "calc(100vw - 260px)",
          placeItems: "center",
        }}
      ></div>
    </div>
  );
}
