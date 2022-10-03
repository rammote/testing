import React, { useState, useCallback, useEffect, useLayoutEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { IconButton, Stack, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Server from "../../APIUrl";
import { ExportToCsv, ExportToJson } from "../../ExportFunc/index";
import Loader from "../../Loader";
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


export default function UserManagement(data) {
  const [type, setType] = useState(5);
  const [usersList, setUsersList] = useState([]);
  const accountId = sessionStorage.getItem("accountId");
  const authtoken = sessionStorage.getItem("jwtToken");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
const {state: {key}} = useLocation();
console.log("KEY: ", key)
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  function handleChangeType(e) {
    setType(e.target.value);
  }
  const [deleteUser, setDeleteUser] = useState("");
  const [toJson, setToJson] = useState();
  useLayoutEffect(()=>{
    if(key === "Enroll Users"){
      setType(3)
      usersListReport(3)
    }
    if(key === "All Users"){
      setType(5)
      usersListReport(5)
    }
    if(key === "Suspended Users"){
      setType(0)
      usersListReport(0)
    }
    if(key === "Active Users"){
      setType(1)
      usersListReport(1)
    }
    if(key === "Locked Users"){
      setType(-1)
      usersListReport(-1)
    }
  },[key])

  async function usersListReport(statusType) {
    setLoading(true);
    await Server.get(
      `/reports/getUsersByType?accountId=${accountId}&requestTime=${requestTime}&type=${statusType}&duration=0`,
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
        setUsersList(response?.data?.resultData);
        console.log({ usersList });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const [filterUsers, setFilterUsers] = useState(usersList);
  useEffect(() => {
    setFilterUsers(usersList);
  }, [usersList]);
  const handleSearchOnChange = (e) => {
    let data;
    if (e.target.value.length > 0) {
      data =
        filterUsers &&
        filterUsers.filter((user) => {
          return (
            user?.username
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            user?.email.toLowerCase().includes(e.target.value.toLowerCase())
          );
        });
    } else {
      data = usersList;
    }
    return setFilterUsers(data);
  };

  const handleStatusChange = async (e, id) => {
    e.preventDefault();
    console.log({ status: e.target.value, id });
    await Server.get(
      `/user/setStatus?accountId=${accountId}&userId=${id}&status=${e.target.value}&requestTime=${requestTime}`,
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
        console.log(response);
        if (response.data.resultCode === 0) {
          Swal.fire("User Status Updated Successfully!", "success");
        } else {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: response.data.resultMessage,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire(err, "error");
      });
    //window.location.reload();
  };

  const columns = [
    {
      field: "username",
      headerName: "Username",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email Id",
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
      renderCell: (params) => {
        return (
          <>
            <FormControl
              sx={{ width: "200px", }}
              size="small"
            >
              <Select
                defaultValue={params.value}
                onChange={(e) => handleStatusChange(e, params?.id)}
              >
                <MenuItem value={1}>Activate </MenuItem>
                <MenuItem value={3}>Enroll </MenuItem>
                <MenuItem value={0}>Suspended </MenuItem>
                <MenuItem value={-1}>Locked </MenuItem>
              </Select>
            </FormControl>
          </>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone Number",
      sortable: true,
      width: 130,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "createdon",
      headerName: "Created On ",
      sortable: true,
      width: 160,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => moment(params.value).format("lll"),
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   sortable:false,
    //   width: 160,
    //   headerClassName: "bg-color",
    //   flex: 1,
    //   renderCell:  (params) => {
    //     return (
    //       <>
    //         {/* <IconButton
    //             style={{ color: "#28a745", }}
    //             onClick={() =>
    //               history.push({
    //                 pathname: `/AxiomProtect/ViewUser/${params?.id}`,
    //               })
    //             }
    //           >
    //             <ModeEditOutlineIcon style={{ border:"1px solid #28a745"}}/>
    //           </IconButton> */}
    //           <IconButton
    //             style={{ color: "#e63946" }}
    //             onClick={(e) => deleteUserFun(e, params?.id)}
    //           >
    //             <DeleteIcon style={{border:"1px solid #e63946" }}/>
    //           </IconButton>
    //       </>
    //     )}
    // },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{margin:"0.5rem 0"}}>
        <Stack spacing={1} direction="row">
          <Button
            style={{ textTransform: "capitalize", width: "150px" }}
            color="primary"
            variant="contained"
            size="small"
            startIcon={<SaveAlt />}
            onClick={(e) => ExportToJson(e, filterUsers, "Users")}
          >
            Export to JSON
          </Button>
          <GridToolbarExport variant="contained" />
        </Stack>
      </GridToolbarContainer>
    );
  }

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
              label="User Management"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>

      <br/>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography 
            style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"100%", alignItems:"center"}}
            sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}
          >
            <h4>User Management</h4>

            <input
              type="search"
              placeholder="Search by username and email address..."
              onChange={handleSearchOnChange}
              style={{
                borderRadius: "8px 8px",
                border: "1px solid",
                outline: "none",
                padding: 12,
                width:300
              }}
            />
          </Typography>
        </Grid>
      </Grid>

    
      <div
        style={{
          width: "calc(100vw - 240px)",
          placeItems: "center",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            maxHeight: 600,
            width: 1,
            "& .bg-color": {
              backgroundColor: "#0D4990",
              color: "#ffffff",
            },
          }}
        >
          {loading ? (
            <Loader />
          ) : (
            <DataGrid
              height={550}
              style={{
                width: "100%",
                margin: "0 auto",
                backgroundColor: "white",
                border: "none",
              }}
              rows={filterUsers ?? []}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[7]}
              getRowId={(row) => row?.userid}
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
