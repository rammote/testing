import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import Server from "../APIUrl";
   
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { emphasize } from "@mui/material/styles";
import moment from "moment";
import { Pie } from "react-chartjs-2";
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
              label="Administrator Reports"
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
            <h4>Administrator Reports</h4>
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
                  <StyledTableCell>Operator ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Email Id</StyledTableCell>
                  <StyledTableCell align="center">Phone</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Attempts</StyledTableCell>
                  <StyledTableCell align="center">Role Id</StyledTableCell>
                  <StyledTableCell align="center">Created on</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <Link
                          href={`/AxiomProtect/AdminAudit/${row.operatorid}`}
                        >
                          {row.operatorid}
                        </Link>
                      </StyledTableCell>
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
                        {row.status == 1
                          ? "Active"
                          : row.status == 0
                          ? "Suspended"
                          : row.status == 3
                          ? "Enrolled"
                          : row.status == -1
                          ? "Locked"
                          : row.status == -99
                          ? "Trash"
                          : ""}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.currentAttempts}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.roleid == "1"
                          ? "Owner"
                          : row.roleid == "2"
                          ? "Admin"
                          : row.roleid == "3"
                          ? "User Manager"
                          : row.roleid == "4"
                          ? "Help Desk"
                          : row.roleid == "5"
                          ? "Billing"
                          : row.roleid == "6"
                          ? "Read-only"
                          : " "}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {moment(row.createdon).format("D-M-YYYY, h:mm:ss")}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
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
