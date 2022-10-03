import {
  Chip,
  FormControl,
  InputAdornment,
  TextField,
  Tooltip,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from "@material-ui/icons/GetApp";
import OpenInNewOutlined from "@mui/icons-material/OpenInNewOutlined";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import React, { useState, useRef, useEffect } from "react";
import styles from "./idp.module.css";
import Server from '../../../../APIUrl'
import FileCopyTwoToneIcon from "@material-ui/icons/FileCopyTwoTone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import Publish from "@material-ui/icons/Publish";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Edit } from "@material-ui/icons";
import Loader from '../../../../Loader'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "45vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  maxWidth: "400",
};

export default function IDP() {
  const [appData, setAppData] = useState({})
  const updateAppRef = useRef({});
  const { idpId } = useParams();
  const accountId = sessionStorage.getItem("accountId");
  const authToken = sessionStorage.getItem("jwtToken");
  const [editAction, setEditAction] = useState(false)
  const donloadCertificate = async (content, name) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}.pem`);
    link.click();
  };
  const copyToClipboard = async (e, text) => {
    e.preventDefault();
    try {
      navigator.clipboard.writeText(text);
    } catch (error) {
      console.log(error);
    }
  };
  const openInNewTab = (e, id) => {
    e.preventDefault();
    const win = window.open(
      `${process.env.REACT_APP_API_URL}SAML/idp/metadata/${id}`,
      "_blank"
    );
    win.focus();
  };
  const downloadMetaDataInXML = async (e, id) => {
    const res = await Server.get(`/idp/getidpMatadata?id=${id}`,{
      headers: {
        'content-type': 'application/json',
        authToken: authToken,
      },
    });
    const blob = new Blob([res.data?.resultData|| res.data?.resultMessage], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `idp_metadata.xml`);
    link.click();
  };
  const saveState = (e) => {
    updateAppRef.current = {
      ...updateAppRef.current,
      [e.target.name]: e.target.value,
    };
    setAppData({ ...appData, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  useEffect(() => {
    if (idpId && authToken) {
      fetchData()
    }
  }, [idpId, authToken])
  const fetchData = async () => {
    setLoadingData(true)
    await Server.get(`/idp/getidp?id=${idpId}`, {
      headers: {
        'content-type': 'application/json',
        authToken: authToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"

      },
    })
      .then((response) => {
        setLoadingData(false)
        if (response.data.resultCode === 0) {
          let data = JSON.parse(response?.data?.resultData || response?.data?.resultMessage || "");
          setAppData(data)
          console.log(data)
        }

      }).catch((err) => {
        console.log(err)
        setLoadingData(false)
        Swal.fire("Error", err?.data?.resultMessage || err?.response?.data?.resultMessage || err?.resultMessage || err?.message || err, "error")
      })
  }
  console.log({ appData })
  const handleUpdateIDP=async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const res = await Server.put(`idp/updateidp?id=${idpId}&accountid=${accountId}`,updateAppRef.current, {
        headers: {
          'content-type': 'application/json',
          authToken: authToken,
        },
      });
    setLoading(false)

      if(res?.data?.resultCode ===0){
        Swal.fire("Success", res?.data?.resultMessage, "success")
      }else{
        Swal.fire("Error", res?.data?.resultMessage, "error")
      }
    }catch(err){
      console.log(err)
      setLoading(false)
      Swal.fire("Error", err?.data?.resultMessage || err?.response?.data?.resultMessage || err?.resultMessage || err?.message || err, "error")

    }
  }
  return (
   <>
   {
    loadingData ? <Loader/>
    :
    <div>
    <div className={styles.clientIDContainer}>
      <h4 style={{ margin: "0", padding: "0" }}>IDP Details: </h4>
      <Stack spacing={3} direction="row">
        {appData?.signingCert && (
          <Tooltip
            title="Download signing certificate"
            placement="top"
            arrow
          >
            <Button
              onClick={() => {
                donloadCertificate(
                  appData?.signingCert,
                  "signingCert"
                );
              }}
              startIcon={<GetAppIcon />}
              color="primary"
              variant="outlined"
              size="small"
            >
              signing cert
            </Button>
          </Tooltip>
        )}
        {appData?.encryptCert && (
          <Tooltip
            title="Download Encryption certificate"
            placement="top"
            arrow
          >
            <Button
              onClick={() => {
                donloadCertificate(
                  appData?.encryptCert,
                  "encryptCert"
                );
              }}
              startIcon={<GetAppIcon />}
              color="primary"
              variant="outlined"
              size="small"
            >
              Encryption Cert
            </Button>
          </Tooltip>
        )}
           <Button
              onClick={e=>setEditAction(prev=>!prev)}
              startIcon={<Edit />}
              color="primary"
              variant="outlined"
              size="small"
            >
              Edit
            </Button>
      </Stack>
    </div>

    {appData?.ssoUrl && (
      <>
        <div className={styles.clientIDContainer}>
          <h5 style={{ margin: "0", padding: "0" }}>
            Single Sign On URL(SSO Url)
          </h5>
          <div className={styles.textFieldContainer}>
            <p className={styles.valuesBlock}>{appData?.ssoUrl}</p>
          </div>
        </div>
      </>
    )}
    {appData?.sloUrl && (
      <>
        <div className={styles.clientIDContainer}>
          <h5 style={{ margin: "0", padding: "0" }}>
            Single Logout Url(SLO Url)
          </h5>
          <div className={styles.textFieldContainer}>
            <p className={styles.valuesBlock}>
              {" "}
              {appData?.sloUrl}
            </p>
          </div>
        </div>
      </>
    )}

    {appData?.entityID && (
      <>
        <div className={styles.clientIDContainer}>
          <h5 style={{ margin: "0", padding: "0" }}>IDP Entity ID</h5>
          <div className={styles.textFieldContainer1}>
            <div style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
              {" "}
              {appData?.entityID}
              <span>
                <Button
                  style={{ minWidth: 35, marginLeft: 10 }}
                  onClick={(e) =>
                    copyToClipboard(e, appData?.entityID)
                  }
                >
                  <FileCopyTwoToneIcon
                    style={{
                      fontSized: "0.8rem",
                      color: "#3f51b5",
                    }}
                  />
                </Button>
              </span>
            </div>
          </div>
        </div>
      </>
    )}

    <div className={styles.clientIDContainer}>
      <h5 style={{ margin: "0", padding: "0" }}>
        IDP Metadata Details
      </h5>
      <div className={styles.textFieldContainer}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <TextField
            size="small"
            fullWidth
            value={`${process.env.REACT_APP_API_URL}/saml/idp/metadata/${idpId || appData?.idpId
              }`}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            InputProps={{
              style: {
                paddingRight: "0",
              },
              readOnly: true,
              endAdornment: (
                <>
                  <InputAdornment
                    onClick={(e) =>
                      copyToClipboard(
                        e,
                        `${process.env.REACT_APP_API_URL}saml/idp/metadata/${idpId || appData?.appId}`
                      )
                    }
                    position="end"
                  >
                    <Tooltip title="Download metadata" placement="top">
                      <Button style={{ minWidth: 35 }}>
                        <ContentCopyIcon
                          style={{
                            fontSize: "1.2rem",
                            color: "#3f51b5",
                          }}
                        />
                      </Button>
                    </Tooltip>
                  </InputAdornment>
                </>
              ),
            }}
          />

          <Tooltip title="View metadata" placement="top">
            <IconButton
              style={{ width: 10 }}
              onClick={(e) => openInNewTab(e, idpId || appData?.appId)}
            >
              <OpenInNewOutlined
                style={{
                  fontSize: "1.2rem",
                  color: "#3f51b5",
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download metadata" placement="top">
            <IconButton
              style={{ width: 10 }}
              onClick={(e) => downloadMetaDataInXML(e, idpId)}
            >
              <GetAppIcon
                style={{
                  fontSize: "1.2rem",
                  color: "#3f51b5",
                }}
              />
            </IconButton>
          </Tooltip>
        </Stack>
      </div>
    </div>
    <br />
    <div className={styles.clientIDContainer}>
      <h5 style={{ margin: "0", padding: "0" }}> Name ID Format</h5>
      <div className={styles.textFieldContainer}>
        {!editAction ? (
          <p className={styles.valuesBlock}>
            {" "}
            {appData?.nameIdFormat}
          </p>
        ) : (
          <>

            <TextField
              variant="outlined"
              fullWidth
              name="nameIdFormat"
              id="select"
              size="small"

              onChange={saveState}
              select
              value={appData.nameIdFormat}
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
            </TextField>

          </>
        )}
      </div>
    </div>
    <br />
    <center>
      {editAction && <LoadingButton loading={loading} onClick={handleUpdateIDP} variant="contained" >Save</LoadingButton>}
    </center>
    <hr />
  </div>
   }
   </>
  )
}
