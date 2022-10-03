import React, { useEffect, useState } from "react";
import Server from "../APIUrl";
import "./style.css";
import axiom_protect_logo from "../../Assets/axiom_protect_logo.png";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MdDone } from "react-icons/md";
import { MdStayCurrentPortrait } from "react-icons/md";
import Container from "@mui/material/Container";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { isMobile } from "react-device-detect";
import Countdown from "react-countdown";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Backdrop, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import { MdEmail } from "react-icons/md";
import Swal from "sweetalert2";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        style={{ height: 100, width: 100 }}
        variant="indeterminate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          style={{ padding: 8, margin: 8, fontSize: "1.2rem" }}
        >
          {`${Math.round(props.value)} sec`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  tableFields: {
    fontSize: "0.9em",
  },
  tableFieldsTitle: {
    fontSize: "1.0rem",
    fontWeight: "bold",
  },

  countdownFirstChildDiv: {
    background: "rgb(170,72,294)",
    margin: "auto",
    width: 38,
    height: 38,
    textAlign: "center",
    paddingTop: 7,
  },
  countdownChildDiv: {
    borderRight: "1px solid ",
    margin: "auto",
    width: 35,
    height: 25,
    textAlign: "center",
  },
  countdownLastChildDiv: {
    margin: "auto",
    width: 35,
    height: 25,
    textAlign: "center",
  },
  countDownDaysFont: {
    fontSize: "1.0rem",
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  countDownText: {
    fontSize: "0.7rem",
    color: "#000",
    textAlign: "center",
    position: "relative",
    top: 9,
  },
  countDownTimerFont: {
    textAlign: "center",
    fontSize: "1.0rem",
    fontWeight: "bold",
  },
  index: 1,
});

const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const nav = navigator.userAgent;

