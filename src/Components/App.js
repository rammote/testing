import React from 'react';
import { BrowserRouter as Router, Switch, } from 'react-router-dom';
import Home from './Home';
import SubDomain from './SubDomain/index';
import './App.css'
export default function App() {
  const getSubDomain = () => {
    const host = window.location.host;
    const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
    if (!arr.length) return false;
    const subdomain = arr[0];
    const excludeDomains = ["www", "home", "dev", "api", "test", "info", "docs", "documentation", "access", "demo"];
    if (excludeDomains.includes(subdomain) || subdomain?.length < 6 || arr[0]?.includes("oidc_") || arr[0]?.includes("_saml")  ){
      return { subdomain, redirect: false };
    } else {
      return { subdomain, redirect: true };
    }
  };
  // const isLogin = sessionStorage.getItem("jwtToken") ? true : false;
  // console.log({isLogin})
  return (
    <>
      <Router>
        <Switch>
          {getSubDomain()?.redirect === true ? (
            <SubDomain />
          ) : (
            <Home />
          )}

        </Switch>
      </Router>
    </>
  )}
