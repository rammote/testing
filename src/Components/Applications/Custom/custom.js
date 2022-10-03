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
import { LoadingButton } from "@mui/lab";
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

  // const [formData, setFormData] = React.useState({
  //     appName: "",
  //     appLogo: "",
  //     appType: "1",
  // })

  const [appName, setAppName] = React.useState("");
  const [identityDocument, setIdentityDoc] = React.useState(" ");
  const [appLogo, setAppLogo] = React.useState("");
  const [appType, setAppType] = React.useState("1");
  const [subType, setSubType] = React.useState("");
  const [sonicDoc, setSonicDoc] = React.useState("");
  const [loading, setLoading] = useState(false);
  // const appLogohandler =( event) => {
  //     this.setState({
  //         appLogo: event.target.files[0]
  //     })
  // }

  // const appNamehandler = event => {
  //     this.setState({
  //         appName: event.target.value
  //     })
  // }

  // const accountIdhandler = event => {
  //     this.setState({
  //         accountId: event.target.value
  //     })
  // }

  // const state = {
  //     accountId: null,
  //     appLogo: null,
  //     appName: null,
  //     appType: '1',
  //     requestTime: escape(new Date().toISOString().replaceAll("T", " ").replaceAll("Z", ""))
  // }

  const handleSonic = (e) => {
    e.preventDefault();
    setSonicDoc(true);
  };

  const [currDocument, setCurrDocument] = useState("");
  const [documents, setDocuments] = useState([]);
  const addDocuments = (e) => {
    if(documents.every(item => item !== e.target.value)) {
      setDocuments((oldState) => [...documents, e.target.value]);
      setCurrDocument("");
    }
    
  };
  const handleDeleteDocuments = (item, index) => {
    let arr = [...documents];
    arr.splice(index, 1);
    console.log(item);
    setDocuments(arr);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log();
    setLoading(true);
    // const url = "http://demo.axiomprotect.com:1243/AxiomProtect/v1/operator/create?userCount=0&requestTime=2021-09-22+17%3A35%3A02.676"
    const filedata = new FormData();
    filedata.append(
      "appLogo",
      appLogo
      //  this.state.appLogo
    );
    console.log(filedata);
    console.log(identityDocument);
    let docs;
    if (documents.length <= 0) {
      docs = "Selfie"
    } else {
      if(documents.indexOf("Selfie") === -1){
        documents.push("Selfie")
        documents.push("Sign")
        docs = documents.join(",");
      }else{
        docs = documents.join(",");
      }
    }
    console.log({docs})
    if(subType == 1 && subType == 3) {
      setSonicDoc(false)
    }
    await Server.post(
      `/application/add?appName=${appName}&appType=${appType}&subType=${subType}&documents=${docs}&identityDocument=${identityDocument}&accountId=${accountId}&requestTime=${requestTime}`,
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
        setLoading(false);
        if (response.data.resultCode === 0) {
          console.log(response.data);
          Swal.fire({
            title: "Successfully Added",
            icon: "success",
            showCancelButton: false,
            // confirmButtonText: 'Yes, delete it!',
            //cancelButtonText: 'OK'
          });
          history.push({
            pathname: "/AxiomProtect/Applications",
          });
        } else {
          Swal.fire({
            title: response.data.resultMessage,
            icon: "warning",
            showCancelButton: false,
            // confirmButtonText: 'Yes, delete it!',
            //cancelButtonText: 'OK'
          });
        }
        // setFormData({
        //     appName: "",
        //     appLogo: "",
        //     appType: "",
        // })
      })
      .catch((err) => {
        console.log(err);
        // setFormData({
        //     appName: "",
        //     appLogo: "",
        //     appType: "",
        // })
        setLoading(false);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: err,
        });
      });
    //   result = result.json();
    // console.warn(result);
  };

  console.log({ documents: documents.join(",") });
  const [image, setImage] = useState("");
  async function handleChange(e) {
    e.preventDefault();
    setAppLogo(e.target.files[0]);
    const base64 = await convertBase64(e.target.files[0]);
    return setImage(base64);
  }
  console.log("12346789")
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
    // <div style={{paddingTop: '100px'}}>
    //     <div style={{paddingLeft: '20px', lineHeight:'25px',width: '1400px'}}>
    //         <div>
    //             <h2 style={{ color:'#5C5C5C' }}>Dashboard/Protect application/ Add new custom integration</h2>
    //             <h1>Add new custom integration</h1><br />
    //             <p>Step 1 out of 1</p>
    //             <p>General App setting</p><hr />
    //             <br />
    //             <table style={{width: '2800px', float:'left'}}>
    //             <tr>
    //                 <td><p>Application Name</p></td>
    //                 <td><input style={{height:'40px', width:'750px'}} type='text' onChange={(e)=>setAppName(e.target.value)} /></td>
    //             </tr>
    //             <br />
    //             <tr>
    //                 <td><p>App Logo</p></td>
    //                 <td><input type='file' onChange={(e)=>setAppLogo(e.target.files[0])} /></td>
    //             </tr>
    //             <br />
    //             <tr>
    //                 <td><p>Validation Source</p></td>
    //                 <td>
    //                     <p><input type="radio"  />
    //                             Use LDAP/Active Directory as Source &nbsp;&nbsp;&nbsp;&nbsp;
    //                         <input type="radio" style={{ paddingLeft:'100px'}} />
    //                         Use AXIOM User Repository as Source</p>
    //                 </td>
    //             </tr>
    //             </table>

    //             <div style={{paddingLeft: '1000px', paddingTop: '300px'}}>
    //                 <Button>Cancel</Button>
    //                 <Button variant="contained" style={{color:'#FFFFFF', backgroundColor:'#206BC4'}} onClick={handleSubmit}>Create custom integration</Button>
    //                 {/* <Button style={{color:'#FFFFFF', backgroundColor:'#206BC4'}} onClick={this.addApp}>Create custom integration</Button> */}
    //             </div>
    //             {/* <br /><hr /><br />
    //             <table style={{width: '2800px', float:'left'}}>
    //             <tr>
    //                 <td><p>App ID</p></td>
    //                 <td><input style={{height:'40px', width:'750px'}} type='text' placeholder='Generated app id' onChange={accountIdhandler}/></td>
    //             </tr>
    //             </table>
    //             <div style={{paddingLeft: '1000px', paddingTop: '100px'}}>
    //                 <Button>Cancel</Button>
    //                 <Button style={{color:'#FFFFFF', backgroundColor:'#206BC4'}}>Intialize custom integration</Button>
    //             </div> */}
    //         </div>
    //     </div>
    // </div>

    <form onSubmit={handleSubmit} style={{ paddingTop: "90px", paddingLeft: "20px" }}>
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
              label="Add new custom integration"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >
            <h4>Add new custom integration</h4>
          </Typography>
          {/* <Typography sx={{fontFamily: 'Jost', fontSize: '15px', color: '#5C5C5C'}}>
                                Step 1 out of 2
                            </Typography> */}
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
      <br />

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Application Name*
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
              required
              onChange={(e) => setAppName(e.target.value)}
            />
            <FormHelperText sx={{color:"red"}}>You can not change app name in future</FormHelperText>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              App Logo*
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
                    width: "4rem",
                    height: "4rem",
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
                required
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Sub Type*
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              fullWidth
              size="small"
              // value={radiusSettings. radiusClientAuthtype}
              name="subType"
              id="subType"
              required
              onChange={(e) => setSubType(e.target.value)}
            >
              <MenuItem value={"2"} onClick={(e) => handleSonic(e)}>
                Sonic KYC
              </MenuItem>
              <MenuItem value={"1"}>Absolute</MenuItem>
              <MenuItem value={"3"}>Adaptive Auth</MenuItem>
              {/* <MenuItem value={"4"}>Neofy</MenuItem> */}
              {/* <MenuItem value={"5"}>Webtoken</MenuItem> */}
            </Select>
          </Grid>
        </Grid>
      </Container>
      <br />
      {sonicDoc == true && (
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Documents* 
                <br/>
                <span style={{color:"red"}}>(Default selfie and consent document will add)</span>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <div>
                <div className={"container"}>
                  {documents?.map((item, index) => (
                    <Chip
                      size="small"
                      onDelete={() => handleDeleteDocuments(item, index)}
                      label={item}
                    />
                  ))}
                </div>
                <br />
                <FormControl fullWidth variant="outlined">
                  <NativeSelect
                    className="dropdown"
                    placeholder="Select Document..."
                    onChange={addDocuments}
                    // set selected values
                    value={currDocument ?? ""}
                    
                  >
                    <option value="">Select Documents...</option>
                    <option value={"PAN"}>PAN</option>
                    <option value={"Aadhar"}>Aadhar</option>
                    <option value={"Passport"}>Passport</option>
                    <option value={"DrivingLicense"}>Driving License</option>
                  </NativeSelect>
                </FormControl>
                <br />
                <br />

                <br />
              </div>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Identity Documents*
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <NativeSelect
                  className="dropdown"
                  placeholder="Select Identity Document..."
                  onChange={(e) => setIdentityDoc(e.target.value)}
                  // set selected values
                  value={identityDocument ?? ""}
                  required
                >
                  <option value="">Select Identity Document</option>
                  <option value={"PAN"}>PAN</option>
                  <option value={"Aadhar"}>Aadhar</option>
                  <option value={"Passport"}>Passport</option>
                  <option value={"DrivingLicense"}>Driving License</option>
                  <option value={"Consent"}>Consent</option>
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      )}
      <br />
      <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
      <br />
      <br />
      {loading ? (
        <Loader />
      ) : (
        <center>
          <LoadingButton
          loading={loading}
            variant="contained"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#206BC4",
              fontFamily: "Jost",
            }}
            type="submit"
          >
            Create custom integration
          </LoadingButton>
        </center>
      )}
      <br />
      <br />
      <br />
      <br />
    </form>
  );
}
