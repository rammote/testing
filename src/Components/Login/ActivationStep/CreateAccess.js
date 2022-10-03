import React, { useEffect, useState } from "react";
import Server from "../../APIUrl";
import "../style.css";
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
import { customAlphabet } from "nanoid";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Backdrop, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";
import Input from "@mui/material/Input";
import { FormHelperText } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import setup2 from "../../../Assets/setup2.png";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import bcrypt from 'bcryptjs'
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);

const currentURL = window.location.href;
export default function CreateAccess({ handleNext }) {
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
      const encryptedPassword = bcrypt.hashSync(passwordForm.password, "$2a$10$CwTycUXWue0Thq9StjUM0u");
      if (subdomain.length >= 6) {
        await Server.post(
          `/operator/setPasswordForRegistration?password=${encryptedPassword}&subDomain=${subdomain}&company=${companyName}&token=${token}&requestTime=${requestTime}`,
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

              handleNext();
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
      } else {
        Swal.fire({
          title: "Error",
          text: "Please Enter Valid Subdomain(min 6 characters)",
          icon: "error",
        });
        setpasswordForm({
          password: "",
          confirmPassword: "",
          isLoading: false,
          isSuccess: true,
          isError: false,
          // isSnackbarOpen: true
        });
      }
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
  // Company Name
  const [companyName, setCompanyName] = useState("");
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
    domain = domain.replace(/[^a-zA-Z0-9]/g, "");
    domain = `${domain}-${nanoid()}`;
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
  console.log({ companyName });
  return (
    <div>
      {passwordForm.isLoading ? (
        <Backdrop
          sx={{ color: "green", zIndex: 3, backgroundColor: "transparent" }}
          open={passwordForm.isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <center>
            <p className="user_name">Set up Your Account</p>
          </center>
          <div style={{ textAlign: "center" }}>
            <img width={100} src={setup2} alt="logo" className="logo" />
          </div>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7} sx={{ margin: "0 auto" }}>
                {/* new */}

                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                   Create Account Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={passwordShown ? "text" : "password"}
                    value={passwordForm.password}
                    onChange={(e) =>
                      setpasswordForm({
                        ...passwordForm,
                        password: e.target.value,
                      })}
                      inputProps={{minLength: 6,  maxLength: 18 }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                        onClick={togglePassword}
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          {passwordShown? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Create Account Password"
                  />
                </FormControl>

                {/* end new */}
                
                <br />
                <br />

                {/* new  */}

                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                   Confirm Account Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={confirmpasswordShown ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    inputProps={{minLength: 6,  maxLength: 18 }}
                    onChange={(e) =>
                      setpasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                        onClick={toggleConfirmPassword}
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          {confirmpasswordShown? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Create Account Password"
                  />
                </FormControl>
                {/* end new */}
             
                <br />
                <br />
                <FormControl fullWidth>
                  <InputLabel htmlFor="businessName">
                    Company/Business Name
                  </InputLabel>
                  <Input
                    inputProps={{ maxLength: 18 }}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      handleSubDomain(e);
                    }}
                    id="businessName"
                    name="name"
                    maxLength={20}
                    
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} md={7} sx={{ margin: "0 auto" }}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="businessURL">
                   Subdomain
                  </InputLabel>
                  <Input
                    error={subdomainExist.noExist}
                    required
                    maxLength={20}
                    id="businessURL"
                    name="subdomain"
                    value={subdomain}
                    endAdornment={
                      <InputAdornment position="end">
                        {subdomainExist.exist && (
                          <CheckCircleIcon style={{ color: "#42ba96" }} />
                        )}
                        {subdomainExist.noExist && <CancelIcon color="error" />}
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{subdomain}.axiomprotect.com</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Container>

          <Container>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
              <Grid item xs={1} md={3}></Grid>

              <Grid item xs={6} md={6}>
                <center>
                  <Button
                    size="small"
                    style={{ textTransform: "capitalize" }}
                    variant="contained"
                    onClick={(e) => handleSubmit(e)}
                    // onClick={handleNext}
                    disabled={subdomainExist.noExist}
                  >
                    Activate Account
                  </Button>
                </center>
              </Grid>
              <Grid item xs={1} md={3}></Grid>
            </Grid>
          </Container>

          <br />
          <br />
        </>
      )}
    </div>
  );
}
