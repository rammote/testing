import React from 'react';
import Server from '../APIUrl';
import './style.css'; 
import axiom_protect_logo from "../../Assets/axiom_protect_logo.png";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Setpassword() {
  return (
    <div>
       
       <Grid container spacing={3} style={{marginTop: 50}}>
            <Grid item xs={3}>
                
            </Grid>
            <Grid item xs={6}>
            <center><img src={axiom_protect_logo} style={{width: 50, height: 50}}/></center>
            <center><h3 className="page_title">Axiom protect 2.0</h3></center>
                <Card className="" variant="outlined">
                    <CardContent>
                    {/* <center><p className="user_name">Ajay Londhe<br /><span>ajay@mollatech.com</span></p></center> */}
                        
                        <center><h3 className="success_message">You have successfully activated axiom protect 2.0 <br />mobile.</h3></center>

                        <center><p className="message">Now when you log axiom protect 2.0 you will receive a push notification to authenticate</p></center>
                        
                        
                    </CardContent>

                    <Box>
                        <Grid container spacing={3} style={{marginTop: 20}}>
                            <Grid item xs={3}>

                            </Grid>

                            {/* <Grid item xs={1}>
                            
                                <center><a class="anchor_tag">Later</a></center>
                            </Grid> */}

                            <Grid item xs={6}>
                            
                                <center><a href="/"><Button variant="contained">Login</Button></a></center>
                            </Grid>

                            <Grid item xs={3}>

                            </Grid>
                            
                        </Grid>
                    </Box>
                    <br /><br />
                </Card>
                
            </Grid>
            <Grid item xs={3}>
                
            </Grid>
            
        </Grid>
        <br /><br /><br />
    </div>
  );
}

export default Setpassword;