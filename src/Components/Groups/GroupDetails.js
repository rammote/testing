import React, { useState, useCallback } from 'react'
import Server from '../APIUrl';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import SearchBar from "material-ui-search-bar";
import Radio from '@mui/material/Radio';
import axios from "axios";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoadingButton } from '@mui/lab';
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

const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function AddGroupGroupDetails() {

    const history = useHistory();
    const location = useLocation();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    // const [groupName,setGroupName] = React.useState("");
    // const [description,setDescription] = React.useState("");
    const [editgroupForm, seteditgroupForm] = React.useState({
        
        groupname: "",
        description: "",
        
    })
const [loading, setLoading] = useState(false)
    React.useEffect(() => {
        
        //console.log(location.state.row.unitid)
        Server.get(`/group/get?accountId=${accountId}&groupId=${location.state.row.groupid}&requestTime=${requestTime}`, {
            headers: {
              'content-type': 'application/json',
              authToken: authtoken,
              "Access-Control-Allow-Origin":"*",
              "Access-Control-Allow-Methods":"*"

            },
        })
        .then((response) => {
          console.log(response.data)
          if(!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get group details")){
            seteditgroupForm(response.data.resultData)
        }

           
       }).catch((err) => {
           console.log(err)
          

          

       })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        Server.post(`/group/update?accountId=${accountId}&groupId=${location.state.row.groupid}&groupName=${editgroupForm.groupname}&description=${editgroupForm.description}&requestTime=${requestTime}`,{}, {
            
            
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*"
            },
        })
            .then((response) => {
                setLoading(false)
                console.log(response.data)


                history.push("/AxiomProtect/Groups")
                /*window.location.href="/Setpassword";*/
               console.log(response.data)

            
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }  

        return (
            <form onSubmit={handleSubmit} style={{paddingTop: '90px', marginLeft: '20px'}}>
                <Grid container spacing={2} >
                    <Grid item>
                        {/* <Typography sx={{fontFamily: 'Jost', fontSize: '18px', color: '#5C5C5C'}}>
                        Dashboard/Groups/Add Group/Group Details
                        </Typography> */}
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
                                onClick={useCallback(() => history.push('/AxiomProtect/Groups'))}
                                label="Groups" 
                                style={{cursor: 'pointer'}}
                            />
                            <StyledBreadcrumb
                                label="Group Details"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                        <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                            <h4>Group Name</h4>
                        </Typography>
                        <Typography sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}>
                            <h5>Details</h5>
                        </Typography>
                    </Grid>
                 </Grid>
                <Divider sx={{borderColor: '#BABABA', width: '800px'}}/>
                <br /><br />
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                        <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Group Name*</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField fullWidth required size="small" type="text" name="userName" id="userName" label="Group Name" variant="outlined" value={editgroupForm.groupname} onChange={(e) => seteditgroupForm({...editgroupForm, groupname: e.target.value})}/>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                        <Typography  sx={{fontFamily:'Jost', color: '#232E3C'}}>Description*</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField fullWidth required size="small" multiline rows={5} type="text" name="email" id="email" label="Description" variant="outlined" value={editgroupForm.description} onChange={(e) => seteditgroupForm({...editgroupForm, description: e.target.value})}/>
                    </Grid>
                </Grid>
                <br />
                {/* <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Status</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="apps"
                                defaultValue="scim"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="scim" control={<Radio />} label={<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}>Active</Typography>} />
                                
                                <FormControlLabel value="scim1" control={<Radio />} label={<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}>Suspended</Typography>} />

                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid> */}
                <br />
                {/* <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Administrative Units</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth helperText="Select which administrative units this group belongs to." type="text" name="email" id="email" label="Assign Administrative units" variant="outlined" />
                    </Grid>
                </Grid>
                <br /> */}
                <Divider sx={{borderColor: '#BABABA', width: '800px'}}/>
                <br />
                <center>
                        <LoadingButton loading={loading} variant="contained" sx={{fontFamily: 'Jost'}} type="submit">Save Changes</LoadingButton>
                </center>
                <br />
                <br /><br />
                <br />
            </form>
        )
}