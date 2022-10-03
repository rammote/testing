import React, { useState, useCallback } from "react";
import Server from "../APIUrl";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";   
import Swal from "sweetalert2";
import moment from "moment";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Pie } from "react-chartjs-2";
import Link from "@mui/material/Link";
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

 

// interface DatasetType {
//     data: number[];
//     backgroundColor: string[];
// }

function PieChartComponent({
  //labels = ["2010", "2012", "2014", "2016", "2018"],
  labels = [],
  datasets = [
    {
      data: [2000, 4000, 2300, 2222, 3333],
      backgroundColor: ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"],
    },
  ],
}) {
  return (
    <Pie
      options={{
        width: "100",
        height: "100",
      }}
      data={{
        labels: labels,
        datasets: datasets,
      }}
    />
  );
}

export default function Reports() {
  const history = useHistory();
  const requestTimess = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const requestTime = escape(requestTimess);
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const [filter, setfilter] = React.useState("");

  const handleChange = (event) => {
    setfilter(event.target.value);
  };

  const [sonic, setsonic] = React.useState("");

  const handleChangeSonic = (event) => {
    setsonic(event.target.value);
  };

  React.useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setRows([]);
        setLoading(false);
      });
  }, []);

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
              component="a"
              onClick={useCallback(() => history.push("/AxiomProtect/Reports"))}
              label="Reports"
              deleteIcon={<ExpandMoreIcon />}
            />
            <StyledBreadcrumb
              label="Tokenization Reports"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >
            <h4>Tokenization Reports</h4>
          </Typography>
        </Grid>
      </Grid>
      {loading ? ( <Loader />) : (
        <div
          style={{
            display: "grid",
            width: "calc(99vw - 260px)",
            placeItems: "center",
            marginRight: "0px",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                 
                  <StyledTableCell align="center">No</StyledTableCell>
                  <StyledTableCell align="center">Token</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Token Data</StyledTableCell>
                  <StyledTableCell align="center">Used Count</StyledTableCell>
                  <StyledTableCell align="center">Merchant Details</StyledTableCell>
                  <StyledTableCell align="center">Audit</StyledTableCell>
                  <StyledTableCell align="center">Created On</StyledTableCell>
                  <StyledTableCell align="center">Expiry on</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
               
                    <StyledTableRow >
                      <StyledTableCell>
                        1
                      </StyledTableCell>
                      <StyledTableCell align="center">
                       xxxxxx
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Select fullWidth size="small" name="databaseType" id="databaseType">
                                        
                            <MenuItem value={'Certificate Signing'}>Certificate Signing (Integrity)</MenuItem>
                            <MenuItem value={'Shared Secret'}>Shared Secret (Encryption)</MenuItem>
                            <MenuItem value={'Both'}>Both (Integrity & Encryption)</MenuItem>
                            <MenuItem value={'None'}>None</MenuItem>

                        </Select>  
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Chip label="View" size="small" color="primary" variant="outlined"/>  
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        2
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Chip label="View" size="small" color="primary" variant="outlined"/>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Chip label="View" size="small" color="primary" variant="outlined"/>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                       30/06/2020 09:11
                      </StyledTableCell>
                      <StyledTableCell align="center">
                       30/06/2020 09:11
                      </StyledTableCell>
                    </StyledTableRow>
                
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
    </div>
  );
}
