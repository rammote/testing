import React, { useState, useEffect } from "react";
import Server from "../../APIUrl";
import { Link, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
import Swal from "sweetalert2";
import moment from "moment";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loader from '../../Loader'
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { ExportToJson } from "../../ExportFunc";
import { SaveAlt } from "@mui/icons-material";

export default function ReportTable({ responseData, returnTokenStatus }) {
  // const [type, setType] = useState(10);
  // const [usersList, setUsersList] = useState("");
  const accountId = sessionStorage.getItem("accountId");
  const authToken = sessionStorage.getItem("jwtToken");
  const [loading, setLoading] = useState(false);
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  // const [tableList, setTableList] = useState('');
  const [search, setSearch] = useState('');

  const handleSearchOnChange = (e) => {
    setSearch(e.target.value);
  }

  const filterList = responseData?.filter((row) => {
    if (search === '') {
      return row;
    }
    if (row?.username?.toLowerCase().includes(search.toLowerCase())) {
      return row;
    }
    return null;
  });

  const columns = [
    {
      field: "index",
      headerName: "No",
      sortable: true,
      width: 90,
      headerClassName: "bg-color",
      flex: 1,
      // renderCell: (params) => params.api.getRowIndex(params.row.srno) + 1,
    },
    {
      field: "username",
      headerName: "User Name",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
    },
    // {
    //   field: "mobile",
    //   headerName: "Mobile",
    //   sortable: true,
    //   width: 130,
    //   headerClassName: "bg-color",
    //   flex: 1,
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   sortable: true,
    //   width: 130,
    //   headerClassName: "bg-color",
    //   flex: 1,
    // },
    {
      field: "srno",
      headerName: "Serial Number",
      width: 130,
      sortable: true,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "attempts",
      headerName: "Attempts",
      width: 90,
      sortable: true,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Token Status",
      width: 130,
      sortable: true,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => returnTokenStatus(params.value),
    },
    {
      field: "creationdatetime",
      headerName: "Created On ",
      sortable: true,
      width: 160,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => moment(params.value).format("lll"),
    },
    {
      field: "lastaccessdatetime",
      headerName: "Last Access On ",
      sortable: true,
      width: 160,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => moment(params.value).format("lll"),
    },
  ];

  useEffect(() => {
    filterList?.map((row,index) => {
      row.index = index+1;
    });
  
    return () => {}
  }, [filterList]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{margin:"0.5rem 0"}}>
        <Stack spacing={1} direction="row">
          <Button
            style={{ textTransform: "capitalize", width:'150px' }}
            color="primary"
            variant="contained"
            size="small"
            startIcon={<SaveAlt />}
            onClick={(e) => ExportToJson(e, filterList, "Users")}
          >
            Export to JSON
          </Button>
          <GridToolbarExport variant="contained" />
        </Stack>
      </GridToolbarContainer>
    );
  }

  return (
    <div>
      <div
        style={{
          display:"flex", 
          flexDirection:"row", 
          justifyContent:"space-between", 
          width:"100%", 
          alignItems:"center",
        }}
        sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}
      >
        <h4 style={{ margin:0 }}>Report Table</h4>
        <input
          type="search"
          placeholder="Search .."
          value={search}
          onChange={handleSearchOnChange}
          style={{
            borderRadius: "8px 8px",
            border: "1px solid",
            outline: "none",
            padding: 12,
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          width: "calc(100vw - 260px)",
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
            rows={filterList ?? []}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7, 14, 30, 90]}
            getRowId={(row) => row?.srno}
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
