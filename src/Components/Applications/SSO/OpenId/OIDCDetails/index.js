import React, { useEffect, useState, useRef } from "react";
import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Typography, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Server from "../../../../APIUrl";
import { LoadingButton } from "@mui/lab";
export default function Index({ clientId, appId, accountId }) {
    const [oidcDetails, setOidcDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const updateOpenIdRef = useRef();
    const authToken = sessionStorage.getItem("jwtToken");
    useEffect(() => {
        if (clientId && oidcDetails) {
            fetchOIDCData();
        }
    }, [clientId, appId]);
    const fetchOIDCData = async () => {
        await Server.get(`/oidc/getOidcClient?id=${clientId}&appId=${appId}`, {
            headers: {
                "content-type": "application/json",
                authToken: authToken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
        })
            .then((response) => {
                if (response.data.resultCode === 0) {
                    let data = JSON.parse(response?.data?.resultData);
                    setOidcDetails(data);
                }
            })
            .catch((err) => {
                console.log(err);
                Swal.fire(
                    "Error",
                    err?.response?.data?.resultMessage ||
                    err?.resultMessage ||
                    err?.message ||
                    err,
                    "error"
                );
            });
    };

    console.log(oidcDetails);
    const [edit, setEdit] = useState(false);
    const saveState = (e) => {
        updateOpenIdRef.current = { ...updateOpenIdRef.current, [e.target.name]: [e.target.value] }
        if (e.target.name === " redirect_uris") { setOidcDetails({ ...oidcDetails, redirectUris: [...e.target.value] }) }
        if (e.target.name === " post_logout_redirect_uris") { setOidcDetails({ ...oidcDetails, postLogoutRedirectUris: [...e.target.value] }) }
    
    }
    const handleUpdate = async (e) => {
        setLoading(true)
        try {
           const res= await Server.put(`oidc/updateOidcClient?appid=${appId}&accountid=${accountId}`, updateOpenIdRef.current, {
                headers: {
                    "content-type": "application/json",
                    authToken: authToken,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                },
            })
            setLoading(false)
            if(res?.data?.resultCode ===0 ){
                Swal.fire("Success", res?.data?.resultMessage, "success")
            }else{
                 res?.data?.resultMessage === null ? Swal.fire("Error", "NULL", "error") : Swal.fire("Error", res?.data?.resultMessage, "error")
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
            Swal.fire(
                "Error",
                err?.response?.data?.resultMessage ||
                err?.resultMessage ||
                err?.message ||
                err,
                "error"
            );
        }
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={3} md={12}>
                    <Container>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                        >
                            <h4>OpenId Application</h4>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={(e) => setEdit((pre) => !pre)}
                            >
                                Edit
                            </Button>
                        </Stack>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                                    Client Id
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    name="name"
                                    id="email"
                                    // label="App integration name"
                                    variant="outlined"
                                    value={clientId}
                                    InputProps={{
                                        endAdornment: (
                                            <Button>
                                                {" "}
                                                <ContentCopyIcon
                                                    onClick={() =>
                                                       { navigator.clipboard.writeText(
                                                            clientId
                                                        )
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title:"Success",
                                                            showConfirmButton: false,
                                                            width: 200,
                                                            height:50,
                                                            timer: 500
                                                          })
                                                    }
                                                    }
                                                />
                                            </Button>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                                    Client Secret
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="password"
                                    name="name"
                                    id="email"
                                    // label="App integration name"
                                    variant="outlined"
                                    value={oidcDetails?.clientSecret}
                                    InputProps={{
                                        endAdornment: (
                                            <Button>
                                                {" "}
                                                <ContentCopyIcon
                                                    onClick={() =>
                                                       { navigator.clipboard.writeText(
                                                            oidcDetails?.clientSecret
                                                        )
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title:"Success",
                                                            showConfirmButton: false,
                                                            width: 200,
                                                            height:50,
                                                            timer: 500
                                                          })
                                                    }
                                                    }
                                                />
                                            </Button>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
                        <br />

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                                    My Domain
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    name="myDomain"
                                    id="myDomain"
                                    // label="App integration name"
                                    variant="outlined"
                                    value={
                                        oidcDetails?.requestUris &&
                                        oidcDetails?.requestUris[0]?.replace("/openid-login", "")
                                    }
                                />
                            </Grid>
                        </Grid>
                        <br />

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                                    Issuer Domain
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    // label="App integration name"
                                    variant="outlined"
                                    value={`${process.env.REACT_APP_OIDC_SERVER_URL}/oidc`}
                                    InputProps={{
                                        endAdornment: (
                                            <Button>
                                                {" "}
                                                <ContentCopyIcon
                                                    onClick={() =>
                                                       { navigator.clipboard.writeText(
                                                            `${process.env.REACT_APP_OIDC_SERVER_URL}/oidc`
                                                        )
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title:"Success",
                                                            showConfirmButton: false,
                                                            width: 200,
                                                            height:50,
                                                            timer: 500
                                                          })
                                                    }
                                                    }
                                                />
                                            </Button>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                                    Token Endpoint Auth Method
                                    <p style={{ fontSize: "13px", fontWeight: "500" }}>
                                        The method used to authenticate the client at the Token
                                        Endpoint.Default is none.
                                    </p>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Typography>{oidcDetails?.introspectionEndpointAuthMethod}</Typography>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                                    Grant Types
                                    <p style={{ fontSize: "13px", fontWeight: "500" }}>
                                        Grant types that your application can use to request access
                                        tokens. Default is authorization_code.
                                    </p>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Typography>{
                                    oidcDetails?.grantTypes && oidcDetails?.grantTypes.join(",")
                                }</Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                                    Sign-in redirect URIs
                                    <p style={{ fontSize: "13px", fontWeight: "500" }}>
                                        Axiom sends the authentication response and ID token for the
                                        user's sign-in request to these URIs
                                    </p>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                              {oidcDetails?.redirectUris &&  <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    name="redirect_uris"
                                    id="redirect_uris"
                                    disabled={!edit}
                                    onChange={saveState}
                                    variant="outlined"
                                    defaultValue={
                                        (oidcDetails?.redirectUris && oidcDetails?.redirectUris[0])
                                    }
                                />}
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                                    Sign-out redirect URIs(Optional)
                                    <p style={{ fontSize: "13px", fontWeight: "500" }}>
                                        After your application contacts Axiom to close the user
                                        session, Axiom redirects the user to one of these URIs.
                                    </p>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                              {oidcDetails?.postLogoutRedirectUris &&  <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    disabled={!edit}
                                    name="post_logout_redirect_uris"
                                    id="post_logout_redirect_uris"
                                    // label="Sign-out redirect URIs"
                                    variant="outlined"
                                    onChange={saveState}
                                    defaultValue={
                                        (oidcDetails?.postLogoutRedirectUris &&
                                            oidcDetails?.postLogoutRedirectUris[0])
                                    }
                                />}
                            </Grid>
                        </Grid>
                        <br />

                    </Container>
                </Grid>
            </Grid>
            <center>
                {edit && <LoadingButton loading={loading} color="primary" variant="contained" onClick={handleUpdate}>
                    Save
                </LoadingButton>}
            </center>
            <br />
        </>
    );
}
