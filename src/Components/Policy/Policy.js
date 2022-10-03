import React, { useState, Component, useCallback, useEffect } from 'react';
import Server from '../APIUrl';
//import Popup from './Popup';
import './style.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
//import Select from 'react-select';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import axios from "axios";
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { Link, useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import moment from 'moment';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import PolicyModal from './PolicyModal';
import Loader from '../Loader'
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





export default function Policy() {

  const history = useHistory();
  const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
  const requestTime = escape(requestTimess);
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [loading, setLoading] = useState(false)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([])



  // const requestTime = escape(new Date().toISOString().replaceAll("T", " ").replaceAll("Z", ""));

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  /**********************************************************************************/
  const data = [
    {
      value: 1,
      label: "Australia"
    },
    {
      value: 2,
      label: "Cambodia"
    },
    {
      value: 3,
      label: "Canada"
    },
    {
      value: 4,
      label: "China"
    },
    {
      value: 5,
      label: "Finland"
    },
    {
      value: 6,
      label: "India"
    }
  ];

  const [selectedValue, setSelectedValue] = useState([]);
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  const options = [
    {
      value: 1,
      label: "Australia"
    },
    {
      value: 2,
      label: "Cambodia"
    },
    {
      value: 3,
      label: "Canada"
    },
    {
      value: 4,
      label: "China"
    },
    {
      value: 5,
      label: "Finland"
    },
    {
      value: 6,
      label: "India"
    }
  ];

  const [selectedOption, setSelectedOption] = useState([]);
  const handleChangeCountry = (e) => {
    setSelectedOption(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  /**********************************************************************************/


  React.useEffect(() => {

    const fetchData = async () => {
      setLoading(true)
      await Server.get(`/policy/getAll?accountId=${accountId}&requestTime=${requestTime}`, {
        headers: {
          'content-type': 'application/json',
          authToken: authtoken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"

        },
      })
        .then((response) => {
          console.log(response.data)

          if (response.data.resultCode === 0) {
            setRows(response.data.resultData)
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: response.data.resultMessage,
            })
            setRows([])

          }
          setLoading(false)
        }).catch((err) => {
          console.log(err)
          setRows([])
          setLoading(false)
        })

    }
    return fetchData();
  }, [])


  const handleStatusChange = async (e, row) => {
    e.preventDefault();

    let status = e.target.value;
    console.log({ status, policyname: row.policyname })
    console.log("selcted value", e.target.value, "seleted row", row, rows)
    await Server.post(`/policy/setStatus?accountId=${accountId}&policyName=${row.policyname}&status=${e.target.value}&requestTime=${requestTime}`,
      { status: e.target.value }, {
      headers: {
        authToken: authtoken,
        'content-type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"

      },
    })
      .then((response) => {
        console.log(response.data.resultData);
        if (response.data.resultCode === 0) {
          const data = filterPolicy.map((item) => {
            if (item.policyid === row.policyid) {
              item.status = status;
            }
            return item;
          });
          setFilterPolicy(data);
          Swal.fire({
            title: 'Success',
            text: 'Status changed successfully',
            icon: 'success',
          })
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: response.data.resultMessage,
          })
        }
      }).catch((error) => {
        console.log(error)
        console.log(status)
        Swal.fire({
          title: 'Error: Failed to update status',
          text: error,
          icon: 'error',
        })

      })
    // window.location.reload();
  }
  console.log("rows", rows)
  const deletespecificRow = (e, row) => {
    e.preventDefault();
    console.log("Please delete Specific Row", row);
    // console.log(row.unitid);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Server.delete(`/policy/remove?accountId=${accountId}&policyId=${row.policyid}&requestTime=${requestTime}`, {
          headers: {
            'content-type': 'application/json',
            authToken: authtoken,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
        })
          .then((response) => {
            console.log("-----", response.data)
            setRows(rows.filter((item) => item.policyid !== row.policyid))
            Swal.fire(
              'Deleted!',
              'Policy has been deleted.',
              'success'
            )

          }).catch(err => {
            console.log(err)
            Swal.fire({
              title: 'Error',
              text: "Something went wrong",
              icon: 'error',
            })
          })

        history.push({
          pathname: "/AxiomProtect/Policy"
        })
      }
    })

  }


  const EditGroup = (e, row) => {
    e.preventDefault();
    console.log("seleted Policy", row)

    history.push({
      pathname: "/AxiomProtect/Editpolicy",
      state: {
        row,
        policyId: row?.policyid,
      }
    })
  }


  // Search By Policy Name

  const [filterPolicy, setFilterPolicy] = useState(rows);
  useEffect(() => {
    setFilterPolicy(rows);
  }, [rows]);

  const handleSearchOnChange = (e) => {
    let data;
    if (e.target.value.length > 0) {
      data = filterPolicy && filterPolicy.filter((policy) => {
        return policy?.policyname.toLowerCase().includes(e.target.value.toLowerCase())
      });
    } else {
      data = rows;
    }
    return setFilterPolicy(data);
  };
  // end Search By Policy Name



  const [isOpen, setIsOpen] = React.useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);


  }





  return <div style={{ paddingTop: '90px', paddingLeft: "20px" }}>

    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Breadcrumbs aria-label="breadcrumb" >
          <StyledBreadcrumb
            component="a"
            //href="/DashBoard"
            onClick={useCallback(() => history.push('/AxiomProtect/DashBoard'))}
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb
            label="Policy"
            deleteIcon={<ExpandMoreIcon />}
          />
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12} md={6}>
        <div sx={{ paddingLeft: '10px', paddingTop: '0px' }}>
          <Button value="Click to Open Popup" onClick={togglePopup} variant="contained" style={{ color: '#FFFFFF', backgroundColor: '#206BC4', float: 'right' }}> + New Policy</Button>
        </div>
      </Grid>
    </Grid>


    <br />
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ fontFamily: 'Jost', fontSize: '20px', color: '#000000' }}>
          <h4>Policy</h4>
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <div style={{ justifyContent: "flex-end", display: "flex", width: "100%", float: 'right', paddingTop: '20px' }}><input onChange={handleSearchOnChange} type="text" placeholder="Search By Policy Name.." style={{ borderRadius: "8px 8px", border: "1px solid", outline: "none", padding: 12 }} /></div>
      </Grid>
    </Grid>
    <div style={{ display: "grid", width: "calc(100vw - 260px)", placeItems: "center", marginLeft: 0 }}>

      {/* <div style={{ justifyContent: "flex-end", display: "flex", width: "100%", float: 'right', marginBottom: 8 }}><input onChange={(e) => setRows(rows.filter((row) => row.appid == e.target.value))} type="text" placeholder="Search .." style={{ borderRadius: "8px 8px", border: "1px solid", outline: "none", padding: 12 }} /></div> */}

      {
        loading ? <Loader /> :
          <TableContainer component={Paper} >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {/* <StyledTableCell align="center">Team Id</StyledTableCell> */}
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Created on</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterPolicy && filterPolicy.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">{row.policyname}</StyledTableCell>
                      <StyledTableCell align="center" >
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"

                          // label="Status"
                          defaultValue={row.status}
                          onChange={(e) => handleStatusChange(e, row)}
                          style={{ width: 150, height: 40 }}>

                          <MenuItem value={1} >
                            Active
                          </MenuItem>
                          <MenuItem value={-1} >
                            Suspended
                          </MenuItem>

                        </Select>
                      </StyledTableCell>
                      <StyledTableCell align="center">{moment(row.createdOn).format('D-M-YYYY, h:mm:ss')}</StyledTableCell>

                      <StyledTableCell align="center">
                        <IconButton aria-label="delete" onClick={(e) => deletespecificRow(e, row)}>
                          <DeleteIcon style={{ color: '#D2042D' }} />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={(e) => EditGroup(e, row)} style={{marginLeft: 10}}>
                          <EditIcon style={{ color: '#9c27b0'}} />
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
      }
     <div >
     {
        isOpen && <PolicyModal togglePopup={togglePopup} />
      }
     </div>
    </div>
  </div>
}
