import React, { useCallback, useState } from 'react'
import Server from '../APIUrl';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2'
import Loader from '../Loader'

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
      backgroundColor: "#F4F6FA",
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

function CreateTeamUnit() {
    //const location = useLocation();
    const history = useHistory();
    const location = useLocation();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    
    const [loading, setLoading] = useState(false)

    const [editteamunitForm, seteditteamunitForm] = React.useState({
        
        
        name: "",
        discription: "",
        accountid: location.state.row.accountid,
        unitid: location.state.row.unitid
        
    })
    



    React.useEffect(() => {
        
        console.log(editteamunitForm)
        //console.log(location.state.row.unitid)
        Server.get(`/unit/get?accountId=${accountId}&unitId=${location.state.row.unitid}&requestTime=${requestTime}`, {
            headers: {
              'content-type': 'application/json',
              authToken: authtoken,
              "Access-Control-Allow-Origin":"*",
              "Access-Control-Allow-Methods":"*"

            },
        })
        .then((response) => {
          console.log(response.data)
          if(!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get radius service settings")){
            seteditteamunitForm(response.data.resultData)
        }

           
       }).catch((err) => {
           console.log(err)
          

          

       })
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(editteamunitForm)
        setLoading(true)
        await Server.post(`/unit/edit?requestTime=${requestTime}`,editteamunitForm, {
            
            
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*"
            },
        })
            .then((response) => {
                
                console.log(response.data)

              if(response.data.resultCode === 0){
                Swal.fire(
                    'Edited!',
                    response.data.resultMessage,
                    'success'
                  )
                history.push("/AxiomProtect/Teams")
              }else{
                Swal.fire(
                    'Error!',
                    response.data.resultMessage,
                    'error'
                  )
              }
                /*window.location.href="/Setpassword";*/
               console.log(response.data)
               seteditteamunitForm({
                    name: "",
                    discription: "",
                    
                })

            
            }).catch((err) => {
                console.log(err)
                seteditteamunitForm({
                    name: "",
                    discription: "",
                    
                })
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                })
            })
    }  

  return (
    <>
           
           <form onSubmit={handleSubmit} style={{paddingTop: '90px', paddingLeft: "20px"}}>
           <Grid container>
                    <Grid item >
                        <Breadcrumbs aria-label="breadcrumb" >
                            <StyledBreadcrumb
                                component="a"
                                //href="/DashBoard"
                                onClick={useCallback(() => history.push('/AxiomProtect/DashBoard'))}
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                onClick={useCallback(() => history.push('/AxiomProtect/Teams'))}
                                label="Teams"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                            <StyledBreadcrumb
                                //onClick={useCallback(() => history.push('/Applications'))}
                                label="Edit Team Unit"
                                deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                {/* <div style={{paddingLeft: '20px', lineHeight:'25px',width: '1100px'}}> */}
                    <br />
                    <div>
                        <h2 style={{ color:'#5C5C5C' }}>Edit Team Unit</h2>
                        <p style={{ color:'#5C5C5C' }}>General</p>
                        {/* <hr /> */}

                        <br /><br />
                        <table style={{width: '2000px', float:'left'}}>
                        <tr>
                            <td><p>Team Unit name</p></td>
                            <td> <TextField style={{height:'30px', width:'750px'}} required name="name" id="name" label="Team Unit name"  value={editteamunitForm.name} onChange={(e) => seteditteamunitForm({ ...editteamunitForm, name: e.target.value.trimStart() })}/></td>
                        </tr>
                        <br />
                        <tr>
                            <td><p>Description</p></td>
                            <td> <TextField name="discription" id="discription" required label="Description" multiline rows={5} style={{height:'30px', width:'750px'}} value={editteamunitForm.discription} onChange={(e) => seteditteamunitForm({ ...editteamunitForm, discription: e.target.value.trimStart() })}/> </td>
                        </tr>
                        
                        </table>
                        
                        {/* <p style={{ color:'#5C5C5C', marginTop: 300 }}>Team Member</p>
                        <hr/> */}

                        {/* <div style={{marginTop:12,display:"grid",placeItems:"center"}}>
          
                            <TableContainer component={Paper} >
                                <Table md={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{color: 'black'}}>Team Member</StyledTableCell>
                                        <StyledTableCell style={{color: 'black'}}>Role</StyledTableCell>
                                        <StyledTableCell align="center" style={{color: 'black'}}>Permissions</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <StyledTableRow >
                                            <StyledTableCell align="center"></StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div> */}
                        
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        {
                            loading ? <Loader/>:
                            <div>
                            <center><Button variant="contained" style={{color:'#FFFFFF', backgroundColor:'#206BC4'}} type="submit">Update Team Unit</Button></center>
                            {/* <Button style={{color:'#FFFFFF', backgroundColor:'#206BC4'}} onClick={this.addApp}>Create custom integration</Button> */}
                        </div>
                        }
                        <br />
                    </div>
                </form>
            {/* </div> */}
            
                
            </>
  );
}

export default CreateTeamUnit;