import React, { useState } from "react";
import Server from "./APIUrl";
import styled from "styled-components";
import {
  Redirect,
  Switch,
  Route,
  BrowserRouter,
  useHistory,
  useLocation,
  NavLink,
} from "react-router-dom";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import moment from "moment";

import DashBoardPage from "./Dashboard/DashBoardPage";
import "./LandingPage.css";
import { Grid, MenuItem } from "@mui/material";
import DeviceInsights from "./Device_Insights/DeviceInsights";
import Policy from "./Policy/Policy";
import Administrator from "./Administrator/Administrator";
// import {Applications, Radius} from './Applications/Applications';
import Applications from "./Applications/Applications";
import Billing from "./Billing/Billing";
import Endpoints from "./Endpoints/Endpoints";
import Gateway from "./Gateway/Gateway";
import Groups from "./Groups/Groups";
import Reports from "./Reports/Reports";
import Settings from "./Settings/Settings";
import Radius from "./Applications/Radius/Radius";
import TrustMonitor from "./TrustMonitor/TrustMonitor";
import Users from "./Users/Users";
import AddUser from "./Users/AddUser/AddUser";
import AddGroup from "./Groups/AddGroup";
import GroupDetails from "./Groups/GroupDetails";
import Custom from "./Applications/Custom/custom";
import AddTeamList from "./Teams/AddTeamList";
import AssignUser from "./Applications/AssignUser";
import CreateTeamUnit from "./Teams/CreateTeamUnit";
import EditTeamUnit from "./Teams/EditTeamUnit";
import AssignUserToTeam from "./Teams/AssignUserToTeam";
import GetAllAssignedUserForTeam from "./Teams/GetAllAssignedUserForTeam";
import RadiusServerConfig from "./Settings/RadiusServerConfig";
import Operatorsource from "./Settings/Operatorsource";
import Otptoken from "./Settings/Otptoken";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import RadiusSettings from "./Applications/Radius/RadiusSettings";
import GetAllAssignedUser from "./Applications/GetAllAssignedUser";
import AddTeamMember from "./Administrator/AddTeamMember";
import GetAllAssignedUserForGroup from "./Groups/GetAllAssignedUsersForGroup";
import AddUserForGroup from "./Groups/AddUserForGroup";
import UserDetails from "./Users/UserDetails";
import Editpolicy from "./Policy/Editpolicy";
import Assignpolicy from "./Applications/assignpolicy";
import ViewPolicy from "./Policy/ViewPolicy";
import EditCustomApp from "./Applications/EditCustomApp";
import EditRadiusApp from "./Applications/EditRadiusApp";
import OperatorAudit from "./Administrator/Audit";
import UserManagement from "./Dashboard/UserManagement";
import PushSetting from "./Settings/PushSetting";
import TokenizationClient from "./Settings/Tokenization/TokenizationClient";
import TokenizationMerchants from "./Settings/Tokenization/TokenizationMerchants";
import TokenizationSetting from "./Settings/Tokenization/TokenizationSetting";

