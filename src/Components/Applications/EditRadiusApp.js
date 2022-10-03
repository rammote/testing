import React, { useState, Component, useCallback, useEffect } from "react";
import Server from "../APIUrl";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Swal from "sweetalert2";
import Container from "@mui/material/Container";
import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

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

const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function EditApplication() {
  const history = useHistory();
  const location = useLocation();
  const accountId = sessionStorage.getItem("accountId");
  const authToken = sessionStorage.getItem("jwtToken");
  const [editCustomForm, setEditCustomForm] = React.useState({
    appname: "",
    applogo: "",
  });

  const [imageURL, setImageURL] = React.useState(" ");
  // const [appname,setAppName] = React.useState("");
  // const [applogo,setAppLogo] = React.useState("");

  React.useEffect(() => {
    //console.log(editCustomForm)
    //console.log(location.state.row.unitid)
    Server.get(
      `/application/get?accountId=${accountId}&appId=${location.state.row.appid}&requestTime=${requestTime}`,
      {
        headers: {
          "content-type": "application/json",
          authToken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        if (
          !(
            response.data.resultCode == -1 ||
            response.data.resultMessage == "Unable to get"
          )
        ) {
          setEditCustomForm(response.data.resultData);
          setImageURL(response.data.resultData.applogo);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);




const [radiusAppSetting, setRadiusAppSetting] = useState({})
const [appId, setAppId] = useState(location.state.row.appid)


const [radiusClientAuthtype, setRadiusClientAuthtype] = useState("");
const [radiusClientIp, setRadiusClientIp] = useState("");
const [ldapSearchPath, setLdapSearchPath] = useState();
const [ldapServerIp, setLdapServerIp] = useState("");
const [ldapServerPort, setLdapServerPort] = useState();
const [ldapValidation, setLdapValidation] = useState();
const [radiusClientSecretkey, setRadiusClientSecretkey] = useState("");

  useEffect(()=>{
    const fetchData=async ()=>{
await   Server.get(
    `/radius/getRadiusApplicationSettings?accountId=${accountId}&appId=${appId}&requestTime=${requestTime}`,
    {
      headers: {
        "content-type": "application/json",
        authToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    }
  )
    .then((response) => {

      if (response.data.resultCode === 0){
          setRadiusClientAuthtype(response.data.resultData.radiusClientAuthtype && response.data.resultData.radiusClientAuthtype);
            setRadiusClientIp(response.data.resultData.radiusClientIp && response.data.resultData.radiusClientIp);
            setRadiusClientSecretkey(response.data.resultData.radiusClientSecretkey && response.data.resultData.radiusClientSecretkey);
            setLdapSearchPath(response.data.resultData.ldapSearchPath && response.data.resultData.ldapSearchPath);
            setLdapServerIp(response.data.resultData.ldapServerIp && response.data.resultData.ldapServerIp);
            setLdapServerPort(response.data.resultData.ldapServerPort && response.data.resultData.ldapServerPort);
            setLdapValidation(response.data.resultData.ldapvalidation && response.data.resultData.ldapvalidation);

      } else{
            setRadiusAppSetting({})
            Swal.fire({
                title: "Warning",
                text: response.data.resultMessage,
                icon: "warning",
            })
      }
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: err,
        icon: "error",
    })
    });
    }
    return fetchData();
  },[appId])
  //console.log(imageURL)
  console.log(editCustomForm);
  console.log({radiusAppSetting});
  console.log({
    radiusClientAuthtype,
    radiusClientIp,
    radiusClientSecretkey,
    ldapSearchPath,
    ldapServerIp,
    ldapServerPort,
    ldapValidation,
    
  })
  const handleSubmit = async (event) => {
    event.preventDefault()

    await Server.post(`/radius/editRadiusApplicationSettings?appId=${appId}&accountId=${accountId}&requestTime=${requestTime}`,
    {
        "axiomvalidation": !ldapValidation,
        "ldapvalidation": ldapValidation,
        "radiusClientAuthtype": radiusClientAuthtype,
        "radiusClientIp": radiusClientIp,
        "radiusClientSecretkey": radiusClientSecretkey,
        "ldapSearchPath": ldapSearchPath,
        "ldapServerIp": ldapServerIp,
        "ldapServerPort": ldapServerPort,
    },{
        headers: {
            'content-type': 'application/json',
            "authToken": authToken
        },
    })
    .then((response) => {

        if(response.data.resultCode == 0){

            console.log(response.data)
            Swal.fire({
                text: response.data.resultMessage,
                icon: 'success',
                showCancelButton: true,
            })
  

        }else{
            Swal.fire({
                title: response.data.resultMessage,
                icon: 'error',
                showCancelButton: true,
            })
        }
    }).catch((err) => {
      Swal.fire({
        title:err,
        icon: 'error',
        showCancelButton: true,
    })
        console.log(err)
    })
}
async function handleChange(e) {
  e.preventDefault();
  editCustomForm.applogo=(e.target.files[0]);
  const base64 = await convertBase64(e.target.files[0]);
  return setImageURL(base64);
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
    <div style={{ width:"95%", margin:"0 auto", marginTop:"5.5rem" }}>
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
              onClick={useCallback(() =>
                history.push("/AxiomProtect/Applications")
              )}
              label="Applications"
              deleteIcon={<ExpandMoreIcon />}
            />
            <StyledBreadcrumb
              //onClick={useCallback(() => history.push('/Applications'))}
              label="Edit Radius Application"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={0} sx={{ paddingTop: "30px" }}>
        <Grid item>
          <Typography
            sx={{
              fontFamily: "Jost",
              fontSize: "18px",
              color: "#000000",
              fontWeight: "800",
            }}
          >
            Edit Radius Application
          </Typography>
        </Grid>
      </Grid>
      <div>
        <br />
        <br />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Application Name
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              type="text"
              variant="outlined"
              value={editCustomForm.appname}
              //onChange={(e)=>setAppName(e.target.value)}
              label="You can not change the name of your application"
            disabled={true}
              onChange={(e) =>
                setEditCustomForm({
                  ...editCustomForm,
                  appname: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            App Logo
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
            {imageURL === "" ? (
              <ImageAspectRatioIcon
                style={{ fontSize: "4rem", opacity: "0.7" }}
              />
            ) : (
              <img
                src={imageURL}
                alt="logo"
                style={{
                  width: "4rem",
                  height: "4rem",
                  objectFit: "contained",
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

        <br />
        <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
        <br />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Client Authentication Type
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              fullWidth
              size="small"
              value={radiusClientAuthtype ?? ""}
              label={radiusClientAuthtype}
              onChange={(e) => setRadiusClientAuthtype(e.target.value)}
            >
              <MenuItem value={""}>Select Auth Method</MenuItem>
              <MenuItem value={"OTP Only"}>OTP Only</MenuItem>
              <MenuItem value={"Password Only"}>Password Only</MenuItem>
              <MenuItem value={"OTP+Password"}>OTP + Password</MenuItem>
              <MenuItem value={"Push"}>Push</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3} row>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Radius Client IP
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              style={{ width: 300 }}
              size="small"
              type="text"
              name="name"
              id="email"
              label="Radius Client IP"
              value={radiusClientIp}
              variant="outlined"
              onChange={(e) => setRadiusClientIp(e.target.value)}
            />
          </Grid>
        </Grid>
        <br/>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Validation Source
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-balel="radio-buttons"
                name="row-radio-buttons-group"
                type="radio"
                value={ldapValidation ? "ldapvalidation" : "axiomvalidation"}
                onChange={(e)=>setLdapValidation("ldapvalidation" === e.target.value ? true : false)}   
              >
                <FormControlLabel
                  value="ldapvalidation"
                  control={<Radio />}
                  label="Use LDAP/Active Directory as Source"
                />
                <FormControlLabel
                  value="axiomvalidation"
                  control={<Radio />}
                  label="Use AXIOM User Repository as Source"
                />
              </RadioGroup>
            </FormControl>
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
              fullWidth
              size="small"
              type="password"
              name="name"
              id="email"
              label="Shared Secret"
              variant="outlined"
              value={radiusClientSecretkey ?? ""}
              onChange={(e) => setRadiusClientSecretkey(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <br />
      {
        ldapValidation &&
        <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} style={{ marginTop: 15 }}>
            LDAP Host/IP
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="ldapServerIp"
              id="ldapServerIp"
              label="IP"
              variant="outlined"
              value={ldapServerIp ?? ""}
              onChange={(e) => setLdapServerIp(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="ldapServerPort"
              id="ldapServerPort"
              label="Port"
              variant="outlined"
              value={ldapServerPort ?? ""}
             onChange={(e) =>setLdapServerPort(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} style={{ marginTop: 15 }}>
            LDAP Search Path
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="ldapSearchPath"
              id="ldapSearchPath"
              label="Base DN"
              variant="outlined"
              value={ldapSearchPath ?? ""}
             onChange={(e) =>setLdapSearchPath(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="tableName"
              id="tableName"
              label="Leave Blank is no Authentication"
              variant="outlined"
              // value={radiuserverconfigForm.tableName}
              // onChange={(e) =>
              //   setradiuserverconfigForm({
              //     ...radiuserverconfigForm,
              //     tableName: e.target.value,
              //   })
              // }
            />
          </Grid>
        </Grid>
      </Container>
      }
        <br/>
        <br/>
      
           <div style={{width:"100%", margin:"0 auto", textAlign:"center"}}>
           <Button
              variant="contained"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#206BC4",
                fontFamily: "Jost",
              }}
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
           </div>
         
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
