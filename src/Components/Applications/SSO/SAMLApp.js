import React, { useState, useEffect } from "react";
// import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, MenuItem, Button } from '@mui/material';
import { nanoid } from "nanoid";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./viewSAMLApp.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import Swal from "sweetalert2";
import Server from "../../APIUrl";
import { LoadingButton } from "@mui/lab";
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
  const authToken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const location = useLocation()
  const classes = useStyles();

  var appid = location.state.appId;
  const [appData, setAppData] = useState({
    nameIdFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
    wantMessageSigned:true
  });
const [loading, setLoading] = useState(false)
  const history = useHistory();
  const createApp = async (e) => {
    e.preventDefault();
    setLoading(true)
    const subDomain = `${appid}_saml${nanoid(5)}`;
    const protocol=window.location.protocol
    const hostWithSubDomain = window.location.host.split(".");
    hostWithSubDomain.shift();
    const host = hostWithSubDomain.join(".")
    const domain = `${protocol}//${subDomain}.${host}`;
    const dataOForIdp = {
      entityID: `${domain}/saml/idp`,
      ssoUrl: `${domain}/idp/login`,
      sloUrl: `${domain}/idp/logout`,

    };
    try {
      const res = await Server.post(`idp/createidp?accountid=${accountId}&appid=${appid}`, {
        idpId: appid,
        name: appData.name,
        logo_uri: appData.logo_uri,
        uniqueId: props.uniqueId,
        ...dataOForIdp,
        nameIdFormat: appData?.nameIdFormat,
        isAssertionEncrypted: appData?.wantMessageSigned
      }, {
        headers: {
          'content-type': 'application/json',
          authToken: authToken,
        },
      });
      setLoading(false)
      if (res?.data?.resultCode === 0) {
        const data = JSON.parse(res.data.resultData || res?.data?.resultMessage || null);
        const idpId = data?.idpId || data?.idpid || data?.ipd_id;
        console.log({ idpId, data })

        history.push({
          pathname: `/AxiomProtect/Applications/EditSAMLApp/${idpId}`,
          state: {
            data,
            appid:idpId
          },
        });

      } else {
        Swal.fire({
          title: "Error",
          text: res?.data?.resultMessage,
          icon: "success",
          showCancelButton: false,

        });
      }
      // props.handleNext();
    } catch (error) {
      setLoading(false)
      let errorMsg = error.message;
      if (error?.response?.data?.errorMessage)
        errorMsg = error?.response?.data?.errorMessage;
      console.log(errorMsg);
      // alert box with toastify

    }
  };

const saveState=(e)=>{
  setAppData({...appData, [e.target.name]: e.target.value})
}
  return (
    <div style={{ width: "100%", margin: "0 auto", padding: "1rem", marginTop: "5rem" }}>

      <Typography variant="body1" sx={{ fontSize: "1.1rem", fontFamily: "Jost", fontWeight: "bold" }}>Configure SAML IDP</Typography>
      <form style={{width:"100%"}} autoComplete="off" spellCheck="false" onSubmit={createApp}>
        <br />
        <div className={styles.flexRow}>
            <div style={{ fontWeight: "bold", fontSize: "0.9rem", width:"300px" }}>
              Name ID Format
              <Tooltip
                classes={{ tooltip: classes.customWidth }}
                placement="top"
                title="Identifies the SAML processing rules and constraints for the assertion's subject statement. Use the default value of 'Unspecified' unless the application explicitly requires a specific format."
              >
                <HelpIcon className={classes.button} />
              </Tooltip>
            </div>

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

            {/* <MenuItem value="client_secret_post">client_secret_post</MenuItem> */}
          </TextField>
        </div>
        <br />
        <div className={styles.flexRow}>
            <div style={{ fontWeight: "bold", fontSize: "0.9rem", width:"300px" }}>
            Assertion Encryption
              <Tooltip
                classes={{ tooltip: classes.customWidth }}
                placement="top"
                title="Determines whether the SAML assertion is encrypted or not. Encryption ensures that nobody but the sender and receiver can understand the assertion."
              >
                <HelpIcon className={classes.button} />
              </Tooltip>
            </div>

          <TextField
            variant="outlined"
          fullWidth
            name="wantMessageSigned"
            id="select"
            size="small"

            onChange={saveState}
            select
            value={appData.wantMessageSigned}
          >
            <MenuItem value={true}>
             Encrypted
            </MenuItem>
            <MenuItem value={false}>
             Unencrypted
            </MenuItem>

            {/* <MenuItem value="client_secret_post">client_secret_post</MenuItem> */}
          </TextField>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            marginTop: "1.8rem",
          }}
        >

          <LoadingButton loading={loading}
            variant="contained"
            type="submit"
            color="primary"
          >
           Create
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
