import React, { useState, useCallback, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Server from "../APIUrl";
import Loader from '../Loader';
function CustomToolbar() {
  return (
    <GridToolbarContainer style={{margin:"0.5rem 0"}}>
      <GridToolbarExport variant="contained" />
    </GridToolbarContainer>
  );
}
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
},{index:1});

export default function Reports() {
  const accountId = sessionStorage.getItem("accountId");
  const authtoken = sessionStorage.getItem("jwtToken");
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const history = useHistory();
  const [duration, setDuration] = useState(7);
  const [pushReport, setPushReport] = useState([]);
  const [loading, setLoading] = useState(false)
  const handleChangeDuration = (event) => {
    setDuration(event.target.value);
  };

  useEffect(() => {
    setLoading(true)
    async function usersListReport() {
      await Server.get(
        `/reports/getPushReport?accountId=${accountId}&duration=${duration}&requestTime=${requestTime}`,
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
          const descendingSort=response?.data?.resultData.sort((f,s)=>new Date(s?.sendon)-new Date(f?.sendon));
          setPushReport(descendingSort);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    return usersListReport();
  }, [duration]);

  console.log({ duration });
  const columns = [
    {
      field: "appid",
      headerName: "App Id",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "userid",
      headerName: "User Id",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "deviceid",
      headerName: "Device Id",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => 
       
          params.value === -1
            ? <h5
            
            >EXPIRED</h5>
            : params.value === 0
            ? <h5 style={{color:"skyblue"}} >RESPONDED</h5>
            : params.value === 1
            ? <h5 style={{color:"grey"}}>CANCELED</h5>
            : params.value === 2
            ? <h5 style={{color:"lightblack"}} >PENDING</h5>
            : params.value === 3
            ? <h5 style={{color:"green"}} >APPROVED</h5>
            : params.value === 4
            ? <h5 style={{color:"red"}} >DENIED</h5>
            : "UNKNOWN STATUS",
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 90,
      sortable: true,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "sendon",
      headerName: "Send On ",
      sortable: true,
      width: 160,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => moment(params.value).format("lll"),
    },
  ];
  console.log({ pushReport });
  return (
    <div style={{ paddingTop: "90px", marginLeft: "20px",  }}>
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
              label="Push Reports"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>

      <br/>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography
            style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:"center",
              width:"100%",
              margin:"0 auto"
            }}
            sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}
          >
            <h4>Push Reports</h4>
            
            <FormControl sx={{ minWidth: 80 }} size="small">
              <InputLabel>Select Date</InputLabel>
          
              <Select
                
                value={duration}

                label="Select Date"
                onChange={handleChangeDuration}
                MenuProps={{
                  getContentAnchorEl: null,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  }
                }}
              >
                <MenuItem value={7}>Last 7 days</MenuItem>
                <MenuItem value={14}>Last 2 weeks</MenuItem>
                <MenuItem value={30}>Last 1 month</MenuItem>
                <MenuItem value={90}>Last 3 months</MenuItem>
              </Select>
            </FormControl>
          
          </Typography>
        </Grid>
      </Grid>

      <div
        style={{
          display: "grid",
          width: "calc(99vw - 260px)",
          placeItems: "center",
          marginRight: "0px",
        }}
      >
        <Box
          sx={{
            // height: 500,
            width: 1,
            "& .bg-color": {
              backgroundColor: "#0D4990",
              color: "#ffffff",
            },
          }}
        >
         {
           loading ? <Loader /> :
           <DataGrid
           style={{
             width: "100%",
             margin: "0 auto",
             backgroundColor: "white",
             border: "none",
           }}
           rows={pushReport ?? []}
           columns={columns}
           pageSize={7}
          //  rowsPerPageOptions={[7, 14, 30, 90]}
           getRowId={(row) => row?.pushid}
           autoHeight={true}
           components={{
            Toolbar: CustomToolbar,
          }}
         />
         }
        </Box>
      </div>
    </div>
  );
}
