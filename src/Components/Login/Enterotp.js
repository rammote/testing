import React, { useEffect, useState } from "react";
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
import { Backdrop, CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);

function Enterotp() {
  const location = useLocation();
  const history = useHistory();
  const [otpForm, setotpForm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const category = "1";

  const authToken = sessionStorage.getItem("jwtToken");
  const userId = sessionStorage.getItem("userId");
  const accountId = sessionStorage.getItem("accountId");
  const name = sessionStorage.getItem("name");
  const emailId = sessionStorage.getItem("emailId");
  const phone = sessionStorage.getItem("phoneNo");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(otpForm);
    setIsLoading(true);
    console.log(userId);
    console.log(location.state.accountId);
    Server.post(
      `/absolute/verifyOneTimePassword?userId=${location.state.userId}&otp=${otpForm}`,
      {},
      {
        headers: {
          "content-type": "application/json",
          authToken: location.state.jwtToken,
        },
      }
    )
      .then((response) => {
        setIsLoading(false);
        if (response.data.resultCode == 0) {
          sessionStorage.clear();
          redirectToSubDomain();
        } else {
          Swal.fire("Warning", response.data.resultMessage, "warning");
        }
        console.log(response.data);
        setotpForm("");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setotpForm("");
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsError(false);
  };
  // redirect to subdoamin

  const [loading, setLoading] = useState(false);
  const [subdomain, setSubdomain] = useState("");
  const [accessToken, setAccessToken] = useState("");
  console.log({ subdomain });
  const redirectToSubDomain = async () => {
    setLoading(true);
    let subDomain = "";
    let accessToken1 = "";
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
          subDomain = response.data.resultData.subDomain;
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

    await Server.post(
      `/account/generateToken?requestTime=${requestTime}`,
      {
        accountid: accountId,
        emailid: emailId,
        phone: phone,
        operatorid: userId,
        name: name,
      },
      {
        headers: {
          "content-type": "application/json",
          authToken: authToken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        if (response.data.resultCode == 0) {
          console.log(response.data.resultData);
          setAccessToken(response.data.resultData.accessToken);
          accessToken1 = response.data.resultData.accessToken;
        } else {
          Swal.fire({
            title: response.data.resultMessage,
            icon: "error",
            showCancelButton: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const { protocol, host } = window.location;
    const parent = host.includes("localhost")
      ? host
      : host.split(".").slice(1).join(".");
    const url = `${protocol}//${subDomain}.${parent}/redirect/${accessToken1}`;
    //setLoading(false);
    //window.open(url, "_blank").focus();
    // create anchor tag
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_self";
    anchor.click();
    console.log({ subdomain, accessToken });
    console.log({ subDomain, accessToken1 });
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
      <Backdrop sx={{ color: "#fff" }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={3} style={{ marginTop: 50 }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <center>
            <img
              src={axiom_protect_logo}
              style={{ width: 50, height: 50 }}
              alt="axiom logo"
            />
          </center>
          <center>
            <h3 className="page_title">Axiom protect 2.0</h3>
          </center>
          <Card className="" variant="outlined">
            <CardContent>
              <center>
                <h3>Enter Your OTP</h3>
              </center>
              <br />

           <form onSubmit={handleSubmit}>
           <Container>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      // type="number"
                      name="otp"
                      id="otp"
                      type="number"
                      label="Enter OTP"
                      required
                      variant="outlined"
                      value={otpForm}
                      onChange={(e) => setotpForm(e.target.value.trim())}
                    />
                    <br />
                    <br />
                  </Grid>
                </Grid>
              </Container>
              <center>
                <LoadingButton loading={isLoading} variant="contained" type="submit">
                  Submit
                </LoadingButton>
              </center>
           </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Enterotp;
