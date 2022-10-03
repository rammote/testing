import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Server from "../../APIUrl";
import AdaptiveDetails from "../AdaptiveDetails";
import AllUserDetails from "../AllUserDetails";
import Applications from "../Applications";
import AssignToken from "../AssignToken";
import Certficate from "../Certficate";
import Device from "../Device";
import Geolocation from "../Geolocation";
import Requests from "../RequestTypes/Requests";
import SonicDetails from "../SonicDetails";
import EditIcon from "@mui/icons-material/Edit";
import NeofyDetails from "../NeofyDetails";

const drawerWidth = 240;

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ViewUserDetail({ appData, userData, setIsUserUpdated, setUserData }) {
  const history = useHistory();
  const location = useLocation();
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const userId = sessionStorage.getItem("userId");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [rowsss, setRowsss] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const [appDetails, setAppDetails] = React.useState({
    appId: "",
    subType: 1,
  });

  const [applicationData, setApplicationData] = React.useState({
    isLoading: true,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,
  });

  //const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [editUser, setEditUser] = useState(false);
  const [saveuserDetailsForm, setsaveuserDetailsForm] = React.useState({
    email: location.state.row.email,
    phone: location.state.row.phone,
    username: location.state.row.username,
    userId: location.state.row.userid,
    accountid: location.state.row.accountid,
    createdon: location.state.row.createdon,
    status: location.state.row.status,
    groupid: location.state.row.groupid,
  });
  console.log("Status", saveuserDetailsForm.status);
  //const handleOnClick = useCallback(() => history.push('/Applications/Radius'), [history]);
  const [data, setData] = React.useState([]);
  const [verficationData, setVerificationData] = React.useState({
    isLoading: true,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,
  });

  React.useEffect(() => {
    console.log("userId", location.state.row.userid);
    Server.get(
      `/absolute/getUserKycDetails?userId=${location.state.row.userid}`,
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
        console.log("VerifData", response.data.resultData.length);
        //    setgeoLocationData({ ...geoLocationData,isLoading: false })

        if (
          response.data.resultCode == 0 ||
          response.data.resultMessage == "Success"
        ) {
          setData(response?.data?.resultData ? response?.data?.resultData : []);
        }
      })
      .catch((err) => {
        console.log(err);
        setData([]);

        setVerificationData({
          isLoading: false,
          isSuccess: false,
          isError: true,
          isSnackbarOpen: true,
        });
      });
  }, []);

  const handleSetRandompasswordSubmit = (e) => {
    e.preventDefault();
    console.log(saveuserDetailsForm);

    Server.get(
      `/user/sendRandomPassword?accountId=${accountId}&userId=${location.state.row.userid}&requestTime=${requestTime}`,
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

        Swal.fire(
          "You Successfully Set Your Random Password!",
          "Please Check your mail for Your Random Password",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        setsaveuserDetailsForm({
          email: "",
          phone: "",
          username: "",
        });
      });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    console.log(value);
    if (value === "1") {
      history.push({
        pathname: "/AxiomProtect/Applications/Custom",
      });
    } else if (value == "2") {
      history.push({
        pathname: "/AxiomProtect/Applications/Radius",
      });
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const [dataAdaptive, setDataAdaptive] = React.useState([]);

  React.useEffect(() => {
    console.log(authtoken);

    Server.get(
      `/reports/getAdaptiveReport?accountId=${accountId}&userId=${location.state.row.userid}&requestTime=${requestTime}`,
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
        console.log("Adaptive", response.data.resultData);
        setApplicationData({ ...applicationData, isLoading: false });

        if (
          !(
            response.data.resultCode == -1 ||
            response.data.resultMessage == "Unable to get applications"
          )
        ) {
          setDataAdaptive(
            response?.data?.resultData ? response?.data?.resultData : []
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setDataAdaptive([]);

        setApplicationData({
          isLoading: false,
          isSuccess: false,
          isError: true,
          isSnackbarOpen: true,
        });
      });
  }, []);

  const [dataSonic, setDataSonic] = React.useState([]);

  React.useEffect(() => {
    Server.get(
      `/sonicKYC/getVerificationData?userId=${location.state.row.userid}&requestTime=${requestTime}`,
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
        console.log("VerifData", response.data.resultData);
        //    setgeoLocationData({ ...geoLocationData,isLoading: false })

        if (
          response.data.resultCode == 0 ||
          response.data.resultMessage == "Success"
        ) {
          setDataSonic(
            response?.data?.resultData ? response?.data?.resultData : []
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setDataSonic([]);

        setVerificationData({
          isLoading: false,
          isSuccess: false,
          isError: true,
          isSnackbarOpen: true,
        });
      });
  }, []);

  const handleStatusChange = (e, row) => {
    e.preventDefault();
    let index = rows.findIndex((x) => x.unitid === row.unitid);

    let status = e.target.value == "suspended" ? 1 : 0;
    console.log(row);

    console.log("selcted value", e.target.value, "seleted row", row, rows);
    Server.post(
      `/application/setStatus?accountId=${row.accountid}&appId=${row.appid}&status=${status}&requestTime=${requestTime}`,
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
        console.log(response);
        if (response.data.resultCode === 0) {
          if (e.target.value === "suspended") {
            setRows((rows) => [
              ...rows.slice(0, index),
              Object.assign({}, rows[index], { row, status: 1 }),
              ...rows.slice(index + 1),
            ]);
          } else
            setRows((rows) => [
              ...rows.slice(0, index),
              Object.assign({}, rows[index], { row, status: 0 }),
              ...rows.slice(index + 1),
            ]);
          Swal.fire("Success", response.data.resultMessage, "success");
        } else Swal.fire("", response.data.resultMessage, "error");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetAppId = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row);

    history.push({
      pathname: "/AxiomProtect/AssignUser",
      state: {
        row: row,
      },
    });
  };

  const handleSendToPolicy = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row);

    history.push({
      pathname: "/AxiomProtect/Policy",
      state: {
        row: row,
      },
    });
  };

  function MyNavLink(props) {
    return <NavLink {...props} activeClassName="active" />;
  }

  const handleSendToAllAssignedUser = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row);

    history.push({
      pathname: "/AxiomProtect/GetAllAssignedUser",
      state: {
        row: row,
      },
    });
  };

  const changeColor = (e) => {
    e.target.style.background = "#0D4990";
  };

  const [resultCode, setResultCode] = useState(0);
