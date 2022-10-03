import React, { useState, useCallback, useEffect } from "react";
import Server from "../APIUrl";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
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
import { Link, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import moment from "moment";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loader from "../Loader";
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

 

export default function CustomizedTables() {
  const history = useHistory();
  const requestTimess = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const requestTime = escape(requestTimess);
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const [loading, setLoading] = useState(false);
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  React.useEffect(() => {
    setLoading(true);
    Server.get(
      `/unit/getAll?accountId=${accountId}&requestTime=${requestTime}`,
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
        if (response.data.resultCode === 0) {
          setRows(response.data.resultData);
          setLoading(false);
        } else {
          setLoading(false);
          Swal.fire({
            title: "Error",
            text: response.data.message,
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setRows([]);
        setLoading(false);
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
        filterList.filter((team) => {
          return team?.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
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
      pathname: "/AxiomProtect/AssignUserToTeam",
      state: {
        row: row,
      },
    });
  };

  const passrowdataonallAssignedUser = (e, row) => {
    e.preventDefault();
    console.log("seleted name", row);

    history.push({
      pathname: "/AxiomProtect/getallassigneduserforteam",
      state: {
        row: row,
      },
    });
  };

  const handleStatusChange = async (e, row) => {
    e.preventDefault();
    
    await Server.get(
      `/unit/changeStatus?accountId=${row.accountid}&unitId=${row.unitid}&status=${e.target.value}&requestTime=${requestTime}`,
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
        
          if(response.data.resultCode==0){
            Swal.fire("Success", response.data.resultMessage, "success");
        } else Swal.fire("", response.data.resultMessage, "error");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: err,
          icon: "error",
        });
      });
  };

  const deletespecificRow = (e, row) => {
    e.preventDefault();
    console.log("Please delete Specific Row", row);
    // console.log(row.unitid);
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
          `/unit/delete?accountId=${accountId}&unitId=${row.unitid}&requestTime=${requestTime}`,
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
            setRows(rows.filter((item) => item.unitid != row.unitid));
            Swal.fire("Deleted!", "Your team has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
            setRows([]);
          });
      }
    });
  };

  const EditTeamUnit = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row);

    history.push({
      pathname: "/AxiomProtect/EditTeamUnit",
      state: {
        row: row,
      },
    });
  };
  return (
    <>
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
              <StyledBreadcrumb label="Teams" deleteIcon={<ExpandMoreIcon />} />
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link to="/AxiomProtect/CreateTeamUnit">
              <Button
                variant="contained"
                style={{
                  color: "#FFFFFF",
                  backgroundColor: "#206BC4",
                  float: "right",
                }}
              >
                + Add Team
              </Button>
            </Link>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
            >
              <h4>Teams</h4>
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
                placeholder="Search with team name..."
                style={{
                  borderRadius: "8px 8px",
                  border: "1px solid",
                  outline: "none",
                  padding: 12,
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
          {/* <div style={{ justifyContent: "flex-end", display: "flex", width: "100%", float: 'right', marginBottom: 8 }}><input onChange={(e) => setRows(rows.filter((row) => row.appid == e.target.value))} type="text" placeholder="Search .." style={{ borderRadius: "8px 8px", border: "1px solid", outline: "none", padding: 12 }} /></div> */}

          {loading ? (
            <Loader />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">
                      Description
                    </StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Operators</StyledTableCell>
                    <StyledTableCell align="center">
                      Add Operator
                    </StyledTableCell>
                    <StyledTableCell align="center">Created on</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterList && filterList
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.discription}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // label="Status"
                            defaultValue={row.status}
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
                            onClick={(e) =>
                              passrowdataonallAssignedUser(e, row)
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Chip
                            label="Add Operator"
                            color="primary"
                            variant="outlined"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => handleGetTeamUnitName(e, row)}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {moment(row.createdOn).format("D-M-YYYY, h:mm:ss")}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <IconButton aria-label="delete"  onClick={(e) => deletespecificRow(e, row)}>
                            <DeleteIcon
                              style={{ color: "#D2042D" }}
                             
                            />
                          </IconButton>
                          <IconButton aria-label="delete" onClick={(e) => EditTeamUnit(e, row)} style={{ marginLeft: 10 }}>
                            <EditIcon
                              style={{ color: "#9c27b0" }}
                              
                            />
                          </IconButton>
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
          )}
        </div>
      </div>
    </>
  );
}
