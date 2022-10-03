import React, {useState} from 'react';
import Server from '../APIUrl';
import './style.css'; 
import axiom_protect_logo from "../../Assets/axiom_protect_logo.png";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { Link, useHistory, useLocation } from 'react-router-dom';
import Loader from '../Loader'
import Swal from 'sweetalert2'


const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

function Setbackup() {

const [loading, setLoading] = useState(false)
    const history = useHistory();
    const [backupForm, setbackupForm] = React.useState({
        email: "",
        isLoading: false,
        isSuccess: false,
        isError: false,
        isSnackbarOpen: false,  
    })  

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(backupForm)
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        // const url = "http://demo.axiomprotect.com:1243/AxiomProtect/v1/operator/create?userCount=0&requestTime=2021-09-22+17%3A35%3A02.676"
        setbackupForm({ ...backupForm,isLoading: true })
        console.log(requestTime);
        setLoading(true)
        if(backupForm.email.match(regexEmail)) {
            Server.get(`/operator/getCode?email=${backupForm.email}&requestTime=${requestTime}`, {
            
            
                headers: {
                    'content-type': 'application/json',
                    //authToken: authtoken,
                    "Access-Control-Allow-Origin":"*",
                    "Access-Control-Allow-Methods":"*"
                },
            })
                .then((response) => {
    
                    //history.push("/Landingpage")
                    setLoading(false)
                   console.log(response.data)
                   setbackupForm({
                        email: "",
                        isLoading: false,
                        isSuccess: false,
                        isError: false,
                        isSnackbarOpen: false,
                        
                    })
    
                    Swal.fire({
                        title: 'Please Check Your Mail',
                        text: 'Mail is send to your entered mail id please go through the given link in it !!!',
                        icon: 'success',
                        //showCancelButton: true,
                        // confirmButtonText: 'Yes, delete it!',
                        //cancelButtonText: 'OK'
                    })
                    history.push("/AxiomProtect/ForgotPassword")
                }).catch((err) => {
                    console.log(err)
                    setLoading(false);
                    Swal.fire("Error", err, "error");
                    setbackupForm({
                        email: "",
                        isLoading: false,
                        isSuccess: false,
                        isError: false,
                        isSnackbarOpen: false,
                        
                    })
                })
        }
        else {
            Swal.fire({
                title: 'Invalid Email',
                text: 'Please enter valid email',
                icon: 'error',
            })
            setLoading(false);
        }
      }
    
  return (
    <div>
       
       <Grid container spacing={3} style={{marginTop: 50}}>
            <Grid item xs={3}>
                
            </Grid>
            <Grid item xs={6}>
            <center><img src={axiom_protect_logo} style={{width: 50, height: 50}} alt="axiom logo"/></center>
            <center><h3 className="page_title">Axiom Protect 2.0</h3></center>
                <Card className="" variant="outlined">
                    <CardContent>
                        {/* <center><p className="user_name">Ajay Londhe<br /><span>ajay@mollatech.com</span></p></center>
                        <hr /> */}
                        <center><p className="set_backup">Set Password</p></center>
                        <br />
                        
                        <Container>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <form onSubmit={handleSubmit}>
                                    <TextField fullWidth type="email" label="Email Address" variant="outlined" value={backupForm.email} onChange={(e) => setbackupForm({ ...backupForm, email: e.target.value })} required/>
                                    <br /><br />
                                    {
                                        loading ? <Loader/> :
                                        <center><Button variant="contained" type="submit" >Continue</Button></center>
                                    }
                                    </form>
                                </Grid>
                                
                            </Grid>
                        </Container>
                        
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                
            </Grid>
            
        </Grid>
        <br />
    </div>
  );
}

export default Setbackup;