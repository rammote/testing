import React, { useCallback } from 'react';
import Server from '../APIUrl';
import { useLocation, useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import moment from 'moment';
import { Button } from '@mui/material';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
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
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function Audit() {

    const history = useHistory();
    const location = useLocation();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const [rows, setRows] = React.useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) =>  setPage(newPage);
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const [userData, setUserData] = React.useState({

        isLoading: true,
        isSuccess: false,
        isError: false,
        isSnackbarOpen: false,
  
    })

    // React.useEffect(() => {
    //     setUserData({ ...userData,isLoading: true })
    //     console.log("Audit",location.state.row)
    //     let itemType = "USERS";
    //     Server.get(`/audits/searchAuditByUser?accountId=${accountId}&requestTime=${requestTime}&userid=${location.state.row.userid}&itemType=${itemType}`, {
    //         headers: {
    //             'content-type': 'application/json',
    //             authToken: authtoken,
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Methods": "*"

    //         },
    //     })
    //         .then((response) => {
    //             console.log(response.data)
    //             setUserData({ ...userData,isLoading: false })

    //             if(!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get user")){
    //                 setRows(response.data.resultData)

    //             }
                
    //         }).catch((err) => {
    //             console.log(err)
    //             setRows([])

    //             setUserData({
                    
    //                 isLoading: false,
    //                 isSuccess: false,
    //                 isError: true,
    //                 isSnackbarOpen: true,
    //         })

    //         })
    // }, [])

    return (
        <>
            <div style={{paddingTop: '90px', paddingLeft: "20px"}}>
                <Grid container spacing={3}>
                    <Grid item>
                        <Breadcrumbs aria-label="breadcrumb">
                            <StyledBreadcrumb
                            component="a"
                            //href="/DashBoard"
                            onClick={useCallback(() => history.push('/AxiomProtect/DashBoard'))}
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                            onClick={useCallback(() => history.push('/AxiomProtect/Applications'))}
                            label="Applications"
                            deleteIcon={<ExpandMoreIcon />}
                            />
                            <StyledBreadcrumb
                            label="Application Audit"
                            deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                            <h4>Audit</h4>
                        </Typography>
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                        <div style={{ justifyContent: "flex-end", display: "flex", width: "100%", float: 'right', paddingTop: '20px' }}>
                        <Button variant="outlined">CSV</Button>&nbsp;
                        <Button variant="outlined">PDF</Button>&nbsp;
                        <Button variant="outlined">TXT</Button>
                        </div>
                    </Grid> */}
                </Grid>
                <div style={{display:"grid",width:"calc(100vw - 260px)",placeItems:"center", marginLeft:0}}>
                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 940 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">IP Address</StyledTableCell>
                                    {/* <StyledTableCell align="center">User</StyledTableCell> */}
                                    <StyledTableCell align="center">Category</StyledTableCell>
                                    <StyledTableCell align="center">Item Type</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                    <StyledTableCell align="center">Result</StyledTableCell>
                                    <StyledTableCell align="center">Time</StyledTableCell>
                                    <StyledTableCell align="center">NewValue</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            { location?.state?.data ===null ? "No Audit Data Found" : location?.state?.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center">{data.ipaddress}</StyledTableCell>
                                {/* <StyledTableCell align="center"></StyledTableCell> */}
                                <StyledTableCell align="center">{data.category}</StyledTableCell>
                                <StyledTableCell align="center">{data.itemtype}</StyledTableCell>
                                <StyledTableCell align="center">{data.action}</StyledTableCell>
                                <StyledTableCell align="center">{data.result}</StyledTableCell>
                                <StyledTableCell align="center">{moment(data.auditedon).format('D-M-YYYY, h:mm:ss')}</StyledTableCell>
                                <StyledTableCell align="center">{data.newvalue}</StyledTableCell>
                                {/* <StyledTableCell align="center">{data.oldvalue}</StyledTableCell> */}
                            </StyledTableRow>
                             ))}
                          </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={location.state.data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
            </div>
        </>
    )
}