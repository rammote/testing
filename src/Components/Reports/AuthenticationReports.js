import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
   
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { emphasize } from "@mui/material/styles";
import AppwiseAuthReport from "./AuthReportCharts/AppwiseAuthReport";
import DatewiseAuthReport from "./AuthReportCharts/DatewiseAuthReport";
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

export default function Reports() {
  const history = useHistory();
  const accountId = sessionStorage.getItem("accountId");
  const authtoken = sessionStorage.getItem("jwtToken");
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const [filter, setfilter] = React.useState("");
  // const [appName, setAppName] = useState("Test App")
  const handleChange = (event) => {
    setfilter(event.target.value);
  };
  const result3Data = {
    appId1: {
      appName: "Metaverse",
      authMethod: [
        ["Authenitcation Type", "AppName"],
        ["OTP Token", 11],
        ["Softare Token", 2],
        ["Hardware Token", 2],
        ["Pushs Token", 2],
      ],
      authAccess: [
        ["Authenitcation Type", "AppName"],
        ["Access Grant", 50],
        ["Access Denied", 233],
      ],
    },
    appId2: {
      appName: "Omniverse",
      authMethod: [
        ["Authenitcation Type", "AppName"],
        ["OTP Token", 1000],
        ["Softare Token", 1552],
        ["Hardware Token", 1252],
        ["Pushs Token", 542],
      ],
      authAccess: [
        ["Authenitcation Type", "AppName"],
        ["Access Grant", 15],
        ["Access Denied", 1],
      ],
    },
  };
  
  const [selectApp, setSelectApp] = useState(null);
  // console.log(selectApp);
  const [listOfApps, setListOfApps] = useState();
  const [duration, setDuration] = useState(7);
  useEffect(() => {

    // async function authReport() {
    //   Server.get(
    //     `/application/getAllAppsAuthReport?accountId=${accountId}&duration=${duration}&requestTime=${requestTime}`,
    //     {
    //       headers: {
    //         "content-type": "application/json",
    //         authToken: authtoken,
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Methods": "*",
    //       },
    //     }
    //   )
    //     .then((response) => {
    //       console.log(response.data);
    //       setApplicationsData(response.data.resultData);
    //       console.log({applicationsData})
    //       const appNamesData= applicationsData && applicationsData.map(app=>app.appName);
    //       console.log({appDates})
    //       setAppNames(appNamesData);
    //        setSelectApp(Object.keys(response.data)[0]);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }

  });
  const handleSelectApp = (event) => {
    setSelectApp(event.target.value);
  };
  // console.log(result3Data);
  // console.log({ listOfApps });
  const [authMethodData, setAuthMethodData] = useState(null);
  const [authAccessData, setAuthAccessData] = useState(null);

  useEffect(() => {
    setAuthMethodData(result3Data && result3Data[selectApp]?.authMethod);
    setAuthAccessData(result3Data && result3Data[selectApp]?.authAccess);
  }, [selectApp]);
  // console.log({ authMethodData });

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
              label="Authentication Reports"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>
      <br />
            {/* <h2 style={{textAlign:"center"}}>Authentication Reports</h2> */}
      {/* <Grid container spacing={3}>
        <Grid item xs={10} md={12}> */}
          <AppwiseAuthReport/>
        {/* </Grid>
      </Grid> */}
    
      <div
        style={{
          display: "grid",
          width: "calc(99vw - 260px)",
          placeItems: "center",
          marginRight: "0px",
          margin:'0 auto'
        }}
      >
        <DatewiseAuthReport/>
      </div>
    </div>
  );
}
