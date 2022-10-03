import React, { useEffect, useState } from "react";
import Server from "../APIUrl";
import "./style.css";
import axiom_protect_logo from "../../Assets/axiom_protect_logo.png";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
//import registerAPI from './API/Register';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { Link } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Loader from "../Loader";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const userCount = "0";
//const requestTime = '2021-06-28+17%3A35%3A02.676';
const requestTimess = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
const requestTime = escape(requestTimess);
//const requestTime =new TextEncoder(requestTimesssss);
const siteURl = window.location.origin;
function Register() {
    const [loading, setloading] = useState(false);
    const history = useHistory();
    const [registrationForm, setRegistrationForm] = React.useState({
        fname: "",
        lanme: "",
        email: "",
        phone: "",
        company: "",
        userCount: 10,
        isLoading: false,
        isSuccess: false,
        isError: false,
        isSnackbarOpen: false,
        checked: false,
        isCheckboxNeeded: false,
    });

    useEffect(() => {
        console.log(requestTime);
        return () => { };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(registrationForm);

        // const url = "http://demo.axiomprotect.com:1243/AxiomProtect/v1/operator/create?userCount=0&requestTime=2021-09-22+17%3A35%3A02.676"
        setRegistrationForm({ ...registrationForm, isLoading: true });

        if (
            registrationForm.fname !== "" &&
            registrationForm.lanme !== "" &&
            registrationForm.email !== "" &&
            registrationForm.phone !== ""
        ) {
            await Server.post(
                `/account/register?requestTime=${requestTime}&sendNotification=${true}`,
                registrationForm,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                        "content-type": "application/json",
                    },
                }
            )
                .then((response) => {
                    if (response.data.resultCode === 0) {
                        history.push({
                            pathname: "/AxiomProtect/emailSendSuccess",
                            state: {
                                form: registrationForm,
                            },
                        });
                    } else {
                        Swal.fire({
                            title: "Warning",
                            text: response.data.resultMessage,
                            icon: "error",
                            showCancelButton: true,
                        });

                        setRegistrationForm({
                            ...registrationForm,
                            isLoading: false,
                        });
                        history.push("/");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        title: "Error",
                        text: err,
                        icon: "error",
                        showCancelButton: true,
                    });
                    setRegistrationForm({
                        fname: "",
                        lanme: "",
                        email: "",
                        phone: "",
                        age: 10,
                        company: "",
                        isLoading: false,
                        isSuccess: false,
                        isError: true,
                        isSnackbarOpen: true,
                        checked: false,
                        isCheckboxNeeded: false,
                    });
                });
        } else {
            setRegistrationForm({ ...registrationForm, isLoading: false });
            Swal.fire({
                title: "Please Fill The Details ",
                text: "Some fields are missing!...",
                icon: "warning",
                showCancelButton: true,
            });
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setRegistrationForm({ ...registrationForm, isSnackbarOpen: false });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Snackbar
                open={registrationForm.isSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={
                        registrationForm.isSuccess
                            ? "success"
                            : registrationForm.isError
                                ? "error"
                                : registrationForm.isCheckboxNeeded
                                    ? "info"
                                    : "info"
                    }
                    sx={{ width: "100%" }}
                >
                    {registrationForm.isSuccess
                        ? " Registration successfull Please Check Your Mail!!!"
                        : registrationForm.isCheckboxNeeded
                            ? "Check box not select3ed"
                            : "Error in backend"}
                </Alert>
            </Snackbar>

            {registrationForm.isLoading ? (
                <Backdrop
                    sx={{ color: "green", zIndex: 3, backgroundColor: "transparent" }}
                    open={registrationForm.isLoading}
                // onClick={()=>setRegistrationForm({ ...registrationForm, isLoading: false })}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <>
                    <Grid container spacing={3} style={{ marginTop: 50 }}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <center>
                                <img
                                    src={axiom_protect_logo}
                                    style={{ width: 50, height: 50 }}
                                />
                                <h3 className="page_title">Axiom Protect 2.0</h3>
                            </center>
                            <center></center>
                            <Card className="" variant="outlined">
                                <CardContent>
                                    <center>
                                        <h3 className="form_title">
                                            <b>Create Account</b>
                                        </h3>
                                    </center>

                                    <Container>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    name="fname"
                                                    id="fname"
                                                    required
                                                    type="text"
                                                    inputProps={{ max: 18, min:1 }}
                                                    label="First Name"
                                                    value={registrationForm.fname}
                                                    onChange={(e) =>
                                                        setRegistrationForm({
                                                            ...registrationForm,
                                                            fname: e.target.value,
                                                        })
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    inputProps={{ max: 18, min:1 }}
                                                    fullWidth
                                                    name="lanme"
                                                    required
                                                    type="text"
                                                    id="lanme"
                                                    
                                                    label="Last Name"
                                                    variant="outlined"
                                                    value={registrationForm.lanme}
                                                    onChange={(e) =>
                                                        setRegistrationForm({
                                                            ...registrationForm,
                                                            lanme: e.target.value,
                                                        })
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Container>

                                    <br />
                                    <Container>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    name="email"
                                                    id="email"
                                                    type="email"
                                                    required
                                                    label="Email Address"
                                                    variant="outlined"
                                                    value={registrationForm.email}
                                                    inputProps={{ max: 150 }}
                                                    onChange={(e) =>
                                                        setRegistrationForm({
                                                            ...registrationForm,
                                                            email: e.target.value.toLowerCase(),
                                                        })
                                                    }
                                               

                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    name="phone"
                                                    required
                                                    id="phone"
                                                    type="tel"
                                                    label="Phone No"
                                                    variant="outlined"
                                                    title="Ten digits number"
                                                    placeholder="Enter Number in this format: 1234567890"
                                                    value={registrationForm.phone}
                                                    onChange={(e) =>
                                                        setRegistrationForm({
                                                            ...registrationForm,
                                                            phone: e.target.value,
                                                        })
                                                    }
                                                    inputProps={{ max: 13, min: 10, pattern: "[0-9]{3}[0-9]{3}[0-9]{4}" }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Container>

                                    <br />
                                    <Container>
                                        <Grid container spacing={2}>
                                            {/* <Grid item xs={12} md={6}>
                                                <TextField fullWidth name="company"
                                                    id="company"
                                                    label="Company/Account Name"
                                                    value={registrationForm.company}
                                                    variant="outlined"
                                                    onChange={(e) => setRegistrationForm({ ...registrationForm, company: e.target.value })} />
                                            </Grid> */}
                                            <Grid item xs={12} md={6}>
                                                {/* <FormControl fullWidth>
                                               <InputLabel id="demo-simple-select-autowidth-label">Total Users</InputLabel>
                                               <Select fullWidth
                                                 
                                                    // id="demo-simple-select"
                                                    defaultValue={registrationForm.userCount}
                                                    autoFocus={false}
                                                    label="Total Users"
                                                   

                                                    onChange={(e) => setRegistrationForm({ ...registrationForm, userCount: e.target.value })}
                                                >
                                                  
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                               </FormControl> */}
                                                {/* <TextField fullWidth name="usercount"
                                                    id="usercount"
                                                    label="Total Users"
                                                    value={10}
                                                    variant="outlined"
                                                    onChange={(e) => setRegistrationForm({ ...registrationForm, company: e.target.value })} 
                                                /> */}
                                            </Grid>
                                        </Grid>
                                    </Container>

                                    <Box style={{ marginLeft: 10 }}>
                                        <Checkbox
                                            {...label}
                                            required
                                            checked={registrationForm.checked}
                                            inputProps={{ "aria-label": "controlled" }}
                                            onChange={(e) =>
                                                setRegistrationForm({
                                                    ...registrationForm,
                                                    checked: e.target.checked,
                                                })
                                            }
                                            size="medium"
                                        />
                                        <span
                                            style={{
                                                fontSize: 17,
                                                fontWeight: 600,
                                                color: "#707070",
                                            }}
                                        >
                                            By signing up I agree to the
                                            <a
                                                href={siteURl + "/AxiomProtect/tearmsAndConditions"}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {" "}
                                                Terms And Conditions
                                            </a>
                                        </span>
                                    </Box>

                                    <Box>
                                        <center>
                                            <Button
                                                variant="contained"
                                                disabled={
                                                    registrationForm.checked === true ? false : true
                                                }
                                                type="submit"
                                            >
                                                Start My Trial
                                            </Button>
                                        </center>
                                    </Box>

                                    <Box style={{ marginLeft: -5 }}>
                                        <center>
                                            <p>
                                                Already have an account?<Link to="/">Login</Link>
                                            </p>
                                        </center>
                                    </Box>
                                </CardContent>
                                <p style={{ textAlign: "center", fontSize: "0.8rem" }}>
                                    Powered By{" "}
                                    <a
                                        href="https://www.blue-bricks.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Blue Bricks Pty. Ltd.
                                    </a>
                                </p>
                            </Card>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    <br />
                    <br />
                    <br />
                </>
            )}
        </form>
    );
}

export default Register;
