import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { emphasize, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Server from "../../APIUrl";
import Loader from '../../Loader';
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const label = { inputProps: { "aria-label": "Switch demo" } };

const Input = styled("input")({
  display: "none",
});

const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function RadiusPage() {
  const history = useHistory();
  const authToken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");

  const [appName, setAppName] = React.useState("");
  const [appLogo, setAppLogo] = React.useState("");
  const [appType, setAppType] = React.useState("2");

  const [show, setShow] = React.useState("false");

  // constructor() {
  //     super();
  //     this.state={
  //         show: false,
  //         email: ""
  //     }
  // }

  // handleOnChange = (e) => {
  //     this.setState({[e.target.id]: e.target.value});
  //     console.log(this.state);
  // }

  // const handleOnClick = useCallback(() => history.push('/RadiusSettings'), [history]);
const [loading, setLoading] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log();
setLoading(true)
    // const url = "http://demo.axiomprotect.com:1243/AxiomProtect/v1/operator/create?userCount=0&requestTime=2021-09-22+17%3A35%3A02.676"
    const filedata = new FormData();
    filedata.append(
      "appLogo",
      appLogo
      //  this.state.appLogo
    );
    console.log(filedata);
    Server.post(
      `/application/add?appName=${appName}&subType=${4}&appType=${appType}&accountId=${accountId}&requestTime=${requestTime}`,
      filedata,
      {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
          authToken: authToken,
        },
      }
    )
      .then((response) => {
        if (response.data.resultCode === 0) {
          console.log(response.data);
          setLoading(false)
          Swal.fire({
            title: "Successfully Added",
            text: response.data.resultMessage,
            icon: "success",
            showCancelButton: false,
            // confirmButtonText: 'Yes, delete it!',
            //cancelButtonText: 'OK'
          });
          history.push({
            pathname: "/AxiomProtect/RadiusSettings",
            state: {
              appId: response.data.resultData,
            },
          });
        } else {
          setLoading(false)

          Swal.fire({
            title: response.data.resultMessage,
            icon: "error",
            showCancelButton: false,
            // confirmButtonText: 'Yes, delete it!',
            //cancelButtonText: 'OK'
          });
        }
      })
      .catch((err) => {
        setLoading(false)

        console.log(err);
        Swal.fire({
          title: err,
          icon: "error",
          showCancelButton: true,
          // confirmButtonText: 'Yes, delete it!',
          //cancelButtonText: 'OK'
        });
      });
  };

  function renderFirstPart() {
    return (
      <div>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Display Name *
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="name"
              id="email"
              label="Name"
              variant="outlined"
              onChange={(e) => setAppName(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              App Logo *
            </Typography>
          </Grid>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "45%",
              margin: "0 auto",
            }}
          >
            <div style={{ marginTop: 10 }}>
              {image === "" ? (
                <ImageAspectRatioIcon
                  style={{ fontSize: "4rem", opacity: "0.7" }}
                />
              ) : (
                <img
                  src={image}
                  alt="logo"
                  style={{
                    width: "6rem",
                    height: "6rem",
                    objectFit: "scale-down",
                    borderRadius: "0.5rem",
                    padding: "0.1rem",
                    border: "1px solid #6c757d",
                  }}
                />
              )}
            </div>

            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleChange(e)}
                id="icon-button-file"
                type="file"
              />

              <Button
                variant="outlined"
                color="primary"
                startIcon={<PhotoCamera />}
                component="span"
              >
                Upload
              </Button>
            </label>
          </div>
        </Grid>
        <br />
        {/* <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Validation Source</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-balel="radio-buttons" name="row-radio-buttons-group" defaultValue="ldap">
                                    <FormControlLabel value="ldap" control={<Radio />} label="Use LDAP/Active Directory as Source" />
                                    <FormControlLabel value="axiom" control={<Radio />} label="Use AXIOM User Repository as Source" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid> */}
        <br />
        <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
        <br />
        <br />
        
            {
              loading ? <Loader/> :
              <center>
              <Button
              variant="contained"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#206BC4",
                fontFamily: "Jost",
              }}
              onClick={handleSubmit}
            >
              Create Radius Integration
            </Button>
            </center>
            }
      </div>
    );
  }

  function renderNextPart() {
    return (
      <div>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Client Authentication Type
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              // options={dropdowntypes}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <Typography sx={{ fontFamily: "Jost" }}>
                      Password only
                    </Typography>
                  }
                />
              )}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Radius Client IP
            </Typography>
          </Grid>
          <Grid item spacing={3}>
            <TextField
              style={{ width: 60 }}
              size="small"
              type="text"
              name="name"
              id="email"
              variant="outlined"
            />
          </Grid>
          <Grid item spacing={3}>
            <TextField
              style={{ width: 60 }}
              size="small"
              type="text"
              name="name"
              id="email"
              variant="outlined"
            />
          </Grid>
          <Grid item spacing={3}>
            <TextField
              style={{ width: 60 }}
              size="small"
              type="text"
              name="name"
              id="email"
              variant="outlined"
            />
          </Grid>
          <Grid item spacing={3}>
            <TextField
              style={{ width: 60 }}
              size="small"
              type="text"
              name="name"
              id="email"
              variant="outlined"
            />
          </Grid>
          <Grid item spacing={3}>
            <Button variant="text" sx={{ fontFamily: "Jost" }}>
              Add IP
            </Button>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Day Restriction
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              // options={dropdowntypes}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <Typography sx={{ fontFamily: "Jost" }}>
                      Weekends only
                    </Typography>
                  }
                />
              )}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Time Range Restriction
            </Typography>
          </Grid>
          <Grid item spacing={5}>
            <Switch {...label} defaultChecked />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}></Grid>
          <Grid item spacing={2}>
            <TextField
              style={{ width: 120 }}
              size="small"
              type="text"
              name="name"
              id="email"
              label="Select time"
              variant="outlined"
            />
          </Grid>
          <Grid item spacing={2}>
            <TextField
              style={{ width: 60 }}
              size="small"
              type="text"
              name="name"
              id="email"
              label="AM"
              variant="outlined"
            />
          </Grid>
          <Grid item spacing={5}>
            <Typography
              sx={{ fontFamily: "Jost", color: "#5C5C5C", marginTop: "10px" }}
            >
              To
            </Typography>
          </Grid>
          <Grid item spacing={2}>
            <TextField
              style={{ width: 120 }}
              size="small"
              type="text"
              name="name"
              id="email"
              label="Select time"
              variant="outlined"
            />
          </Grid>
          <Grid item spacing={2}>
            <TextField
              style={{ width: 60 }}
              size="small"
              type="text"
              name="name"
              id="email"
              label="PM"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Client Shared Secret
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              style={{ width: 100 }}
              size="small"
              type="text"
              name="name"
              id="email"
              label="*******"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid container spacing={4} sx={{ marginLeft: "90%" }}>
          <Grid item>
          {
            loading ? <Loader/> :
            <Button
            type="submit"
            variant="contained"
            sx={{ fontFamily: "Jost" }}
            onClick={handleSubmit}
          >
            Create
          </Button>
          }
          </Grid>
        </Grid>
      </div>
    );
  }
  const [image, setImage] = useState("");
  async function handleChange(e) {
    e.preventDefault();
    setAppLogo(e.target.files[0]);
    const base64 = await convertBase64(e.target.files[0]);
    return setImage(base64);
  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <>
      <div style={{ paddingTop: "90px", paddingLeft: "20px" }}>
        <Grid container>
          <Grid item>
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                component="a"
                //href="/DashBoard"
                onClick={useCallback(() =>
                  history.push("/AxiomProtect/DashBoard")
                )}
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />
              <StyledBreadcrumb
                component="a"
                //href="/Users"
                onClick={useCallback(() =>
                  history.push("/AxiomProtect/Applications")
                )}
                label="Applications"
                style={{ cursor: "pointer" }}
              />
              <StyledBreadcrumb
                label="Add new radius integration"
                deleteIcon={<ExpandMoreIcon />}
              />
            </Breadcrumbs>
            <Typography
              sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
            >
              <h4>Add new radius integration</h4>
            </Typography>
            <Typography
              sx={{ fontFamily: "Jost", fontSize: "15px", color: "#5C5C5C" }}
            >
              Step 1 out of 2
            </Typography>
            <Typography
              sx={{ fontFamily: "Jost", fontSize: "15px", color: "#232E3C" }}
            >
              General App setting
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
        <br />
        {show ? renderFirstPart() : renderNextPart()}
        <br />
        <br />
      </div>
    </>
  );
}
