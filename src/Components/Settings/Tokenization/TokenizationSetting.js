import React, { useState, useCallback, useEffect } from "react";
import Server from '../../APIUrl';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import Tooltip from '@mui/material/Tooltip'; 
import { Link, useHistory, useLocation } from "react-router-dom";
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
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";


const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);
const authtoken = sessionStorage.getItem("jwtToken");
const accountId = sessionStorage.getItem("accountId");




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

    const location = useLocation();
    const history = useHistory();
    

    useEffect(() => {
    console.log(location.state)
    if(!location.state || !location.state?.merchantid) history.push("/AxiomProtect/DashBoard")
    }, [])

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


export default function TokenizationSetting() {

    const history = useHistory();
    const location = useLocation();
    const [rows, setRows] = React.useState([])

    const [tokenizationSettingData, settokenizationSettingData] = React.useState({
        
        callBackUrl: "",
        callBackUrlEnabled: "",
        checkData: "",
        checkLUNH: "",
        dataSize: "",
        editData: "",
        encryptionAlgo: "",
        hsmAlias: "",
        hsmPassword: "",
        integrityHashingAlgo: "",
        isRestrictTime: "",
        isRestrictedDays: "",
        ishsmenabled: "",
        keyLength: "",
        maxActiveTokenSize: "",
        pfxFilePath: "",
        pfxPassword: "",
        randomNumberGenerationMethod: "",
        recurringUsageDays: "",
        recurringUsageMonths: "",
        recurringUsageYears: "",
        storgeEncrptionAlgo: "",
        tokenAccessFor: "",
        tokenCreationOption: "",
        tokenDataFormat: "",
        tokenExpiry: "",
        tokenLength: "",
        tokenRestrictDayEnd: "",
        tokenRestrictDayStart: "",
        tokenRestrictTimeEnd: "",
        tokenRestrictTimeStart: "",
        tokenSchemeCode: "",
        tokenUses: "",
        tokenValidityDays: "",
        tokenValidityTime: "",
        tokenizationmaskingFields: "",
        
    })

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleSubmit =async (e) => {
        e.preventDefault()
        console.log(tokenizationSettingData)
      
        Server.post(`/settings/addTokenizationSettings?accountId=${accountId}&merchantId=${location.state.merchantid}&requestTime=${requestTime}`, tokenizationSettingData, {
            
            
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*"
            },
        })
            .then((response) => {
                
                console.log(response.data)

                
                //history.push("/RadiusServerConfig")
                /*window.location.href="/Setpassword";*/
               console.log(response.data)

                if(response.data.resultCode === 0){
                    Swal.fire("Success",response.data.resultMessage,"success")
                    settokenizationSettingData({...tokenizationSettingData,
                        isLoading: false,
                        isSuccess: true,
                        isError: false,
                        isSnackbarOpen: true
                        
                    })
                }else settokenizationSettingData({
                    callBackUrl: "",
                    callBackUrlEnabled: "",
                    checkData: "",
                    checkLUNH: "",
                    dataSize: "",
                    editData: "",
                    encryptionAlgo: "",
                    hsmAlias: "",
                    hsmPassword: "",
                    integrityHashingAlgo: "",
                    isRestrictTime: "",
                    isRestrictedDays: "",
                    ishsmenabled: "",
                    keyLength: "",
                    maxActiveTokenSize: "",
                    pfxFilePath: "",
                    pfxPassword: "",
                    randomNumberGenerationMethod: "",
                    recurringUsageDays: "",
                    recurringUsageMonths: "",
                    recurringUsageYears: "",
                    storgeEncrptionAlgo: "",
                    tokenAccessFor: "",
                    tokenCreationOption: "",
                    tokenDataFormat: "",
                    tokenExpiry: "",
                    tokenLength: "",
                    tokenRestrictDayEnd: "",
                    tokenRestrictDayStart: "",
                    tokenRestrictTimeEnd: "",
                    tokenRestrictTimeStart: "",
                    tokenSchemeCode: "",
                    tokenUses: "",
                    tokenValidityDays: "",
                    tokenValidityTime: "",
                    tokenizationmaskingFields: "",
                    
                })
            
            }).catch((err) => {
                console.log(err)
                settokenizationSettingData({
                    callBackUrl: "",
                    callBackUrlEnabled: "",
                    checkData: "",
                    checkLUNH: "",
                    dataSize: "",
                    editData: "",
                    encryptionAlgo: "",
                    hsmAlias: "",
                    hsmPassword: "",
                    integrityHashingAlgo: "",
                    isRestrictTime: "",
                    isRestrictedDays: "",
                    ishsmenabled: "",
                    keyLength: "",
                    maxActiveTokenSize: "",
                    pfxFilePath: "",
                    pfxPassword: "",
                    randomNumberGenerationMethod: "",
                    recurringUsageDays: "",
                    recurringUsageMonths: "",
                    recurringUsageYears: "",
                    storgeEncrptionAlgo: "",
                    tokenAccessFor: "",
                    tokenCreationOption: "",
                    tokenDataFormat: "",
                    tokenExpiry: "",
                    tokenLength: "",
                    tokenRestrictDayEnd: "",
                    tokenRestrictDayStart: "",
                    tokenRestrictTimeEnd: "",
                    tokenRestrictTimeStart: "",
                    tokenSchemeCode: "",
                    tokenUses: "",
                    tokenValidityDays: "",
                    tokenValidityTime: "",
                    tokenizationmaskingFields: "",
                    
                })
            })
    }

    React.useEffect(() => {
        

        Server.get(`/settings/getTokenizationSettings?accountId=${accountId}&merchantId=${location.state.merchantid}&requestTime=${requestTime}`, {
            headers: {
              'content-type': 'application/json',
              authToken: authtoken,
              "Access-Control-Allow-Origin":"*",
              "Access-Control-Allow-Methods":"*"

            },
        })
        .then((response) => {
          console.log(response.data)
          if((response.data.resultCode == 0 || response.data.resultMessage == "Success")){
            settokenizationSettingData(response.data.resultData)
        }

           
       }).catch((err) => {
           console.log(err)
          setRows([])

          

       })
    }, [])

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
                                onClick={useCallback(() => history.push('/AxiomProtect/TokenizationSetting'))}
                                label="TokenizationSetting" 
                                style={{cursor: 'pointer'}}
                            />
                            
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                            <h4>TokenizationSetting</h4>
                        </Typography>
                        <p>These following settings are global to this channel to offer more flexibility in terms of user, Tokenization SettingS</p>
                    </Grid>
                </Grid>
                <hr/>
                

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{width: "1160px"}}>
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Token Creation</Typography>} {...a11yProps(0)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Token Properties</Typography>} {...a11yProps(1)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Token Security</Typography>} {...a11yProps(2)} />
                    <Tab label= {<Typography sx={{fontFamily: 'Jost'}}>Token Access</Typography>} {...a11yProps(3)} />
                    </Tabs>
                    
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={2} style={{marginTop: 5}}>
                            Create Token Using
                        </Grid>

                        <Grid item xs={12} md={9}>
                            <Select fullWidth size="small" name="createToken" id="createToken">
                                        
                                <MenuItem value={'Option3'}>Option3</MenuItem>
                               
                                
                            </Select>
                        </Grid>

                    </Grid>
                    <br/>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={2} style={{marginTop: 5}}>
                           Option 1
                        </Grid>

                        <Grid item xs={12} md={4} style={{marginTop: 5}}>
                            Random Number Generation with token length
                        </Grid>

                        <Grid item xs={12} md={2} >
                            <Select fullWidth size="small" name="tokenLength" id="tokenLength"
                            value={tokenizationSettingData.tokenLength} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, tokenLength: e.target.value })}>
                                        
                            <MenuItem value={'8'}>8</MenuItem>
                                <MenuItem value={'9'}>9</MenuItem>
                                <MenuItem value={'10'}>10</MenuItem>
                                <MenuItem value={'11'}>11</MenuItem>
                                <MenuItem value={'12'}>12</MenuItem>
                                <MenuItem value={'13'}>13</MenuItem>
                                <MenuItem value={'14'}>14</MenuItem>
                                <MenuItem value={'15'}>15</MenuItem>
                                <MenuItem value={'16'}>16</MenuItem>
                                <MenuItem value={'17'}>17</MenuItem>
                                <MenuItem value={'18'}>18</MenuItem>
                                <MenuItem value={'19'}>19</MenuItem>

                            </Select>
                        </Grid>

                        <Grid item xs={12} md={1} style={{marginTop: 5}}>
                            with
                        </Grid>

                        <Grid item xs={12} md={2}>
                          
                            <Select fullWidth size="small" name="with" id="with"
                            value={tokenizationSettingData.with} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, with: e.target.value })}>
                                        
                                <MenuItem value={'Numeric'}>Numeric</MenuItem>
                                <MenuItem value={'Alphanumeric'}>Alphanumeric</MenuItem>
                                

                            </Select>
                        </Grid>

                    </Grid>

                    <br/>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={2} style={{marginTop: 5}}>
                           Option 2
                        </Grid>

                        <Grid item xs={12} md={4} style={{marginTop: 5}}>
                            Protected with Encryption using
                        </Grid>

                        <Grid item xs={12} md={2} >
                            <Select fullWidth size="small" name="databaseType" id="databaseType"
                            value={tokenizationSettingData.databaseType} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, databaseType: e.target.value })}>
                                        
                                <MenuItem value={'AES'}>AES</MenuItem>
                                <MenuItem value={'3DES'}>3DES</MenuItem>
                                <MenuItem value={'SALT'}>SALT</MenuItem>
                                <MenuItem value={'RSA'}>RSA</MenuItem>

                            </Select>
                        </Grid>

                        <Grid item xs={12} md={1} style={{marginTop: 5}}>
                            And Key Length
                        </Grid>

                        <Grid item xs={12} md={2}>
                          
                            <Select fullWidth size="small" name="keyLength" id="keyLength"
                            value={tokenizationSettingData.keyLength} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, keyLength: e.target.value })}>
                                        
                                <MenuItem value={'128-bit'}>128 bit</MenuItem>
                                <MenuItem value={'256-bit'}>256 bit</MenuItem>
                            </Select>
                        </Grid>

                    </Grid>

                    <br/>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={2} style={{marginTop: 5}}>
                          
                        </Grid>

                        <Grid item xs={12} md={4} style={{marginTop: 5}}>
                            For RSA encryption PFX:
                        </Grid>

                        <Grid item xs={12} md={2} >
                            <TextField fullWidth size="small" name="pfxFilePath" id="pfxFilePath" type="file"  
                            value={tokenizationSettingData.pfxFilePath} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, pfxFilePath: e.target.value })}/>
                        </Grid>

                       

                        <Grid item xs={12} md={3}>
                          
                            <TextField fullWidth size="small" type="text" name="pfxPassword" id="pfxPassword" label="Enter Password" variant="outlined" 
                            value={tokenizationSettingData.pfxPassword} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, pfxPassword: e.target.value })}/>
                        </Grid>

                    </Grid>

                    <br/>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={2} style={{marginTop: 5}}>
                            Option 3
                        </Grid>

                        <Grid item xs={12} md={4} style={{marginTop: 5}}>
                            Data Integrity using Hashing
                        </Grid>

                        <Grid item xs={12} md={2} >
                            <Select fullWidth size="small" name="integrityHashingAlgo" id="integrityHashingAlgo"
                            value={tokenizationSettingData.integrityHashingAlgo} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, integrityHashingAlgo: e.target.value })}>
                                        
                                <MenuItem value={'MD5'}>MD5</MenuItem>
                                <MenuItem value={'SHA-1'}>SHA-1</MenuItem>
                                <MenuItem value={'SHA-256'}>SHA-256</MenuItem>
                                
                            </Select>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={2} style={{marginTop: 5}}>
                            Token Usage
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Select fullWidth size="small" name="tokenUses" id="tokenUses"
                            value={tokenizationSettingData.tokenUses} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, tokenUses: e.target.value })}>

                                <MenuItem value={'Single'}>Single</MenuItem>              
                                <MenuItem value={'Multiple'}>Multiple</MenuItem>
                                
                            </Select>
                        </Grid>

                        <Grid item xs={12} md={2} style={{marginTop: 5}}>
                            Token Validity Days
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Select fullWidth size="small" name="tokenValidityDays" id="tokenValidityDays"
                            value={tokenizationSettingData.tokenValidityDays} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, tokenValidityDays: e.target.value })}>
                                        
                                <MenuItem value={'2'}>2</MenuItem>
                                <MenuItem value={'3'}>3</MenuItem>
                                <MenuItem value={'4'}>4</MenuItem>
                                <MenuItem value={'5'}>5</MenuItem>
                                <MenuItem value={'6'}>6</MenuItem>
                                <MenuItem value={'7'}>7</MenuItem>
                                <MenuItem value={'8'}>8</MenuItem>
                                <MenuItem value={'9'}>9</MenuItem>
                               
                            </Select>
                        </Grid>

                        <Grid item xs={12} md={1} style={{marginTop: 5}}>
                            Time
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField size="small" type="text" name="tokenValidityTime" id="tokenValidityTime" label="Enter Time" variant="outlined" 
                            value={tokenizationSettingData.tokenValidityTime} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, tokenValidityTime: e.target.value })}/>
                        </Grid>

                    </Grid>
                    <br/>
                        <Grid container spacing={2}>

                            <Grid item xs={12} md={2} style={{marginTop: 5}}>
                                Accept Data Formats
                            </Grid>

                            <Grid item xs={12} md={2} style={{marginTop: 5}}>
                                <Select fullWidth size="small" name="acceptDataFormats" id="acceptDataFormats"
                                value={tokenizationSettingData.acceptDataFormats} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, acceptDataFormats: e.target.value })}>
                                        
                                    <MenuItem value={'XML'}>XML</MenuItem>
                                    <MenuItem value={'JSON'}>JSON</MenuItem>
                                
                                </Select>
                            </Grid>

                            <Grid item xs={12} md={2} style={{marginTop: 5}}>
                                Masking for
                            </Grid>

                            <Grid item xs={12} md={5}>
                            
                                <Select fullWidth size="small" name="tokenizationmaskingFields" id="tokenizationmaskingFields"
                                value={tokenizationSettingData.tokenizationmaskingFields} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, tokenizationmaskingFields: e.target.value })}>
                                            
                                    <MenuItem value={'Numeric'}>Numeric</MenuItem>
                                    <MenuItem value={'Alphanumeric'}>Alphanumeric</MenuItem>
                                    
                                </Select>
                            </Grid>

                        </Grid>

                        <br/>
                        <Grid container spacing={2}>

                            <Grid item xs={12} md={2} style={{marginTop: 5}}>
                                LUHN Check
                            </Grid>

                            <Grid item xs={12} md={2} style={{marginTop: 5}}>
                                <Select fullWidth size="small" name="checkLUNH" id="checkLUNH"
                                value={tokenizationSettingData.checkLUNH} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, checkLUNH: e.target.value })}>
                                            
                                    <MenuItem value={'Yes'}>Yes</MenuItem>
                                    <MenuItem value={'No'}>No</MenuItem>
                                   
                                </Select>
                            </Grid>

                            <Grid item xs={12} md={2} style={{marginTop: 5}}>
                                Maximum Data Size
                            </Grid>

                            <Grid item xs={12} md={5}>
                            
                                <Select fullWidth size="small" name="dataSize" id="dataSize"
                                value={tokenizationSettingData.dataSize} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, dataSize: e.target.value })}>
                                            
                                    <MenuItem value={'128'}>128 bit</MenuItem>
                                    <MenuItem value={'256'}>256 bit</MenuItem>
                                </Select>
                            </Grid>

                        </Grid>

                        <br/>
                        <Grid container spacing={2}>

                        <Grid item xs={12} md={2} style={{marginTop: 5}}>
                            Operator Option
                        </Grid>

                        <Grid item xs={12} md={2} style={{marginTop: 5}}>
                            <Select fullWidth size="small" name="operatorOption" id="operatorOption"
                            value={tokenizationSettingData.operatorOption} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, operatorOption: e.target.value })}>
                                            
                                <MenuItem value={'Yes'}>Yes</MenuItem>
                                <MenuItem value={'No'}>No</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} md={4} >
                            for Edit Data
                        </Grid>


                        </Grid>

                        <br/>
                        <Grid container spacing={2}>

                            <Grid item xs={12} md={2} style={{marginTop: 5}}>
                               Call back URL
                            </Grid>

                            <Grid item xs={12} md={2} style={{marginTop: 5}}>
                                <Select fullWidth size="small" name="callBackUrl" id="callBackUrl"
                                value={tokenizationSettingData.callBackUrl} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, callBackUrl: e.target.value })}>
                                            
                                    <MenuItem value={'Yes'}>Yes</MenuItem>
                                    <MenuItem value={'No'}>No</MenuItem>
                                    
                                </Select>
                            </Grid>

                            <Grid item xs={12} md={2} style={{marginTop: 5}}>
                               URL
                            </Grid>

                            <Grid item xs={12} md={5} >
                                <TextField fullWidth size="small" type="text" name="url" id="url" label="Enter URL" variant="outlined" 
                                value={tokenizationSettingData.url} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, url: e.target.value })}/>
                            </Grid>
                        </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={3} style={{marginTop: 5}}>
                            HSM based Hardware Encryption
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Select fullWidth size="small" name="ishsmenabled" id="ishsmenabled"
                            value={tokenizationSettingData.ishsmenabled} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, ishsmenabled: e.target.value })}>

                                <MenuItem value={'Yes'}>Yes</MenuItem>              
                                <MenuItem value={'No'}>No</MenuItem>
                                
                            </Select>
                        </Grid>

                        <Grid item xs={12} md={1} style={{marginTop: 5}}>
                            Slot
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField size="small" type="text" name="hsmSlot" id="hsmSlot" label="Enter Slot" variant="outlined" 
                            value={tokenizationSettingData.hsmSlot} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, hsmSlot: e.target.value })}/>
                        </Grid>

                        <Grid item xs={12} md={1} style={{marginTop: 5}}>
                            Alias
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField size="small" type="text" name="hsmAlias" id="hsmAlias" label="Enter Alias" variant="outlined" 
                            value={tokenizationSettingData.hsmAlias} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, hsmAlias: e.target.value })}/>  
                        </Grid>

                       
                    </Grid> 
                    <br/>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={3} style={{marginTop: 5}}>
                            and Password
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField size="small" type="text" name="hsmPassword" id="hsmPassword" label="Enter Password" variant="outlined" 
                            value={tokenizationSettingData.hsmPassword} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, hsmPassword: e.target.value })}/>  
                        </Grid>

                        <Grid item xs={12} md={1} style={{marginTop: 5}}>
                            Encryption Algorithm
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Select fullWidth size="small" name="encryptionAlgorithm" id="encryptionAlgorithm"
                            value={tokenizationSettingData.encryptionAlgorithm} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, encryptionAlgorithm: e.target.value })}>

                                <MenuItem value={'Yes'}>Yes</MenuItem>              
                                <MenuItem value={'No'}>No</MenuItem>

                            </Select>
                        </Grid>

                    </Grid> 
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={3} style={{marginTop: 5}}>
                            Shared token between
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Select fullWidth size="small" name="SharedTokenBetween" id="SharedTokenBetween"
                            value={tokenizationSettingData.SharedTokenBetween} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, SharedTokenBetween: e.target.value })}>

                                <MenuItem value={'Single'}>Single</MenuItem>              
                                <MenuItem value={'Multiple'}>Multiple</MenuItem>
                                
                            </Select>
                        </Grid>

                        <Grid item xs={12} md={1} style={{marginTop: 5}}>
                            Systems
                        </Grid>

                    </Grid> 
                    <br/>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={3} style={{marginTop: 5}}>
                           Restrict within time
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Select fullWidth size="small" name=" isRestrictTime" id="isRestrictTime"
                            value={tokenizationSettingData.isRestrictTime} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, isRestrictTime: e.target.value })}>

                                <MenuItem value={'Yes'}>Yes</MenuItem>              
                                <MenuItem value={'No'}>No</MenuItem>

                            </Select>
                        </Grid>

                        <Grid item xs={12} md={1} style={{marginTop: 5}}>
                            Start
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField size="small" type="text" name="tokenRestrictTimeStart" id="tokenRestrictTimeStart" label="Start" variant="outlined" 
                            value={tokenizationSettingData.tokenRestrictTimeStart} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, tokenRestrictTimeStart: e.target.value })}/> 
                        </Grid>

                        <Grid item xs={12} md={1} style={{marginTop: 5}}>
                            End To
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField size="small" type="text" name="tokenRestrictTimeEnd" id="tokenRestrictTimeEnd" label="End To" variant="outlined" 
                            value={tokenizationSettingData.tokenRestrictTimeEnd} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, tokenRestrictTimeEnd: e.target.value })}/> 
                        </Grid>

                    </Grid> 
                    <br/>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={3} style={{marginTop: 5}}>
                           Restrict within days
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Select fullWidth size="small" name="isRestrictedDays" id="isRestrictedDays"
                            value={tokenizationSettingData.isRestrictedDays} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, isRestrictedDays: e.target.value })}>

                                <MenuItem value={'Yes'}>Yes</MenuItem>              
                                <MenuItem value={'No'}>No</MenuItem>

                            </Select>
                        </Grid>

                        <Grid item xs={12} md={1} style={{marginTop: 5}}>
                            From
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField size="small" type="text" name="tokenRestrictDayStart" id="tokenRestrictDayStart" label="from" variant="outlined" 
                            value={tokenizationSettingData.tokenRestrictDayStart} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, tokenRestrictDayStart: e.target.value })}/> 
                        </Grid>

                        <Grid item xs={12} md={1} style={{marginTop: 5}}>
                            To
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <TextField size="small" type="text" name="tokenRestrictDayEnd" id="tokenRestrictDayEnd" label="To" variant="outlined" 
                            value={tokenizationSettingData.tokenRestrictDayEnd} onChange={(e) => settokenizationSettingData({ ...tokenizationSettingData, tokenRestrictDayEnd: e.target.value })}/> 
                        </Grid>

                    </Grid> 
                </TabPanel>

                </Box>
                <br/>
                <Button variant="contained" sx={{fontFamily: 'Jost', marginLeft:'76%'}} onClick={(e) => handleSubmit(e)}>Save Setting Now</Button>
                <br/><br/>
            </div>
        </>
    )
}