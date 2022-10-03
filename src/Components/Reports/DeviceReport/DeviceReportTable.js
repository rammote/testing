import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import moment from "moment";
import { DataGrid , GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Server from "../../APIUrl";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Loader from '../../Loader'

export default function DeviceReportTable({ duration }) {
  const accountId = sessionStorage.getItem("accountId");
  const authtoken = sessionStorage.getItem("jwtToken");
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const [deviceReportData, setDeviceReportData] = useState([]);
  const [type, setType] = useState(1);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function deviceReportDataFun() {
      setLoading(true);
      await Server.get(
        `/reports/getAllDevicesByType?accountId=${accountId}&duration=${duration}&requestTime=${requestTime}&type=${type}`,
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
          setDeviceReportData(response?.data?.resultData);
          console.log({ deviceReportData });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    return deviceReportDataFun();
  }, [duration, type]);
  console.log({ deviceReportData });
  const columns = [
    {
      field: "appid",
      headerName: "App Id",
      sortable: true,
      maxWidth: 90,
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
      field: "userid",
      headerName: "User Id",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "devicelocation",
      headerName: "Location",
      sortable: true,
      width: 90,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "extIP",
      headerName: "IP Address",
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
        params.value === -1 ? (
          <h5>EXPIRED</h5>
        ) : params.value === 0 ? (
          <h5 style={{ color: "red" }}>SUSPENDED</h5>
        ) : params.value === 1 ? (
          <h5 style={{ color: "Green" }}>ACTIVE</h5>
        ) : params.value === -2 ? (
          <h5 style={{ color: "lightblack" }}>NOT ENROLL </h5>
        ) : params.value === -1 ? (
          <h5 style={{ color: "green" }}>LOCKED</h5>
        ) : params.value === -99 ? (
          <h5 style={{ color: "grey" }}>TRASH </h5>
        ) : (
          "UNKNOWN STATUS"
        ),
    },
    {
      field: "allowedOS",
      headerName: "Device Type",
      width: 90,
      sortable: true,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "rooted",
      headerName: "Rooted",
      width: 90,
      sortable: true,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "createdOn",
      headerName: "Created On",
      sortable: true,
      width: 260,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => moment(params?.value).format("lll"),
    },
  ];
  const [filterDevices, setFilterDevices] = useState(deviceReportData);
  useEffect(() => {
    setFilterDevices(deviceReportData);
  }, [deviceReportData]);
  const handleSearchOnChange = (e) => {
    let data;
    if (e.target.value.length > 0) {
      data =
        filterDevices &&
        filterDevices.filter((device) => {
          return (
            device?.userid
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            device?.appid.toLowerCase().includes(e.target.value.toLowerCase())
          );
        });
    } else {
      data = deviceReportData;
    }
    return setFilterDevices(data);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{margin:"0.5rem 0"}}>
        {filterDevices.length>0 && <GridToolbarExport variant="contained" />}
      </GridToolbarContainer>
    );
  }
  
  return (
    <div>
      <Grid container spacing={3} > 
        <Grid item xs={12} md={12} >
          <Typography
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              margin: "1rem auto",
            }}
          >
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                width: "100%",
                float: "right",
                paddingTop: "0px",
                // marginRight: "10px",
              }}
            >
              <div>
                <Button color="primary" variant="contained" size="small" style={{marginRight:"1rem"}} onClick={()=> setType(1)} >Android</Button>

                <Button color="secondary" variant="contained" size="small"  onClick={()=> setType(2)} >iOS</Button>
              </div>
              <input
                type="search"
                placeholder="Search by appId and userId..."
                onChange={handleSearchOnChange}
                style={{
                  borderRadius: "8px 8px",
                  border: "1px solid",
                  outline: "none",
                  padding: 12,
                  width:250
                }}
              />
            </div>
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
            height: 300,
            width: 1,
            "& .bg-color": {
              backgroundColor: "#0D4990",
              color: "#ffffff",
            },
            index:1
          }}
        >{
          loading? <Loader />:
          
          <DataGrid
            style={{
              width: "100%",
              margin: "0 auto",
              backgroundColor: "white",
              border: "none",
              
            }}
            rows={filterDevices ?? []}
            columns={columns}
            pageSize={9}
            rowsPerPageOptions={[7]}
            getRowId={(row) => row?.deviceno}
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
