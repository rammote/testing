import React, { useRef, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import GetAppIcon from "@material-ui/icons/GetApp";
import HelpIcon from "@material-ui/icons/Help";
import PublishIcon from "@material-ui/icons/Publish";
import { Stack, Tooltip, Typography } from '@mui/material';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import MenuItem from "@mui/material/MenuItem";
import Modal from '@mui/material/Modal';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Server from "../../../../APIUrl";
import styles from "../../OIDCApplication.module.css";

import { Edit } from "@material-ui/icons";
import { Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Chip } from "@mui/material";
import Box from '@mui/material/Box';
import {
  DataGrid
} from "@mui/x-data-grid";
import Loader from '../../../../Loader';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  minHeight: "auto",
  maxHeight: "90vh",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  fontFamily: 'Jost',
  overflow: "auto",
  p: 3,
};

export default function SPSetting() {
  const { idpId } = useParams();
  const authToken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
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
  const updateSPRef = useRef(null)


  const saveState = (e) => {
    updateSPRef.current = {
      ...updateSPRef.current, [e.target.name]: e.target.value
    }
    setAppData({ ...appData, [e.target.name]: e.target.value });
  };


  const [rows, setRows] = React.useState();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (idpId) {
      fetchData();
    }

  }, [idpId])
  const [filterList, setFilterList] = useState(rows);
  const [createModal, setCreateModal] = useState(false)
  const handleCreateSPModal = (e) => {
    setCreateModal(false)
  }
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
        setLoading(false)
        if (response.data.resultCode === 0) {
          let data = JSON.parse(response.data.resultData || response.data.resultMessage || null);
          setRows(data);
          setFilterList(data);
        }

      }).catch((error) => {

        setLoading(false);

        Swal.fire("error", error?.message, "error")
      })
  }



  const createApp = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await Server.post(`sp/createSP`, {
        name: appData.name,
        logo_uri: appData.logo_uri,
        ...appData,
      }, {
        headers: {
          'content-type': 'application/json',
          authToken: authToken,
        },
      });
      setLoading(false)
      setCreateModal(false)
      if (response.data?.resultCode === 0) {
        fetchData();
        Swal.fire({
          title: "Successfully Added",
          text: "SP Added Successfully",
          icon: "success",
          showCancelButton: false,

        });
      } else {
        Swal.fire("Error", response.data?.resultMessage, "error");
      }

    } catch (error) {
      setLoading(false)
      setCreateModal(false)

      let errorMsg = error.message;
      if (error?.response?.data?.errorMessage)
        errorMsg = error?.response?.data?.errorMessage;
      console.log(errorMsg);

    }
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
      updateSPRef.current = {
        ...updateSPRef.current, encryptCert: e.target.result,
        encrypt_file_name: file.name,
      }
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
      updateSPRef.current = {
        ...updateSPRef.current, signingCert: e.target.result,
        signature_file_name: file.name,
      }
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

  const downloadSPMetaDataInXML = async (e, id) => {
    e.preventDefault();
    const res = await Server.get(
      `/sp/getSPMatadata?id=${id}`,
      {
        headers: {

          'content-type': 'application/json',
          authToken: authToken,
        },
      }
    );
    if (res.data.resultCode === 0) {
      const result = res.data.resultData || res.data.resultMessage;
      const blob = new Blob([result], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `sp_metadata.xml`);
      link.click();
    } else {
      Swal.fire("error", res?.data?.resultMessage, "error")
    }
  };
  const [openDeleteSP, setOpenDeleteSP] = React.useState(false);
  const [spID, setSpID] = useState("")
  const handleClickOpen = (e, row) => {
    setOpenDeleteSP(true);
    setSpID(row?.spId)
  };

  const handleClose = () => {
    setOpenDeleteSP(false);
  };

  const handleDeleteSP = async (e) => {
    try {
      const res = await Server.delete(`/sp/deleteSp?id=${spID}`, {
        headers: {
          'content-type': 'application/json',
          authToken: authToken,
        },
      })
      handleClose()
      if (res.data?.resultCode === 0) {
        Swal.fire("Success", "Service Provider deleted successfully", "success")
      } else {
        Swal.fire("Error", res.data?.resultMessage, "error")
      }
    } catch (error) {
      handleClose()
      console.log(error);
      Swal.fire("Error", error?.data?.resultMessage || error?.response?.data?.resultMessage || error?.message, "error")
    }
  }
  const columns = [
    {
      field: "sloUrl",
      headerName: "Slo URL",
      flex: 1,
      width: 80,
      headerClassName: "bg-color",
      renderCell: (params) => (
        <Tooltip
          title={params?.value}
          placement="top-start"
          arrow
        >
          <Typography>{params?.value}</Typography>
        </Tooltip>
      )
    },
    {
      field: "acsUrl",
      headerName: "Acs URL",
      sortable: false,
      flex: 1,
      width: 80,
      headerClassName: "bg-color",
      renderCell: (params) => (
        <Tooltip
          title={params?.value}
          placement="top-start"
          arrow
        >
          <Typography>{params?.value}</Typography>
        </Tooltip>
      )
    },
    {
      field: "entityID",
      headerName: "Entity ID",
      sortable: false,
      flex: 1,
      width: 80,
      headerClassName: "bg-color",
      renderCell: (params) => (
        <Tooltip
          title={params?.value}
          placement="top-start"
          arrow
        >
          <Typography>{params?.value}</Typography>
        </Tooltip>
      )
    },
    {
      field: "authnRequestsSigned",
      headerName: "Response",
      sortable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: 80,
      headerClassName: "bg-color",
      renderCell: (params) => <Chip color={params?.value ? "success" : "secondary"} variant="contained" size="small" label={params?.value ? "Signed" : "UnSigned"} />
    },
    {
      field: "wantMessageSigned",
      headerName: "Encrypted",
      sortable: false,
      flex: 1,
      width: 80,
      headerClassName: "bg-color",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <Chip color={params?.value ? "success" : "secondary"} variant="contained" size="small" label={params?.value ? "Encrypted" : "Unencrypted"} />

    },
    {
      field: "spId",
      headerName: "Metadata",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
      width: 80,
      headerClassName: "bg-color",
      renderCell: (params) => (
        <Tooltip
          title="Download SP Metadata"
          placement="top"
          arrow
        >
          <Button
            size="small"
            color="primary"
            variant="outlined"
            sx={{ textTransform: "capitalize" }}
            onClick={(e) => {
              downloadSPMetaDataInXML(
                e,
                params?.value
              );
            }}
            startIcon={<GetAppIcon fontSize="small" />}
          >
            Download
          </Button>
        </Tooltip>
      )
    },
    {
      field: "signingCert",
      headerName: "Encryption Certificate",
      sortable: false,
      flex: 1,
      width: 80,
      align: "center",
      headerAlign: "center",

      headerClassName: "bg-color",
      renderCell: (params) => (
        <Tooltip
          title="Download signing certificate"
          placement="top"
          arrow
        >
          <Button
            size="small"
            color="primary"
            variant="outlined"
            sx={{ textTransform: "capitalize" }}
            onClick={(e) => {
              donloadCertificate(
                params?.value,
                "sp_encryptCert"
              );
            }}
            startIcon={<GetAppIcon fontSize="small" />}
          >
            Download
          </Button>
        </Tooltip>
      )

    },
    {
      field: "Actions",
      headerName: "Action",
      sortable: true,
      width: 80,
      flex: 1,
      align: "center",
      headerAlign: "center",
      alignItems: "center",
      headerClassName: "bg-color",
      renderCell: (params) => (
        <>
          <Tooltip
            title="Edit SP Details"
            placement="top"
            arrow
          >
            <IconButton onClick={e => handleOpen(e, params.row)} variant="outlined" color="primary"><Edit color="primary" variant="outined" /></IconButton>
          </Tooltip>
          <Tooltip
            title="Delete Service Provider"
            placement="top"
            arrow
          >
            <IconButton onClick={e=>handleClickOpen(e, params?.row)} variant="outlined" color="error"><Delete color="error" /></IconButton>
          </Tooltip>
        </>
      )

    },
  ];
  const handleOpen = (e, row) => {
    setAppData(row)
    setOpen(true)
  }
  console.log({ updateSPRef: updateSPRef.current })
  const donloadCertificate = async (content, name) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}.pem`);
    link.click();
  };
  const updateSP = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await Server.put(`sp/updateSP?id=${appData?.spId}`, updateSPRef.current, {
        headers: {
          'content-type': 'application/json',
          authToken: authToken,
        },
      });
      setLoading(false)

      if (response.data?.resultCode === 0) {
        fetchData();
        Swal.fire({
          title: "Success",
          text: "SP Updated Successfully",
          icon: "success",
          showCancelButton: false,

        });
      } else {
        Swal.fire("Error", response.data?.resultMessage, "error");
      }
      updateSPRef.current = null
      setOpen(false)
    } catch (error) {
      setLoading(false)
      setOpen(false)
      updateSPRef.current = null

      let errorMsg = error.message;
      if (error?.response?.data?.errorMessage)
        errorMsg = error?.response?.data?.errorMessage;
      console.log(errorMsg);

    }
  };

  return (
    <div>
      <div style={{ width: "95%", }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" style={{ width: "calc(90vw - 160px)" }}>
          <Typography sx={{ color: "#000", fontWeight: "bold" }}>Create Service Provider</Typography>
          <Button variant="contained" onClick={e => setCreateModal(true)} size="small" sx={{ textTransform: "capitalize" }} startIcon={<Add />}>Create Service Provider</Button>
        </Stack>
        <br />
        <Modal
          open={createModal}
          onClose={handleCreateSPModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form autoComplete="off" spellCheck="false" onSubmit={createApp}>


              <div className={styles.flexRow}>
                <div className={styles.signRedirectURLContainer}>
                  <span style={{ fontFamily: "Jost" }}>
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

                  <br />

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
          </Box>
        </Modal>
      </div>
      <div style={{ display: "grid", width: "calc(96vw - 260px)", placeItems: "center", marginLeft: 0 }}>

        {loading ? (
          <Loader />
        ) : (
          <div style={{ width: "calc(90vw - 160px)" }}>
            <Box
              sx={{
                height: 500,
                width: '100%',
                '& .bg-color': {
                  backgroundColor: "#0D4990",
                  color: "#fff",
                },
              }}
            >
              <DataGrid
                style={{ width: "100%", height: 500, }}
                rows={filterList || []}
                columns={columns}
                pageSize={5}
                disableSelectionOnClick
                getRowId={(row) => row?.spId}

              />
            </Box>
          </div>
        )}
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form autoComplete="off" spellCheck="false" onSubmit={updateSP}>


              <div className={styles.flexRow}>
                <div className={styles.signRedirectURLContainer}>
                  <span style={{ fontFamily: "Jost" }}>
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
                    value={appData?.acsUrl}
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
                    value={appData?.sloUrl}
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
                    value={appData?.entityID}
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
                    value={appData?.relayState}
                    size="small"
                    variant="outlined"
                  />
                  <span style={{ fontSize: "0.9rem", opacity: "0.7" }}>
                    If no value is set, a blank RelayState is sent
                  </span>
                </div>
              </div>
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
                      value={appData?.authnRequestsSigned}
                    >
                      <MenuItem value={true}>Signed</MenuItem>
                      <MenuItem value={false}>Unsigned</MenuItem>

                    </TextField>
                  </div>
                  <br />
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
                      value={appData?.wantMessageSigned}
                    >
                      <MenuItem value={true}>Encrypted</MenuItem>
                      <MenuItem value={false}>Unencrypted</MenuItem>

                      {/* <MenuItem value="client_secret_post">client_secret_post</MenuItem> */}
                    </TextField>
                  </div>
                  {appData.wantMessageSigned && (
                    <>
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

                  {appData?.authnRequestsSigned && <div className={styles.flexRow}>
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
                  </div>}
                  <br />
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

                    <LoadingButton
                      loading={loading}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Update
                    </LoadingButton>

                  </div>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
      <Dialog
        open={openDeleteSP}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete service provider?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This Changes can't be revert back, are you sure about this one?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ textTransform: "capitalize" }}>Cancel</Button>
          <Button onClick={handleDeleteSP} color="error" variant="contained" sx={{ textTransform: "capitalize" }} startIcon={<Delete />} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}
