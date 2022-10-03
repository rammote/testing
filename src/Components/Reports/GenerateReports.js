import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Server from '../APIUrl';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { emphasize } from '@mui/material/styles';
import Swal from 'sweetalert2';
import ReportChart from './GenerateReportCharts/ReportChart';
import ReportTable from './GenerateReportCharts/ReportTable';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
// function to add days to date
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export default function OTPTokenReports() {
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const history = useHistory();
  const authToken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");

  // generate report form
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [tokenType, setTokenType] = useState(1);
  const [tokenStatus, setTokenStatus] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState(-1);
  
  // drop down lists
  const tokenTypeList = [
    { name:'Software Token', status:1 },
    { name:'Hardware Token', status:2 },
    { name:'OOB Token', status:3 },
    { name:'Push Token', status:4 },
  ];
  const tokenStatusList = [
    { name:'Active', status:1 },
    { name:'Locked', status:-1 },
    { name:'Assigned', status:0 },
    { name:'Unassigned', status:-10 },
    { name:'Free', status:-10 },
    { name:'Suspended', status:-2 },
    { name:'All', status:2 },
    { name:'Lost', status:-5 },
  ];
  const [unitList, setUnitList] = useState([]);

  // result 
  const [responseData, setResponseData] = useState(null);
  const [generated, setGenerated] = useState(true);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  function returnTokenType(val) {
    let res = val;
    tokenTypeList.map((item) => {
      if(item?.status === val) {
        res = item?.name
      }
    })
    return res
  }

  function returnTokenStatus(val) {
    let res = val;
    tokenStatusList.map((item) => {
      if(item?.status === val) {
        res = item?.name
      }
    })
    return res
  }

  const getUnitList = async () => {
    try {
      const response = await Server.get(
        `/unit/getAll?accountId=${accountId}&requestTime=${requestTime}`,
        {
          headers: {
            "content-type": "application/json",
            authToken,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      );
      setUnitList(response?.data?.resultData ?? []);
      console.log({ res: response?.data?.resultData });
      if (response?.data?.resultData.length > 0) {
        setSelectedUnit(response?.data?.resultData[0]?.unitid);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return getUnitList();
  }, []);
  
  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setGenerated(false);
    await Server.post(`/token/generateOTPTokenReport?accountId=${accountId}&startDate=${fromDate?.toISOString().replaceAll("T", " ").replaceAll("Z", "")}&endDate=${toDate?.toISOString().replaceAll("T", " ").replaceAll("Z", "")}&unitId=${selectedUnit}&category=${tokenType}&status=${tokenStatus}`,{}, {
      headers: {
        'content-type': 'application/json',
        'authToken': authToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      },
    })
      .then((response) => {
        console.log(response);
        setGenerated(true);
        if(response?.data?.resultMessage == "Success"){
          console.log(response);
          setResponseData({tokenType,tokenStatus, response});
        }else{
          setResponseData(null);
          Swal.fire({
            title: 'Error',
            text: response?.data?.resultMessage,
            icon: 'error',
          })
        }

      }).catch((err) => {
        console.log(err);
        setResponseData(null);
        setGenerated(true);
        Swal.fire({
          title: "Error",
          text: err,
          icon: "error",
        })
      })
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
              label="OTP Token Reports"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>

      <br/>

      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Typography 
            component={'div'}
            style={{
              display:"flex", 
              flexDirection:"column", 
              justifyContent:"center", 
              width:"100%", 
              alignItems:"flex-start"
            }}
            sx={{
              fontFamily: 'Jost', 
              fontSize: '20px', 
              color: '#000000'
            }}
          >
            <h4 style={{marginBottom:0}} >One Time Password Tokens Reports</h4>
            <p>Make Your Own Reports</p>
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <form onSubmit={handleSubmitReport}>
            <Grid container spacing={1}>
              <Grid item xs={6} >
                <Typography variant="body2" style={{ width:'130px',display:'inline-block' }} component='span'>Form Date :</Typography>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    // label="From Date"
                    inputFormat="MM/dd/yyyy"
                    value={fromDate}
                    onChange={(newValue) => {
                      setFromDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} required size={'small'} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" style={{ width:'130px',display:'inline-block' }} component='span'>To Date :</Typography>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    // label="To Date"
                    inputFormat="MM/dd/yyyy"
                    minDate={fromDate ? fromDate.addDays(1) : null}
                    disabled={!fromDate}
                    value={toDate}
                    onChange={(newValue) => {
                      setToDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} required size={'small'} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={6} >
                <Typography variant="body2" style={{ width:'130px',display:'inline-block' }} component='span'>Token Type :</Typography>
                
                <FormControl sx={{ minWidth: 246.4 }} size="small">
                  <Select
                    value={tokenType}
                    onChange={(event) => {
                      setTokenType(event.target.value);
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'token type' }}
                  >
                    {tokenTypeList &&
                      tokenTypeList.map((item, index) => {
                        return <MenuItem key={index} value={item?.status}>{item?.name}</MenuItem>;
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" style={{ width:'130px',display:'inline-block' }} component='span'>Token Status :</Typography>
                
                <FormControl sx={{ minWidth: 246.4 }} size="small">
                  <Select
                    value={tokenStatus}
                    onChange={(event) => {
                      setTokenStatus(event.target.value);
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'token Status' }}
                  >
                    {tokenStatusList &&
                      tokenStatusList.map((item, index) => {
                        return <MenuItem key={index} value={item?.status}>{item?.name}</MenuItem>;
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} >
                <Typography variant="body2" style={{ width:'130px',display:'inline-block' }} component='span'>Units :</Typography>
                
                <FormControl sx={{ minWidth: 246.4 }} size="small">
                  <Select
                    value={selectedUnit}
                    onChange={(event) => {
                      setSelectedUnit(event.target.value);
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'units' }}
                  >
                    {unitList &&
                      unitList.map((item, index) => {
                        return <MenuItem key={index} value={item?.unitid}>{item?.name}</MenuItem>;
                      })
                    }
                    <MenuItem value={-1}>All</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" style={{ width:'130px', display:'inline-block', opacity:0 }} component='span'>submit :</Typography>
                <LoadingButton 
                  loading={!generated} 
                  sx={{ minWidth: 246.4 }}
                  type='submit' 
                  variant='contained'
                >
                  Generate report now
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      {generated && responseData &&
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Typography 
            component={'div'}
            style={{
              display:"flex", 
              flexDirection:"column", 
              justifyContent:"center", 
              width:"100%", 
              alignItems:"flex-start"
            }}
            sx={{
              fontFamily: 'Jost', 
              fontSize: '20px', 
              color: '#000000'
            }}
          >
            <h5>Results for Type is "{returnTokenType(responseData?.tokenType)}" and State is "{returnTokenStatus(responseData?.tokenStatus)}"</h5>
          </Typography>
        </Grid>

        <Grid xs={12} md={12}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example for reports">
                <Tab label="Chart" {...a11yProps(0)} />
                <Tab label="Table" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ReportChart responseData={responseData?.response?.data?.resultData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ReportTable responseData={responseData?.response?.data?.resultData} returnTokenStatus={returnTokenStatus}/>
            </TabPanel>
        </Grid>
      </Grid>
      }

    </div>
  );
}