import React, { useEffect, useState } from "react";
import GuardedRoute from "../../Helper/GuardedRoutes";
import { Redirect, Route } from "react-router-dom";
import RedirectToSubdomain from "../Redirect";
import LandingPage from "../LandingPage";
const SubDomain = () => {
  const isLoggedIn = sessionStorage.getItem("jwtToken") ? true : false;

  return (
    <div>
      <GuardedRoute auth={isLoggedIn} path="/AxiomProtect/LandingPage">
        <Redirect to="/AxiomProtect/DashBoard" />
      </GuardedRoute>
      <GuardedRoute
        auth={isLoggedIn}
        path="/AxiomProtect/DashBoard"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn}
        exact
        path="/AxiomProtect/RBAManagement"
        component={LandingPage}
      />
              
      <GuardedRoute
        auth={isLoggedIn}
        exact
        path="/AxiomProtect/RBASettings"
        component={LandingPage}
      />
  
      <GuardedRoute
        auth={isLoggedIn}
        exact
        path="/AxiomProtect/Policy"
        component={LandingPage}
      />
        <GuardedRoute
        auth={isLoggedIn}
        exact
        path="/AxiomProtect/uploadBatch"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn}
        exact
        path="/AxiomProtect/uploadBulkUsers"
        component={LandingPage}
      />
         <GuardedRoute
        auth={isLoggedIn}
        exact
        path="/AxiomProtect/hardware-token-upload"
        component={LandingPage}
      />
      
      <GuardedRoute
        auth={isLoggedIn}
        exact
        path="/AxiomProtect/RBAReports"
        component={LandingPage}
      />
      
      <GuardedRoute
        auth={isLoggedIn}
        exact
        path="/AxiomProtect/AdminAudit/:operatorid"
        component={LandingPage}
      />
          <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/AccessControl"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Applications"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Users"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Groups"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Endpoints"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Administrator"
        component={LandingPage}
      />
       <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Administrator/AddTeamMember"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/TrustMonitor"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Reports"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Settings"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Gateway"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Billing"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Applications/Radius"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Users/AddUser"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/AddGroup"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/GroupDetails"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Applications/Custom"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Teams"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/AssignUser"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/CreateTeamUnit"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/EditTeamUnit"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/AssignUserToTeam"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/getallassigneduserforteam"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/RadiusServerConfig"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/OperatorSourceConfig"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/OTPToken"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/RadiusSettings"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/GetAllAssignedUser"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/GetAllAssignedUsersForGroup"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/AddUserForGroup"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/UserDetails"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Editpolicy"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/assignpolicy"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/ViewPolicy"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/EditCustomApp"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/EditRadiusApp"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/PushSetting"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/SAML_part_first"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/SAML_part_second"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/SAML_part_third"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/SAML_part_fourth"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/OperatorAudit"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Audit"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/ProfileDetails"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/ApplicationAudit"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/AdminDetails"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/UserReports"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/ApplicationReports"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/AdministratorReports"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/AuthenticationReports"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/PolicyReports"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/DeviceReports"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/SonicKYCReports"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/PushReports"
        component={LandingPage}
      />
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/AssignedAppDetails"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/OTPTokenReports"
        component={LandingPage}
      />
  

      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/UserManagement"
        component={LandingPage}
      />
      {/* <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/RBAManagement"
        component={LandingPage}
      /> */}
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/OperatorTable"
        component={LandingPage}
      />
        <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Applications/SSO"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Applications/InitialOpenIdApp"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Applications/OpenIdApp"
        component={LandingPage}
      />


      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Applications/OpenIdApp/:clientId"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Applications/InitialSAMLApp"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Applications/SAMLApp"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Applications/ViewSAMLApp"
        component={LandingPage}
      />

      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Applications/EditSAMLApp/:idpId"
        component={LandingPage}
      />

<GuardedRoute
        exact
        
        path="/openid-login"
        component={LandingPage}
      />
      
      <GuardedRoute
        auth={isLoggedIn} 
        exact
        
        path="/AxiomProtect/Applications/GenerateCertificate"
        component={LandingPage}
      />

      <Route exact auth={isLoggedIn} path="/">
        <Redirect to="/AxiomProtect/DashBoard" />
      </Route>
         
          <Route
        exact
        path="/redirect/:accessToken"
        component={RedirectToSubdomain}
      />
    
      {/* if not login will redirect to login */}
      <Route
        path="/login"
        component={() => {
          // window.location.href ="http://localhost:3000/login";
          window.location.href =
            "https://access.axiomprotect.com:6651/AxiomProtect/";
          return null;
        }}
      />
    </div>
  );
};
export default SubDomain;
