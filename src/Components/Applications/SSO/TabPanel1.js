import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import { MenuItem, Chip } from "@material-ui/core";
import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
// import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { nanoid } from "nanoid";
import { useHistory,useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Server from "../../APIUrl";
import styles from "./OIDCApplication.module.css";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import PublishIcon from "@material-ui/icons/Publish";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import { Typography } from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import {
   
    TextareaAutosize,
    
  } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
    fontSize: "1rem",
    color: "grey",
  },
  customWidth: {
    maxWidth: 200,
    fontSize: "0.9rem",
  },
  noMaxWidth: {
    maxWidth: "none",
  },
  toolTip: {
    fontSize: "1.5rem",
  },
}));
export default function AddSAMLApp(props) {
    const {idpId} = props;
    console.log(idpId);
    const authToken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const location = useLocation(); 
    var appid = location.state.appId;
    const [appData, setAppData] = useState({
        idpId: idpId,
        
        signature_algorithm: "rsa_sha256",
        assertion_encryption: "encrypted",
        isRDUrlSame: true,
        enable_single_logout: true,
        isOtherSSOUrlEnabled: false,
        authnRequestsSigned: true,
        wantMessageSigned: true,
        authContextClass: "passwordless",
      });
  const classes = useStyles();
  const [isAdvanceSetting, setIsAdvanceSetting] = useState(true);
  

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#0D4990",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const history = useHistory();

  const saveState = (e) => {
    setAppData({ ...appData, [e.target.name]: e.target.value });
  };
  const saveStateChecked = (e) => {
    setAppData({ ...appData, [e.target.name]: e.target.checked });
  };

  const [redirectLoginURIfields, setRedirectLoginURIfields] = useState([]);
  const [redirectLogoutURIfields, setRedirectLogoutURIfields] = useState([]);

  function handleRedirectLoginURIChange(i, event) {
    const values = [...redirectLoginURIfields];
    values[i].value = event.target.value;
    setRedirectLoginURIfields(values);
  }

  function handleAddLoginURI() {
    const values = [...redirectLoginURIfields];
    values.push({ value: "" });
    setRedirectLoginURIfields(values);
  }

  function handleRemoveLoginURI(i) {
    const values = [...redirectLoginURIfields];
    values.splice(i, 1);
    setRedirectLoginURIfields(values);
  }
  function handleAddLogoutURI() {
    const values = [...redirectLogoutURIfields];
    values.push({ value: "" });
    setRedirectLogoutURIfields(values);
  }
  function handleRemoveLogoutURI(i) {
    const values = [...redirectLogoutURIfields];
    values.splice(i, 1);
    setRedirectLogoutURIfields(values);
  }
  function handleRedirectLogoutURIChange(i, event) {
    const values = [...redirectLogoutURIfields];
    values[i].value = event.target.value;
    setRedirectLogoutURIfields(values);
  }
  const [rows, setRows] = React.useState();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if(idpId){
      fetchData();
    }
   
   }, [idpId])
    const [filterList, setFilterList] = useState(rows);
  const fetchData = async () => {
    setLoading(true)
   await Server.get(`/sp/getallSP?id=${idpId}`, {
      headers: {
          'content-type': 'application/json',
          authToken: authToken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"

      },
  })
      .then((response) => {
        
        if(response.data.resultCode === 0) {
            let data = JSON.parse(response.data.resultData);
            setRows(data);
            setFilterList(data);
            console.log(data)

           
        }
          
      }).catch((err) => {
          


      })
  }

  
  
  const createApp = async (e) => {
    e.preventDefault();
    try {
      const response = await Server.post(`sp/createSP`, {
        name: appData.name,
        logo_uri: appData.logo_uri,
        uniqueId: props.uniqueId,
         ...appData,
      },{
        headers: {
          
          'content-type': 'application/json',
          authToken: authToken,
        },
      });
      fetchData(JSON.parse(response.data.resultData));
      Swal.fire({
        title: "Successfully Added",
        text: "SP Added Successfully",
        icon: "success",
        showCancelButton: false,
        
      });
    //   history.push({
       
    //     state: {
    //         data: JSON.parse(response.data.resultData),
    //     },
    //   });

      // props.handleNext();
    } catch (error) {
      let errorMsg = error.message;
      if (error?.response?.data?.errorMessage)
        errorMsg = error?.response?.data?.errorMessage;
      console.log(errorMsg);
      // alert box with toastify
      
    }
  };
  // const setImage = (data) => {
  //     setAppData({ ...appData, logo: data });
  // };
  async function handleChange(e) {
    e.preventDefault();
    console.log({ ImageData: e.target.files });
    const { size, type } = e.target.files[0];
    if (size > 200 * 1024) {
      
      return setImage("");
    }
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
  const setImage = (data) => {
    setAppData({ ...appData, logo_uri: data });
  };
  // create function to return string if pem certificate uploaded
  const handleGetPem = (e) => {
    e.preventDefault();
    console.log({ e });
    const file = e.target.files[0];
    // file name
    console.log({ file });

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      return setAppData({
        ...appData,
        encryptCert: e.target.result,
        encrypt_file_name: file.name,
      });
    };
    reader.onerror = (error) => {
      
    };
  };
  // create function to return string if pem certificate uploaded
  const handleSignatureCert = (e) => {
    e.preventDefault();
    console.log({ e });
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      return setAppData({
        ...appData,
        signingCert: e.target.result,
        signature_file_name: file.name,
      });
    };
  };



  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const [metaData, setMetaData] = useState("");

  const getMetaDataOfSP = (e,row) => {
    e.preventDefault();
    console.log();
    setLoading(true)
   
    Server.get(
      `/sp/getSPMatadata?id=${row.spId}`,
      {
        headers: {
          
          'content-type': 'application/json',
          authToken: authToken,
        },
      }
    )
      .then((response) => {
        if (response.data.resultCode === 0) {
            const result = response.data.resultMessage;
            setMetaData(result);
            setOpen(true);
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


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "618px",
    // height: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    fontFamily: 'Jost',
};
  return (
    <div>
    <div style={{width: "95%",margin:"0 auto",padding:"1rem"}}>
      

      <form autoComplete="off" spellCheck="false" onSubmit={createApp}>
        {/* <div className={styles.flexRow}>
                    <p className={styles.p}>Application Type</p>
                    <TextField
                        variant="outlined"
                        maxLength={300}
                        style={{ width: "60%" }}
                        name="application_type"
                        id="select"
                        size="small"
                        onChange={saveState}
                        select
                        defaultValue={appData.application_type}
                    >
                        <MenuItem value="web">Web</MenuItem>
                    </TextField>
                </div> */}
        {/* <div className={styles.flexRow}>
          <p className={styles.p}>App name</p>
          <TextField
            id="applicationName"
            name="name"
            style={{ width: "60%" }}
            type="text"
            onChange={saveState}
            size="small"
            variant="outlined"
            required
          />
        </div> */}
        {/* <div className={styles.flexRow}>
          <div>
            <p
              style={{
                float: "left",
                margin: "0",
                padding: "0",
              }}
            >
              Logo<span style={{ opacity: "0.5" }}>(optional)</span>
            </p>
            <br />
            <span
              style={{
                fontSize: "0.8rem",
                opacity: "0.7",
                margin: " 0",
                float: "left",
              }}
            >
              Note<sup>*</sup> : please! upload image below 200KB
            </span>
            <br />
            <span
              style={{
                fontSize: "0.8rem",
                opacity: "0.7",
                margin: " 0",
                float: "left",
              }}
            >
              or paste logo url
            </span>
          </div>
          <div className={styles.logoContainer}>
            <div className={styles.uploadContainer}>
             
              <TextField
                id="logo_uri"
                name="logo_uri"
                fullWidth
                type="url"
                onChange={saveState}
                size="small"
                variant="outlined"
                placeholder="Paste logo url"
              />
            </div>
            <div className={styles.uploadAndPreviewCnd}>
              <label htmlFor="icon-button-file">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  onChange={(e) => handleChange(e)}
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
              <div style={{ marginTop: 10 }}>
                {appData?.logo_uri !== "" && appData?.logo_uri !== undefined ? (
                  <img
                    src={`${appData?.logo_uri}`}
                    alt="logo"
                    style={{
                      width: "4rem",
                      height: "4rem",
                      objectFit: "scale-down",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <ImageAspectRatioIcon
                    style={{ fontSize: "4rem", opacity: "0.7" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div> */}
       
        <div className={styles.flexRow}>
          <div className={styles.signRedirectURLContainer}>
            <span style={{ fontFamily: "Jost"}}>
              Single Sign-on URI(ACS URL)
              <Tooltip
                classes={{ tooltip: classes.customWidth }}
                placement="top"
                title="The location where the SAML assertion is sent with a HTTP POST. This is often referred to as the SAML Assertion Consumer Service (ACS) URL for your application."
              >
                <HelpIcon className={classes.button} />
              </Tooltip>
            </span>
          </div>
          <div className={styles.singinTextFieldContainer}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="acsUrl"
              type="url"
              onChange={saveState}
              variant="outlined"
              placeholder="https://example.com/acs"
              required
              fullWidth
            />
          </div>
        </div>
        <br />
        {/* Other sso urls */}

        <div className={styles.flexRow}>
          <div className={styles.signRedirectURLContainer}>
            <span>
              Single Logout URL(SLO URL)
              <Tooltip
                classes={{ tooltip: classes.customWidth }}
                placement="top"
                title=" The location where the SAML Logout Request is sent with a HTTP POST. This is often referred to as the SAML Logout Request Service (SLO) URL for your application."
              >
                <HelpIcon className={classes.button} />
              </Tooltip>
            </span>
          </div>
          <div className={styles.singinTextFieldContainer}>
            <TextField
              name="sloUrl"
              style={{ width: "100%" }}
              size="small"
              type="url"
              onChange={saveState}
              variant="outlined"
              placeholder="https://example.com/logout"
            />
          </div>
        </div>
        <br />

        <div className={styles.flexRow}>
          <div className={styles.signRedirectURLContainer}>
            <span>
              Audience URI(SP Entity ID)
              <Tooltip
                classes={{ tooltip: classes.customWidth }}
                placement="top"
                title="The application-defined unique identifier that is the intended audience of the SAML assertion. This is most often the SP Entity ID of your application."
              >
                <HelpIcon className={classes.button} />
              </Tooltip>
            </span>
          </div>
          <div className={styles.singinTextFieldContainer}>
            <TextField
              id="redirect_uris"
              name="entityID"
              onChange={saveState}
              style={{ width: "100%" }}
              size="small"
              type="url"
              placeholder="https://example.com/sp/metadata"
              variant="outlined"
              required
            />
          </div>
        </div>
        <br />
        <div className={styles.flexRow}>
          <div className={styles.signRedirectURLContainer}>
            <span>
              Default RelayState
              <Tooltip
                classes={{ tooltip: classes.customWidth }}
                placement="top"
                title="Identifies a specific application resource in an IDP initiated Single Sign-On scenario. In most instances this is blank."
              >
                <HelpIcon className={classes.button} />
              </Tooltip>
            </span>
          </div>

          <div className={styles.singinTextFieldContainer}>
            <TextField
              id="redirect_uris"
              name="relayState"
              onChange={saveState}
              style={{ width: "100%" }}
              size="small"
              variant="outlined"
            />
            <span style={{ fontSize: "0.9rem", opacity: "0.7" }}>
              If no value is set, a blank RelayState is sent
            </span>
          </div>
        </div>
        <br />
        <div className={styles.flexRow}>
          <div className={styles.signRedirectURLContainer}>
            <span>
              Name ID Format
              <Tooltip
                classes={{ tooltip: classes.customWidth }}
                placement="top"
                title="Identifies the SAML processing rules and constraints for the assertion's subject statement. Use the default value of 'Unspecified' unless the application explicitly requires a specific format."
              >
                <HelpIcon className={classes.button} />
              </Tooltip>
            </span>
          </div>

          <TextField
            variant="outlined"
            maxLength={300}
            style={{ width: "60%" }}
            name="nameIdformat  "
            id="select"
            size="small"
            onChange={saveState}
            select
            value={appData.nameIdformat}
          >
            <MenuItem value="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">
              Email Address
            </MenuItem>
            <MenuItem value="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified">
              Unspecified
            </MenuItem>
            <MenuItem value="urn:oasis:names:tc:SAML:2.0:nameid-format:persistent">
              Persistent
            </MenuItem>
            <MenuItem value="urn:oasis:names:tc:SAML:2.0:nameid-format:transient">
              Transient
            </MenuItem>

            {/* <MenuItem value="client_secret_post">client_secret_post</MenuItem> */}
          </TextField>
        </div>
        {/* <br />
                <div className={styles.flexRow}>
                    <div className={styles.signRedirectURLContainer}>
                        <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                            Application Username
                            <Tooltip
                                classes={{ tooltip: classes.customWidth }}
                                placement="top"
                                title="Determines the default value for a user's application username. The application username will be used for the assertion's subject statement."
                            >
                                <HelpIcon className={classes.button} />
                            </Tooltip>
                        </span>
                    </div>

                    <TextField
                        variant="outlined"
                        maxLength={300}
                        style={{ width: "60%" }}
                        name="application_username"
                        id="select"
                        size="small"
                        onChange={saveState}
                        select
                        value={appData.application_username}
                    >
                        <MenuItem value="pwl_username">Passwordless username</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="email_prefix">Email Prefix</MenuItem>
                        <MenuItem value="custom">Custom</MenuItem>
                        <MenuItem value="none">None</MenuItem>

                    </TextField>
                </div>

                <br />
                <div className={styles.flexRow}>
                    <div className={styles.signRedirectURLContainer}>
                        <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                            Update application username on
                        </span>
                    </div>

                    <TextField
                        variant="outlined"
                        maxLength={300}
                        style={{ width: "60%" }}
                        name="create_and_update"
                        id="select"
                        size="small"
                        onChange={saveState}
                        select
                        value={appData.create_and_update}
                    >
                        <MenuItem value="create_and_update">Create And Update</MenuItem>
                    </TextField>
                </div> */}
        <br />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {isAdvanceSetting ? (
            <Button
              style={{ textTransform: "capitalize" }}
              onClick={(e) => setIsAdvanceSetting(false)}
              color="primary"
            >
              Hide Advanced Setting
            </Button>
          ) : (
            <Button
              style={{ textTransform: "capitalize" }}
              onClick={(e) => setIsAdvanceSetting(true)}
              color="primary"
            >
              Show Advanced Setting
            </Button>
          )}
        </div>
        <br />
        {isAdvanceSetting && (
          <>
            <div className={styles.flexRow}>
              <div className={styles.signRedirectURLContainer}>
                <span>
                  Response
                  <Tooltip
                    classes={{ tooltip: classes.customWidth }}
                    placement="top"
                    title="Determines whether the SAML authentication response message is digitally signed by the IDP or not. A digital signature is required to ensure that only your IDP generated the response message."
                  >
                    <HelpIcon className={classes.button} />
                  </Tooltip>
                </span>
              </div>

              <TextField
                variant="outlined"
                maxLength={300}
                style={{ width: "60%" }}
                name="authnRequestsSigned"
                id="select"
                size="small"
                onChange={saveState}
                select
                value={appData.authnRequestsSigned}
              >
                <MenuItem value={true}>Signed</MenuItem>
                <MenuItem value={false}>Unsigned</MenuItem>

                {/* <MenuItem value="client_secret_post">client_secret_post</MenuItem> */}
              </TextField>
            </div>
            {/* <br />
                        <div className={styles.flexRow}>
                            <div className={styles.signRedirectURLContainer}>
                                <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                                    Assertion Signature
                                    <Tooltip
                                        classes={{ tooltip: classes.customWidth }}
                                        placement="top"
                                        title="Determines whether the SAML assertion is digitally signed or not. A digital signature is required to ensure that only your IDP generated the assertion."
                                    >
                                        <HelpIcon className={classes.button} />
                                    </Tooltip>
                                </span>
                            </div>

                            <TextField
                                variant="outlined"
                                maxLength={300}
                                style={{ width: "60%" }}
                                name="assertion_signature"
                                id="select"
                                size="small"
                                onChange={saveState}
                                select
                                defaultValue="email"
                            >
                                <MenuItem value="signed">Signed</MenuItem>
                                <MenuItem value="unsigned">Unsigned</MenuItem>
                            </TextField>
                        </div> */}

            {/* <br />
                        <div className={styles.flexRow}>
                            <div className={styles.signRedirectURLContainer}>
                                <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                                    Signature Algorithm
                                    <Tooltip
                                        classes={{ tooltip: classes.customWidth }}
                                        placement="top"
                                        title="Determines the signing algorithm used to digitally sign the SAML assertion and response."
                                    >
                                        <HelpIcon className={classes.button} />
                                    </Tooltip>
                                </span>
                            </div>

                            <TextField
                                variant="outlined"
                                maxLength={300}
                                style={{ width: "60%" }}
                                name="signature_algorithm"
                                id="select"
                                size="small"
                                onChange={saveState}
                                select
                                defaultValue="email"
                            >
                                <MenuItem value="rsa_sha256">RSA-SHA256</MenuItem>
                                <MenuItem value="rsa_sha1">RSA-SHA1</MenuItem>

                            </TextField>
                        </div> */}
            <br />
            {/* <div className={styles.flexRow}>
                            <div className={styles.signRedirectURLContainer}>
                                <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                                    Digest Algorithm
                                    <Tooltip
                                        classes={{ tooltip: classes.customWidth }}
                                        placement="top"
                                        title="Determines the digest algorithm used to digitally sign the SAML assertion and response."
                                    >
                                        <HelpIcon className={classes.button} />
                                    </Tooltip>
                                </span>
                            </div>

                            <TextField
                                variant="outlined"
                                maxLength={300}
                                style={{ width: "60%" }}
                                name="digest_algorithm"
                                id="select"
                                size="small"
                                onChange={saveState}
                                select
                                defaultValue="email"
                            >
                                <MenuItem value="sha256">SHA 256</MenuItem>
                                <MenuItem value="sha1">SHA 1</MenuItem>

                            </TextField>
                        </div>
                        <br /> */}
            <div className={styles.flexRow}>
              <div className={styles.signRedirectURLContainer}>
                <span>
                  Assertion Encryption
                  <Tooltip
                    classes={{ tooltip: classes.customWidth }}
                    placement="top"
                    title="Determines whether the SAML assertion is encrypted or not. Encryption ensures that nobody but the sender and receiver can understand the assertion."
                  >
                    <HelpIcon className={classes.button} />
                  </Tooltip>
                </span>
              </div>

              <TextField
                variant="outlined"
                maxLength={300}
                style={{ width: "60%" }}
                name="wantMessageSigned"
                id="select"
                size="small"
                onChange={saveState}
                select
                value={appData.wantMessageSigned}
              >
                <MenuItem value={true}>Encrypted</MenuItem>
                <MenuItem value={false}>Unencrypted</MenuItem>

                {/* <MenuItem value="client_secret_post">client_secret_post</MenuItem> */}
              </TextField>
            </div>
            {appData.wantMessageSigned && (
              <>
                {/* <br />
                                <div className={styles.flexRow}>
                                    <div className={styles.signRedirectURLContainer}>
                                        <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                                            Encryption Algorithm
                                            <Tooltip
                                                classes={{ tooltip: classes.customWidth }}
                                                placement="top"
                                                title="Determines the encryption algorithm used to encrypt the SAML assertion."
                                            >
                                                <HelpIcon className={classes.button} />
                                            </Tooltip>
                                        </span>
                                    </div>

                                    <TextField
                                        variant="outlined"
                                        maxLength={300}
                                        style={{ width: "60%" }}
                                        name="encrypted_algorithm"
                                        id="select"
                                        size="small"
                                        onChange={saveState}
                                        select
                                        value={appData.encrypted_algorithm}
                                    >
                                        <MenuItem value="aes256_cbc">AES256-CBC</MenuItem>
                                        <MenuItem value="aes128_cbc">AES128-CBC</MenuItem>
                                        <MenuItem value="aes256_cbc">AES256-CBC</MenuItem>
                                        <MenuItem value="aes256_cbc">AES256-GCM</MenuItem>
                                        <MenuItem value="aes128_cbc">AES128-GCM</MenuItem>
                                    </TextField>
                                </div>
                                <br />
                                <div className={styles.flexRow}>
                                    <div className={styles.signRedirectURLContainer}>
                                        <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                                            Key Transport Algorithm
                                            <Tooltip
                                                classes={{ tooltip: classes.customWidth }}
                                                placement="top"
                                                title="Determines the key transport algorithm used to encrypt the SAML assertion."
                                            >
                                                <HelpIcon className={classes.button} />
                                            </Tooltip>
                                        </span>
                                    </div>

                                    <TextField
                                        variant="outlined"
                                        maxLength={300}
                                        style={{ width: "60%" }}
                                        name="key_transport_algorithm"
                                        id="select"
                                        size="small"
                                        onChange={saveState}
                                        select
                                        value={appData.key_transport_algorithm}
                                    >
                                        <MenuItem value="rsa_oaep">RSA-OAEP</MenuItem>
                                        <MenuItem value="rsa_1.5">RSA 1.5</MenuItem>

                                    </TextField>
                                </div> */}

                <br />
                <div className={styles.flexRow}>
                  <div className={styles.signRedirectURLContainer}>
                    <span>
                      Encryption Certificate
                      <Tooltip
                        classes={{ tooltip: classes.customWidth }}
                        placement="top"
                        title="Determines the public key certificate used to digitally encrypt the SAML assertion."
                      >
                        <HelpIcon className={classes.button} />
                      </Tooltip>
                    </span>
                    <br />
                    <small>
                      <span style={{ fontSize: "0.7rem" }}>
                        Upload a public key certificate used to encrypt the SAML
                        assertion.Don't have a certificate?{" "}
                        <a
                          href="https://docs.passwordless4u.com/generate-certificate"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Generate Here.
                        </a>
                      </span>
                    </small>
                  </div>

                  <>
                    <div className={styles.certContainer}>
                      {appData?.encrypt_file_name && (
                        <div style={{ textAlign: "left" }}>
                          <strong style={{ fontSize: "0.9rem" }}>
                            {appData?.encrypt_file_name}
                          </strong>
                          <br />
                        </div>
                      )}
                      <div className={styles.uploadCertificateContainer}>
                        <label htmlFor="encrypted_algo_file">
                          <input
                            accept=".crt,.pem"
                            style={{ display: "none" }}
                            id="encrypted_algo_file"
                            name="encrypted_algo_file"
                            onChange={(e) => handleGetPem(e)}
                            type="file"
                          />
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<PublishIcon />}
                            component="span"
                            style={{ textTransform: "capitalize" }}
                          >
                            Upload Encryption Certificate
                          </Button>
                        </label>
                      </div>
                    </div>
                  </>
                </div>
              </>
            )}
            <br />

            <div className={styles.flexRow}>
              <div className={styles.signRedirectURLContainer}>
                <span >
                  Signature Certificate
                  <Tooltip
                    classes={{ tooltip: classes.customWidth }}
                    placement="top"
                    title="Determines the public key certificate used to verify the digital signatures."
                  >
                    <HelpIcon className={classes.button} />
                  </Tooltip>
                </span>
                <br />
                <small>
                  <span style={{ fontSize: "0.7rem" }}>
                    Upload a public key certificate used to sign the SAML
                    assertion.Don't have a certificate?{" "}
                    <a
                      href="https://docs.passwordless4u.com/generate-certificate"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Generate Here.
                    </a>
                  </span>
                </small>
              </div>

              <div className={styles.certContainer}>
                {appData?.signature_file_name && (
                  <div style={{ textAlign: "left" }}>
                    <strong style={{ fontSize: "0.9rem" }}>
                      {appData?.signature_file_name}
                    </strong>
                    <br />
                  </div>
                )}
                <div className={styles.uploadCertificateContainer}>
                  <label htmlFor="signature-cert-file-upload">
                    <input
                      accept=".pem, .crt"
                      style={{ display: "none" }}
                      id="signature-cert-file-upload"
                      onChange={(e) => handleSignatureCert(e)}
                      type="file"
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<PublishIcon />}
                      component="span"
                      style={{ textTransform: "capitalize" }}
                    >
                      Upload Signature Certificate
                    </Button>
                  </label>
                </div>
              </div>
            </div>
            <br />

            {/* <div className={styles.flexRow}>
                            <div className={styles.signRedirectURLContainer}>
                                <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                                    Assertion Inline Hook
                                </span>
                            </div>

                            <TextField
                                variant="outlined"
                                maxLength={300}
                                style={{ width: "60%" }}
                                name="assertion_inline_hook"
                                id="select"
                                size="small"
                                onChange={saveState}
                                select
                                defaultValue="email"
                            >
                                <MenuItem value="none">None(Disabled)</MenuItem>
                            </TextField>
                        </div> */}

            {/* <br />
                        <div className={styles.flexRow}>
                            <div className={styles.signRedirectURLContainer}>
                                <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                                    Encryption Certification
                                </span>
                            </div>

                            <div className={styles.certContainer}>
                                <div className={styles.uploadCertificateContainer}>
                                    <label htmlFor="encrypt-file-upload">
                                        <input
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            id="encrypt-file-upload"
                                            onChange={(e) => handleChange(e)}
                                            type="file"
                                        />
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<PhotoCamera />}
                                            component="span"
                                        >
                                            Upload Certificate
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </div> */}
            <br />
            <div className={styles.flexRow}>
              <div className={styles.signRedirectURLContainer}>
                <span>
                  Authentication context class
                  <Tooltip
                    classes={{ tooltip: classes.customWidth }}
                    placement="top"
                    title="Identifies the SAML authentication context class for the assertion's authentication statement."
                  >
                    <HelpIcon className={classes.button} />
                  </Tooltip>
                </span>
              </div>

              <TextField
                variant="outlined"
                maxLength={300}
                style={{ width: "60%" }}
                name="authContextClass"
                id="select"
                size="small"
                onChange={saveState}
                select
                value={appData?.authContextClass}
              >
                <MenuItem value="passwordless">Passwordless</MenuItem>
                <MenuItem value="passwordProtectedTransport">
                  Password Protected Transport
                </MenuItem>
                <MenuItem value="password">Password</MenuItem>
                <MenuItem value="unspecified">Unspecified</MenuItem>
                <MenuItem value="TLSClient">TLS Client</MenuItem>
                <MenuItem value="x.509_certificate">X.509 Certificate</MenuItem>

                <MenuItem value="intWinAuth">
                  Integrated Windows Authentication
                </MenuItem>
                <MenuItem value="kerberos">Kerberos</MenuItem>
              </TextField>
            </div>
            {/* <br />
                        <div className={styles.flexRow}>
                            <div className={styles.signRedirectURLContainer}>
                                <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                                    Honor Force Authentication
                                    <Tooltip
                                        classes={{ tooltip: classes.customWidth }}
                                        placement="top"
                                        title="Prompt user to re-authenticate if SP asks for it."
                                    >
                                        <HelpIcon className={classes.button} />
                                    </Tooltip>
                                </span>
                            </div>

                            <TextField
                                variant="outlined"
                                maxLength={300}
                                style={{ width: "60%" }}
                                name="honor_force_auth"
                                id="select"
                                size="small"
                                onChange={saveState}
                                select
                                defaultValue="yes"
                            >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </TextField>
                        </div> */}
            <br />
          </>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            marginTop: "1.8rem",
          }}
        >
          
          <Button
            variant="contained"
            style={{ color: "#fff", backgroundColor: "#0D4990" }}
            type="submit"
          >
            Save
          </Button>
          
        </div>
        </Grid>
        </Grid>
      </form>
      </div>
      <div style={{display:"grid",width:"calc(96vw - 260px)",placeItems:"center", marginLeft:0}}>
      
      <TableContainer component={Paper} >
                           
                           <Table aria-label="customized table">
                               <TableHead>
                               <TableRow>
                                   <StyledTableCell>SP Id</StyledTableCell>
                                   <StyledTableCell align="center">IDP Id</StyledTableCell>
                                   <StyledTableCell align="center">Entity ID</StyledTableCell>
                                   <StyledTableCell align="center">SloUrl</StyledTableCell>
                                   <StyledTableCell align="center">AcsUrl</StyledTableCell>
                                   <StyledTableCell align="center">MetaData</StyledTableCell>
                                   
                               </TableRow>
                               </TableHead>
                               <TableBody>
                               {filterList && filterList
                                     .map((rows, index) => (
                                   <StyledTableRow key={index}>
                                       <StyledTableCell align="left">{rows?.spId}</StyledTableCell>
                                       <StyledTableCell align="center">{rows?.idpId}</StyledTableCell>
                                       <StyledTableCell align="center">{rows?.entityID}</StyledTableCell>
                                       <StyledTableCell align="center">{rows.sloUrl}</StyledTableCell>
                                       <StyledTableCell align="center">{rows.acsUrl}</StyledTableCell>
                                       <StyledTableCell align="center">
                                        <Chip 
                                          label="View" 
                                          size="small" 
                                          color="primary" 
                                          variant="outlined" 
                                          onClick={(e)=>getMetaDataOfSP(e,rows)}
                                        />
                                       {/* <IconButton aria-label="metadata">
                                            <ContentCopyIcon style={{ color: '#0D4990' }} onClick={(e)=>getMetaDataOfSP(e,rows)}/>
                                        </IconButton> */}
                                       </StyledTableCell>
                                       
                                       
                                   </StyledTableRow>
                                       ))}
                               </TableBody>
                           </Table>
                       </TableContainer>
                       
                       <Modal
                                open={open}
                                // onClose={handleCloseModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                <Grid container spacing={3}>
                                    
                                    <Grid item xs={12} md={12}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={15}
                                            maxRows={15}
                                            name="signingCert"
                                            id="signingCert"
                                            value={metaData ?? ""}
                                            placeholder="X.509 cert"
                                            style={{ width: "100%", marginTop: "0rem", overflowY: "auto"}}
                                        />
                                    </Grid>
                                    </Grid>

                                    <Grid container spacing={4} sx={{marginLeft: '75%'}}>
                                        <Grid item >
                                            <Button variant="contained" style={{ color: "#fff", backgroundColor: "#0D4990", fontFamily: 'Jost' }} onClick={handleCloseModal}>Close</Button>
                                        </Grid>
                                        
                                    </Grid>
                                </Box>
                            </Modal>
      </div>
    </div>
    
  );
}
