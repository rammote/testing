import React, { useCallback, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Server from "../../APIUrl";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import NativeSelect from "@mui/material/NativeSelect";
import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import axios from "axios";
import Swal from "sweetalert2";
import { emphasize } from "@mui/material/styles";
import FormHelperText from '@mui/material/FormHelperText';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loader from "../../Loader";

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

export default function Applications() {

  const location = useLocation();  
  const history = useHistory();
  const authToken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  var appid = location.state.appId;
  console.log(appid);

  const [application_type, setApplication_Type] = React.useState("");
  const [client_name, setClient_Name] = React.useState("");
  const [redirect_uris, setRedirect_Uris] = React.useState("");
  const [post_logout_redirect_uris, setPost_Logout_Redirect_Uris] = React.useState("");
  const [token_endpoint_auth_method, setToken_Endpoint_Auth_Method] = React.useState("");
  const [grant_types, setGrant_Types] = React.useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log();
    setLoading(true)
    const rand = Math.floor(1000 + Math.random() * (10000 - 1000));
    //console.log(1000 + Math.random() * (10000 - 1000);)
    const subDomain = `oidc_${rand}`;
    const protocol = window.location.protocol;
    const hostWithSubDomain = window.location.host.split(".");
      hostWithSubDomain.shift();
    const host=hostWithSubDomain.join(".")
    var domain = `${protocol}//${subDomain}.${host}`;
    const request_uris = [`${domain}/openid-login`]
    Server.post(
      `/oidc/addOidcClient?accountid=${accountId}&appid=${appid}`,
      {
        "application_type": application_type,
        "client_name": client_name,
        "redirect_uris": redirect_uris.split(" "),
        "post_logout_redirect_uris": post_logout_redirect_uris.split(" "),
        "token_endpoint_auth_method": token_endpoint_auth_method,
        "grant_types": grant_types.split(" "),
        domain,
        request_uris
    },
      {
        headers: {
          
          'content-type': 'application/json',
          authToken: authToken,
        },
      }
    )
      .then((response) => {
        if (response.data.resultCode === 0) {
          console.log(response.data);
          const data=JSON.parse(response?.data?.resultData || response?.data?.resultMessage || null )
          const clientId=data?.client_id || data?.clientid || data?.clientId;
          setLoading(false)
          Swal.fire({
            title: "Successfully Added",
            text: "Configure OpenId Application Successfully",
            icon: "success",
            showCancelButton: false,
            
          });
          history.push({
            pathname: `/AxiomProtect/Applications/OpenIdApp/${clientId}`,
            state: {
                row:{
                  ...data,
                appId: appid,
                domain: domain,
                accountId
                }
            },
          });
        } else {
          setLoading(false)

          Swal.fire({
            title: response.data.resultMessage,
            icon: "error",
            showCancelButton: false,
           
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
         
        });
      });
  };

  return (
    
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
              label="Configure OpenId Application"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >
            <h4>Configure OpenId Application</h4>
          </Typography>
          {/* <Typography sx={{fontFamily: 'Jost', fontSize: '15px', color: '#5C5C5C'}}>
                                Step 1 out of 2
                            </Typography> */}
          
        </Grid>
      </Grid>
      
      <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
      <br />
     
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                OIDC Application Type *
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
          <Select
              fullWidth
              size="small"
              name="application_type"
              id="application_type"
              onChange={(e) => setApplication_Type(e.target.value)}
            >
              <MenuItem value={"web"}>Web</MenuItem>
              <MenuItem value={"native"}>Native</MenuItem>
            </Select>
            
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                App integration name *
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="client_name"
              id="client_name"
              label="App integration name"
              variant="outlined"
              onChange={(e) => setClient_Name(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        {/* <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Logo(optional)
            </Typography>
          </Grid>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "25%",
              float: "left",
              margin: "1px 21px",
            }}
          >
            <div style={{ marginTop: 10 }}>
              
                <img
                  src=""
                  alt="logo"
                  style={{
                    width: "4rem",
                    height: "4rem",
                    objectFit: "scale-down",
                    borderRadius: "0.5rem",
                    padding: "0.1rem",
                    border: "1px solid #6c757d",
                  }}
                />
             
            </div>

            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                style={{ display: "none" }}
               
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
        <br /> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Sign-in redirect URIs *
                <p style={{fontSize: "13px", fontWeight: "500"}}>Axiom sends the authentication response and ID token for the user's sign-in request to these URIs</p>
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="redirect_uris"
              id="redirect_uris"
              label="Sign-in redirect URIs"
              variant="outlined"
              onChange={(e) => setRedirect_Uris(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Sign-out redirect URIs(Optional)
                <p style={{fontSize: "13px", fontWeight: "500"}}>After your application contacts Axiom to close the user session, Axiom redirects the user to one of these URIs.</p>
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="post_logout_redirect_uris"
              id="post_logout_redirect_uris"
              label="Sign-out redirect URIs"
              variant="outlined"
              onChange={(e) => setPost_Logout_Redirect_Uris(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Token Endpoint Auth Method *
                <p style={{fontSize: "13px", fontWeight: "500"}}>The method used to authenticate the client at the Token Endpoint.Default is none.</p>
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Select
              fullWidth
              size="small"
              // value={radiusSettings. radiusClientAuthtype}
              name="token_endpoint_auth_method"
              id="token_endpoint_auth_method"
              onChange={(e) => setToken_Endpoint_Auth_Method(e.target.value)}
            >
              
              <MenuItem value={"none"}>none</MenuItem>
              <MenuItem value={"client_secret_basic"}>client_secret_basic</MenuItem>
              <MenuItem value={"client_secret_post"}>client_secret_post</MenuItem>
              {/* <MenuItem value={"5"}>Webtoken</MenuItem> */}
            </Select>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Select required grant types *
                <p style={{fontSize: "13px", fontWeight: "500"}}>Grant types that your application can use to request access tokens. Default is authorization_code.</p>
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Select
              fullWidth
              size="small"
              // value={radiusSettings. radiusClientAuthtype}
              name="grant_types"
              id="grant_types"
              onChange={(e) => setGrant_Types(e.target.value)}
            >
              
              <MenuItem value={"authorization_code"}>authorization_code</MenuItem>
              <MenuItem value={"refresh_token"}>refresh_token</MenuItem>
              <MenuItem value={"client_credentials"}>client_credentials</MenuItem>
              {/* <MenuItem value={"5"}>Webtoken</MenuItem> */}
            </Select>
          </Grid>
        </Grid>
      </Container>
    
      <br />
      <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
      <br />
      <br />
      {loading ? (
        <Loader />
      ) : (
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
            Save And Next
          </Button>
        </center>
      )}
      <br />
      
    </div>
  );
}