const [loading, setLoading] = useState(false)
  const handleSubmit = async (e, row) => {
    e.preventDefault();
    console.log(row);
setLoading(true)
setEditUser(false)
    await Server.post(
      `/user/edit?requestTime=${requestTime}`,
      {
        ...saveuserDetailsForm, userid: saveuserDetailsForm?.userId
      },
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
        setLoading(false)
        if (response.data.resultCode === 0) {
          setUserData({
            ...saveuserDetailsForm, userid: saveuserDetailsForm?.userId
          })
          Swal.fire("Success", response.data.resultMessage, "success");
          setIsUserUpdated(prev=>!prev)
        } else Swal.fire("", response.data.resultMessage, "error");
      })
      .catch((err) => {
        Swal.fire("", err?.response?.data?.resultMessage || err?.resultMessage || err, "error");
        setLoading(false)
        console.log(err);
      });
  };

  const handleAssignedAppId = (e, row) => {
    e.preventDefault();
    console.log("seleted appId", row);

    history.push({
      pathname: "/AxiomProtect/AssignedAppDetails",
      state: {
        row: row,
      },
    });
  };
  console.log("Data", appData);
  console.log({ statusType: saveuserDetailsForm.status });
  // console.log("AppDetails",appDetails)
  return (
    // (console.log("AppType",setRowsss.subtype)),
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* <List style={{ overflowY: 'auto', backgroundColor: "rgb(195 215 255)", minHeight:"65vh", width:"17%" }}>
            {rowsss.map((text, index) => (
              <ListItem activeClassName='active'  button key={text} >
                
                <ListItemIcon>
                  <img src={text.applogo} alt="app logo" style={{height:50,width:50,objectFit:"cover",borderRadius:"50%"}}/>
                </ListItemIcon>
                <ListItemText primary={text.appname} onClick={()=>{setAppDetails({appId:text.appid, subType:text.subtype})}}/>
              </ListItem>
            ))}
          </List> */}

      <div style={{ width: "100%" }}>
        <div>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <Typography sx={{ fontFamily: "Jost" }}>
                  User Details
                </Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Typography sx={{ fontFamily: "Jost" }}>
                  Applications
                </Typography>
              }
              {...a11yProps(1)}
            />
            <Tab
              label={<Typography sx={{ fontFamily: "Jost" }}>Token</Typography>}
              {...a11yProps(2)}
            />
            <Tab
              label={
                <Typography sx={{ fontFamily: "Jost" }}>Certificate</Typography>
              }
              {...a11yProps(3)}
            />
            <Tab
              label={
                <Typography sx={{ fontFamily: "Jost" }}>Geolocation</Typography>
              }
              {...a11yProps(4)}
            />
            <Tab
              label={
                <Typography sx={{ fontFamily: "Jost" }}>Device</Typography>
              }
              {...a11yProps(5)}
            />
            {appData?.subtype && appData?.subtype == "1" ? (
              <Tab
                label={
                  <Typography sx={{ fontFamily: "Jost" }}>
                    Absolute Details
                  </Typography>
                }
                {...a11yProps(6)}
              />
            ) : (
              " "
            )}
            {appData?.subtype && appData?.subtype == "2" ? (
              <Tab
                label={
                  <Typography sx={{ fontFamily: "Jost" }}>
                    Sonic Details
                  </Typography>
                }
                {...a11yProps(6)}
              />
            ) : (
              " "
            )}
            {appData?.subtype && appData?.subtype == "3" ? (
              <Tab
                label={
                  <Typography sx={{ fontFamily: "Jost" }}>
                    Adaptive Details
                  </Typography>
                }
                {...a11yProps(6)}
              />
            ) : (
              " "
            )}
            {appData?.subtype &&
              appData?.subtype == "4" &&
              appData?.appType == "1" ? (
              <Tab
                label={
                  <Typography sx={{ fontFamily: "Jost" }}>
                    Neofy Details
                  </Typography>
                }
                {...a11yProps(6)}
              />
            ) : (
              " "
            )}
            {saveuserDetailsForm.status == "3" &&
              appData?.subtype &&
              appData?.subtype == "1" ? (
              <Tab
                label={
                  <Typography sx={{ fontFamily: "Jost" }}>
                    Request Types
                  </Typography>
                }
                {...a11yProps(7)}
              />
            ) : (
              " "
            )}
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <Stack direction="row" justifyContent="flex-start">
            <Button
              size="small"
              color="primary"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              onClick={(e) => setEditUser((prev) => !prev)}
              startIcon={<EditIcon />}
            >
              {" "}
              Edit User
            </Button>
          </Stack>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3} md={2}>
              UserId
            </Grid>

            <Grid item xs={8} md={9}>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="email"
                id="email"
                inputProps={{ readOnly: true }}
                variant="outlined"
                value={saveuserDetailsForm.userId}
                onChange={(e) =>
                  setsaveuserDetailsForm({
                    ...saveuserDetailsForm,
                    userId: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3} md={2} sx={{ color: editUser ? "red" : "#707070" }}>
              {editUser ? "Edit Name" : "Name"}
            </Grid>

            <Grid item xs={8} md={9}>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="username"
                id="username"
                inputProps={{ readOnly: !editUser }}

                variant="outlined"
                defaultValue={saveuserDetailsForm?.username}
                onChange={(e) =>
                  setsaveuserDetailsForm({
                    ...saveuserDetailsForm,
                    username: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3} md={2} sx={{ color: editUser ? "red" : "#707070" }}>
              {editUser ? "Edit Email" : "Email" }
            </Grid>

            <Grid item xs={8} md={9}>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="email"
                id="email"
                inputProps={{ readOnly: !editUser }}
                variant="outlined"
                value={saveuserDetailsForm.email}
                onChange={(e) =>
                  setsaveuserDetailsForm({
                    ...saveuserDetailsForm,
                    email: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3} md={2} sx={{ color: editUser ? "red" : "#707070" }}>
              {editUser ?  "Edit Mobile No." : "Mobile No."}
            </Grid>

            <Grid item xs={8} md={9}>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="phone"
                id="phone"
                inputProps={{ readOnly: editUser }}
                variant="outlined"
                value={saveuserDetailsForm.phone}
                onChange={(e) =>
                  setsaveuserDetailsForm({
                    ...saveuserDetailsForm,
                    phone: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3} md={2}>
              Group
            </Grid>

            <Grid item xs={8} md={9}>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="phone"
                id="phone"
                inputProps={{ readOnly: true }}
                variant="outlined"
                value={saveuserDetailsForm.groupid}
                onChange={(e) =>
                  setsaveuserDetailsForm({
                    ...saveuserDetailsForm,
                    groupid: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3} md={2}>
              Status
            </Grid>

            <Grid item xs={8} md={9}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                fullWidth
                size="small"
                //value={saveuserDetailsForm.status == 1 ? "active" :"suspended"}
                value={
                  saveuserDetailsForm.status == 1
                    ? "active"
                    : saveuserDetailsForm.status == 0
                      ? "suspended"
                      : saveuserDetailsForm.status == 3
                        ? "enrolled"
                        : saveuserDetailsForm.status == -1
                          ? "locked"
                          : saveuserDetailsForm.status == -99
                            ? "trash"
                            : ""
                }
                disabled
              >
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"suspended"}>Suspended</MenuItem>
                <MenuItem value={"enrolled"}>Enrolled</MenuItem>
                <MenuItem value={"locked"}>Locked</MenuItem>
                <MenuItem value={"trash"}>Trash</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3} md={2}>
              Created On
            </Grid>

            <Grid item xs={8} md={9}>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="createdon"
                id="createdon"
                inputProps={{ readOnly: true }}
                variant="outlined"
                value={saveuserDetailsForm.createdon}
                onChange={(e) =>
                  setsaveuserDetailsForm({
                    ...saveuserDetailsForm,
                    createdon: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3} md={2}>
              Password
            </Grid>

            <Grid item xs={8} md={4}>
              <Button
              variant="outlined"
              size="small"
                type="text"
                style={{ fontSize: "11px", textTransform:"capitalize" }}
                onClick={(e) => handleSetRandompasswordSubmit(e)}
              >
                Set random password
              </Button>
            </Grid>
          </Grid>
          <br/>
          <center>
          {editUser &&  <Button disabled={loading} variant="contained" color="primary" onClick={(e) => handleSubmit(e)}>
                              Save Changes
              </Button>}
          </center>
          <br />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Applications />
        </TabPanel>
        {appData?.subtype == "2" ? (
          <TabPanel value={value} index={2}>
            <h3 style={{ textAlign: "center" }}>
              For {appData?.appname}: No need to assign token
            </h3>
          </TabPanel>
        ) : appData?.subtype == "4" && appData.apptype == "1" ? (
          <TabPanel value={value} index={2}>
            <h3 style={{ textAlign: "center" }}>
              For {appData?.appname}: No need to assign token
            </h3>
          </TabPanel>
        ) : (
          <TabPanel value={value} index={2}>
            <AssignToken appId={appData?.appid} subType={appData?.subtype} />
          </TabPanel>
        )}
        <TabPanel value={value} index={3}>
          <Certficate appId={appData?.appid} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Geolocation appId={appData?.appid} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Device appId={appData?.appid} />
        </TabPanel>
        {appData?.subtype == "1" ? (
          <TabPanel value={value} index={6}>
            <AllUserDetails appId={appData?.appid} />
          </TabPanel>
        ) : appData?.subtype == "2" ? (
          <TabPanel value={value} index={6}>
            <SonicDetails appId={appData?.appid} />
          </TabPanel>
        ) : appData?.subtype == "3" ? (
          <TabPanel value={value} index={6}>
            <AdaptiveDetails appId={appData?.appid} />
          </TabPanel>
        ) : appData?.subtype == "4" ? (
          <TabPanel value={value} index={6}>
            <NeofyDetails appId={appData?.appid} />
          </TabPanel>
        ) : (
          ""
        )}
        {appData?.subtype == "1" ? (
          <TabPanel value={value} index={7}>
            <Requests appId={appData?.appid} />
          </TabPanel>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ViewUserDetail;
