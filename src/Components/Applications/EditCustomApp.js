import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from '@mui/material/FormHelperText';
import Grid from "@mui/material/Grid";
import NativeSelect from "@mui/material/NativeSelect";
import { emphasize, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React, { useCallback, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Server from "../APIUrl";



const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);

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

export default function EditCustomApplication() {
  const history = useHistory();
  const location = useLocation();
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [identityDocument, setIdentityDoc] = useState("");
  const [editCustomForm, setEditCustomForm] = React.useState({
    appname: "",
    applogo: "",
  });

  // const [appname,setAppName] = React.useState("");
  // const [applogo,setAppLogo] = React.useState("");

  // new structure
  const [currDocument, setCurrDocument] = useState("");
  const [documents, setDocuments] = useState([]);
  const [isSonic, setIsSonic] = useState(false);
  const addDocuments = (e) => {
    if(documents.every(item => item !== e.target.value)) {
      setDocuments((oldState) => [...documents, e.target.value]);
      setCurrDocument("");
    }
  };
  const [image, setImage] = useState("");
  const [appLogo, setAppLogo] = useState("")
  const handleDeleteDocuments = (item, index) => {
    let arr = [...documents];
   if(item==="Selfie"){
     Swal.fire({
      title: "Selfie is default doucment",
      text: "You could not delete Selfie",
      icon: "warning",
     })
   }else{
    arr.splice(index, 1);
    console.log(item);
    setDocuments(arr);
   }
  };
  React.useEffect(() => {
    //console.log(editCustomForm)
    //console.log(location.state.row.unitid)
    Server.get(
      `/application/get?accountId=${accountId}&appId=${location.state.row.appid}&requestTime=${requestTime}`,
      {
        headers: {
          "content-type": "application/json",
          authToken: authtoken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        if (response.data.resultCode === 0) {
          setEditCustomForm(response.data.resultData);
          setImage(response.data.resultData.applogo);
          setAppLogo(response.data.resultData.applogo)
          if (response.data.resultData.subtype === "2") {
            setAppLogo(response.data.resultData.applogo)
            let doc = response.data.resultData.documents;
            setIdentityDoc(response.data.resultData.identitydocument);
            const docArray = doc.split(",");
            setIsSonic(true);
            setDocuments(docArray);
            if (docArray[0] === doc) {
              const docArray = doc.split(", ");
              setDocuments(docArray);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log({ documents });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("edit", editCustomForm);
    let docs;
    if (documents.length <= 0) {
      docs = "Selfie"
    } else {
      if(documents.indexOf("Selfie") === -1){
        documents.push("Selfie")
        docs = documents.join(",");
      }else{
        docs = documents.join(",");
      }
    }
const filedata = new FormData();
     filedata.append( 
     "appLogo", appLogo
     );
    await Server.post(
      `/application/edit?accountId=${accountId}&appId=${location.state.row.appid}&appName=${editCustomForm.appname}&requestTime=${requestTime}&identityDoc=${identityDocument}&docs=${docs}`,
      filedata,
      {
        headers: {
          "content-type": "application/json",
          authToken: authtoken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        if(response.data.resultCode === 0){
          Swal.fire({
            title: "Success!",
            text: response.data.resultMessage,
            icon: "success",
            confirmButtonText: "OK",
          })
          history.push("/AxiomProtect/Applications")
        }else{
          Swal.fire({
            title: "Error!",
            text: response.data.resultMessage,
            icon: "error",
          })
        }
        // history.push("/AxiomProtect/Applications");
        /*window.location.href="/Setpassword";*/
        //    setEditCustomForm({
        //         appname: "",
        //         applogo: "",

        //     })
      })
      .catch((err) => {
        console.log(err);
       Swal.fire({
        title: "Error..",
        text: err,
        icon: "error",
       })
      });
  };

  console.log({appLogo})

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
    <div style={{ width: "95%", margin: "0 auto", marginTop:"5.5rem" }}>
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
              label="Edit Custom Application"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={0} sx={{ paddingTop: "30px",}}>
        <Grid item>
          <Typography
            sx={{
              fontFamily: "Jost",
              fontSize: "18px",
              color: "#000000",
              fontWeight: "800",
            }}
          >
            Edit Custom Application
          </Typography>
        </Grid>
      </Grid>
      <br />
      {/* <br />
      <br /> */}
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Application Name
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            id="appName"
            variant="outlined"
            value={editCustomForm.appname}
            //onChange={(e)=>setAppName(e.target.value)}
           label="You can not change the name of your application"
            disabled={true}
            onChange={(e) =>
              setEditCustomForm({ ...editCustomForm, appname: e.target.value })
            }
          />
          <FormHelperText sx={{color:"red"}}>You can not change app name</FormHelperText>
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
      {/* Added new structure */}

      {isSonic && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Documents
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
                Identity Documents
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
                >
                  <option value="">Select Identity Document...</option>
                  <option value={"PAN"}>PAN</option>
                  <option value={"Aadhar"}>Aadhar</option>
                  <option value={"Passport"}>Passport</option>
                    <option value={"DrivingLicense"}>Driving License</option>
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
        </>
      )}
      <br />
      {/* End Structure */}
      <Divider sx={{ borderColor: "#BABABA", width: "1160px" }} />
      <br />
      <div style={{ width: "100%", textAlign: "center", marginBottom:"2rem"  }}>
        <Button
          variant="contained"
          style={{
            color: "#FFFFFF",
            backgroundColor: "#206BC4",
            fontFamily: "Jost",

          }}
          onClick={(e) => handleSubmit(e)}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
