import React, { useState, useCallback } from 'react'
import Server from '../APIUrl';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
   
import Swal from 'sweetalert2';
import moment from 'moment';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Pie } from "react-chartjs-2";
import UserChart from './UserReportCharts/UserChart';
import UsersTable from './UserReportCharts/UsersTable';
import { ExportToJson } from '../ExportFunc';
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
},{index:1});



const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function Reports() {

    const history = useHistory();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const [filter, setfilter] = React.useState('');
    const [rows, setRows] = React.useState([]) 
    const handleChange = (event) => {
        setfilter(event.target.value);
    };
    const [duration , setDuration ] = useState(0);

function handleChangeDuration(e){
    setDuration(e.target.value);
}

    return(
        <div style={{paddingTop: '90px', marginLeft: '20px'}}>
            <Grid container spacing={3} >
                <Grid item xs={12} md={6}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <StyledBreadcrumb
                            component="a"
                            //href="/DashBoard"
                            onClick={useCallback(() => history.push('/AxiomProtect/DashBoard'))}
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            component="a"
                            onClick={useCallback(() => history.push('/AxiomProtect/Reports'))}
                            label="Reports"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb
                            label="User Reports"
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
                    sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                        <h4>User Reports</h4>
                    
                        <FormControl sx={{width:"200px"}} size="small">
                            <InputLabel id="demo-simple-select-label">
                                Select Duration
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={duration}
                                label="Select Duration"
                                onChange={handleChangeDuration}
                            >
                                <MenuItem value={0}>All Users</MenuItem>
                                <MenuItem value={7}>Last 7 days</MenuItem>
                                <MenuItem value={14}>Last 2 weeks</MenuItem>
                                <MenuItem value={30}>Last 1 month</MenuItem>
                                <MenuItem value={90}>Last 3 month</MenuItem>
                            </Select>
                        </FormControl>  
                </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={3}>
            <Grid xs={12} md={11}>
                <UserChart duration={duration} />
            </Grid>
        </Grid>
         <UsersTable duration={duration}/>

            {/* <br /><br />
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Select...</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter}
                            label="Select"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={8}>
                    <div style={{ justifyContent: "flex-end", display: "flex", width: "100%", float: 'right', paddingTop: '0px', marginRight: '10px' }}><input type="text" placeholder="Search .." style={{ borderRadius: "8px 8px", border: "1px solid", outline: "none", padding: 12 }} /></div>
                </Grid>
            </Grid>
            <br />
            <div style={{display:"grid",width:"calc(99vw - 260px)",placeItems:"center", marginRight: '0px'}}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>User ID</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Description</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Users</StyledTableCell>
                            <StyledTableCell align="center">Add User</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                            <StyledTableCell align="center">Created on</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br /><br /><br /><br />
            </div> */}
        </div>
    );
}