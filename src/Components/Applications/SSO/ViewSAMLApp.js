
import React, { useCallback, useState } from "react";
import { Link, useHistory,useLocation } from "react-router-dom";
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
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Modal from '@mui/material/Modal';
import {
  
    IconButton,
    InputLabel,
    Stack,
    TextareaAutosize,
    Tooltip,
  } from "@mui/material";




function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
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

export default function Applications() {
  const history = useHistory();
  const authToken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");

  const [appName, setAppName] = React.useState("");
  const [identityDocument, setIdentityDoc] = React.useState(" ");
  const [appLogo, setAppLogo] = React.useState("");
  const [appType, setAppType] = React.useState("1");
  const [subType, setSubType] = React.useState("");
  const [sonicDoc, setSonicDoc] = React.useState("");
  const [loading, setLoading] = useState(false);
  
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  
  const location = useLocation();
  console.log(location.state);

  const handleSonic = (e) => {
    e.preventDefault();
    setSonicDoc(true);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    // height: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    fontFamily: 'Jost',
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
    
    history.push({
        pathname: "/AxiomProtect/Applications/ViewOpenIdApp",
      });
    //   result = result.json();
    // console.warn(result);
  };

  console.log({ documents: documents.join(",") });
  const [image, setImage] = useState("");
  
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
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
};


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
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
              label="View OpenId Application"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
          <br />
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >
            <h4>View SAML Application</h4>
          </Typography>
          <div >
            
                
            
                <Grid container spacing={3}>
                    <Grid item xs={3} md={12}>
                        <Container>
      
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Single Sign-on URI(ACS URL)
                
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="name"
              id="email"
              label="Single Sign-on URI(ACS URL)"
              variant="outlined"
              value={location.state.data?.ssoUrl}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Single Logout URL(SLO URL)
                
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="name"
              id="email"
              label="Single Logout URL(SLO URL)"
              variant="outlined"
              value={location.state.data?.sloUrl}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Audience URI(SP Entity ID)
                
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="name"
              id="email"
              label="Audience URI(SP Entity ID)"
              variant="outlined"
              value={location.state.data?.entityID}
            />
          </Grid>
        </Grid>
        {/* <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Default RelayState
                
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="name"
              id="email"
              label="Default RelayState"
              variant="outlined"
              value={location.state.data?.defaultRelayState}
            />
          </Grid>
        </Grid> */}
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Name ID Format
                
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="name"
              id="email"
              
              variant="outlined"
              value={location.state.data?.nameIdFormat}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Response 
                
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="name"
              id="email"
              label="Default RelayState"
              variant="outlined"
              value={location.state.data?.ssoUrl}
            />
          </Grid>
        </Grid>

        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Assertion Encryption 
                
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="name"
              id="email"
              label="Default RelayState"
              variant="outlined"
              value={location.state.data?.ssoUrl}
            />
          </Grid>
        </Grid>

        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Encryption Certificate
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextareaAutosize
                aria-label="minimum height"
                minRows={18}
                maxRows={18}
                value={location.state.data?.encryptCert}
                placeholder="X.509 cert"
                style={{ width: "100%", marginTop: "0rem", overflowY: "auto"}}
              />
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Signature Certificate
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextareaAutosize
                aria-label="minimum height"
                minRows={18}
                maxRows={18}
                value={location.state.data?.signingCert}
                placeholder="X.509 cert"
                style={{ width: "100%", marginTop: "0rem", overflowY: "auto"}}
              />
          </Grid>
        </Grid>
        <br />

        <Grid container spacing={3}>
          
        </Grid>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                Authentication context class
                
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Select
              fullWidth
              size="small"
              
              name="subType"
              id="subType"
              onChange={(e) => setSubType(e.target.value)}
            >
              
              <MenuItem value={"Passwordless"}>Passwordless</MenuItem>
              <MenuItem value={"Password Protected Transport"}>Password Protected Transport</MenuItem>
              <MenuItem value={"Password"}>Password</MenuItem>
              <MenuItem value={"Unspecified"}>Unspecified</MenuItem>
              <MenuItem value={"TLS Client"}>TLS Client</MenuItem>
              <MenuItem value={"X.509 Certificate"}>X.509 Certificate</MenuItem>      
              <MenuItem value={"Integrated Windows Authentication"}>Integrated Windows Authentication</MenuItem>
              <MenuItem value={"Kerberos"}>Kerberos</MenuItem>
            </Select>
          </Grid>
        </Grid> */}
      </Container>
                    </Grid>
                </Grid>

                <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
                <br />
                
                {loading ? (
                    <Loader />
                ) : (
                    <center>
                    {/* <Button
                        variant="contained"
                        style={{
                        color: "#FFFFFF",
                        backgroundColor: "#206BC4",
                        fontFamily: "Jost",
                        }}
                        onClick={handleSubmit}
                    >
                        Save And Next
                    </Button> */}
                    </center>
                )}
                <br />

            </div>
        </Grid>
      </Grid>
      
    </div>
  );
}