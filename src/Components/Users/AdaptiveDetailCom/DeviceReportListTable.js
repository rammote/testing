import React, { useState, useEffect } from "react";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses,
} from "@mui/x-data-grid";
import moment from "moment";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Server from '../../APIUrl'
import Swal from "sweetalert2";
function CustomToolbar() {
    return (
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
            <GridToolbarExport
                style={{
                    margin: "0px 10px",

                    textTransform: "capitalize",
                }}
                variant="contained"
                size="small"
            />
        </GridToolbarContainer>
    );
}

export default function DeviceReportListTable({ appId }) {
    const [noOfRequest, setNoOfRequest] = useState(10);
    const [usersData, setUsersData] = useState([])
    const [loading, setLoading] = useState(false)
    const authToken = sessionStorage.getItem("jwtToken");
    const userId = sessionStorage.getItem("userId");
    const requestTime = new Date()
        .toISOString()
        .replaceAll("T", " ")
        .replaceAll("Z", "");




    useEffect(() => {
        setLoading(true)
        if (appId && userId && authToken) {
            Server.get(`/reports/getDeviceDetailsUserId?requestTime=${requestTime}&userId=${userId}&appId=${appId}`, {
                headers: {
                    "content-type": "application/json",
                    authToken,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                },
            })
                .then((res) => {
                    setLoading(false)
                    if (res.data.resultCode === 0) {
                        setUsersData(res.data.resultData ?? [])
                    }

                })
                .catch((err) => {
                    setLoading(false)
                    console.log(err);

                });
        }
    }, [appId, userId, authToken])
    const handleChange = (event) => {
        setNoOfRequest(event.target.value);
    };


    const columns = [

        // {
        //     field: "ip",
        //     headerName: "Ip Address",
        //     minWidth: 90,
        //     flex: 1,
        // },
        {
            field: "lattitude",
            headerName: "Latitude",
            minWidth: 70,
            flex: 1,
        },
        {
            field: "longitude",
            headerName: "Longitude",
            minWidth: 70,
            flex: 1,
        },
        {
            field: "city",
            headerName: "City",
            minWidth: 70,
            flex: 1,
        },
        {
            field: "state",
            headerName: "State",
            minWidth: 70,
            flex: 1,
        },
        {
            field: "country",
            headerName: "Country",
            minWidth: 70,
            flex: 1,
        },
        // {
        //     field: "zipcode",
        //     headerName: "Zip Code",
        //     minWidth: 70,
        //     flex: 1,
        // },
        {
            field: "txtype",
            headerName: "Type",
            minWidth: 70,
            flex: 1,
        },
        {
            field: "executedOn",
            headerName: "Last Executed",
            minWidth: 70,
            flex: 1,
            renderCell: (params) => moment(params.value).format('D-M-YYYY, h:mm:ss'),
        },
    ];
    return (
        <div >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Device Report</Typography>
                {/* <Box sx={{ minWidth: 150 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                            Number Of Request
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={noOfRequest}
                            label="Number Of Request"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                </Box> */}
            </Stack>
            <br />
            <div style={{ height: 600 }}>
                { (
                    <DataGrid
                        rows={usersData ?? []}
                        columns={columns}
                        getRowId={(row) => row?.executedOn}
                        pageSize={10}
                        componentsProps={{
                            columnMenu: { background: "red", counter: usersData.length },
                        }}
                        rowsPerPageOptions={[10, 25, 50, usersData?.length]}
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                    />
                )}
            </div>
        </div>
    );
}
