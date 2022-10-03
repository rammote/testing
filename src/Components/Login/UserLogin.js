import React, { useEffect } from "react";
import Server from "../APIUrl";
import "./style.css";
import axiom_protect_logo from "../../Assets/axiom_protect_logo.png";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { Link, useHistory, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Backdrop, CircularProgress } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Swal from "sweetalert2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import appleAppStore from '../../Assets/appleAppStore.png';
import googlePlayStore from '../../Assets/googlePlayStore.png';
import bcrypt from 'bcryptjs'


const downloadContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);

function Login() {
  const history = useHistory();
  const location = useLocation();
  //const authtoken = sessionStorage.getItem("token");
  const urlSearchParam = new URLSearchParams(window.location.search);
  
  const requestId = urlSearchParam.get("requestId");
  const idpId = urlSearchParam.get("idpId");
  const loginType = urlSearchParam.get("1");
 console.log({requestId,idpId,loginType})
  


  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [loginForm, setloginForm] = React.useState({
    email: "",
    password: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,
  });

  useEffect(() => {
    console.log();
    return () => { };
  }, []);
  const [accountArray, setAccountArray] = React.useState({});
  const [accountId, setAccountId] = React.useState(" ");
  const [type, setType] = React.useState(0);

  const [loginTypeMethod, setLoginTypeMethod] = React.useState("1");
  console.log(loginTypeMethod);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginForm);
    // const url = "http://demo.axiomprotect.com:1243/AxiomProtect/v1/operator/create?userCount=0&requestTime=2021-09-22+17%3A35%3A02.676"
    setloginForm({ ...loginForm, isLoading: true });



    if (loginForm.email && loginForm.password) {
      
      await Server.post(
        `/saml/loginUser?email=${loginForm.email.toLowerCase()}&password=${loginForm.password}&appId=${idpId}`)
        .then((response) => {
          if (response.data.resultCode === 0) {
            const data=response.data?.resultData || JSON.parse(response.data.resultMessage)
            const form = document.createElement("form");
            form.method = "POST";
            form.action = `${process.env.REACT_APP_SAML_SERVER_URL}/idp/login/post?requestId=${requestId}&idpId=${idpId}`;
            form.innerHTML = Object.keys(data.userDetails).map((key) => {
              return `<input type="hidden" name="${key}" value="${data.user[key]}">`;
            });
            document.body.appendChild(form);
            form.submit();
          }else if(response.data.resultData == null){
            Swal.fire("Error", response.data.resultMessage, "error");
            setloginForm({ ...loginForm, isLoading: false });

          }
          else if (response.data.resultCode == -11 || response.data.resultData != null) {
            setAccountArray(response.data.resultData);
            setAccountId(Object.keys(response?.data?.resultData)[0]);
            setloginForm({ ...loginForm, isLoading: false });
          }
          else {
            Swal.fire({
              title: "Error!",
              text: response.data.resultMessage,
              icon: "error",
              confirmButtonText: "OK",
            });
            setloginForm({ ...loginForm, isLoading: false });
          }
        })
        .catch((err) => {
          console.log({ err });
          setloginForm({
            email: "",
            password: "",
            isLoading: false,
            isSuccess: false,
            isError: false,
            isSnackbarOpen: false,
          });
          Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
            showCancelButton: true,
            // confirmButtonText: 'Yes, delete it!',
            //cancelButtonText: 'OK'
          });
        });
    } else {
      setloginForm({ ...loginForm, isLoading: false });
      Swal.fire({
        title: "Please Fill The Details ",
        text: "Some fields are missing!...",
        icon: "error",
        showCancelButton: true,
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setloginForm({ ...loginForm, isSnackbarOpen: false });
  };
  console.log({ accountId })
  return (
    <div>
      <Snackbar
        open={loginForm.isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            loginForm.isSuccess
              ? "success"
              : loginForm.isError
                ? "error"
                : loginForm.isCheckboxNeeded
                  ? "info"
                  : "info"
          }
          sx={{ width: "100%" }}
        >
          {loginForm.isSuccess
            ? " Registration successfull Please Check Your Mail!!!"
            : loginForm.isCheckboxNeeded
              ? "Check box not select3ed"
              : "Error in backend"}
        </Alert>
      </Snackbar>

      {loginForm.isLoading ? (
        <Backdrop
          sx={{ color: "green", zIndex: 3, backgroundColor: "transparent" }}
          open={loginForm.isLoading}
        // onClick={()=>setRegistrationForm({ ...registrationForm, isLoading: false })}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <Grid container spacing={3} style={{ marginTop: 50 }}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <center>
                <img
                  src={axiom_protect_logo}
                  style={{ width: 50, height: 50 }}
                  alt="logo"
                />
              </center>
              <center>
                <h3 className="page_title">Axiom Protect 2.0</h3>
              </center>
              <Card className="" variant="outlined">
                <CardContent>
                  <center>
                    <h3>SAML Login</h3>
                  </center>
                  <center>
                    <p>Please enter your User credentials</p>
                  </center>
                  <br />

                  <Container>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <TextField
                          required
                          fullWidth
                          size="small"
                          type="text"
                          name="email"
                          id="email"
                          //label="Email Address"
                          variant="outlined"
                          placeholder="Enter your mail..."
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon fontSize="small" />
                              </InputAdornment>
                            ),
                          }}
                          value={loginForm.email}
                          onChange={(e) =>
                            setloginForm({
                              ...loginForm,
                              email: e.target.value,
                            })
                          }

                        />
                        <br />
                        {/* <br />
                        <Select labelId="label" size="small" fullWidth id="select" value={loginTypeMethod} onChange={(e) => setLoginTypeMethod(e.target.value)}>
                            <MenuItem value="1">Push</MenuItem>
                            <MenuItem value="2">Password</MenuItem>
                            <MenuItem value="3">OTP</MenuItem>
                        </Select>
                        <br /> */}
                        <br />
                        {/* {loginTypeMethod === "2" &&  */}
                            <TextField
                            required
                            fullWidth
                            size="small"
                            type={passwordShown ? "text" : "password"}
                            name="password"
                            id="password"
                            //label="Password"
                            placeholder="Enter your password..."
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockIcon fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            value={loginForm.password}
                            onChange={(e) =>
                              setloginForm({
                                ...loginForm,
                                password: e.target.value,
                              })
                            }
                          />
                      </Grid>
                    </Grid>
                  </Container>

                  
                  <br />
                  <Box>
                    <Grid container spacing={3}>
                      <Grid item xs={3}></Grid>

                      <Grid item xs={6}>
                        <center>
                          <Button
                            variant="contained"
                            onClick={(e) => handleSubmit(e)}
                          >
                            Login
                          </Button>
                        </center>
                      </Grid>

                      <Grid item xs={3}></Grid>
                    </Grid>
                  </Box>

                  
                </CardContent>
                
              </Card>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>


          



          
          <br />
          <br />
          <br />
        </>
      )}
    </div>
  );
}

export default Login;
