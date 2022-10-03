import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { emphasize, styled } from "@mui/material/styles";
import Tab from '@mui/material/Tab';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Server from "../../APIUrl";
import IDP from './SAML/IDP';
import SPSetting from "./SAML/SP";

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


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function EditApplication() {
  const history = useHistory();
  const {idpId} =useParams()
  const accountId = sessionStorage.getItem("accountId");
  const authToken = sessionStorage.getItem("jwtToken");
  const [editCustomForm, setEditCustomForm] = React.useState({
    appname: "",
    applogo: "",
  });

  const [imageURL, setImageURL] = React.useState(" ");

  React.useEffect(() => {
    //console.log(editCustomForm)
    //console.log(location.state.row.unitid)
    Server.get(
      `/application/get?accountId=${accountId}&appId=${idpId}&requestTime=${requestTime}`,
      {
        headers: {
          "content-type": "application/json",
          authToken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then((response) => {
        if (
          !(
            response.data.resultCode == -1 ||
            response.data.resultMessage == "Unable to get"
          )
        ) {
          setEditCustomForm(response.data.resultData);
          setImageURL(response.data.resultData.applogo);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idpId]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{ width: "95%", margin: "0 auto", marginTop: "5.5rem" }}>
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
              label="Edit SAML Application"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={0} sx={{ paddingTop: "30px" }}>
        <Grid item>
          <Typography
            sx={{
              fontFamily: "Jost",
              fontSize: "18px",
              color: "#000000",
              fontWeight: "800",
            }}
          >
            Edit SAML Application
          </Typography>
        </Grid>
      </Grid>
      <div style={{paddingTop:"1rem"}}>
        <br />

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
              Application Name
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              size="small"
              type="text"
              variant="outlined"
              value={editCustomForm.appname}
              label="You can not change the name of your application"
              disabled={true}
              onChange={(e) =>
                setEditCustomForm({
                  ...editCustomForm,
                  appname: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
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
              width: "25%",
              float: "left",
              margin: "1px 21px",
            }}
          >
            <div style={{ marginTop: 10 }}>
              {imageURL === "" ? (
                <ImageAspectRatioIcon
                  style={{ fontSize: "4rem", opacity: "0.7" }}
                />
              ) : (
                <img
                  src={imageURL}
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

        <Divider sx={{ borderColor: "#BABABA", width: "1000px" }} />
        <br />


        <div>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label={<Typography sx={{ fontFamily: 'Jost' }}>SAML IDP Details</Typography>} {...a11yProps(0)} />
            <Tab label={<Typography sx={{ fontFamily: 'Jost' }}>Add SP</Typography>} {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
                  <IDP/>
          </TabPanel>

          <TabPanel value={value} index={1}>
   
            <SPSetting />

          </TabPanel>
        </div>




        <br />
      </div>
    </div>
  );
}
