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

  console.log({ duration });
  const columns = [
    
    {
      field: "userid",
      headerName: "Sr.No",
      sortable: true,
      width: 100,
      headerClassName: "bg-color",
      flex: 4,
    },
    {
      field: "deviceid",
      headerName: "User Id",
      sortable: true,
      width: 100,
      headerClassName: "bg-color",
      flex: 4,
    },
    {
      field: "status",
      headerName: "Location",
      sortable: true,
      width: 100,
      headerClassName: "bg-color",
      flex: 4,
    },
    
    
    {
        field: "userDetails",
        headerName: "Amount",
        sortable: true,
        width: 100,
        headerClassName: "bg-color",
        flex: 4,
        
      },
      {
        field: "transactionDetails",
        headerName: "Risk Score",
        sortable: true,
        width: 100,
        headerClassName: "bg-color",
        flex: 4,
        
      },
      {
        field: "merchantDetails",
        headerName: "Dated",
        sortable: true,
        width: 100,
        headerClassName: "bg-color",
        flex: 4,
        
      },
  ];
  console.log({ pushReport });
  return (
    <div style={{ paddingTop: "6rem", margin: "0 0.5rem",  }}>
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
              label="Transaction Monitor Report"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>

          <Typography
          style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            width:"98%",
            margin:"0 auto"
          }}
          >
            <h4>Transaction Monitor Report</h4>
            <div >
          <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
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
          </div>
          </Typography>
      <br />
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
            height: 500,
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
      <br/>
      <br/>
    </div>
  );
}
