import { Link, useHistory } from 'react-router-dom';
import Server from '../../APIUrl';
import React, { useCallback } from 'react'
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import axios from 'axios'
import Swal from 'sweetalert2'
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Input = styled('input')({
    display: 'none',
});


const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function SAML_part_first() {

const history = useHistory();
const authToken = sessionStorage.getItem("jwtToken");
const accountId = sessionStorage.getItem("accountId");

const [appName, setAppName] = React.useState("");
const [appLogo, setAppLogo] = React.useState("");
const [appType, setAppType] = React.useState("1");


// const handleSubmit = event => {
//     event.preventDefault()
//     console.log()
    
//                        // const url = "http://demo.axiomprotect.com:1243/AxiomProtect/v1/operator/create?userCount=0&requestTime=2021-09-22+17%3A35%3A02.676"
//      const filedata = new FormData();
//      filedata.append( 
//      "appLogo", appLogo
//     //  this.state.appLogo
//      );
//      console.log(filedata)
//     Server.post(`/application/addApplication?appName=${appName}&appType=${appType}&accountId=${accountId}&requestTime=${requestTime}`, filedata ,{
        
//         headers: {
//             "Content-Type":"multipart/form-data; boundary=<calculated when request is sent>",
//             "authToken": authToken
//         },
//     })
//     .then((response) => {

//         if(response.data.resultMessage == "Application added successfully"){

//             console.log(response.data)
//             Swal.fire({
//                 title: 'Successfully Added',
//                 icon: 'success',
//                 showCancelButton: true,
//                 // confirmButtonText: 'Yes, delete it!',
//                 //cancelButtonText: 'OK'
//             })
//             history.push({
//                 pathname: "/Applications"
//             })

//         }else{
//             Swal.fire({
//                 title: 'Something went wrong?',
//                 icon: 'error',
//                 showCancelButton: true,
//                 // confirmButtonText: 'Yes, delete it!',
//                 //cancelButtonText: 'OK'
//             })
//         }
        
//     }).catch((err) => {
//         console.log(err)
        
//     })
               
// }

        return (
            

            <div style={{paddingTop: '90px', paddingLeft: "20px"}}>
                    <Grid container >
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
                                    // onClick={useCallback(() => history.push('/Applications'))}
                                    label="Protect application" 
                                    style={{cursor: 'pointer'}}
                                />
                                <StyledBreadcrumb
                                    label="Create SAML integration"
                                    deleteIcon={<ExpandMoreIcon />}
                                />
                            </Breadcrumbs>
                            <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                                <h4>User profile mapping</h4>
                            </Typography>
                            
                            <Typography sx={{fontFamily: 'Jost', fontSize: '15px', color: '#232E3C'}}>
                                User name is set by ‘ application name’
                            </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Divider sx={{borderColor: '#BABABA', width: '1160px'}}/>
                    <br />
            <br />

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Choose an attribute or enter an expression</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select fullWidth size="small"
                        label="ccccccc"
                        name="databaseType"
                        id="databaseType" >
                        
                        <MenuItem value={'Mysql'}>Mysql</MenuItem>
                        <MenuItem value={'Oracle'}>Oracle</MenuItem>
                        <MenuItem value={'LDAP'}>LDAP</MenuItem>

                    </Select>
                </Grid>
            </Grid>
            <br />

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Choose an attribute or enter an expression</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select fullWidth size="small"
                    
                        name="databaseType"
                        id="databaseType" >
                        
                        <MenuItem value={'Mysql'}>Mysql</MenuItem>
                        <MenuItem value={'Oracle'}>Oracle</MenuItem>
                        <MenuItem value={'LDAP'}>LDAP</MenuItem>

                    </Select>
                </Grid>
            </Grid>
            <br />

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Choose an attribute or enter an expression</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select fullWidth size="small"
                    
                        name="databaseType"
                        id="databaseType" >
                        
                        <MenuItem value={'Mysql'}>Mysql</MenuItem>
                        <MenuItem value={'Oracle'}>Oracle</MenuItem>
                        <MenuItem value={'LDAP'}>LDAP</MenuItem>

                    </Select>
                </Grid>
            </Grid>
            <br />

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Choose an attribute or enter an expression</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select fullWidth size="small"
                    
                        name="databaseType"
                        id="databaseType" >
                        
                        <MenuItem value={'Mysql'}>Mysql</MenuItem>
                        <MenuItem value={'Oracle'}>Oracle</MenuItem>
                        <MenuItem value={'LDAP'}>LDAP</MenuItem>

                    </Select>
                </Grid>
            </Grid>
            <br />

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Choose an attribute or enter an expression</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select fullWidth size="small"
                    
                        name="databaseType"
                        id="databaseType" >
                        
                        <MenuItem value={'Mysql'}>Mysql</MenuItem>
                        <MenuItem value={'Oracle'}>Oracle</MenuItem>
                        <MenuItem value={'LDAP'}>LDAP</MenuItem>

                    </Select>
                </Grid>
            </Grid>
            <br />

            <br />
            <Grid container spacing={4} sx={{marginLeft: '60%'}}>
                <Grid item >
                    <Button variant="contained" style={{color:'#000', backgroundColor:'#F4F6FA',fontFamily: 'Jost'}}>Cancel</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" style={{color:'#FFFFFF', backgroundColor:'#206BC4',fontFamily: 'Jost'}}>Save mapping</Button>
                </Grid>
            </Grid>
            <br /><br />
        </div>
        )
}