import React, { useState, useCallback } from 'react';
import Server from '../../APIUrl';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
//import Switch from '@mui/material/Switch';
import axios from 'axios'
import Swal from 'sweetalert2'
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

export default function RadiusSettings(props) {

    const location = useLocation();
    // const { appId } = (props.location && props.location.state) || { };
    const appId = location.state.appId;
    console.log(location)
    const history = useHistory();
    const authToken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    
    const[show, setShow] = React.useState("false");
    const [role, setRole] = React.useState("");
    // const [axiomvalidation, setAxiomValidation] = React.useState("");
    // const [ldapvalidation, setldapvalidation] = React.useState("");
    const [radiusClientAuthtype, setRadiusClientAuthType] = React.useState("OTP Only");
    const [radiusClientIp, setRadiusClientIp] = React.useState("");
    const [radiusClientSecretkey, setRadiusClientSecretKey] = React.useState("");
    const [radiusClientSecretkeyConfirm, setRadiusClientSecretKeyConfirm] = React.useState("");
    const[sonicDoc,setSonicDoc] = React.useState("");
    // const [fields, setFields] = useState([{ value: null }]);
    // function handleChange(i, event) {
    //     const values = [...fields];
    //     values[i].value = event.target.value;
    //     setFields(values);
    // }
    
    // function handleAdd() {
    //     const values = [...fields];
    //     values.push({ value: null });
    //     setFields(values);
    // }
    
    // function handleRemove(i) {
    //     const values = [...fields];
    //     values.splice(i, 1);
    //     setFields(values);
    // }
const [ldapValidation, setLdapValidation] = useState(false)
    const [ldapConfig, setLdapConfig] = React.useState({
        
        ldapServerIp: "",
        ldapServerPort: 0,
        ldapSearchPath: "",
        
    })

    const handleSubmit = event => {
        event.preventDefault()
        console.log(role)
        console.log(radiusClientAuthtype)
        console.log(radiusClientIp)
        console.log(radiusClientSecretkey)
        console.log(appId)
        console.log(accountId)
        console.log(requestTime)
        if(radiusClientSecretkey!==radiusClientSecretkeyConfirm){
            Swal.fire({
                title: "Secrete key Not Matching",
                icon: 'error',
                showCancelButton: true,
            })
            return;
        }
        else{
            Server.post(`/radius/addRadiusApplicationSettings?appId=${appId}&accountId=${accountId}&requestTime=${requestTime}`,
        {
            "axiomvalidation": !ldapValidation,
            "ldapvalidation": ldapValidation,
            "radiusClientAuthtype": radiusClientAuthtype,
            "radiusClientIp": radiusClientIp,
            "radiusClientSecretkey": radiusClientSecretkey,
            "ldapSearchPath": ldapConfig?.ldapSearchPath,
            "ldapServerIp": ldapConfig?.ldapServerIp,
            "ldapServerPort": ldapConfig?.ldapServerPort,
        },{
            headers: {
                'content-type': 'application/json',
                "authToken": authToken
            },
        })
        .then((response) => {
    
            if(response.data.resultCode == 0){
    
                console.log(response.data)
                Swal.fire({
                    title: response.data.resultMessage,
                    icon: 'success',
                    showCancelButton: true,
                })
                history.push({
                    pathname: "/AxiomProtect/Applications"
                })
    
            }else{
                Swal.fire({
                    title: response.data.resultMessage,
                    icon: 'error',
                    showCancelButton: true,
                })
            }
        }).catch((err) => {
            console.log(err)
        })
        }
    }

    const redirectSubmit = (e) => {
        history.push({
            pathname: "/AxiomProtect/RadiusServerConfig"
        })
    }

    const handleSonic = (e) => {
        e.preventDefault()
        setSonicDoc(true)
    }

    

    function renderFirstPart() {
        return (
            <div>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Display Name</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth size="small" type="text" name="name" id="email" label="Name" variant="outlined" />
                    </Grid>
                </Grid>
                <br />
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>App Logo</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* <TextField style={{width: 250}} size="small" type="text" name="name" id="email" label="Upload" variant="outlined" />
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                <Button variant="contained" component="span" sx={{backgroundColor: '#BABABA', color: '#232E3C', borderRadius: '0px'}}>
                                Upload
                                </Button>
                            </label> */}
                            <tr>
                             {/* <td><p>App Logo</p></td> */}
                                <td><input type='file' /></td>
                            </tr>
                        </Grid>
                    </Grid>
                    <br />
                    {/* <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Validation Source</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-balel="radio-buttons" name="row-radio-buttons-group" defaultValue="ldap">
                                    <FormControlLabel value="ldap" control={<Radio />} label="Use LDAP/Active Directory as Source" />
                                    <FormControlLabel value="axiom" control={<Radio />} label="Use AXIOM User Repository as Source" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid> */}
                    <br />
                <Divider sx={{borderColor: '#BABABA', width: '1000px', }}/>
                <br />
                <br />
                <Grid container spacing={4} sx={{marginLeft: '68%'}}>
                    <Grid item >
                        <Button variant="text" sx={{fontFamily: 'Jost'}}>Next</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" style={{color:'#FFFFFF', backgroundColor:'#206BC4',fontFamily: 'Jost'}} onClick={handleSubmit}>Create Radius Integration</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
console.log({ldapValidation})
console.log({ldapConfig});
console.log({radiusClientAuthtype});
console.log({radiusClientIp});  
console.log({radiusClientSecretkey});
    function renderNextPart() {
        return (
            <form autoComplete="off">
                <br />
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Client Authentication Type</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Select fullWidth size="small"
                                defaultValue={radiusClientAuthtype}
                                name=" radiusClientAuthtype"
                                id=" radiusClientAuthtype" 
                                onChange={(e) => setRadiusClientAuthType(e.target.value)}
                            >
                                <MenuItem value={'OTP Only'}>OTP Only</MenuItem>
                                <MenuItem value={'Password Only'}>Password Only</MenuItem>
                                <MenuItem value={'OTP+Password'}>OTP + Password</MenuItem>
                                <MenuItem value={'Push'}>Push</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={3}row>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Radius Client IP</Typography>
                        </Grid>
                        <Grid item spacing={3}>
                            <TextField  size="small" type="text" name="name" id="email" label="Radius Client IP" variant="outlined" placeholder='Add Client Ip' onChange={(e) => setRadiusClientIp(e.target.value)}/>
                        </Grid>
                        {/* <Grid item spacing={3}>
                            <TextField style = {{width: 60}} size="small" type="text" name="name" id="email" variant="outlined" />
                        </Grid>
                        <Grid item spacing={3}>
                            <TextField style = {{width: 60}} size="small" type="text" name="name" id="email" variant="outlined" />
                        </Grid>
                        <Grid item spacing={3}>
                            <TextField style = {{width: 60}} size="small" type="text" name="name" id="email" variant="outlined" />
                        </Grid>
                        <Grid item spacing={3}>
                            <TextField style = {{width: 60}} size="small" type="text" name="name" id="email" variant="outlined" />
                        </Grid> */}
                        {/* <Grid item>
                            <Button variant="text" sx={{fontFamily: 'Jost'}}onClick={() => handleAdd()}>Add IP</Button>
                        </Grid>
                        <Grid item row>
                            {fields.map((field, idx) => {
                                return (
                                <div key={`${field}-${idx}`}>
                                    <Grid item>
                                        <TextField style = {{width: 90}} size="small" type="text" name="name" id="email" variant="outlined" value={field.value || ""} onChange={e => handleChange(idx, e)}/>
                                        <IconButton aria-label="delete" type="button" onClick={() => handleRemove(idx)}>
                                            <DeleteIcon style={{ color: '#5C5C5C', height: '20px', width:'20px' }} size="small"/>
                                        </IconButton>
                                    </Grid>
                                </div>
                                );
                            })}
                        </Grid> */}
                    </Grid>
                    <br />
                    {/* <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Day Restriction</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                size="small"
                                // options={dropdowntypes}
                                renderInput={(params) => <TextField {...params} label={<Typography sx={{fontFamily: 'Jost'}}>Weekends only</Typography>}/>}
                            />
                        </Grid>
                    </Grid>
                    <br /> */}
                    {/* <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Time Range Restriction</Typography>
                        </Grid>
                        <Grid item spacing={5}>
                            <Switch {...label} defaultChecked />
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            
                        </Grid>
                        <Grid item spacing={2}>
                            <TextField style = {{width: 120}} size="small" type="text" name="name" id="email" label="Select time" variant="outlined" />
                        </Grid>
                        <Grid item spacing={2}>
                            <TextField style = {{width: 60}} size="small" type="text" name="name" id="email" label="AM" variant="outlined" />
                        </Grid>
                        <Grid item spacing={5}>
                            
                            <Typography sx={{fontFamily:'Jost', color: '#5C5C5C', marginTop: '10px'}}>To</Typography>
                        </Grid>
                        <Grid item spacing={2}>
                            <TextField style = {{width: 120}} size="small" type="text" name="name" id="email" label="Select time" variant="outlined" />
                        </Grid>
                        <Grid item spacing={2}>
                            <TextField style = {{width: 60}} size="small" type="text" name="name" id="email" label="PM" variant="outlined" />
                        </Grid>
                    </Grid>
                    <br /> */}

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Validation Source</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-balel="radio-buttons" defaultValue={ldapValidation ? "ldapvalidation" : "axiomvalidation"} name="row-radio-buttons-group" type="radio" onChange={(e)=> setLdapValidation("ldapvalidation" === e.target.value ? true : false)}>
                                    <FormControlLabel value="ldapvalidation"  control={<Radio />} label="Use LDAP/Active Directory as Source" />
                                    <FormControlLabel value="axiomvalidation" control={<Radio />} label="Use AXIOM User Repository as Source" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Client Shared Secret</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField style={{width: 250}} size="small" type="password" name="name" id="email" label="Client Shared Secret" variant="outlined" onChange={(e) => setRadiusClientSecretKey(e.target.value)}/>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Confirm Client Shared Secret</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField style={{width: 250}} size="small" type="password" name="name" id="email" label="Confirm Client Shared Secret" variant="outlined" onChange={(e) => setRadiusClientSecretKeyConfirm(e.target.value)}/>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                    <Divider sx={{borderColor: '#BABABA', width: '1000px', }}/>
                    <br />
                    {ldapValidation == true &&
                    <Container>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={4} style={{marginTop: 15}}>
                            LDAP Host/:Port
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField fullWidth size="small" type="text" name="ldapServerIp" id="ldapServerIp" label="Host Address" variant="outlined" value={ldapConfig.ldapServerIp} onChange={(e) => setLdapConfig({ ...ldapConfig, ldapServerIp: e.target.value })}/>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField fullWidth size="small" type="number" name="ldapServerPort" id="ldapServerPort" label="Port" variant="outlined" value={ldapConfig.ldapServerPort} onChange={(e) => setLdapConfig({ ...ldapConfig, ldapServerPort: Number(e.target.value) })}/>
                        </Grid>

                    </Grid>
                    <br />
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={4} style={{marginTop: 15}}>
                            LDAP Search Path
                        </Grid> 

                        <Grid item xs={12} md={4}>
                            <TextField fullWidth size="small" type="text" name="ldapSearchPath" id="ldapSearchPath" label="Base DN" variant="outlined" value={ldapConfig.ldapSearchPath} onChange={(e) => setLdapConfig({ ...ldapConfig, ldapSearchPath: e.target.value })}/>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField fullWidth size="small" type="text" name="tableName" id="tableName" label="Leave Blank is no Authentication" variant="outlined" value={ldapConfig.tableName} onChange={(e) => setLdapConfig({ ...ldapConfig, tableName: e.target.value })}/>
                        </Grid>

                    </Grid>
                    </Container>
                    }
                    <br />
                    <br />
                    <Grid container spacing={4}>
                        <Grid item >
                            <center>
                            <Button type="submit" variant="contained" sx={{fontFamily: 'Jost'}} onClick={handleSubmit} >Update</Button>
                            </center>
                        </Grid>

                        <Grid item >
                            <center>
                            <Button type="submit" variant="contained" sx={{fontFamily: 'Jost'}} onClick={redirectSubmit} >View Radius Configuration Setting</Button>
                            </center>
                        </Grid>
                    </Grid>

                    
            </form>
        );
    }

        return (
            <>
            <form autoComplete="off" spellCheck="false" style={{paddingTop: '90px', paddingLeft: "20px"}}>
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
                                    onClick={useCallback(() => history.push('/AxiomProtect/Applications'))}
                                    label="Applications" 
                                    style={{cursor: 'pointer'}}
                                />
                                <StyledBreadcrumb
                                    label="Add new radius integration"
                                    deleteIcon={<ExpandMoreIcon />}
                                />
                            </Breadcrumbs>
                            <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                                <h4>Add new radius settings</h4>
                            </Typography>
                            <Typography sx={{fontFamily: 'Jost', fontSize: '15px', color: '#5C5C5C'}}>
                                Step 2 out of 2
                            </Typography>
                            <Typography sx={{fontFamily: 'Jost', fontSize: '15px', color: '#232E3C'}}>
                                General App settings
                            </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Divider sx={{borderColor: '#BABABA', width: '1000px'}}/>
                    <br />
                    {!show  ? renderFirstPart() : (renderNextPart())}
                <br />
                <br />
            </form>
            </>
        )
    
}