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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginForm);
    // const url = "http://demo.axiomprotect.com:1243/AxiomProtect/v1/operator/create?userCount=0&requestTime=2021-09-22+17%3A35%3A02.676"
    setloginForm({ ...loginForm, isLoading: true });



    if (loginForm.email && loginForm.password) {
      const encryptedPassword = bcrypt.hashSync(loginForm.password, "$2a$10$CwTycUXWue0Thq9StjUM0u");
      await Server.post(
        `/operator/login?email=${loginForm.email.toLowerCase()}&password=${encryptedPassword}&requestTime=${requestTime}&accountId=${accountId}`,
        {},
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      )
        .then((response) => {
          console.log(response.data);
          if (response.data.resultCode === 0) {
            console.log(response.data)
            sessionStorage.setItem("jwtToken", response.data.resultData.jwtToken)
            sessionStorage.setItem("userId", response.data.resultData.operator.operatorid)
            sessionStorage.setItem("accountId", response.data.resultData.operator.accountid)
            sessionStorage.setItem("name", response.data.resultData.operator.name)
            sessionStorage.setItem("emailId", response.data.resultData.operator.emailid)
            sessionStorage.setItem("phoneNo", response.data.resultData.operator.phone)
            setloginForm({ ...loginForm, isLoading: false });
            history.push({
              pathname: "/AxiomProtect/Confirmidentity",
              state: {
                userId: response.data.resultData.operator.operatorid,
                jwtToken: response.data.resultData.jwtToken,
                name: response.data.resultData.operator.name,
                emailid: response.data.resultData.operator.emailid,
                accountId: response.data.resultData.operator.accountid,
                phone: response.data.resultData.operator.phone
              },
            });

            if (response.data.resultData.operator.status == "3") {
              history.push({
                pathname: "/AxiomProtect/Confirmidentity",
                state: {
                  userId: response.data.resultData.operator.operatorid,
                  jwtToken: response.data.resultData.jwtToken,
                  name: response.data.resultData.operator.name,
                  emailid: response.data.resultData.operator.emailid,
                  accountId: response.data.resultData.operator.accountid,
                },
              });
            } else if (response.data.resultData.operator.status == "1") {
              history.push({
                pathname: "/AxiomProtect/QRcodeenable",
                state: {
                  userId: response.data.resultData.operator.operatorid,
                  jwtToken: response.data.resultData.jwtToken,
                  name: response.data.resultData.operator.name,
                  emailid: response.data.resultData.operator.emailid,
                  accountId: response.data.resultData.operator.accountid,
                },
              });
            }

            // history.push({
            //     pathname:"/AxiomProtect/LandingPage",
            //     state:{
            //     userId: response.data.resultData.operator.operatorid,
            //     jwtToken: response.data.resultData.jwtToken,
            //     name: response.data.resultData.operator.name,
            //     emailid: response.data.resultData.operator.emailid,
            //     accountId: response.data.resultData.operator.accountid,
            //     }
            // })
            console.log(response.data);
            setloginForm({
              email: "",
              password: "",
              isLoading: false,
              isSuccess: false,
              isError: false,
              isSnackbarOpen: false,
            });
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
                    <h3>Welcome Back.!!</h3>
                  </center>
                  <center>
                    <p>Please enter your admin credentials</p>
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
                        <br />
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
                        <InputAdornment style={{ float: "right" }}>
                          <IconButton>
                            <RemoveRedEyeIcon
                              onClick={togglePassword}
                              style={{ marginTop: "-40px" }}
                            />
                          </IconButton>
                        </InputAdornment>
                        {Object.keys(accountArray).length > 0 ? (
                          <>
                            <div style={{ textAlign: "center", margin: "0.4rem 0" }}>Please select the account to login</div>

                            <FormControl fullWidth size="small">
                              <InputLabel >
                                Associate account with this emailId
                              </InputLabel>
                              <Select

                                value={accountId}
                                label=" Associate account with this emailId"
                                onChange={(e) => setAccountId(e.target.value)}
                              >
                                {accountArray &&
                                  Object.keys(accountArray)?.map((key) => (
                                    <MenuItem value={key}>
                                      {accountArray[key]}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </>
                        ) : ""
                        }
                      </Grid>
                    </Grid>
                  </Container>

                  <div style={{ margin: "0.5rem auto", textAlign: "center" }}>

                    <Link to="/AxiomProtect/Setbackup">
                      Forget password?
                    </Link>

                  </div>
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

                  <Box style={{ marginLeft: -5 }}>
                    <center>
                      <p>
                        Don’t have account yet?
                        <Link to="/AxiomProtect/Register"> Sign up</Link>
                      </p>
                    </center>
                  </Box>
                </CardContent>
                <h4 style={{ textAlign: "center", margin: "0 auto", marginTop: "-1rem" }}>Download App from app store</h4>
                <div style={downloadContainerStyle}>
                  <a href='https://play.google.com/store/apps/details?id=com.bluebricks.absolutetoken' target="_blank" rel="noopner noreferrer">
                    <img src={googlePlayStore} alt="googlePlayStore" width="120" />
                  </a>

                  <a href='https://apps.apple.com/us/app/absolute-token/id1564689079' target="_blank" rel="noopner noreferrer">
                    <img src={appleAppStore} alt="appleAppStore" width="120" />
                  </a>

                </div>
                <p style={{ textAlign: "center", fontSize: "0.8rem" }}>Powered By <a href="https://www.blue-bricks.com/" target="_blank" rel="noreferrer" >Blue Bricks Pty. Ltd.</a></p>
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