import SAML_part_first from "./Applications/SAML/SAML_part_first";
import SAML_part_second from "./Applications/SAML/SAML_part_second";
import SAML_part_third from "./Applications/SAML/SAML_part_third";
import SAML_part_fourth from "./Applications/SAML/SAML_part_fourth";
import Menu from "@mui/material/Menu";
import Audit from "./Users/Audit";
import ProfileDetails from "./ProfileDetails";
import ApplicationAudit from "./Applications/ApplicationAudit";
import AdminDetails from "./Administrator/AdminDetails";
import UserReports from "./Reports/UserReports";
import ApplicationReports from "./Reports/ApplicationReports";
import AdministratorReports from "./Reports/AdministratorReports";
import AuthenticationReports from "./Reports/AuthenticationReports";
import TokenizationReport from "./Reports/TokenizationReport";
import PolicyReports from "./Reports/PolicyReports";
import DeviceReports from "./Reports/DeviceReports";
import SonicKYCReports from "./Reports/SonicKYCReports";
import PushReports from "./Reports/PushReports";
import RBAReports from "./Reports/RBAReports";
import TransactionMonitorReport from "./Reports/TransactionMonitorReport";
import MerchantTransactionReport from "./Reports/MerchantTransactionReport";
import GenerateReports from "./Reports/GenerateReports";
import AssignedAppDetails from "./Users/AssignedAppDetails";
import AdminAuditReport from "./Audits/Admin/AdminAuditReport";
import OperatorTable from "./Dashboard/OperatorsTable";
import AccessControl from "./Settings/AccessControl";
import RBAManagement from "./Applications/RBAManagement/RBA";
import RBASettings from "./Settings/RBASettings/RBASettings"
import HardwareTokenUpload from './HardwareToken';
import UploadBatch from "./UploadBatch";
import UploadBulkUsers from "./UploadBulkUsers"

import SSO from "./Applications/SSO/SSO";
import OpenIdApp from "./Applications/SSO/OpenIdApp";
import SAMLApp from "./Applications/SSO/SAMLApp";
import ViewSAMLApp from "./Applications/SSO/ViewSAMLApp";
import GenerateCertificate from "./Applications/SSO/GenerateCertificate";
import InitialOpenIdApp from "./Applications/SSO/InitialOpenIdApp";
import InitialSAMLApp from "./Applications/SSO/InitialSAMLApp";
import EditSAMLApp from "./Applications/SSO/EditSAMLApp";
import EditOpenIdApp from "./Applications/SSO/EditOpenIdApp";

const drawerWidth = 200;

