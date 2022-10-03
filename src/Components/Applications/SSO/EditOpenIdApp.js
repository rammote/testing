import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { emphasize, styled } from "@mui/material/styles";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Server from "../../APIUrl";
import {Button} from '@mui/material';
import Loader from '../../Loader'

import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import OIDCDetails from './OpenId/OIDCDetails';
import Resources from "./OpenId/Resources";

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

export default function EditOIDCApplication() {
  const history = useHistory();

  const appData = useState();
  const { clientId: id } = useParams()
  const { state: { row } } = useLocation();
  console.log({ row })

  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(false);

  const accountId = sessionStorage.getItem("accountId");
  const authToken = sessionStorage.getItem("jwtToken");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [rows, setRows] = React.useState()
  const [resourceName, setResourceName] = React.useState("");
  const [resourceIndicator, setResourceIndicator] = React.useState("");
  const [accessTokenFormat, setAccessTokenFormat] = React.useState("");
  const [scope, setScope] = React.useState("");
  const [accessTokenTTL, setAccessTokenTTL] = React.useState("");

  var clientId = id || row?.subtype || row?.secretkey;
  var appId = row?.appid;




  React.useEffect(() => {
    if (clientId) {
      fetchData();

    }

  }, [clientId])



  const [filterList, setFilterList] = useState(rows);
  const fetchData = async () => {
    setLoading(true);
    await Server.get(`/oidc/getAllResources?id=${clientId}`, {
      headers: {
        'content-type': 'application/json',
        authToken: authToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.data.resultCode === 0) {
          let data = JSON.parse(response.data.resultData);
          setRows(data);
          setFilterList(data);
          console.log(data);
        }

      }).catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }


  const handleAddResource = (event) => {
    event.preventDefault();
    console.log();
    setLoading(true)

    Server.post(
      `/oidc/createResource`,
      {
        "clientId": clientId,
        "resourceName": resourceName,
        "resourceIndicator": resourceIndicator,
        "accessTokenFormat": accessTokenFormat,
        "scope": scope,
        "accessTokenTTL": accessTokenTTL,

      },
      {
        headers: {

          'content-type': 'application/json',
          authToken: authToken,
        },
      }
    )
      .then((response) => {
        if (response.data.resultCode === 0) {
          console.log(response.data);
          fetchData();
          setLoading(false)
          Swal.fire({
            title: "Successfully Added",
            text: "Configure OpenId Application Successfully",
            icon: "success",
            showCancelButton: false,

          });

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
    width: 1000,
    // height: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    fontFamily: 'Jost',
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

  const handleUpdateApp = (event) => {
    event.preventDefault();
    setLoading(true);
    setLoading(false);
  };

  return (

    <div style={{ paddingTop: "90px", paddingLeft: "20px", width: "100%" }}>

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
          label="Edit OpenId Application"
          deleteIcon={<ExpandMoreIcon />}
        />
      </Breadcrumbs>
      <br />
      <div >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={<Typography sx={{ fontFamily: 'Jost' }}>Basic Details</Typography>} {...a11yProps(0)} />
          <Tab label={<Typography sx={{ fontFamily: 'Jost' }}>Resources</Typography>} {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>

          <OIDCDetails clientId={clientId} appId={appId} accountId={row?.accountid} />

          <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
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
                  marginTop: '1.8rem'
                }}
                type='submit'
              >
                Save
              </Button>
            </center>
          )}

      </TabPanel>

      <TabPanel value={value} index={1}>
        <Resources />
      </TabPanel>
    </div>
      
      
      
      
      
    </div >
  );
}
