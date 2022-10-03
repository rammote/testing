import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiom_protect_logo from "../../Assets/axiom_protect_logo.png";
import Server from '../APIUrl';
import './style.css';
import Loader from '../Loader'
import bcrypt from 'bcryptjs'
const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

function ForgotPassword() {
    const history = useHistory();
    const authtoken = sessionStorage.getItem("jwtToken");
    const [backupForm, setbackupForm] = React.useState({
        
        token: "",
        password: "",
        confirmPassword: "",
        isLoading: false,
        isSuccess: false,
        isError: false,
        isSnackbarOpen: false,
        
        
    })  

const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(backupForm)
        setLoading(true)
        // const url = "http://demo.axiomprotect.com:1243/AxiomProtect/v1/operator/create?userCount=0&requestTime=2021-09-22+17%3A35%3A02.676"
        setbackupForm({ ...backupForm,isLoading: true });
      const encryptedPassword = bcrypt.hashSync(backupForm.password, "$2a$10$CwTycUXWue0Thq9StjUM0u");
        const confirmPassword= bcrypt.hashSync(backupForm.confirmPassword, "$2a$10$CwTycUXWue0Thq9StjUM0u");
        console.log(requestTime)
        await Server.post(`/operator/forgotPassword?password=${encryptedPassword}&confirmPassword=${confirmPassword}&token=${backupForm.token}&requestTime=${requestTime}`,{}, { 
            headers: {
                'content-type': 'application/json',
                //authToken: authtoken,
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*"
            },
        })
            .then((response) => {
                setLoading(false)
               if(response.data.resultCode===0){
                    //history.push("/Landingpage")
               console.log(response.data)
               setbackupForm({
                    email: "",
                    isLoading: false,
                    isSuccess: false,
                    isError: false,
                    isSnackbarOpen: false,
                    
                })

                Swal.fire({
                    title: 'Successfully password is set',
                    //text: 'Mail is send to your entered mail id please go through the given link in it !!!',
                    icon: 'success',
                    //showCancelButton: true,
                    // confirmButtonText: 'Yes, delete it!',
                    //cancelButtonText: 'OK'
                })
                history.push("/")
               }else{
                setbackupForm({
                    email: "",
                    isLoading: false,
                    isSuccess: false,
                    isError: true,
                    isSnackbarOpen: false,
                    
                })
                Swal.fire({
                    title: 'Warning',
                    text: response.data.resultMessage,
                    icon: 'warning',
                    showCancelButton: true,

                })
               }
            }).catch((err) => {
                setLoading(false)
                console.log(err)
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
  return (
    <div>
       
       <Grid container spacing={3} style={{marginTop: 50}}>
            <Grid item xs={3}>
                
            </Grid>
            <Grid item xs={6}>
            <center><img src={axiom_protect_logo} style={{width: 50, height: 50}} alt="logo"/></center>
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
                                    <TextField required fullWidth name="email" id="email" label="Passcode" variant="outlined" value={backupForm.token} onChange={(e) => setbackupForm({ ...backupForm, token: e.target.value })}/>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <TextField required fullWidth name="email" id="password" label="New Password" variant="outlined" value={backupForm.password} onChange={(e) => setbackupForm({ ...backupForm, password: e.target.value })}/>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <TextField required fullWidth name="email" id="password" label="Confirm Password" variant="outlined" value={backupForm.confirmPassword} onChange={(e) => setbackupForm({ ...backupForm, confirmPassword: e.target.value })}/>
                                </Grid>
                            </Grid>
                        </Container>
                        
                        <br />
                        
                        <Box>
                            <Grid container spacing={3} >
                                <Grid item xs={2}>

                                </Grid>

                                <Grid item xs={1}>
                                
                                    {/* <center><a class="anchor_tag">Skip</a></center> */}
                                </Grid>

                                <Grid item xs={6}>
                                    {
                                        loading ? <Loader /> : <center><Button variant="contained" onClick={(e) => handleSubmit(e)}>Set Password</Button></center>
                                    }
                                </Grid>

                                <Grid item xs={2}>

                                </Grid>
                                
                            </Grid>
                        </Box>
                        
                        
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

export default ForgotPassword;