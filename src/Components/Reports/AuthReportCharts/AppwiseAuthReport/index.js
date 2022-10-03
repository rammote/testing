import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import Server from '../../../APIUrl'
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Loader from '../../../Loader'
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AppwiseAuthReport() {
  const [selectApp, setSelectApp] = useState(null);
  const [authMethodData, setAuthMethodData] = useState(null);
  const [authAccessData, setAuthAccessData] = useState(null);
  const [authReportData, setAuthReportData] = useState({});
  const accountId = sessionStorage.getItem("accountId");
  const authtoken = sessionStorage.getItem("jwtToken");
  const [loading, setLoading] = useState(false)
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");

  const handleSelectApp = (event) => {
    setSelectApp(event.target.value);
  };

  useEffect(() => {

    async function authReport() {
      setLoading(true);
      await Server.get(
        `/reports/getAuthenticationReport?accountId=${accountId}&requestTime=${requestTime}`,
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
          setAuthReportData(response?.data?.resultData);
          setSelectApp(Object.keys(response?.data?.resultData)[0])
          console.log({authReportData})
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
// setAuthReportData(data?.resultData)

    return authReport()
  },[]);
  console.log({selectApp})
  useEffect(() => {
    setAuthMethodData(authReportData && authReportData[selectApp]?.authMethod);
    setAuthAccessData(authReportData && authReportData[selectApp]?.authAccess);
  }, [selectApp]);
console.log({authReportData})

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };
  return (
    <div style={{width:"100%", margin:"0 auto"}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%", 
              margin: "0 auto",
            }}
          >
            <h4>Authentication Reports</h4>
            <Grid item xs={8} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>
                {authReportData[selectApp]?.appName ?? "Select Application"}
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  label={"Select Application"}
                  value={selectApp}
                  onChange={handleSelectApp}
                >
                  {authReportData &&
                    Object.keys(authReportData)?.map((key) => (
                      <MenuItem value={key}>
                        {authReportData[key]?.appName}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Typography>
        </Grid>
      </Grid>
     {
       loading ? <Loader /> :
       (
         <>
         
         {selectApp !== null ? (
        <h3
          style={{
            textAlign: "center",
            width: "100%",
            color: "#0D4990",
            margin:"0 auto",
            padding:'0 auto'
          }}
        >
          {authReportData[selectApp]?.appName}'s Authentication Report
        </h3>
      ) : (
        ""
      )}
      
      {
        authReportData !== {} || authReportData !== null ? (
          <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            margin: "0 auto",
            marginTop:"-1rem",
            flex:1
        }}
      >
            <div>
              { 
               authMethodData && <Doughnut width={450} height={450} options={options} data={authMethodData} />
              }
            </div>
            <div>
              {
                authAccessData &&  <Pie width={430} height={430} options={options} data={authAccessData} />}
            </div>
      </div>
        ): <h3>No Data Found</h3>
      }
         
         </>
       )
     }
    </div>
  );
}
