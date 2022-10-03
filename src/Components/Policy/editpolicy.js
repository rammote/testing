import React, { useState, Component, useCallback, useEffect } from "react";
import Server from "../APIUrl";
import { useLocation, useHistory, useParams } from "react-router-dom";
import Popup from "./Popup";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./style.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import MenuItem from "@mui/material/MenuItem";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

import { Backdrop, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import moment from "moment";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import { Input } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Loader from "../Loader";
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
const useStyles = makeStyles((theme) => ({
  formControlRoot: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    border: "2px solid lightgray",
    padding: 4,
    borderRadius: "4px",
    "&> div.container": {
      gap: "6px",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    "& > div.container > span": {
      backgroundColor: "gray",
      padding: "1px 3px",
      borderRadius: "4px",
    },
  },
  index: 1,
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function Editpolicy() {
  const classes = useStyles();
  const location = useLocation();
  console.log({ location });
  const history = useHistory();
  const requestTimes = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [roles, setRoles] = React.useState("");
  const [auth, setAuth] = React.useState("");
  const [policyId, setPolicyId] = useState(location.state.row.policyid);
  console.log({ policyId });

  // New Structure
  const [policyData, setPolicyData] = useState([]);
  const [authPolicy, setAuthPolicy] = useState({});
  const [homeLocation, setHomeLocation] = useState([]);
  const [deviceTracking, setDeviceTracking] = useState("");
  const [geoFencing, setGeoFencing] = useState("");
  const [osPolicy, setOsPolicy] = useState({});
  const [allowAnonymousNetworks, setAllowAnonymousNetworks] = useState("");
  const [fromServerIps, setFromServerIps] = useState([]);
  const [fromServerTwoFAIps, setFromServerTwoFAIps] = useState([]);
  const [blackListedContries, setblackListedContries] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = [
    {
      value: "Andorra",
      label: "Andorra"
    },
    {
      value: "United Arab Emirates",
      label: "United Arab Emirates"
    },
    {
      value: "Afghanistan",
      label: "Afghanistan"
    },
    {
      value: "Antigua and Barbuda",
      label: "Antigua and Barbuda"
    },
    {
      value: "Anguilla",
      label: "Anguilla"
    },
    {
      value: "Albania",
      label: "Albania"
    },
    {
      value: "Armenia",
      label: "Armenia"
    },
    {
      value: "Angola",
      label: "Angola"
    },
    {
      value: "Antarctica",
      label: "Antarctica"
    },
    {
      value: "Argentina",
      label: "Argentina"
    },
    {
      value: "American Samoa",
      label: "American Samoa"
    },
    {
      value: "Austria",
      label: "Austria"
    },
    {
      value: "Australia",
      label: "Australia"
    },
    {
      value: "Aruba",
      label: "Aruba"
    },
    {
      value: "Alland Islands",
      label: "Alland Islands"
    },
    {
      value: "Azerbaijan",
      label: "Azerbaijan"
    },
    {
      value: "Bosnia and Herzegovina",
      label: "Bosnia and Herzegovina"
    },
    {
      value: "Barbados",
      label: "Barbados"
    },
    {
      value: "Bangladesh",
      label: "Bangladesh"
    },
    {
      value: "Belgium",
      label: "Belgium"
    },
    {
      value: "Burkina Faso",
      label: "Burkina Faso"
    },
    {
      value: "Bulgaria",
      label: "Bulgaria"
    },
    {
      value: "Bahrain",
      label: "Bahrain"
    },
    {
      value: "Burundi",
      label: "Burundi"
    },
    {
      value: "Benin",
      label: "Benin"
    },
    {
      value: "Saint Barthelemy",
      label: "Saint Barthelemy"
    },
    {
      value: "Bermuda",
      label: "Bermuda"
    },
    {
      value: "Brunei Darussalam",
      label: "Brunei Darussalam"
    },
    {
      value: "Bolivia",
      label: "Bolivia"
    },
    {
      value: "Brazil",
      label: "Brazil"
    },
    {
      value: "Bahamas",
      label: "Bahamas"
    },
    {
      value: "Bhutan",
      label: "Bhutan"
    },
    {
      value: "Bouvet Island",
      label: "Bouvet Island"
    },
    {
      value: "Botswana",
      label: "Botswana"
    },
    {
      value: "Belarus",
      label: "Belarus"
    },
    {
      value: "Belize",
      label: "Belize"
    },
    {
      value: "Canada",
      label: "Canada"
    },
    {
      value: "Central African Republic",
      label: "Central African Republic"
    },
    {
      value: "Switzerland",
      label: "Switzerland"
    },
    {
      value: "Cook Islands",
      label: "Cook Islands"
    },
    {
      value: "Chile",
      label: "Chile"
    },
    {
      value: "Cameroon",
      label: "Cameroon"
    },
    {
      value: "China",
      label: "China"
    },
    {
      value: "Colombia",
      label: "Colombia"
    },
    {
      value: "Czech Republic",
      label: "Czech Republic"
    },
    {
      value: "Germany",
      label: "Germany"
    },
    {
      value: "Denmark",
      label: "Denmark"
    },
    {
      value: "Algeria",
      label: "Algeria"
    },
    {
      value: "Estonia",
      label: "Estonia"
    },
    {
      value: "Egypt",
      label: "Egypt"
    },
    {
      value: "Eritrea",
      label: "Eritrea"
    },
    {
      value: "Spain",
      label: "Spain"
    },
    {
      value: "Ethiopia",
      label: "Ethiopia"
    },
    {
      value: "Finland",
      label: "Finland"
    },
    {
      value: "France",
      label: "France"
    },
    {
      value: "United Kingdom",
      label: "United Kingdom"
    },
    {
      value: "Georgia",
      label: "Georgia"
    },
    {
      value: "Greece",
      label: "Greece"
    },
    {
      value: "Hungary",
      label: "Hungary"
    },
    {
      value: "Indonesia",
      label: "Indonesia"
    },
    {
      value: "Ireland",
      label: "Ireland"
    },
    {
      value: "India",
      label: "India"
    },
    {
      value: "Israel",
      label: "Israel"
    },
    {
      value: "Iraq",
      label: "Iraq"
    },
    {
      value: "Italy",
      label: "Italy"
    },
    {
      value: "Iceland",
      label: "Iceland"
    },
    {
      value: "Jersey",
      label: "Jersey"
    },
    {
      value: "Jordan",
      label: "Jordan"
    },
    {
      value: "Japan",
      label: "Japan"
    },
    {
      value: "Kenya",
      label: "Kenya"
    },
    {
      value: "Cambodia",
      label: "Cambodia"
    },
    {
      value: "Korea",
      label: "Korea"
    },
    {
      value: "Kuwait",
      label: "Kuwait"
    },
    {
      value: "Sri Lanka",
      label: "Sri Lanka"
    },
    {
      value: "Liberia",
      label: "Liberia"
    },
    {
      value: "Lesotho",
      label: "Lesotho"
    },
    {
      value: "Morocco",
      label: "Morocco"
    },
    {
      value: "Madagascar",
      label: "Madagascar"
    },
    {
      value: "Myanmar",
      label: "Myanmar"
    },
    {
      value: "Mauritania",
      label: "Mauritania"
    },
    {
      value: "Mauritius",
      label: "Mauritius"
    },
    {
      value: "Maldives",
      label: "Maldives"
    },
    {
      value: "Mexico",
      label: "Mexico"
    },
    {
      value: "Malaysia",
      label: "Malaysia"
    },
    {
      value: "Nigeria",
      label: "Nigeria"
    },
    {
      value: "Netherlands",
      label: "Netherlands"
    },
    {
      value: "Norway",
      label: "Norway"
    },
    {
      value: "Nepal",
      label: "Nepal"
    },
    {
      value: "New Zealand",
      label: "New Zealand"
    },
    {
      value: "Philippines",
      label: "Philippines"
    },
    {
      value: "Pakistan",
      label: "Pakistan"
    },
    {
      value: "Poland",
      label: "Poland"
    },
    {
      value: "Sweden",
      label: "Sweden"
    },
    {
      value: "Singapore",
      label: "Singapore"
    },
    {
      value: "Thailand",
      label: "Thailand"
    },
    {
      value: "Turkey",
      label: "Turkey"
    },
    {
      value: "United States",
      label: "United States"
    },
    {
      value: "Vietnam",
      label: "Vietnam"
    },
    {
      value: "South Africa",
      label: "South Africa"
    },
    {
      value: "Zimbabwe",
      label: "Zimbabwe"
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Server.get(
        `/policy/getById?accountId=${accountId}&policyId=${policyId}&requestTime=${requestTimes}`,
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
          setLoading(false);
          if (response.data.resultCode === 0) {
            setPolicyData(response.data.resultData);
            setNewUserPolicy(response.data.resultData.userPolicy);
            setAuthPolicy(response.data.resultData.authPolicy);
            setHomeLocation(
              response?.data?.resultData?.locationPolicy?.homeCountry ?? ""
            );
            setblackListedContries(
              response?.data?.resultData?.locationPolicy?.blacListedCountries ??
              []
            );
            setDeviceTracking(
              response?.data?.resultData?.locationPolicy?.deviceTracking ?? ""
            );
            setGeoFencing(
              response?.data?.resultData?.locationPolicy?.geoFencing ?? ""
            );
            setOsPolicy(response?.data?.resultData?.osPolicy);
            setAllowAnonymousNetworks(
              response?.data?.resultData?.networkPolicy
                ?.allowAnonymousNetworks ?? ""
            );
            setIps(response?.data?.resultData?.networkPolicy?.allowedIps ?? []);
            setTwoFAIps(
              response?.data?.resultData?.networkPolicy?.mfaRequiredIps ?? []
            );
          } else {
            Swal.fire({
              title: "Warning...",
              text: response.data.resultMessage,
              icon: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setPolicyData({});
          setLoading(false);
        });
    };
    return fetchData();
  }, []);
  const [newUserPolicy, setNewUserPolicy] = useState({
    allowAccessWithoutMFA: policyData?.userPolicy?.allowAccessWithoutMFA,
    denyAccessForUnenrolledUsers:
      policyData?.userPolicy?.denyAccessForUnenrolledUsers,
    requiredEnrollment: policyData?.userPolicy?.requiredEnrollment,
  });
  console.log({ policyData });
  console.log({ homeCountry: policyData?.locationPolicy?.homeCountry });

  // new format for ips

  const [ips, setIps] = useState(fromServerIps ? fromServerIps : []);
  const [currIp, setCurrIp] = useState("");
  const [twoFAIps, setTwoFAIps] = useState(
    fromServerTwoFAIps && fromServerTwoFAIps.length > 0
      ? fromServerTwoFAIps
      : []
  );
  const [currTwoFAIp, setCurrTwoFAIp] = useState("");

  //

  const handleKeyUp = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 32 || e.key === "Enter") {
      setIps((oldState) => [...oldState, e.target.value]);
      setCurrIp("");
    }
  };

  const handleChangeIp = (e) => {
    setCurrIp(e.target.value);
  };

  const handleDeleteIp = (item, index) => {
    let arr = [...ips];
    arr.splice(index, 1);
    console.log(item);
    setIps(arr);
  };

  // added text field for 2FA mulitple ip

  const handle2FAKeyUp = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 32 || e.key === "Enter") {
      setTwoFAIps((oldState) => [...oldState, e.target.value]);
      setCurrTwoFAIp("");
    }
  };

  const handleChangeTwoFAIp = (e) => {
    setCurrTwoFAIp(e.target.value);
  };

  const handleDeleteTwoFAIp = (item, index) => {
    let arr = [...twoFAIps];
    arr.splice(index, 1);
    console.log(item);
    setTwoFAIps(arr);
  };

  //  Blacklisted Countries new structure
  const [currentCountry, setCurrentCountry] = useState("");


  const addBlackListedContries = (e) => {
    setblackListedContries((oldState) => [...oldState, e.target.value]);
    setCurrentCountry("");
  };
  const handleDeleteBlackListedCountries = (item, index) => {
    let arr = [...blackListedContries];
    arr.splice(index, 1);
    console.log(item);
    setblackListedContries(arr);
  };
  /**********************************************************************************/

  const [selectedValue, setSelectedValue] = useState([]);
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const [selectedOption, setSelectedOption] = useState([]);
  const handleChangeCountry = (e) => {
    setSelectedOption(e);
  };

  /**********************************************************************************/

  // var allaccessdeny="false",androidallow="false",bballow="false",iosallow="false",linuxallow="false",macallow="false",otherallow="false",windowallow="false",windowphoneallow="false",allv="false",cromev="false",cromemobilev="false",edgev="false",firefoxv="false",iev="false",mobilrsafariv="false",safariv="false";

  const handleSubmit = async (event) => {
    event.preventDefault();

    //var pname="abcd";
    setLoading(true);
    await Server.post(
      `/policy/update?accountId=${accountId}&policyName=${location.state.row.policyname}&requestTime=${requestTimes}`,
      {
        authPolicy,
        locationPolicy: {
          blacListedCountries: [...new Set(blackListedContries)],
          deviceTracking: deviceTracking,
          geoFencing: geoFencing,
          homeCountry: homeLocation,
        },
        networkPolicy: {
          allowAnonymousNetworks,
          allowedIps: ips,
          mfaRequiredIps: twoFAIps,
        },
        osPolicy: { ...osPolicy },
        userPolicy: newUserPolicy,
      },
      {
        headers: {
          authToken: authtoken,
        },
      }
    )
      .then((response) => {
        console.log(response.data.resultMessage);
        setLoading(false);
        if (response.data.resultCode === 0) {
          var msg = response.data.resultMessage;

          Swal.fire({
            title: "Success",
            text: msg,
            icon: "success",
          });
          history.push("/AxiomProtect/Policy")
        } else {
          Swal.fire({
            title: "Warning",
            text: response.data.resultMessage,
            icon: "warning",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: err,
          icon: "error",
        });
      });
  };
  // console.log({checked: rows[0]?.locationPolicy.deviceTracking});
  console.log({ fromServerIps, fromServerTwoFAIps });
  console.log({ data: policyData?.userPolicy?.requiredEnrollment });

  console.log({ newUserPolicy });
  function handleChangeNewUserPolicy(e) {
    e.preventDefault();
    if (e.target.name === "allowAccessWithoutMFA") {
      setNewUserPolicy({
        allowAccessWithoutMFA: true,
        denyAccessForUnenrolledUsers: false,
        requiredEnrollment: false,
      });
    } else if (e.target.name === "denyAccessForUnenrolledUsers") {
      setNewUserPolicy({
        allowAccessWithoutMFA: false,
        denyAccessForUnenrolledUsers: true,
        requiredEnrollment: false,
      });
    } else if (e.target.name === "requiredEnrollment") {
      setNewUserPolicy({
        allowAccessWithoutMFA: false,
        denyAccessForUnenrolledUsers: false,
        requiredEnrollment: true,
      });
    } else {
      setNewUserPolicy(newUserPolicy);
    }
  }

  function handleChangeAuthPolicy(e) {
    e.preventDefault();
    if (e.target.value === "2") {
      setAuthPolicy({ denyAccess: true, enforceMFA: false, bypassMFA: false });
    } else if (e.target.value === "1") {
      setAuthPolicy({ denyAccess: false, enforceMFA: true, bypassMFA: true });
    } else {
      setAuthPolicy(authPolicy);
    }
  }
  console.log({ authPolicy });

  console.log({ homeLocation });

  console.log({ deviceTracking });
  console.log({ geoFencing });
  console.log({ osPolicy });
  console.log({ allowAnonymousNetworks });
  console.log({ fromServerIps });
  console.log({ fromServerTwoFAIps });
  console.log({ ips });
  console.log({ twoFAIps });
  console.log({ blackListedContries });
  return (
    <div style={{ paddingTop: "90px", paddingLeft: "20px" }}>
      {/* <Grid container spacing={3}>
                <Grid item xs={12} md={6}> */}
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          //href="/DashBoard"
          onClick={useCallback(() => history.push("/AxiomProtect/DashBoard"))}
          label="Dashboard"
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb
          component="a"
          //href="/DashBoard"
          onClick={useCallback(() => history.push("/AxiomProtect/Policy"))}
          label="Policy"
        />
        <StyledBreadcrumb label="Edit Policy" deleteIcon={<ExpandMoreIcon />} />
      </Breadcrumbs>
      {/* </Grid>
              </Grid> */}
      <br />
      <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
        <h3>Edit Global Policy</h3>
      </Typography>
      <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
        <strong>Policy Name :</strong> {location.state.row.policyname}
        <span style={{ marginLeft: "1rem" }}>
          <strong>Policy Id :</strong> {location.state.row.policyid}
        </span>
      </Typography>
      <hr />
      <div style={{ float: "left", width: "23%", color: "#0D4990" }}>
        New User policy
        <br />
        <br />
        Authentication policy
        <br />
        <br />
        User location
        <br />
        <br />
        {/* Device Health application
            <br /><br />
            Remembered devices
            <br /><br /> */}
        Operating systems
        <br />
        <br />
        Browsers
        <br />
        <br />
        {/* Plugins
            <br /><br /> */}
        Authorized networks
        <br />
        <br />
      </div>
      <div class="vl"></div>
      <div style={{ float: "right", width: "75%" }}>
        <div class="inboxbox">
          <br />
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            New User Policy
          </Typography>
          <br />
          <FormControl>
            <RadioGroup
              value={
                newUserPolicy.requiredEnrollment === true
                  ? 1
                  : newUserPolicy.allowAccessWithoutMFA === true
                    ? 2
                    : 3
              }
              onChange={handleChangeNewUserPolicy}
            >
              <FormControlLabel
                value={1}
                boolean={true}
                name="requiredEnrollment"
                control={<Radio />}
                label="Require enrollment"
              />
              <div
                class="info"
                style={{ paddingLeft: "30px", fontSize: "12px" }}
              >
                Prompt unenrolled users to enroll whenever possible.
              </div>

              <FormControlLabel
                value={2}
                boolean={true}
                name="allowAccessWithoutMFA"
                control={<Radio />}
                label=" Allow access without 2FA"
              />
              <div
                class="info"
                style={{ paddingLeft: "30px", fontSize: "12px" }}
              >
                Allow users unknown to to pass through without two-factor
                authentication. Users who exist in and have not enrolled will be
                required to enroll.
              </div>

              <FormControlLabel
                value={3}
                boolean={true}
                name="denyAccessForUnenrolledUsers"
                control={<Radio />}
                label="Deny access"
              />
              <div
                class="info"
                style={{ paddingLeft: "30px", fontSize: "12px" }}
              >
                Deny authentication to unenrolled users. This controls what
                happens after an unenrolled user passes primary authentication
              </div>
            </RadioGroup>
          </FormControl>
        </div>
        <br />
        <br />
        <hr />
        <div class="inboxbox">
          <br />
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Authentication Policy
          </Typography>
          <br />
          <FormControl>
            <RadioGroup
              name="Roles"
              onChange={handleChangeAuthPolicy}
              value={authPolicy.denyAccess === true ? 2 : 1}
            >
              {console.log(policyData?.authPolicy?.denyAccess)}
              <FormControlLabel
                value={1}
                name="enforceMFA"
                control={<Radio />}
                label="Enforce 2FA"
              />
              <div
                class="info"
                style={{ paddingLeft: "30px", fontSize: "12px" }}
              >
                Require two-factor authentication or enrollment when applicable,
                unless there is a superseding policy configured.
              </div>

              <FormControlLabel
                value={2}
                name="denyAccess"
                control={<Radio />}
                label=" Deny access"
              />
              <div
                class="info"
                style={{ paddingLeft: "30px", fontSize: "12px" }}
              >
                Deny authentication to all users.When enabled, this affects all
                users
              </div>
            </RadioGroup>
          </FormControl>
        </div>
        <br />
        <hr />
        <div class="inboxbox">
          <br />
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Home Country
          </Typography>
          <br />
          <FormControl fullWidth>
            <NativeSelect
              value={homeLocation && homeLocation}
              onChange={(e) => setHomeLocation(e.target.value)}
            //options={options}
            >
              {
                options?.map(item=>
                  <option value={item?.value}>{item?.label}</option>
                  )
              }
            </NativeSelect>
          </FormControl>
          {/* <Typography id="user-location" sx={{fontFamily:'Jost', color: '#232E3C'}}>Home Country</Typography>
                <br />
              <Select
                placeholder="Select Country..."
                style={{ minWidth: 350 }}
                value={homeLocation && homeLocation}
                onChange={(e) => setHomeLocation(e.target.value)}
                options={options}
              /> */}

          <br />
          <br />
          <br />
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Blacklisted Countries
          </Typography>
          <br />

          <div>
            <div className={"container"}>
              {blackListedContries?.map((item, index) => (
                <Chip
                  size="small"
                  onDelete={() => handleDeleteBlackListedCountries(item, index)}
                  label={item}
                />
              ))}
            </div>
            <br />
            <FormControl fullWidth>
              <NativeSelect 
                className="dropdown"
                placeholder="Select Countries..."
                onChange={addBlackListedContries}
                // set selected values
                value={currentCountry ?? ""}
              >
                <option value=""></option>
                {
                options?.map(item=>
                  <option value={item?.value}>{item?.label}</option>
                  )
              }
              </NativeSelect>
            </FormControl>
            <br />
            <br />
            {/* <FormControl variant="filled" sx={{ minWidth: 350 }}>
                <InputLabel id="demo-simple-select-filled-label">No action</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={(e)=>setCountryaccess(e.target.value)}
                  value={location.state.row.locationPolicy.action}
                >
                  <MenuItem value="Deny Access">Deny Access</MenuItem>
                  <MenuItem value="Allow Access">Allow Access</MenuItem>
                </Select>
              </FormControl> */}
            <Checkbox
              checked={deviceTracking && deviceTracking}
              onChange={(e) => setDeviceTracking(e.target.checked)}
            />{" "}
            Device Tracking
            <br />
            <Checkbox
              checked={geoFencing && geoFencing}
              onChange={(e) => setGeoFencing(e.target.checked)}
            />{" "}
            Geo Fencing
            <br />
          </div>
        </div>

        {/* <div class="inboxbox">
            <br /><br />
            Device Health application
                <br /><br />
                <hr />
                <br /> MAC OS <br />

                <FormControl>
                  <RadioGroup
                    name="macos"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Don't require users to have the app" />
                    
                    <FormControlLabel value="2" control={<Radio />} label=" Require users to have the app" />
                    <div style={{paddingLeft: '20px'}}><FormGroup>
                      <FormControlLabel control={<Checkbox  />} label="Block access if firewall is off." />
                      <FormControlLabel control={<Checkbox  />} label="Block access if FileVault is off." />
                      <FormControlLabel control={<Checkbox  />} label="Block access if system password is not set." />
                      
                    </FormGroup></div>
                  </RadioGroup>
              </FormControl>
              <br />
              <br />
              <br /> WINDOWS <br /><br />

                <FormControl>
                  <RadioGroup
                    name="windowsos"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Don't require users to have the app" />
                    
                    <FormControlLabel value="2" control={<Radio />} label=" Require users to have the app" />
                    <div style={{paddingLeft: '20px'}}><FormGroup>
                      <FormControlLabel control={<Checkbox  />} label="Block access if firewall is off." />
                      <FormControlLabel control={<Checkbox  />} label="Block access if FileVault is off." />
                      <FormControlLabel control={<Checkbox  />} label="Block access if system password is not set." />
                      
                    </FormGroup></div>
                  </RadioGroup>
              </FormControl>

            </div>
            <div class="inboxbox">
            <br /><br />
            Remembered devices
                <br /><br />
                <hr />
                <p style={{lineHeight: '20px'}}>Remembered devices allow users to skip subsequent 2FA requests. Remembered devices can only be enabled on browser-based applications.</p>
                <FormControl>
                  <RadioGroup
                    name="rememberdevice"
                  >
                    <FormControlLabel value="1" control={<Radio />} label=" Do not remember devices" />
                    
                    <FormControlLabel value="2" control={<Radio />} label="Users may choose to remember their device for" />
                    
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 100 }}>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Age"
                      >
                        <MenuItem value={10}>1</MenuItem>
                        <MenuItem value={20}>2</MenuItem>
                        <MenuItem value={30}>3</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-filled-label">Days</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>1</MenuItem>
                        <MenuItem value={20}>2</MenuItem>
                        <MenuItem value={30}>3</MenuItem>
                      </Select>
                    </FormControl>

                    <div style={{paddingLeft: '20px'}}><RadioGroup
                      name="dd"
                      >
                        <FormControlLabel value="11" control={<Radio />} label=" Per each application" />
                      
                        <FormControlLabel value="12" control={<Radio />} label="For all protected web applications" />
                      
                      </RadioGroup></div>
                  </RadioGroup>
              </FormControl>
            </div> */}
        <br />
        <hr />
        <div class="inboxbox">
          <br />
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Operating systems
          </Typography>
          <br />
          <Stack sx={{ width: "98%" }} spacing={2}>
            <Alert icon={false}>
              This section affects devices used to access applications protected
              by 's browser-based authentication prompt, and mobile devices
              using Mobile as a second factor. Learn more about operating system
              policies .
            </Alert>
          </Stack>
          <br />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowAllOtherBrowsers ?? ""}
                  onChange={(e) =>
                    setOsPolicy({
                      ...osPolicy,
                      allowAllOtherBrowsers: e.target.checked,
                    })
                  }
                />
              }
              label="Allow All Other Browers"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowAndroid ?? ""}
                  onChange={(e) =>
                    setOsPolicy({ ...osPolicy, allowAndroid: e.target.checked })
                  }
                />
              }
              label="Allow android Devices"
            />
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={
                    osPolicy?.allowAndroidDevicesfulldiskEncryption ?? ""
                  }
                  onChange={(e) =>
                    setOsPolicy({
                      ...osPolicy,
                      allowAndroidDevicesfulldiskEncryption: e.target.checked,
                    })
                  }
                />
              }
              label="Allow android device full disk encryption"
            /> */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowBiometricVerification ?? ""}
                  onChange={(e) =>
                    setOsPolicy({
                      ...osPolicy,
                      allowBiometricVerification: e.target.checked,
                    })
                  }
                />
              }
              label="Allow biometric verification"
            />
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowBlackberry ?? ""}
                  onChange={(e) =>
                    setOsPolicy({
                      ...osPolicy,
                      allowBlackberry: e.target.checked,
                    })
                  }
                />
              }
              label="Allow blackberry devices"
            /> */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowChrome ?? ""}
                  onChange={(e) =>
                    setOsPolicy({ ...osPolicy, allowChrome: e.target.checked })
                  }
                />
              }
              label="Allow chrome os devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowChromeMobile ?? ""}
                  onChange={(e) =>
                    setOsPolicy({
                      ...osPolicy,
                      allowChromeMobile: e.target.checked,
                    })
                  }
                />
              }
              label="Allow chrome mobile devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowEdge ?? ""}
                  onChange={(e) =>
                    setOsPolicy({ ...osPolicy, allowEdge: e.target.checked })
                  }
                />
              }
              label="Allow Edge devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowFirefox ?? ""}
                  onChange={(e) =>
                    setOsPolicy({ ...osPolicy, allowFirefox: e.target.checked })
                  }
                />
              }
              label="Firefox"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowIE ?? ""}
                  onChange={(e) =>
                    setOsPolicy({ ...osPolicy, allowIE: e.target.checked })
                  }
                />
              }
              label="Internet explore"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowIOS ?? ""}
                  onChange={(e) =>
                    setOsPolicy({ ...osPolicy, allowIOS: e.target.checked })
                  }
                />
              }
              label="Allow ios devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowLinux ?? ""}
                  onChange={(e) =>
                    setOsPolicy({ ...osPolicy, allowLinux: e.target.checked })
                  }
                />
              }
              label="Allow linux device"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowMAC ?? ""}
                  onChange={(e) =>
                    setOsPolicy({ ...osPolicy, allowMAC: e.target.checked })
                  }
                />
              }
              label="Allow mac os devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowMobileSafari ?? ""}
                  onChange={(e) =>
                    setOsPolicy({
                      ...osPolicy,
                      allowMobileSafari: e.target.checked,
                    })
                  }
                />
              }
              label="Mobile safari"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowSafari ?? ""}
                  onChange={(e) =>
                    setOsPolicy({ ...osPolicy, allowSafari: e.target.checked })
                  }
                />
              }
              label="Safari"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowTamperedDevices ?? ""}
                  onChange={(e) =>
                    setOsPolicy({
                      ...osPolicy,
                      allowTamperedDevices: e.target.checked,
                    })
                  }
                />
              }
              label="Allow tampered devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowWindows ?? ""}
                  onChange={(e) =>
                    setOsPolicy({ ...osPolicy, allowWindows: e.target.checked })
                  }
                />
              }
              label="Allow windows devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowWindowsPhone ?? ""}
                  onChange={(e) =>
                    setOsPolicy({
                      ...osPolicy,
                      allowWindowsPhone: e.target.checked,
                    })
                  }
                />
              }
              label="Allow windows phone devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={osPolicy?.allowOtherOS ?? ""}
                  onChange={(e) =>
                    setOsPolicy({ ...osPolicy, allowOtherOS: e.target.checked })
                  }
                />
              }
              label="Allow other OS"
            />
          </FormGroup>
        </div>
        {/* <br />
            <hr/>
            <div class="inboxbox">
            <br />
            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Browsers</Typography>
                <br />
                <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}><Alert icon={false}>Always block</Alert></Typography>
              <br />
              <FormGroup>
                <FormControlLabel control={<Checkbox />} checked={cromev} label="Crome" onClick={(e)=>crome(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={cromemobilev} label="Crome mobile" onClick={(e)=>cromemobile(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={edgev} label="Edge " onClick={(e)=>edge(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={firefoxv} label="Firefox" onClick={(e)=>firefox(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={iev} label="Internet explore" onClick={(e)=>ie(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={mobilrsafariv} label="Mobile safari" onClick={(e)=>mobilrsafari(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={safariv} label="Safari" onClick={(e)=>safari(e.target)} />
                <FormControlLabel control={<Checkbox />} checked={allv} label="All other browsers" onClick={(e)=>all(e.target)} />
              </FormGroup> */}
        {/* <hr color="#CECECE"/>
              <FormGroup><div>
                <FormControlLabel control={<Checkbox />} label="Wran user if browser is out of date" /><br />
                <FormControlLabel control={<Checkbox />} label="And block them if more than" />

                
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{width: '50px'}}
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                  </Select>Out of date</div>
              </FormGroup>  */}
        {/* </div>  */}
        {/* <div class="inboxbox">
            <br /><br />
              Plugins
              <br /><br />
              <hr />
              Flash <br /><br />
              <FormControl>
                  <RadioGroup
                    name="flash"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow all versions" />

                    <FormControlLabel value="2" control={<Radio />} label=" Warn user if there browser out of date " />
                  
                        <FormGroup><div>
                          <FormControlLabel control={<Checkbox />} label="And block them if more than" />

                          
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              style={{width: '50px'}}
                            >
                              <MenuItem value={10}>1</MenuItem>
                              <MenuItem value={20}>2</MenuItem>
                              <MenuItem value={30}>3</MenuItem>
                            </Select>Out of date</div>
                        </FormGroup>

                    <FormControlLabel value="3" control={<Radio />} label="Block all versions" />
                    
                  
                  </RadioGroup>
              </FormControl>
              <br /><br />
              java<br /><br />
              <FormControl>
                  <RadioGroup
                    name="flash"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow all versions" />

                    <FormControlLabel value="2" control={<Radio />} label=" Warn user if there browser out of date " />
                  
                        <FormGroup><div>
                          <FormControlLabel control={<Checkbox />} label="And block them if more than" />

                          
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              style={{width: '50px'}}
                            >
                              <MenuItem value={10}>1</MenuItem>
                              <MenuItem value={20}>2</MenuItem>
                              <MenuItem value={30}>3</MenuItem>
                            </Select>Out of date</div>
                        </FormGroup>

                    <FormControlLabel value="3" control={<Radio />} label="Block all versions" />
                    
                  
                  </RadioGroup>
              </FormControl>
              
            </div> */}
        <br />
        <hr />
        <div class="inboxbox">
          <br />
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Authorized Networks
          </Typography>
          <br />
          <Stack sx={{ width: "98%" }} spacing={2}>
            <Alert icon={false}>
              Specify networks using a space-separated list of IP addresses, IP
              ranges, or CIDRs. These must be public IP addresses, and not local
              or private IP addresses.
            </Alert>
          </Stack>
          <br />
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Your IP address is<span style={{ color: "red" }}>(after adding ip address please click Space/Enter key)</span>
          </Typography>
          <br />
          <FormControl fullWidth classes={{ root: classes.formControlRoot }}>
            <div className={"container"}>
              {ips &&
                ips?.map((item, index) => (
                  <Chip
                    size="small"
                    onDelete={() => handleDeleteIp(item, index)}
                    label={item}
                  />
                ))}
            </div>
            <Input
              fullWidth
              variant="contained"
              value={currIp}
              onChange={handleChangeIp}
              onKeyDown={handleKeyUp}
            />
          </FormControl>
          {/* <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Requires enrollment from these users" />
              </FormGroup> */}
          <br />
          <br />
          <br />
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Require 2FA from these networks:<span style={{ color: "red" }}>(after adding require 2FA please click Space/Enter key)</span>
          </Typography>
          <FormControl fullWidth classes={{ root: classes.formControlRoot }}>
            <div className={"container"}>
              {twoFAIps &&
                twoFAIps?.map((item, index) => (
                  <Chip
                    size="small"
                    onDelete={() => handleDeleteTwoFAIp(item, index)}
                    label={item}
                  />
                ))}
            </div>
            <Input
              fullWidth
              variant="contained"
              value={currTwoFAIp}
              onChange={handleChangeTwoFAIp}
              onKeyDown={handle2FAKeyUp}
            />
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              checked={allowAnonymousNetworks}
              label="Deny access from all the other users"
              onClick={(e) => setAllowAnonymousNetworks(e.target.checked)}
            />
          </FormGroup>
        </div>
        {/* <div class="inboxbox">
            <br /><br />
            Anonymous networks<br /><br />
            <hr />
            For users that request access through proxies, Tor, or VPN: 
            <FormGroup><div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{width: '60%'}}
                >
                 <MenuItem value={10}>proxies</MenuItem>
                 <MenuItem value={20}>Tor</MenuItem>
                 <MenuItem value={30}>VPN</MenuItem>
                </Select></div>
            </FormGroup>

            </div>

            <div class="inboxbox">
            <br /><br />
            Authentication methods<br /><br />
            <hr />
            <p>Only allow users to authenticate with:</p>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Push" />
                <FormControlLabel control={<Checkbox />} label="Mobile passcode" />
                <FormControlLabel control={<Checkbox />} label="SMS passcode" />
                <FormControlLabel control={<Checkbox />} label="Security key U2F" />
                <FormControlLabel control={<Checkbox />} label="Web Authn" />
                <FormControlLabel control={<Checkbox />} label="Touch ID" style={{paddingLeft: '30px'}}/>
                <FormControlLabel control={<Checkbox />} label="Security Keys (WebAuthn)" style={{paddingLeft: '30px'}}/>
                <FormControlLabel control={<Checkbox />} label="Hardware tokens" />
              </FormGroup>

            </div>

            <div class="inboxbox">
            <br /><br />
            Mobile app<br /><br />
            <hr />
            <FormControl>
                  <RadioGroup
                    name="mobile app"
                  >
                    <FormControlLabel value="1" control={<Radio />} label=" Require up-to-date security patches for axiom Mobile." />

                    <FormControlLabel value="2" control={<Radio />} label=" Don't require up-to-date security patches for axiom Mobile. " />
                
                  </RadioGroup>
              </FormControl>
            </div>

            <div class="inboxbox">
            <br /><br />
            Tampered devices<br /><br />
            <hr />
            <FormControl>
                  <RadioGroup
                    name="tempered devices"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow authentication from tampered devices." />

                    <FormControlLabel value="2" control={<Radio />} label="Don't allow authentication from tampered devices.." />

                    Only applies to iOS and Android.
                
                  </RadioGroup>
              </FormControl>
            </div>

            <div class="inboxbox">
            <br /><br />
            Full-disk encryption<br /><br />
            <hr />
            <FormControl>
                  <RadioGroup
                    name="full disk"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow authentication from Android devices without full-disk encryption." />

                    <FormControlLabel value="2" control={<Radio />} label="Don't allow authentication from Android devices without full-disk encryption.." />

                    Only applies to Android.
                
                  </RadioGroup>
              </FormControl>
            </div>

            <div class="inboxbox">
            <br /><br />
            Screen lock<br /><br />
            <hr />
            <FormControl>
                  <RadioGroup
                    name="full disk"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow authentication from devices without a screen lock." />

                    <FormControlLabel value="2" control={<Radio />} label="Don't allow authentication from devices without a screen lock." />

                    Only applies to iOS and Android.
                
                  </RadioGroup>
              </FormControl>
            </div>

            <div class="inboxbox">
            <br /><br />
            Mobile device biometrics<br /><br />
            <hr />
            <p style={{lineHeight: '20px'}}>Apple Touch ID, Face ID and Android Fingerprint can be required as an additional verification when approving Push login requests on supported devices. Any device's passcode can be used as a fallback when biometric verification fails or is unavailable.</p>
            <FormControl>
                  <RadioGroup
                    name="full disk"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow authentication from devices without a screen lock." />

                    <FormControlLabel value="2" control={<Radio />} label="Don't allow authentication from devices without a screen lock." />
                    Only applies to iOS and Android.
                
                  </RadioGroup>
              </FormControl>
            </div> */}
        <br />
        <br />
        {loading ? (
          <Loader />
        ) : (
          <div style={{ margin: "0 auto", width: "100%", textAlign: "center" }}>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}
