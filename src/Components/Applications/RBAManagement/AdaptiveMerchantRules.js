import React, { useCallback ,useEffect, useState} from 'react'
import Server from "../../APIUrl";
import { Link, useHistory, useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Loader from '../../Loader'
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import moment from "moment";
import Chip from "@mui/material/Chip";
import EditRule from './EditRule';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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


function AdaptiveIPRules() {

    const history = useHistory();
    const location = useLocation();
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

    const [filterList, setFilterList] = useState(rows);
    useEffect(() => {
        setFilterList(rows);
    }, [rows]);

    const handleGetRules = async() => {
        setGroupData({ ...groupData, isLoading: true });
        setLoading(true);
        await Server.get(
            `/adaptivetoken/getRules?accountId=${accountId}&requestTime=${requestTime}&appId=${location.state.row.appid}`,
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
                //location.reload();
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
    } 
    React.useEffect(() => {
        if(location.state.row.appid && accountId) {
            handleGetRules()
        }
    }, [location.state.row.appid,accountId]);


    return (
        <>
            <div
                style={{
                    display: "grid",
                    width: "calc(100vw - 290px)",
                    placeItems: "center",
                    marginLeft: 0,
                }}
            >
                {/* {
                    loading ? <Loader /> :
                        ( */}
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Rule Name</StyledTableCell>
                                            <StyledTableCell align="center">Enabled</StyledTableCell>
                                            <StyledTableCell align="center">Value</StyledTableCell>
                                            <StyledTableCell align="center">Threshold</StyledTableCell>
                                            <StyledTableCell align="center">Must Match</StyledTableCell>
                                            <StyledTableCell align="center">Action</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filterList &&
                                            filterList
                                                ?.slice(20,22)
                                                ?.map((row, index) => (
                                                    <StyledTableRow 
                                                    //key={index}
                                                    >
                                                        <StyledTableCell
                                                            component="th"
                                                            scope="row"
                                                            style={{ cursor: "pointer" }}
                                                            //onClick={(e) => handleGetAppId(e, row)}
                                                        >
                                                            {row?.name}
                                                        </StyledTableCell>
                                                        {/* <StyledTableCell align="center">{row.groupid}</StyledTableCell> */}
                                                        <StyledTableCell align="center">
                                                        {row?.enabled == false ? 
                                                            <Chip
                                                                label="No"
                                                                color="warning"
                                                                variant="outlined"
                                                                style={{ cursor: "pointer" }}
                                                                //onClick={(e) => passrowdataonallAssignedUser(e, row)}
                                                            /> :
                                                            <Chip
                                                                label="Yes"
                                                                color="success"
                                                                variant="outlined"
                                                                style={{ cursor: "pointer" }}
                                                                //onClick={(e) => passrowdataonallAssignedUser(e, row)}
                                                            /> }
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {/* {row?.value && row.value.length > 0 ? row.value : "NA"} */}
                                                            {row?.value == false ? "false"
                                                            : row?.value == true ? "true"
                                                            :row?.value?.length > 5 ? row?.value?.slice(0,8)+'...'
                                                            : row?.value
                                                            }
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {row?.threshold}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {row?.mustMatch == false ? 
                                                            <Chip
                                                                label="No"
                                                                color="warning"
                                                                variant="outlined"
                                                                style={{ cursor: "pointer" }}
                                                                //onClick={(e) => passrowdataonallAssignedUser(e, row)}
                                                            /> :
                                                            <Chip
                                                                label="Yes"
                                                                color="success"
                                                                variant="outlined"
                                                                style={{ cursor: "pointer" }}
                                                                //onClick={(e) => passrowdataonallAssignedUser(e, row)}
                                                            /> }
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                        <EditRule data={row} rows={rows} handleRules={handleGetRules}/>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                    </TableBody>
                                </Table>
                                {/* <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                /> */}
                            </TableContainer>
                        {/* )
                } */}
                <br />
                <br />
            </div>
        </>
    )
}

export default AdaptiveIPRules;