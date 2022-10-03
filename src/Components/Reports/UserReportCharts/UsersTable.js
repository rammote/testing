import React, { useState, useEffect } from "react";
import Server from "../../APIUrl";
import { Link, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
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

export default function UsersTable({duration}) {
  const [type, setType] = useState(1);
  const [usersList, setUsersList] = useState("");
  const accountId = sessionStorage.getItem("accountId");
  const authtoken = sessionStorage.getItem("jwtToken");
    const [loading, setLoading] = useState(false)
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  function handleChangeType(e) {
    setType(e.target.value);
  }


  
  useEffect(() => {
    async function usersListReport() {
      setLoading(true)
      await Server.get(

        `/reports/getUsersByType?accountId=${accountId}&requestTime=${requestTime}&type=${type}&duration=${duration}`,
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
          setUsersList(response?.data?.resultData);
          console.log({ usersList });
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        });
    }
    return usersListReport();
  }, [type, duration]);
  console.log({ usersList });
  
  const [filterUsers, setFilterUsers] = useState(usersList);
  useEffect(() => {
    setFilterUsers(usersList);
  }, [usersList]);

  const handleSearchOnChange = (e) => {
    let data;
    if (e.target.value.length > 0) {
      data = filterUsers && filterUsers.filter((user) => {
        return user?.username.toLowerCase().includes(e.target.value.toLowerCase())  || user?.email.toLowerCase().includes(e.target.value.toLowerCase())    
      });
    } else {
     data =usersList;
    }
    return setFilterUsers(data);
  };
  
  return (
    <div>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <FormControl sx={{width:"200px"}} size="small">
            <InputLabel id="demo-simple-select-label">
              Select User Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Select User Type"
              onChange={handleChangeType}
            >
              <MenuItem value={5}>Total Users</MenuItem>
              <MenuItem value={1}>Active Users</MenuItem>
              <MenuItem value={3}>Enroll Users</MenuItem>
              <MenuItem value={0}>Suspended Users</MenuItem>
              <MenuItem value={-1}>Locked Users</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <div
            style={{
              justifyContent: "flex-end",
              display: "flex",
              width: "100%",
              float: "right",
              paddingTop: "0px",
            }}
          >
            <input
              type="search"
              placeholder="Search by username and email..."
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
        </Grid>
      </Grid>
      <br />
      <div
        style={{
          display: "grid",
          width: "calc(99vw - 260px)",
          placeItems: "center",
          marginRight: "0px",
        }}
      >
        {
          loading? <Loader/>:
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {/* <StyledTableCell>User ID</StyledTableCell> */}
                <StyledTableCell align="center">username</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Phone Number</StyledTableCell>
                {/* <StyledTableCell align="center">Add User</StyledTableCell> */}
                {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                <StyledTableCell align="center">Created on</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterUsers &&
                filterUsers?.map((user, index) => {
                  return (
                    <StyledTableRow key={index}>
                      {/* <StyledTableCell component="th" scope="row" style={{textOverflow:"ellipsis"}}>
                                                {user.userid}
                                            </StyledTableCell> */}
                      <StyledTableCell align="center">
                        {user.username}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user?.status === 1
                          ? "Active"
                          : user?.status === 3
                          ? "Enrolled"
                          : user?.status === 0
                          ? "Suspended"
                          : user?.status === -1
                          ? "Locked"
                          : ""}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user?.phone}
                      </StyledTableCell>
                      {/* <StyledTableCell align="center">{user?.addUser}</StyledTableCell> */}
                      {/* <StyledTableCell align="center">{user.action}</StyledTableCell> */}
                      <StyledTableCell align="center">
                        {moment(user?.createdon).format("lll")}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
               
            </TableBody>
          </Table>
           {
                    usersList?.length == '0' ?  <h3 style={{textAlign:"center"}}>No User Found</h3> : ""
                }
        </TableContainer>
        }
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
