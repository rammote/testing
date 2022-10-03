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




import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  InputLabel,
  Stack,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  
  const [generatedResultData, setGeneratedResultData] = useState(null);

  const [countryName, setCountryName] = React.useState("");
  const [state, setState] = React.useState("");
  const [locality, setLocality] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [organizationUnit, setOrganizationUnit] = React.useState("");
  const [commonName, setCommonName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [validDays, setValidDays] = React.useState();
  const [sigalg, setSigalg] = React.useState("");

  const [showResult, setShowResult] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    axios.post(`https://meet.passwordless.com.au:2525/certificate/create`,
    {
            "countryName": countryName,
            "state": state,
            "locality": locality,
            "organization": organization,
            "organizationUnit": organizationUnit,
            "commonName": commonName,
            "emailAddress": emailAddress,
            "Number(validityDays)": validDays,
            "sigalg": sigalg,
    }, {

        headers: {
            'content-type': 'application/json',
        },
    })
        .then((response) => {
            console.log(response.data)
            setLoading(false)
            if(response.data){
                console.log(response.data)
                setGeneratedResultData(response.data);
                setShowResult(true);
                // scroll smooth to result section
                const resultSection = document.getElementById("result-section");
                resultSection.scrollIntoView({ behavior: "smooth" });
            }else{
                Swal.fire({
                    title: response.data.resultMessage,
                    icon: 'error',
                    showCancelButton: false,
                })
            }
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        })
    
}

const copyToClipBoard = (e, text, name) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    
  };
  const download = (e, text, name) => {
    e.preventDefault();
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.pem`;
    link.click();
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
              label="Generate Certificate"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >
            <h4>Generate Self-Signed Certs</h4>
          </Typography>
          
        </Grid>
      </Grid>
     
      <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
      <br />
      <Container>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Country
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="countryName"
              id="countryName"
              label="Country Name"
              variant="outlined"
              onChange={(e)=>setCountryName(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                State Or Provience
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="state"
              id="state"
              label="State Or Provience"
              variant="outlined"
              onChange={(e)=>setState(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Locality Name(Optional)
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="locality"
              id="locality"
              label="Locality Name"
              variant="outlined"
              onChange={(e)=>setLocality(e.target.value)}
            />
          </Grid>
        </Grid>
        
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Organization Unit Name(optional)
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="organizationUnit"
              id="organizationUnit"
              label="Organization Unit Name"
              variant="outlined"
              onChange={(e)=>setOrganizationUnit(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Organization Name
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
                fullWidth
                size="small"
                type="text"
                name="organization"
                id="organization"
                label="Organization Name"
                variant="outlined"
                onChange={(e)=>setOrganization(e.target.value)}
                />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Email Address(optional)
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
                fullWidth
                size="small"
                type="text"
                name="emailAddress"
                id="emailAddress"
                label="Email Address"
                variant="outlined"
                onChange={(e)=>setEmailAddress(e.target.value)}
                />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Common Name, the domain
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
                fullWidth
                size="small"
                type="text"
                name="commonName"
                id="commonName"
                label="Common Name, the domain"
                variant="outlined"
                onChange={(e)=>setCommonName(e.target.value)}
                />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Validity in Days
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
                fullWidth
                size="small"
                type="number"
                name="validDays"
                id="validDays"
                label="Validity in Days"
                variant="outlined"
                onChange={(e)=>setValidDays(e.target.value)}
                />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Digest Algorithm
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Select
                fullWidth
                size="small"
                // value={radiusSettings. radiusClientAuthtype}
                name="sigalg"
                id="sigalg"
                onChange={(e)=>setSigalg(e.target.value)}
                >
                
                <MenuItem value={"SHA256withRSA"}>SHA256</MenuItem>
                <MenuItem value={"SHA512withRSA"}>SHA512</MenuItem>
                
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
            Generate Certificate
          </Button>
        </center>
      )}
      <br />
      



    <br />
      <Divider />
      <br />
      <Box
        sx={{ p: 2.5, display: showResult ? "default" : "none" }}
        id="result-section"
      >
        <br />
        <Stack
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Stack justifyContent="flex-start" direction="row" width="100%">
            <Stack
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              direction="column"
              width="100%"
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                sx={{ m: 0, p: 0 }}
              >
                <Typography variant="p" sx={{ fontWeight: "bold", m: 0, p: 0 }}>
                  {" "}
                  Certificate
                </Typography>
                <div>
                  <Tooltip title="Download Certificate" placement="top">
                    <IconButton
                      onClick={(e) =>
                        download(
                          e,
                          generatedResultData?.certificate,
                          "Certificate"
                        )
                      }
                    >
                      <DownloadIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copy certificate" placement="top">
                    <IconButton
                      onClick={(e) =>
                        copyToClipBoard(
                          e,
                          generatedResultData?.certificate,
                          "Certificate"
                        )
                      }
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </Stack>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={18}
                maxRows={18}
                value={generatedResultData?.certificate || ""}
                placeholder="X.509 cert"
                style={{ width: "100%", marginTop: "0rem", overflowY: "auto" }}
              />
            </Stack>
            <Stack width="100%"></Stack>
          </Stack>
          <Stack
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
            direction="column"
            width="100%"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              sx={{ m: 0, p: 0 }}
            >
              <Typography variant="p" sx={{ fontWeight: "bold", m: 0, p: 0 }}>
                {" "}
                Private Key
              </Typography>
              <div>
                <Tooltip title="Download Private Key" placement="top">
                  <IconButton
                    onClick={(e) =>
                      download(
                        e,
                        generatedResultData?.privateKey,
                        "Private key"
                      )
                    }
                  >
                    <DownloadIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy Private Key" placement="top">
                  <IconButton
                    onClick={(e) =>
                      copyToClipBoard(
                        e,
                        generatedResultData?.privateKey,
                        "Private Key"
                      )
                    }
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </Stack>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={18}
              maxRows={18}
              value={generatedResultData?.privateKey || ""}
              placeholder="X.509 cert"
              style={{ width: "100%", marginTop: "0rem", overflowY: "auto" }}
            />
          </Stack>
        </Stack>
        <br />
      </Box>  
    </div>
  );
}
