import React, { useState, useCallback } from 'react'
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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));
  
 

// interface DatasetType {
//     data: number[];
//     backgroundColor: string[];
// }
  
function PieChartComponent({
    //labels = ["2010", "2012", "2014", "2016", "2018"],
    labels = [],
    datasets = [
      {
        data: [2000, 4000, 2300, 2222, 3333],
        backgroundColor: ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"]
      }
    ]
  }) {
    return (
      <Pie
        options={{
          width: "100",
          height: "100"
        }}
        data={{
          labels: labels,
          datasets: datasets
        }}
      />
    );
}

export default function Reports() {

    const history = useHistory();
    const [filter, setfilter] = React.useState('');

    const handleChange = (event) => {
        setfilter(event.target.value);
    };

    const [sonic, setsonic] = React.useState('');

    const handleChangeSonic = (event) => {
        setsonic(event.target.value);
    };

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
                            label="Sonic KYC Reports"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                        <h4>Sonic KYC Reports</h4>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl  size="small" sx={{width:'20rem' ,float:"right"}}>
                        <InputLabel id="demo-simple-select-label">Select Sonic KYC...</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sonic}
                            label="Select"
                            onChange={handleChangeSonic}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <PieChartComponent />
                </Grid>
                <Grid item xs={12} md={3} style={{textAlign: "center", marginTop: "50px"}}>
                    <Button>ABCaswderfasedrf </Button>
                    <Button>ABCaswderfasedrf</Button>
                    <Button>ABCaswderfasedrf </Button>
                    <Button>ABCaswderfasedrf </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                    <PieChartComponent />
                </Grid>
                <Grid item xs={12} md={3} style={{textAlign: "center", marginTop: "50px"}}>
                    <Button>ABCaswderfasedrf </Button>
                    <Button>ABCaswderfasedrf</Button>
                    <Button>ABCaswderfasedrf </Button>
                    <Button>ABCaswderfasedrf </Button>
                </Grid>
            </Grid>
            <br /><br />
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
                    <div style={{ justifyContent: "flex-end", display: "flex", width: "100%", float: 'right', paddingTop: '0px' }}><input type="text" placeholder="Search .." style={{ borderRadius: "8px 8px", border: "1px solid", outline: "none", padding: 12 }} /></div>
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
            </div>
        </div>
    );
}