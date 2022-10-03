import React, { useEffect, useState } from "react";
import Server from "../APIUrl";
import "./style.css";
import axiom_protect_logo from "../../Assets/axiom_protect_logo.png";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Backdrop, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";
import Input from "@mui/material/Input";
import { FormHelperText } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);
const currentURL = window.location.href; // returns the absolute URL of a page

function SetOperatorPassword() {
  const history = useHistory();
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const answer_array = currentURL.split("=");
  const token = answer_array[1];
  console.log(token);

  const [confirmpasswordShown, setconfirmpasswordShown] = React.useState(false);
  const toggleConfirmPassword = () => {
    setconfirmpasswordShown(!confirmpasswordShown);
  };

  const [passwordForm, setpasswordForm] = React.useState({
    password: "",
    confirmPassword: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(passwordForm);

    if (passwordForm.password === passwordForm.confirmPassword) {
      setpasswordForm({ ...passwordForm, isLoading: true });

        await Server.post(
          `/operator/setPassword?password=${passwordForm.password}&confirmPassword=${passwordForm.confirmPassword}&token=${token}&requestTime=${requestTime}`,
          {},
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
          .then((response) => {
            if (response.data.resultCode === 0) {
              console.log(response.data.resultMessage);

              setpasswordForm({
                password: "",
                confirmPassword: "",
                isLoading: false,
                isSuccess: true,
                isError: false,
                // isSnackbarOpen: true
              });

              Swal.fire({
                title: "Success",
                text: "You Have SuccessFully Activated Account",
                icon: "success",
                showCancelButton: true,
              });

              history.push({
                pathname: "/",
              });
              console.log(response.data);
            } else {
              setpasswordForm({
                password: "",
                confirmPassword: "",
                isLoading: false,
                isSuccess: false,
                isError: false,
                isSnackbarOpen: true,
              });
              Swal.fire({
                title: "Error",
                text: response.data.resultMessage,
                icon: "error",
                showCancelButton: true,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            setpasswordForm({
              password: "",
              confirmPassword: "",
              isLoading: false,
              isSuccess: false,
              isError: false,
              isSnackbarOpen: true,
            });
          });
      // else {
      //   Swal.fire({
      //     title: "Error",
      //     text: "Please Enter Valid Subdomain(min 6 characters)",
      //     icon: "error",
      //   });
      //   setpasswordForm({
      //     password: "",
      //     confirmPassword: "",
      //     isLoading: false,
      //     isSuccess: true,
      //     isError: false,
      //     // isSnackbarOpen: true
      //   });
      // }
    } else {
      setpasswordForm({
        password: "",
        confirmPassword: "",
        isLoading: false,
        isSuccess: true,
        isError: false,
        // isSnackbarOpen: true
      });
      Swal.fire({
        title: "Oppes!",
        text: "Password and Confirm Password does not match",
        icon: "error",
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setpasswordForm({ ...passwordForm, isSnackbarOpen: false });
  };

  // Subdomain creation process
  const [subdomain, setSubdomain] = useState("");
  const [subdomainExist, setSubDomainExist] = useState({
    exist: false,
    noExist: false,
  });
  let typingTimer = null;
  const handleSubDomain = (evt) => {
    const val = evt.target.value.toLowerCase();
    let domain;
    domain = val.toLowerCase();
    setSubdomain(domain);

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      if (domain.length >= 6) {
        checkSubdomain(domain);
      } else {
        setSubDomainExist({ exist: false, noExist: true });
      }
    }, 500);
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimer);
    };
  }, [typingTimer]);

  const checkSubdomain = async (subdomain) => {
    await Server.get(
      `/account/checkSubDomain?&subDomain=${subdomain}&requestTime=${requestTime}`,
      {},
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.data.resultCode === 0) {
          setSubDomainExist({ exist: true, noExist: false });
        } else if (response.data.resultCode === 1) {
          setSubDomainExist({ exist: false, noExist: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Snackbar
        open={passwordForm.isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            passwordForm.isSuccess
              ? "success"
              : passwordForm.isError
              ? "error"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {passwordForm.isSuccess
            ? "You Set Your Password Successfully"
            : "Your Password is Not Matching"}
        </Alert>
      </Snackbar>

      {passwordForm.isLoading ? (
        <Backdrop
          sx={{ color: "green", zIndex: 3, backgroundColor: "transparent" }}
          open={passwordForm.isLoading}
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
                  alt="Axiom logo"
                />
              </center>
              <center>
                <h3 className="page_title">Axiom protect 2.0</h3>
              </center>
              <Card className="" variant="outlined">
                <CardContent>
                  <center>
                    <p className="user_name">Set Your Password</p>
                  </center>

                  <Container>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <TextField
                          fullWidth
                          type={passwordShown ? "text" : "password"}
                          name="password"
                          id="password"
                          label="Create your password"
                          variant="outlined"
                          required
                          value={passwordForm.password}
                          onChange={(e) =>
                            setpasswordForm({
                              ...passwordForm,
                              password: e.target.value,
                            })
                          }
                        />
                        <InputAdornment style={{ float: "right" }}>
                          <IconButton>
                            <RemoveRedEyeIcon
                              onClick={togglePassword}
                              style={{ marginTop: "-55px" }}
                            />
                          </IconButton>
                        </InputAdornment>
                        <br />
                        <br />
                        <TextField
                          fullWidth
                          type={confirmpasswordShown ? "text" : "password"}
                          name="confirmPassword"
                          id="confirmPassword"
                          label="Confirm your password"
                          required
                          variant="outlined"
                          value={passwordForm.confirmPassword}
                          onChange={(e) =>
                            setpasswordForm({
                              ...passwordForm,
                              confirmPassword: e.target.value,
                            })
                          }
                        />
                        <InputAdornment style={{ float: "right" }}>
                          <IconButton>
                            <RemoveRedEyeIcon
                              onClick={toggleConfirmPassword}
                              style={{ marginTop: "-55px" }}
                            />
                          </IconButton>
                        </InputAdornment>
                      </Grid>
                    </Grid>
                    <br />
                    {/* <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="businessURL">
                            Create Subdomain
                          </InputLabel>
                          <Input
                            error={subdomainExist.noExist}
                            required
                            maxLength={20}
                            onChange={handleSubDomain}
                            id="businessURL"
                            name="subdomain"
                            defaultValue={subdomain}
                            InputLabelProps={{
                              Shrink: true,
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                {subdomainExist.exist && (
                                  <CheckCircleIcon
                                    style={{ color: "#42ba96" }}
                                  />
                                )}
                                {subdomainExist.noExist && (
                                  <CancelIcon color="error" />
                                )}
                              </InputAdornment>
                            }
                            labelWidth={70}
                          />
                          <FormHelperText>
                            {subdomain}.axiomprotect.com
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid> */}
                  </Container>

                  <Container>
                    <Grid container spacing={3} style={{ marginTop: 20 }}>
                      <Grid item xs={1} md={3}></Grid>

                      <Grid item xs={6} md={6}>
                        <center>
                          <Button
                            variant="contained"
                            onClick={(e) => handleSubmit(e)}
                            //disabled={subdomainExist.noExist}
                          >
                            Continue
                          </Button>
                        </center>
                      </Grid>
                      <Grid item xs={1} md={3}></Grid>
                    </Grid>
                  </Container>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          <br />
          <br />
        </>
      )}
    </div>
  );
}

export default SetOperatorPassword;
