import React, { useState, useCallback, useEffect } from "react";
import Server from "../APIUrl";
import { Link, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
//import Autocomplete from '@mui/material/Autocomplete';
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import moment from "moment";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loader from '../Loader'
import { Ellipsis } from "react-bootstrap/esm/PageItem";

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


export default function Groups() {
  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push("/AxiomProtect/Addgroup"),
    [history]
  );
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const requestTimess = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const requestTime = escape(requestTimess);
  const [groupData, setGroupData] = React.useState({
    isLoading: true,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([""]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  React.useEffect(() => {
    setGroupData({ ...groupData, isLoading: true });
    setLoading(true);
    Server.get(
      `/group/getAll?accountId=${accountId}&requestTime=${requestTime}`,
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
        setGroupData({ ...groupData, isLoading: false });
        setRows(response?.data?.resultData ?? []);
        setLoading(false);
        if (
          !(
            response.data.resultCode == -1 ||
            response.data.resultMessage == "Unable to get applications"
          )
        ) {
          
        }
      })
      .catch((err) => {
        console.log(err);
        setRows([]);
        setLoading(false);
        setGroupData({
          isLoading: false,
          isSuccess: false,
          isError: true,
          isSnackbarOpen: true,
        });
      });
  }, []);

  // search functionality
  const [filterList, setFilterList] = useState(rows);
  useEffect(() => {
    setFilterList(rows);
  }, [rows]);

  const handleSearchOnChange = (e) => {
    let data;
    if (e.target.value.length > 0) {
      data =
        filterList &&
        filterList.filter((group) => {
          return (
            group?.groupname
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            group?.description
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          );
        });
    } else {
      data = rows;
    }
    return setFilterList(data);
  };
  const handleGetTeamUnitName = (e, row) => {
    e.preventDefault();
    console.log("seleted name", row);

    history.push({
      pathname: "/AxiomProtect/AddUserForGroup",
      state: {
        row: row,
      },
    });
  };

  const passrowdataonallAssignedUser = (e, row) => {
    e.preventDefault();
    console.log("seleted name", row);

    history.push({
      pathname: "/AxiomProtect/GetAllAssignedUsersForGroup",
      state: {
        row: row,
      },
    });
  };

  const handleStatusChange = async (e, row) => {
    e.preventDefault();

    await Server.post(
      `/group/setStatus?accountId=${accountId}&groupId=${row.groupid}&status=${e.target.value}&requestTime=${requestTime}`,
      {},
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
        if (response.data.resultCode == 0) {
         Swal.fire("Success", response.data.resultMessage, "success")
        } else Swal.fire("", response.data.resultMessage, "error");
      })
      .catch((err) => {
        console.log(err);
      });
    //window.location.reload();
  };

  const deletespecificRow = (e, row) => {
    e.preventDefault();
    console.log("Please delete Specific Row", row);
    // console.log(row.unitid);
    //console.log(authtoken)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Server.delete(
          `/group/delete?accountId=${accountId}&groupId=${row.groupid}&requestTime=${requestTime}`,
          {
            headers: {
              "content-type": "application/json",
              authToken: authtoken,
            },
          }
        )
          .then((response) => {
            console.log(response.data);

            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setRows(rows.filter((item) => item.groupid !== row.groupid));
          })
          .catch((err) => {
            console.log(err);
            setRows([]);
          });
      }
    });
  };

  const EditGroup = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row);

    history.push({
      pathname: "/AxiomProtect/GroupDetails",
      state: {
        row: row,
      },
    });
  };

  const handleGetAppId = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row);

    history.push({
      pathname: "/AxiomProtect/GroupDetails",
      state: {
        row: row,
      },
    });
  };

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
            <StyledBreadcrumb label="Groups" deleteIcon={<ExpandMoreIcon />} />
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            sx={{ fontFamily: "Jost", float: "right" }}
            onClick={handleOnClick}
          >
            + Add Group
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >
            <h4>Groups</h4>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <div
            style={{
              justifyContent: "flex-end",
              display: "flex",
              width: "100%",
              float: "right",
              paddingTop: "20px",
            }}
          >
            <input
              onChange={handleSearchOnChange}
              type="text"
              placeholder="Search with group name and description..."
              style={{
                borderRadius: "8px 8px",
                border: "1px solid",
                outline: "none",
                padding: 12,
                width:'17rem'
              }}
            />
          </div>
        </Grid>
      </Grid>

      <div
        style={{
          display: "grid",
          width: "calc(100vw - 260px)",
          placeItems: "center",
          marginLeft: 0,
        }}
      >
        {/* <Typography sx={{fontFamily: 'Jost', fontSize: '15px', color: '#5C5C5C', alignContent: 'center'}}>
                    <h4>Groups can be used for management, reporting, and policy. Click Add Group to create one.</h4>
                </Typography> */}
        {/* <div style={{ justifyContent: "flex-end", display: "flex", width: "100%", float: 'right', marginBottom: 8 }}><input onChange={(e) => setRows(rows.filter((row) => row.appid == e.target.value))} type="text" placeholder="Search .." style={{ borderRadius: "8px 8px", border: "1px solid", outline: "none", padding: 12 }} /></div> */}
        {
          loading ?<Loader/>:
          (
            <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {/* <StyledTableCell>Group ID</StyledTableCell> */}
                <StyledTableCell>Group Name</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Users</StyledTableCell>
                <StyledTableCell align="center">Add User</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
                <StyledTableCell align="center">Created on</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterList &&
                filterList
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => (
                    <StyledTableRow key={index}>
                      {/* <StyledTableCell
                        component="th"
                        scope="row"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => handleGetAppId(e, row)}
                      >
                        {row.groupid}
                      </StyledTableCell> */}
                      {/* <StyledTableCell align="center">{row.groupid}</StyledTableCell> */}
                      <StyledTableCell align="center">
                        {row.groupname}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "noWrap"}}>
                        {row?.description && row?.description?.length > 0 ? row?.description?.slice(0,5)+'...' : "NA"}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // label="Status"
                          defaultValue={
                            row.status
                          }
                          onChange={(e) => handleStatusChange(e, row)}
                          style={{ width: 130, height: 40 }}
                        >
                          <MenuItem value={1}>Active</MenuItem>
                          <MenuItem value={0}>Suspended</MenuItem>
                        </Select>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Chip
                          label="View"
                          color="success"
                          variant="outlined"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => passrowdataonallAssignedUser(e, row)}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Chip
                          label="Add"
                          color="primary"
                          variant="outlined"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => handleGetTeamUnitName(e, row)}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton aria-label="delete" onClick={(e) => deletespecificRow(e, row)}>
                          <DeleteIcon
                            style={{ color: "#D2042D" }}
                          />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={(e) => EditGroup(e, row)} style={{ marginLeft: 10 }}>
                          <EditIcon
                            style={{ color: "#9c27b0" }}
                          />
                        </IconButton>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {moment(row.createdOn).format("D-M-YYYY, h:mm:ss")}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
          )
        }
        <br />
        <br />
      </div>
    </div>
  );
}
