import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Server from "../../APIUrl";
import { Link, useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import moment from "moment";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Stack from "@mui/material/Stack";
import Loader from "../../Loader";
import { ExportToJson } from "../../ExportFunc";
import { SaveAlt } from "@mui/icons-material";

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0D4990",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function AdminAuditReport() {
  const history = useHistory();
  const { operatorId } = useParams();
  const accountId = sessionStorage.getItem("accountId");
  const authtoken = sessionStorage.getItem("jwtToken");
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  console.log({ operatorId });

  const [auditReport, setAuditReport] = useState([]);
  const [startDate, setStartDate] = useState(() => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().replaceAll("T", " ").replaceAll("Z", "");
  });
  const [endDate, setEndDate] = useState(() => {
    let date = new Date();
    return date.toISOString().replaceAll("T", " ").replaceAll("Z", "");
  });
  var number = 1;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function usersListReport() {
      await Server.get(
        `/audits/getAuditByOperatorIdByDate?accountId=${accountId}&operatorId=${operatorId}&startDate=${startDate}&endDate=${endDate}&requestTime=${requestTime}`,
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
          setAuditReport(response?.data?.resultData);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return usersListReport();
  }, [startDate, endDate]);

  console.log({ auditReport });
  console.log({ startDate, endDate });

  const columns = [
    {
      field: "ipaddress",
      headerName: "IP Address",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Catergory",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "itemtype",
      headerName: "Type",
      width: 90,
      sortable: true,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: true,
      width: 160,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "result",
      headerName: "Result",
      width: 90,
      sortable: true,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "auditedon",
      headerName: "Audit Date",
      width: 90,
      headerClassName: "bg-color",
      sortable: true,
      flex: 1,
      renderCell: (params) => moment(params.value).format("lll"),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{ margin: "0.5rem 0" }}>
        <Stack spacing={1} direction="row">
          <Button
            style={{ textTransform: "capitalize", width: "150px" }}
            color="primary"
            variant="contained"
            size="small"
            startIcon={<SaveAlt />}
            onClick={(e) => ExportToJson(e, auditReport, "Users")}
          >
            Export to JSON
          </Button>
          {/* <Button style={{textTransform:"capitalize", height:"1.8rem"}} color="primary" variant="contained" size="small" onClick={(e)=>ExportToCsv(e,"Users", filterUsers,  )}>Export to CSV</Button> */}
          <GridToolbarExport variant="contained" />
        </Stack>
      </GridToolbarContainer>
    );
  }

  return (
    <div
    style={{ paddingTop: "90px", marginLeft: "20px" }}
    >

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              onClick={useCallback(() =>
                history.push("/AxiomProtect/DashBoard")
              )}
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              onClick={useCallback(() => history.push("/AxiomProtect/Administrator"))}
              label="Administrator"
              deleteIcon={<ExpandMoreIcon />}
            />
            <StyledBreadcrumb
              label="Administrator Audit Reports"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              minWidth: "30%",
            }}
          >
            <h4>Administration Audit Reports</h4>
          </div>
            <form>
              {" "}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3} direction="row" size="small">
                  <DateTimePicker
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(
                        newValue
                          .toISOString()
                          .replaceAll("T", " ")
                          .replaceAll("Z", "")
                      );
                    }}
                  />
                  <DateTimePicker
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(
                        newValue
                          .toISOString()
                          .replaceAll("T", " ")
                          .replaceAll("Z", "")
                      );
                    }}
                    minDate={new Date("2021-02-14")}
                    minTime={new Date(0, 0, 0, 8)}
                    maxTime={new Date(0, 0, 0, 18, 45)}
                  />
                  {/* <Button 
        size="small"
        style={{color:"#fff", backgroundColor:"#0D4990", textTransform:"capitalize", padding:"0.1rem 1rem"}}
        >Submit</Button> */}
                </Stack>
              </LocalizationProvider>
            </form>
          </Typography>
        </Grid>
      </Grid>

      <div
        style={{
          display: "grid",
          width: "calc(99vw - 260px)",
          placeItems: "center",
          margin: "0 auto",
          
        }}
      >
        <Box
          sx={{
            height: 600,
            width: 1,
            "& .bg-color": {
              backgroundColor: "#0D4990",
              color: "#ffffff",
            },
          }}
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                
              }}
            >
              <Loader />
            </div>
          ) : (
            <DataGrid
            height={550}
            style={{
              width: "100%",
              margin: "0 auto",
              backgroundColor: "white",
              border: "none",
             
            }}
              rows={auditReport ?? []}
              columns={columns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              getRowId={(row) => row?.id} 
              autoHeight={true}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          )}
        </Box>
      </div>
    </div>
  );
}
