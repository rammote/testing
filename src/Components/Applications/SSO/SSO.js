import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const authToken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");

  const [value, setValue] = React.useState("");
  const [loading, setLoading] = useState(false);
  

  const handleOnClick = e => {
    e.preventDefault();
    console.log(value)
    if(value === "1") {
      history.push({
        pathname: '/AxiomProtect/Applications/InitialSAMLApp'
      })
    }
    else if(value == "2") {
      history.push({
        pathname: '/AxiomProtect/Applications/InitialOpenIdApp'
      })
    }
    
  }

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
              label="SSO App Integration"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >
            <h4>Create a new SSO app integration</h4>
          </Typography>
          {/* <Typography sx={{fontFamily: 'Jost', fontSize: '15px', color: '#5C5C5C'}}>
                                Step 1 out of 2
                            </Typography> */}
          
        </Grid>
      </Grid>
      <br />
      <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
      <br />
      <br />

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Sign on methods
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <FormControl component="fieldset">
              <RadioGroup
                  aria-label="apps"
                  onChange={(e)=>setValue(e.target.value)}
                  name="radio-buttons-group"
              >
                <FormControlLabel value="1" control={<Radio />} label={<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}><b>SAML2.0</b></Typography>} />
                <Typography sx={{fontFamily: 'Jost', marginLeft: "30px"}}>XML-based open standard for SSO.Use if the Identity Provider for your application only supports SAML.</Typography>
                
                <FormControlLabel value="2" control={<Radio />} label={<Typography sx={{fontFamily: 'Jost', color: '#232E3C'}}><b>OIDC - OpenID Connect</b></Typography>} />
                <Typography sx={{fontFamily: 'Jost', marginLeft: "30px"}}>Token-based OAuth 2.0 authentication for Single Sign-On (SSO) through API endpoints.</Typography>
                <Typography sx={{fontFamily: 'Jost', marginLeft: "30px"}}>Recommended if you intend to build a custom app integration with the Okta Sign-In Widget.</Typography>
              </RadioGroup>
            </FormControl>  
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
            onClick={handleOnClick}
          >
              Next
          </Button>
        </center>
      )}
      <br />
      
    </div>
  );
}
