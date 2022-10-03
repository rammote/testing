import React, { useCallback ,useEffect} from 'react'
import Server from '../../APIUrl';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from "axios";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { Backdrop, CircularProgress } from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdaptiveLocationRules from './AdaptiveLocationRules';
import AdaptiveAccountRules from './AdaptiveAccountRules';
import AdaptiveDeviceRules from './AdaptiveDeviceRules';
import AdaptiveTransactionRules from './AdaptiveTransactionRule';
import AdaptiveUserRules from './AdaptiveUserRules'
import AdaptiveMerchantRules from './AdaptiveMerchantRules';

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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#728FCE",
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
            <Typography>{children}</Typography>
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

  function RBAManagement() {

    const history = useHistory();
    const location = useLocation();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
          <>
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
                              //href="/Users"
                              onClick={useCallback(() =>
                                history.push("/AxiomProtect/Applications")
                              )}
                              label="Applications"
                              style={{ cursor: "pointer" }}
                            />
                            <StyledBreadcrumb
                                label="RBA Config"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                    </Grid>
                 </Grid>
                 <br />
                <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                              <h4>Adaptive Rules</h4>
                            </Typography>
                          </Grid>
                </Grid>
            </div>
            <Box sx={{ width: '100%',marginLeft: '20px' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Account" {...a11yProps(0)} />
                    <Tab label="Location" {...a11yProps(1)} />
                    <Tab label="Device" {...a11yProps(2)} />
                    <Tab label="Transaction" {...a11yProps(3)} />
                    <Tab label="Merchant" {...a11yProps(4)} />
                    <Tab label="User" {...a11yProps(4)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <AdaptiveAccountRules />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AdaptiveLocationRules />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <AdaptiveDeviceRules />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <AdaptiveTransactionRules />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <AdaptiveMerchantRules />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <AdaptiveUserRules />
                </TabPanel>
            </Box>
          </>
      )
  }

  export default RBAManagement