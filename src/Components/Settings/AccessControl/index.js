import React, { useState, useCallback, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
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
import { DataGrid } from "@mui/x-data-grid";
import Server from "../../APIUrl";
import AddIcon from '@mui/icons-material/Add';
import Loader from '../../Loader';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
    index:1
  };  
});

export default function AccessControl() {
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
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
          setPushReport(response?.data?.resultData);
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
      field: "no",
      headerName: "Sr. No.",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "accessRight",
      headerName: "Access Right",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "download",
      headerName: "Download",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
},
    {
      field: "manage",
      headerName: "Manage",
      width: 90,
      sortable: true,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "createdOn",
      headerName: "Created On ",
      sortable: true,
      width: 160,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => moment(params.value).format("lll"),
    },
    {
        field: "updatedOn",
        headerName: "Updated On ",
        sortable: true,
        width: 160,
        headerClassName: "bg-color",
        flex: 1,
        renderCell: (params) => moment(params.value).format("lll"),
      },
  ];
  console.log({ pushReport });
  return (
    <div style={{ paddingTop: "6rem", margin: "0 0.5rem" }}>
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
              label="Access Control Management"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>

          <div
          style={{display:"flex",justifyContent:"space-between",alignItems:"center", width:"100%"}}
          >
            <h2 style={{width:"100%"}}>Access Management</h2>
                <div style={{width:"100%", display:"flex",justifyContent:"space-between",alignItems:"center",  }}>
                    <Button color="primary" variant="contained" size="small">Download PDF</Button>
                    <Button color="primary" variant="contained" size="small">Download CSV</Button>
                    <Button color="primary" variant="contained" size="small">Download TXT</Button>
                    <Button color="primary" variant="contained" size="small" onClick={handleClickOpen} startIcon={<AddIcon/>}>Add New Role</Button>
                </div>
          </div>
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
            height: 300,
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
           rows={ [] }
           columns={columns}
           pageSize={9}
           rowsPerPageOptions={[7]}
           getRowId={""}
           autoHeight={true}
         />
         }
        </Box>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
          </DialogContentText>
          <TextField
          variant="outlined"
            autoFocus
            size="small"
            margin="dense"
            id="name"
            label="Enter Role Name"
            type="email"
            fullWidth
          />
          <br/>
          <FormControl size="small" sx={{mt:2}}fullWidth>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Status"
    onChange={handleChange}
  >
    <MenuItem value={0}>Active</MenuItem>
    <MenuItem value={1}>Suspend</MenuItem>
  </Select>
</FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleClose}>Subscribe</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
