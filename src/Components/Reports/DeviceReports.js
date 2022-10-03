import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { emphasize, styled } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeviceReportChart from './DeviceReport/DeviceReportChart';
import DeviceReportTable from './DeviceReport/DeviceReportTable';
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



// interface DatasetType {
//     data: number[];
//     backgroundColor: string[];
// }

export default function Reports() {
    const history = useHistory();
    const [duration, setDuration] = useState(7)
    const handleChangeDuration = (e) => {
        e.preventDefault();
        setDuration(e.target.value);
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
                            label="Device Reports"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Typography 
                    style={{
                      display:"flex", 
                      flexDirection:"row",
                      justifyContent:"space-between", 
                      width:"100%", 
                      alignItems:"center"
                    }}
                    sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                      <h4>Device Reports</h4>
                      
                      <FormControl  size="small">
                        <InputLabel>Select Date</InputLabel>

                        <Select
                          value={duration}
                          label="Select Date"
                          onChange={handleChangeDuration}
                          MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "center",
                            },
                          }}
                        >
                          <MenuItem value={7}>Last 7 days</MenuItem>
                          <MenuItem value={14}>Last 2 weeks</MenuItem>
                          <MenuItem value={30}>Last 1 month</MenuItem>
                          <MenuItem value={90}>Last 3 months</MenuItem>
                        </Select>
                      </FormControl>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
        <DeviceReportChart duration={duration}/>
        </Grid>
        </Grid>
        <br/>
            <div style={{width:"100%",placeItems:"center", margin:'0'}}>
            
               <DeviceReportTable duration={duration}/>
        
            </div>
        </div>
    );
}