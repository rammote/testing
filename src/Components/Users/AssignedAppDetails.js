import React, { useState, useCallback } from 'react';
import Server from '../APIUrl';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
   
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AllUserDetails from './AllUserDetails';
import SonicDetails from './SonicDetails';
import AssignToken from './AssignToken';
import Geolocation from './Geolocation';
import Device from './Device';
import Certficate from './Certficate';

const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

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


   

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    // height: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    fontFamily: 'Jost',
};


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


export default function AssignedAppDetails() {

    const history = useHistory();
    const location = useLocation();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                                component="a" 
                                //href="/Users" 
                                onClick={useCallback(() => history.push('/AxiomProtect/Users'))}
                                label="Users" 
                                style={{cursor: 'pointer'}}
                            />
                            <StyledBreadcrumb
                                label="User Details"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                            <h4>Assigned App Details</h4>
                        </Typography>
                    </Grid>
                </Grid>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{width: "1160px"}}>
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Certificate</Typography>} {...a11yProps(0)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Token</Typography>} {...a11yProps(1)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Geolocation</Typography>} {...a11yProps(2)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Device</Typography>} {...a11yProps(3)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Absolute Details</Typography>} {...a11yProps(4)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Sonic Details</Typography>} {...a11yProps(5)} />
                    </Tabs>
                <TabPanel value={value} index={0}>
                    <Certficate />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AssignToken data={location.state.row} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Geolocation />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Device />
                </TabPanel>

                <TabPanel value={value} index={4}>
                    <AllUserDetails />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <SonicDetails />
                </TabPanel>
                </Box>
            </div>
        </>
    )
}