function Confirmidentity() {
  const history = useHistory();
  const location = useLocation();
  //const [loginForm, setloginForm] = React.useState()
  const classes = useStyles();
  console.log(location);
  //creating IP state
  const [ip, setIP] = React.useState("");
  const [deviced, deviceDetails] = React.useState("");
  const [isMobileVerification, setISMobileVerification] = React.useState(null);
  const [isMobileotp, setISMobileotp] = React.useState(null);
  const [isPushSend, setIsPushSend] = useState(false);
  const [requestId, setRequestId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const category = "4";
  const type = "1";

  const authToken = sessionStorage.getItem("jwtToken");
  const userId = sessionStorage.getItem("userId");
  const accountId = sessionStorage.getItem("accountId");
  const name = sessionStorage.getItem("name");
  const emailId = sessionStorage.getItem("emailId");
  const phone = sessionStorage.getItem("phoneNo");

  console.log({ accountId, userId, name, emailId, phone, authToken });

  const body = {
    //"appId": "",
    expirytimeInMins: 0,
    requestType: 1,
    device: "",
    ip: "",
  };

  const getData = async () => {
    const res = await Server.get("https://geolocation-db.com/json/");
    console.log("location",res.data);
    setIP(res.data.IPv4);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    console.log(navigator.vendor, navigator.appVersion);
    getData();
    //getDeviceDetails();
  }, []);

  const handleSubmitSendPush = async (e) => {
    e.preventDefault();
    console.log("login push detail : ", body)
    await Server.post(
      `/authenticator/sendPush?userId=${location.state.userId}&requestTime=${requestTime}`,
      body,
      {
        headers: {
          "content-type": "application/json",
          authToken: authToken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then(async (response) => {
        // console.log(JSON.parse(response.data));
        if (response.data.resultCode == 0) {
          setRequestId(response.data.resultData);
          setIsPushSend(true)
        
        } else console.log("error");
      })
      .catch((err) => {
        console.log(err);
        setISMobileVerification(false);
      });
  };
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log();
      setIsLoading(true);
      setISMobileotp(false)
      // const url = "http://demo.axiomprotect.com:1243/AxiomProtect/v1/operator/create?userCount=0&requestTime=2021-09-22+17%3A35%3A02.676"
      
      await Server.post(
          `/token/sendOTP?accountId=${location.state.accountId}&userId=${location.state.userId}&category=${category}&type=${type}&requestTime=${requestTime}`,
          {},
          {
              headers: {
                  "content-type": "application/json",
                  authToken: location.state.jwtToken,
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "*",
                },
            }
    )
    .then((response) => {
        setIsLoading(false);
        //sessionStorage.setItem("token",response.data.resultData.jwtToken);
        setISMobileVerification(false);
        
        // history.push("/Register");
        /*window.location.href="/Setpassword";*/
        console.log(response);
      })
      .catch((err) => {
          setIsLoading(false);
        console.log(err);
    });
};

const handleSubmit_moblie = (e) => {
    e.preventDefault();
    console.log();
    // setIsLoading(true)
    setISMobileotp(true);
    setISMobileVerification(true)
};

const [isVerifed, setIsVerifed] = useState(false)
const [otpForm, setotpForm] = React.useState("");

const handleOTPVerifcation = async (e) => {
    e.preventDefault();
    console.log(otpForm);
    setIsLoading(true)
    await Server.post(
      `/token/verifyOTP?accountId=${location.state.accountId}&userId=${location.state.userId}&OTP=${otpForm}&category=${category}&requestTime=${requestTime}`,
      {},
      {
          headers: {
          "content-type": "application/json",
          authToken: location.state.jwtToken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then( (response) => {
        setIsLoading(false)
        setISMobileVerification(false);
        if (response.data.resultCode == 0) {
           redirectToSubDomain();
          console.log(response);
        //   setIsVerifed(true)
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.resultMessage,
            icon: "error",
            showCancelButton: true,
            // confirmButtonText: 'Yes, delete it!',
            //cancelButtonText: 'OK'
          });
        }
      })
      .catch((err) => {
        setIsLoading(false)

        console.log(err);
        setISMobileVerification(false);
      });
  };


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleMobileOTPVerifcation = (e) => {
    e.preventDefault();
    console.log(otpForm);
    setIsLoading(true)
    Server.post(
      `/absolute/verifyOneTimePassword?userId=${location.state.userId}&otp=${otpForm}`,
      {},
      {
        headers: {
          "content-type": "application/json",
          authToken: location.state.jwtToken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then((response) => {
        setIsLoading(false)

        if (response.data.resultCode === 0) {
          // sessionStorage.setItem("token",location.state.jwtToken)
          // history.push("/AxiomProtect/LandingPage")
          redirectToSubDomain();
          console.log(response);
        } else {
          Swal.fire({
            title: "OTP is Incorrect",
            text: "The OTP You Entered is Not Correct!!!",
            icon: "error",
            showCancelButton: true,
            // confirmButtonText: 'Yes, delete it!',
            //cancelButtonText: 'OK'
          });
        }
      })
      .catch((err) => {
        setIsLoading(false)

        console.log(err);
      });
  };

  // Random component
  const Completionist = () => (
    <React.Fragment>
      <Box display="flex" flexGrow={1} alignItems="center">
        <FiberManualRecordIcon color="green" />

        <Typography
          variant="body2"
          component="span"
          className={classes.tableFieldsTitle}
          style={{ marginLeft: 3 }}
        >
          Time Expired
        </Typography>
      </Box>
    </React.Fragment>
  );

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed, days }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else if (seconds % 2 == 0) {
      Server.post(
        `/authenticator/checkPushTransactionStatus?userId=${location.state.userId}&pushId=${requestId}&requestTime=${requestTime}`,
        {},
        {
          headers: {
            "content-type": "application/json",
            authToken: authToken,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      )
        .then(async (response) => {
          console.log(response.data);
          if (response.data.resultCode == 0) {
    
            setIsPushSend(false)
            
            // sessionStorage.setItem("token", location.state.jwtToken);
            // history.push("/AxiomProtect/DashBoard")
            redirectToSubDomain();
          }
          // setISMobileVerification(null)
          // sessionStorage.setItem("token",location.state.jwtToken);

          // history.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          setISMobileVerification(null);
        });

      return (
        <React.Fragment>
          <Backdrop open={true}>
            <CircularProgressWithLabel value={seconds} />
          </Backdrop>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Backdrop open={true}>
            <CircularProgressWithLabel value={seconds} />
          </Backdrop>
        </React.Fragment>
      );
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsError(false);
  };



  // redirectToSubDomain
  const [subdomain, setSubdomain] = useState("");
  const [accessToken, setAccessToken] = useState("");
  console.log({subdomain})
  const redirectToSubDomain = async () => {
      setLoading(true);
        let subDomain="";
        let accessToken1="";
      console.log({ authToken });
    
      await Server.get(
        `/account/getSubDomainV1?accountId=${accountId}&requestTime=${requestTime}`,
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
          if (response.data.resultCode === 0) {
            setSubdomain(response.data.resultData.subDomain);
            subDomain=response.data.resultData.subDomain
            setLoading(false);
          } else {
            Swal.fire({
              title: "Error",
              text: response.data.resultMessage,
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

        await Server.post(`/account/generateToken?requestTime=${requestTime}`,
        {
                "accountid": accountId,
                "emailid": emailId,
                "phone": phone,
                "operatorid": userId,
                "name": name,
        }, {

            headers: {
                'content-type': 'application/json',
                'authToken': authToken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
        })
            .then((response) => {
                console.log(response.data)
                if(response.data.resultCode==0){
                    console.log(response.data.resultData)
                   setAccessToken(response.data.resultData.accessToken)
                   accessToken1=response.data.resultData.accessToken
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

       const { protocol, host } = window.location;
       const parent =
         host.includes("localhost") ? host : host.split(".").slice(1).join(".");
       const url = `${protocol}//${subDomain}.${parent}/redirect/${accessToken1}`;
        //setLoading(false);
        //window.open(url, "_blank").focus();
        // create anchor tag
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.target = "_self";
        anchor.click();
    console.log({subdomain, accessToken});
    console.log({subDomain, accessToken1})
    // window
    //     .open(
    //       `${protocol}//${subDomain}.${host}/redirect/${accessToken1}`
    //     )
    //     .focus();
  };

  return (
    <div>
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={"error"}
          sx={{ width: "100%" }}
        >
          {"InCorrect OTP"}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: "#fff" }}
        open={isLoading}
        // onClick={()=>setRegistrationForm({ ...registrationForm, isLoading: false })}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container spacing={3} style={{ marginTop: 50 }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <center>
            <img src={axiom_protect_logo} style={{ width: 50, height: 50 }} />
          </center>
          <center>
            <h3 className="page_title">Axiom Protect 2.0</h3>
          </center>
          <Card className="" variant="outlined">
            <CardContent>
              <center>
                <h3>Confirm Your Identity</h3>
              </center>
              <br />
              {/* <h2>Your IP Address is</h2>
                        <h4>{ip}</h4> */}
              {/* <h5>click on {isMobileVerification ==null ? null : isMobileVerification?  "Mobile" : <span>Email</span>}</h5> */}

              <Grid
                container
                spacing={3}
                item
                xs={12}
                md={12}
                style={{ marginLeft: 90 }}
              >
                <div onClick={(e) => handleSubmitSendPush(e)} >
                  <Card
                    className=""
                    variant="outlined"
                    style={{
                      backgroundColor: "#F4F6FA",
                      width: 150,
                      height: 150,
                      cursor:"pointer"
                    }}
                  >
                    <CardContent>
                      <center>
                        <Grid item xs={3} md={6}>
                          <MdDone className="check" />
                        </Grid>
                        <p
                          className="send_push"
                          style={{ textAlign: "center", color: "#000000" }}
                        >
                          <b>Send Push</b>
                        </p>
                      </center>
                    </CardContent>
                  </Card>
                </div>

                <div  onClick={(e) => handleSubmit(e)}>
                  <Card
                    className=""
                    variant="outlined"
                    style={{
                      marginLeft: 40,
                      backgroundColor: "#F4F6FA",
                      width: 150,
                      height: 150,
                      cursor:"pointer"
                    }}
                  >
                    <CardContent>
                      <center>
                        <Grid item xs={3} md={6}>
                          <MdEmail className="check" />
                        </Grid>
                      </center>
                      <p
                        className="send_push"
                        style={{ textAlign: "center", color: "#000000" }}
                      >
                        <b>Email Me</b>
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div  onClick={(e) => handleSubmit_moblie(e)}>
                  <Card
                    className=""
                    variant="outlined"
                    style={{
                      marginLeft: 40,
                      backgroundColor: "#F4F6FA",
                      width: 150,
                      height: 150,
                      cursor:"pointer"
                    }}
                  >
                    <CardContent>
                      <center>
                        <Grid item xs={3} md={7}>
                          <MdStayCurrentPortrait className="check" />
                        </Grid>
                        <p
                          className="send_push"
                          style={{ textAlign: "center", color: "#000000" }}
                        >
                          <b>Enter OTP</b>
                        </p>
                      </center>
                    </CardContent>
                  </Card>
                </div>
              </Grid>

              <br />
              <br />
              {isMobileVerification == false && (
                <Container>
                  <form onSubmit={handleOTPVerifcation}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        name="otp"
                        id="otp"
                        label="Pass code"
                        variant="outlined"
                        type="number"
                        required
                        style={{ width: 355, marginLeft: 75 }}
                        value={otpForm}
                        onChange={(e) => setotpForm(e.target.value.trim())}
                      />
                      <br />
                      <br />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <center>
                        <Button
                          disabled={isMobileVerification == null ? true : false}
                          variant="contained"
                          style={{ marginTop: 10 }}
                        type="submit"
                        >
                          Submit
                        </Button>
                      </center>
                    </Grid>
                  </Grid>
                  </form>
                </Container>
              )}

              {isMobileotp == true && (
                <Container>
                 <form onSubmit={handleMobileOTPVerifcation}>
                 <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        name="otp"
                        id="otp"
                        label="Pass Code"
                        variant="outlined"
                        type="number"
                        required
                        style={{ width: 355, marginLeft: 65 }}
                        value={otpForm}
                        onChange={(e) => setotpForm(e.target.value.trim())}
                      />
                      <br />
                      <br />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <center>
                        <Button
                          variant="contained"
                          style={{ marginTop: 10 }}
                         type="submit"
                        >
                          Submit
                        </Button>
                      </center>
                    </Grid>
                  </Grid>
                 </form>
                </Container>
              )}

              {isPushSend && (
                <>
                  <Countdown
                    date={Date.now() + 60000}
                    renderer={renderer}
                    //   intervalDelay={5}
                  />

                  {/* <Backdrop open={true}><CircularProgressWithLabel value={progress} /></Backdrop> */}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Confirmidentity;
