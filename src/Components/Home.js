import React from "react";
import { Redirect, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Login/Register";
import {
  REGISTER,
  SET_BACKUP,
  SET_PASSWORD,
  CONFIRM_IDENTITY,
  QR_CODE_ENABLE,
  ENTER_OTP,
  EMAIL_ME,
  FORGOT_PASSWORD,
  SET_OPERATOR_PASSWORD,
  USERLOGIN,
  OIDCLOGIN,
} from "./Routes";
import Setbackup from "./Login/Setbackup";
import Setpassword from "./Login/Setpassword";
import AccountActivation from "./Login/AccountActivation";
import SetOperatorPassword from "./Login/SetOperatorPassword";
import QRcodeenable from "./Login/QRcodeenable";
import Enterotp from "./Login/Enterotp";
import EmailMe from "./Login/EmailMe";
import ForgotPassword from "./Login/ForgotPassword";
import Confirmidentity from "./Login/Confirmidentity";
import UserLogin from './Login/UserLogin';
import EmailSend from "./Login/EmailSend";
import UserLoginOIDC from './Login/UserLoginOIDC';
import TearmsConditions from './TearmsConditions';
export default function Home() {

  return (
    <>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path={USERLOGIN} >
        <UserLogin />
      </Route>
      <Route exact path={OIDCLOGIN} component={UserLoginOIDC} />
      <Route exact path={REGISTER} >
        <Register />
      </Route>
      <Route exact path={SET_BACKUP} >
        <Setbackup />
      </Route>
      <Route exact path={ENTER_OTP}  >
        <Enterotp />
      </Route>
      <Route exact path={EMAIL_ME}  >
        <EmailMe />
      </Route>
      <Route exact path={"/login"} >
        <Login />
      </Route>
      <Route exact path={QR_CODE_ENABLE}  >
        <QRcodeenable />
      </Route>
      <Route exact path={CONFIRM_IDENTITY}  >
        <Confirmidentity />
      </Route>

      <Route exact path={"/AxiomProtect/emailSendSuccess"}  >
        <EmailSend />
      </Route>
      <Route exact path={"/AxiomProtect/tearmsAndConditions"}  >
        <TearmsConditions />
      </Route>
      <Route exact path={FORGOT_PASSWORD}  >
        <ForgotPassword />
      </Route>
      <Route exact path="/AxiomProtect/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>

      <Route exact path={SET_PASSWORD} >
        <AccountActivation />
      </Route>

      <Route exact path={SET_OPERATOR_PASSWORD} >
        <SetOperatorPassword />
      </Route>
      {/* <Route path="/AxiomProtect/DashBoard">
        <Redirect to="/login" />
      </Route> */}
    </>
  );
}