const SidebarNav = styled.nav`
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#0D4990',
    color: '#FFFFFF',
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    transition: 350ms;
    z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function LandingPage(props) {
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");

  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(sidebar);

  const history = useHistory();
  const location = useLocation();
  //const { name, emailid , userId, jwtToken} = (props.location && props.location.state) || { };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const name = sessionStorage.getItem("name");
  const emailid = sessionStorage.getItem("emailId");
  const userId = sessionStorage.getItem("userId");
  //const { name, emailid , userId, jwtToken} = (props.location && props.location.state) || { };
  const [rows, setRows] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [userData, setUserData] = React.useState({
    isLoading: true,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,
  });

  React.useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) {
      window.location.href = "/";
    }
    // console.log(authtoken)
    setUserData({ ...userData, isLoading: true });
    Server.get(`/account/getTimeStamp?requestTime=${requestTime}`, {
      headers: {
        "content-type": "application/json",
        authToken: authtoken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    })
      .then((response) => {
        setData(response.data.resultData);

        setUserData({ ...userData, isLoading: false });

        if (
          !(
            response.data.resultCode == -1 ||
            response.data.resultMessage == "Unable to get user"
          )
        ) {
          setRows(response.data.resultData);
        }
      })
      .catch((err) => {
        console.log(err);
        setRows([]);

        setUserData({
          isLoading: false,
          isSuccess: false,
          isError: true,
          isSnackbarOpen: true,
        });
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Box sx={{ display: "flex", index: 1 }} className="landingpage_div1">
          <CssBaseline />
          <AppBar
            //position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
              backgroundColor: "#F4F6FA",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "95%",
                justifyContent: "space-between",
                margin: "0 auto",
              }}
            >
              <div style={{ width: "100%" }}></div>
              <div
                style={{
                  zIndex: 1,
                  width: "45%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#0D4990",
                  margin: "0 auto",
                }}
              >
                <h4>{emailid}</h4>

                <h4> {name}</h4>

                <div
                  style={{ color: "#0D4990", cursor: "pointer" }}
                  onClick={handleClick}
                >
                  <h4>
                    <SettingsIcon />
                  </h4>
                </div>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  sx={{ position: "fixed" }}
                >
                  <MenuItem
                    onClick={(e) => {
                      window.location.href = `/AxiomProtect/ProfileDetails`;
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      sessionStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    Sign Out
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </AppBar>

          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "#0D4990",
                color: "#FFFFFF",
              },
              "body::-webkit-scrollbar": {
                width: "1em"
              },
              "body::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
              },
              "body::-webkit-scrollbar-thumb": {
                backgroundColor: "rgb(110, 110, 160)",
                borderRadius: "10px"
              },
              index: 1,
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar>
              {/* <img style={{height: "20px", width: "20px"}} src="./axiom_protect_logo.png" />
                        &nbsp; */}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontFamily: "Jost" }}
              >
                <h5>Axiom Protect 2.0</h5>
              </Typography>
            </Toolbar>
            <div>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </div>
          </Drawer>
          <main style={{ marginBottom: "1.5rem" }}>
            <Switch>
              {/* <NavLink exact to="/DashBoard"><DashBoardPage /></NavLink>
                    <NavLink exact to="/Policy" activeClassName="active"><Policy /></NavLink> */}
              <Route
                exact
                path="/AxiomProtect/LandingPage"
                render={() => {
                  return <Redirect to="/AxiomProtect/DashBoard" />;
                }}
              />
              <Route
                exact
                path="/AxiomProtect/LandingPage"
                component={DashBoardPage}
              />
              <Route
                exact
                path="/AxiomProtect/DashBoard"
                component={DashBoardPage}
              />
              <Route
                exact
                path="/AxiomProtect/DeviceInsights"
                component={DeviceInsights}
              />
              <Route exact path="/AxiomProtect/Policy" component={Policy} />
              <Route
                exact
                path="/AxiomProtect/Applications"
                component={Applications}
              />
              <Route exact path="/AxiomProtect/Users" component={Users} />
              <Route exact path="/AxiomProtect/Groups" component={Groups} />
              <Route exact path="/AxiomProtect/hardware-token-upload" component={HardwareTokenUpload} />
              <Route exact path="/AxiomProtect/uploadBatch" component={UploadBatch} />
              <Route exact path="/AxiomProtect/uploadBulkUsers" component={UploadBulkUsers} />

              <Route
                exact
                path="/AxiomProtect/Endpoints"
                component={Endpoints}
              />
              <Route
                exact
                path="/AxiomProtect/Administrator"
                component={Administrator}
              />
              <Route
                exact
                path="/AxiomProtect/TrustMonitor"
                component={TrustMonitor}
              />
              <Route exact path="/AxiomProtect/Reports" component={Reports} />
              <Route exact path="/AxiomProtect/Settings" component={Settings} />
              <Route exact path="/AxiomProtect/Gateway" component={Gateway} />
              <Route exact path="/AxiomProtect/Billing" component={Billing} />
              <Route
                exact
                path="/AxiomProtect/Applications/Radius"
                component={Radius}
              />
              <Route
                exact
                path="/AxiomProtect/Users/AddUser"
                component={AddUser}
              />
              <Route exact path="/AxiomProtect/AddGroup" component={AddGroup} />
              <Route
                exact
                path="/AxiomProtect/GroupDetails"
                component={GroupDetails}
              />
              <Route
                exact
                path="/AxiomProtect/Applications/Custom"
                component={Custom}
              />
              <Route exact path="/AxiomProtect/Teams" component={AddTeamList} />
              <Route
                exact
                path="/AxiomProtect/AssignUser"
                component={AssignUser}
              />
              <Route
                exact
                path="/AxiomProtect/CreateTeamUnit"
                component={CreateTeamUnit}
              />
              <Route
                exact
                path="/AxiomProtect/EditTeamUnit"
                component={EditTeamUnit}
              />
              <Route
                exact
                path="/AxiomProtect/AssignUserToTeam"
                component={AssignUserToTeam}
              />
              <Route
                exact
                path="/AxiomProtect/getallassigneduserforteam"
                component={GetAllAssignedUserForTeam}
              />
              <Route
                exact
                path="/AxiomProtect/RadiusServerConfig"
                component={RadiusServerConfig}
              />
              <Route
                exact
                path="/AxiomProtect/OperatorSourceConfig"
                component={Operatorsource}
              />
              <Route exact path="/AxiomProtect/OTPToken" component={Otptoken} />
              <Route
                exact
                path="/AxiomProtect/RadiusSettings"
                component={RadiusSettings}
              />
              <Route
                exact
                path="/AxiomProtect/GetAllAssignedUser"
                component={GetAllAssignedUser}
              />
              <Route
                exact
                path="/AxiomProtect/Administrator/AddTeamMember"
                component={AddTeamMember}
              />
              <Route
                exact
                path="/AxiomProtect/GetAllAssignedUsersForGroup"
                component={GetAllAssignedUserForGroup}
              />
              <Route
                exact
                path="/AxiomProtect/AddUserForGroup"
                component={AddUserForGroup}
              />
              <Route
                exact
                path="/AxiomProtect/UserDetails"
                component={UserDetails}
              />
              <Route
                exact
                path="/AxiomProtect/Editpolicy"
                component={Editpolicy}
              />
              <Route
                exact
                path="/AxiomProtect/assignpolicy"
                component={Assignpolicy}
              />
              <Route
                exact
                path="/AxiomProtect/ViewPolicy"
                component={ViewPolicy}
              />
              <Route
                exact
                path="/AxiomProtect/EditCustomApp"
                component={EditCustomApp}
              />
              <Route
                exact
                path="/AxiomProtect/EditRadiusApp"
                component={EditRadiusApp}
              />
              <Route
                exact
                path="/AxiomProtect/PushSetting"
                component={PushSetting}
              />

              <Route
                exact
                path="/AxiomProtect/TokenizationClient"
                component={TokenizationClient}
              />

              <Route
                exact
                path="/AxiomProtect/TokenizationMerchants"
                component={TokenizationMerchants}
              />

              <Route
                exact
                path="/AxiomProtect/TokenizationSetting"
                component={TokenizationSetting}
              />

              <Route
                exact
                path="/AxiomProtect/SAML_part_first"
                component={SAML_part_first}
              />
              <Route
                exact
                path="/AxiomProtect/SAML_part_second"
                component={SAML_part_second}
              />
              <Route
                exact
                path="/AxiomProtect/SAML_part_third"
                component={SAML_part_third}
              />
              <Route
                exact
                path="/AxiomProtect/SAML_part_fourth"
                component={SAML_part_fourth}
              />
              <Route
                exact
                path="/AxiomProtect/OperatorAudit"
                component={OperatorAudit}
              />
              <Route exact path="/AxiomProtect/Audit" component={Audit} />
              <Route
                exact
                path="/AxiomProtect/ProfileDetails"
                component={ProfileDetails}
              />
              <Route
                exact
                path="/AxiomProtect/ApplicationAudit"
                component={ApplicationAudit}
              />
              <Route
                exact
                path="/AxiomProtect/AccessControl"
                component={AccessControl}
              />
              <Route
                exact
                path="/AxiomProtect/AdminDetails"
                component={AdminDetails}
              />
              <Route
                exact
                path="/AxiomProtect/UserReports"
                component={UserReports}
              />
              <Route
                exact
                path="/AxiomProtect/ApplicationReports"
                component={ApplicationReports}
              />
              <Route
                exact
                path="/AxiomProtect/AdministratorReports"
                component={AdministratorReports}
              />

              <Route
                exact
                path="/AxiomProtect/AuthenticationReports"
                component={AuthenticationReports}
              />

              <Route
                exact
                path="/AxiomProtect/TokenizationReport"
                component={TokenizationReport}
              />
              <Route
                exact
                path="/AxiomProtect/PolicyReports"
                component={PolicyReports}
              />
              <Route
                exact
                path="/AxiomProtect/DeviceReports"
                component={DeviceReports}
              />
              <Route
                exact
                path="/AxiomProtect/SonicKYCReports"
                component={SonicKYCReports}
              />
              <Route
                exact
                path="/AxiomProtect/PushReports"
                component={PushReports}
              />

              <Route
                exact
                path="/AxiomProtect/RBAReports"
                component={RBAReports}
              />

              <Route
                exact
                path="/AxiomProtect/TransactionMonitorReport"
                component={TransactionMonitorReport}
              />

              <Route
                exact
                path="/AxiomProtect/MerchantTransactionReport"
                component={MerchantTransactionReport}
              />

              <Route
                exact
                path="/AxiomProtect/OTPTokenReports"
                component={GenerateReports}
              />

              <Route
                exact
                path="/AxiomProtect/AssignedAppDetails"
                component={AssignedAppDetails}
              />
              <Route
                exact
                path="/AxiomProtect/AdminAudit/:operatorId"
                component={AdminAuditReport}
              />

              <Route
                exact
                path="/AxiomProtect/UserManagement"
                component={UserManagement}
              />
              <Route
                exact
                path="/AxiomProtect/OperatorTable"
                component={OperatorTable}
              />
              <Route
                exact
                path="/AxiomProtect/RBAManagement"
                component={RBAManagement}
              />
              <Route
                exact
                path="/AxiomProtect/RBASettings"
                component={RBASettings}
              />

              <Route
                exact
                path="/AxiomProtect/Applications/SSO"
                component={SSO}
              />

              <Route
                exact
                path="/AxiomProtect/Applications/InitialOpenIdApp"
                component={InitialOpenIdApp}
              />

              <Route
                exact
                path="/AxiomProtect/Applications/OpenIdApp"
                component={OpenIdApp}
              />


              <Route
                exact
                path="/AxiomProtect/Applications/OpenIdApp/:clientId"
                component={EditOpenIdApp}
              />

              <Route
                exact
                path="/AxiomProtect/Applications/InitialSAMLApp"
                component={InitialSAMLApp}
              />

              <Route
                exact
                path="/AxiomProtect/Applications/SAMLApp"
                component={SAMLApp}
              />

              <Route
                exact
                path="/AxiomProtect/Applications/ViewSAMLApp"
                component={ViewSAMLApp}
              />

              <Route
                exact
                path="/AxiomProtect/Applications/EditSAMLApp/:idpId"
                component={EditSAMLApp}
              />

              <Route
                exact
                path="/AxiomProtect/Applications/GenerateCertificate"
                component={GenerateCertificate}
              />

            </Switch>
          </main>
        </Box>
      </BrowserRouter>

      <div style={{ marginTop: "2rem" }}>
        <footer
          style={{
            position: "fixed",
            bottom: 0,

            backgroundColor: "#F4F6FA",
            width: `calc(100vw - 200px)`,
            left: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "10px -1px 5px -53px rgb(0 0 0 / 75%)",
          }}
        >
          {/* <Container maxWidth="md">
                        <Toolbar>
                        <Typography variant="body1" color="inherit">
                        <center> © 2019 Gistia</center>
                        </Typography>
                        </Toolbar>
                    </Container> */}
          <Grid container>
            <Grid item xs={6} md={12}>
              <Typography
                variant="span"
                color="inherit"
                sx={{ fontFamily: "Jost", color: "#232E3C", fontSize: "11px" }}
              >
                <center>
                  Axiom Protect 2.0 (
                  <a href="https://www.axiomprotect.com/">
                    www.axiomprotect.com
                  </a>
                  )
                </center>
                <center>
                  Version V3.0.1 (C) Blue Bricks (
                  <a href="https://www.blue-bricks.com/">www.blue-bricks.com</a>
                  )
                </center>
                {/* <center>{moment(data).format('D-M-YYYY, h:mm:ss')}</center> */}
                <center>{data}</center>
              </Typography>
            </Grid>
          </Grid>
        </footer>
      </div>
    </>
  );
}
