import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import moment from "moment";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import Server from "../../APIUrl";
import Loader from '../../Loader'
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function DateWiseAuthReport() {
  const accountId = sessionStorage.getItem("accountId");
  const authtoken = sessionStorage.getItem("jwtToken");
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const [authReportData, setAuthReportData] = useState([]);
  const [tokenDataReport, setTokenDataReport] = useState('');
  const [accessDataReport, setAccessDataReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectApp, setSelectApp] = useState(null);
  const [labels, setLabels] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await Server.get(
        `/reports/getHourlyBaseAuthenticationReport?accountId=${accountId}&requestTime=${requestTime}`,
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
          // console.log(response.data);
          if (response.data.resultCode === 0) {
            setAuthReportData(response?.data?.resultData?.dataSet);
            // console.log({dates: response?.data?.resultData?.dates});
            setLabels(response?.data?.resultData?.dates && response?.data?.resultData?.dates.map(date =>
              moment(date).startOf('hour').fromNow()
            ));
            console.log({ labels });
            setSelectApp(Object.keys(response?.data?.resultData?.dataSet)[0]);
          } else {
            Swal.fire({
              title: 'warning',
              text: response.data.resultMessage,
              icon: 'warning',
            })
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    setLoading(false);
    return fetchData();
  }, []);
  // console.log({authReportData})
  useEffect(() => {
    async function sortData() {
      let appDataByAppId = await authReportData && authReportData[selectApp];
      const TOEKN_LIST = [
        "Software Token",
        "Hardware Token",
        "OOB Token",
        "Push Token",
      ];
      const ACCESS_LIST = ["Access Grant", "Denied Access"];
      let tokenDataSet = {
        labels,
        datasets: [
          {
            label: TOEKN_LIST[0],
            data: appDataByAppId?.data[0],
            borderColor: "#0096c7",
            backgroundColor: "#0096c7",
          },
          {
            label: TOEKN_LIST[1],
            data: appDataByAppId?.data[1],
            borderColor: "#fca311",
            backgroundColor: "#fca311",
          },
          {
            label: TOEKN_LIST[2],
            data: appDataByAppId?.data[2],
            borderColor: "#ef476f",
            backgroundColor: "#ef476f",
          },
          {
            label: TOEKN_LIST[3],
            data: appDataByAppId?.data[3],
            borderColor: "#003049",
            backgroundColor: "#003049",
          },
        ],
      };
      let accessDataSet = {
        labels,
        datasets: [
          {
            label: ACCESS_LIST[0],
            data: appDataByAppId?.data[4],
            borderColor: "#0096c7",
            backgroundColor: "#0096c7",
          },
          {
            label: ACCESS_LIST[1],
            data: appDataByAppId?.data[5],
            borderColor: "#fca311",
            backgroundColor: "#fca311",
          },
        ]
      }
      setTokenDataReport(tokenDataSet);
      setAccessDataReport(accessDataSet);
    }
    return sortData();
  }, [authReportData, selectApp, labels]);


  const handleSelectApp = (event) => {
    setSelectApp(event.target.value);
  };


  const options = {
    responsive: true,
    elements: {
      line: {
        tension: 0.3
      }
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Authentication report by date",
        font: {
          size: 16
        }
      },

    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Hours'
        }
      },
      y: {
        ticks: {
          precision: 0
        },
        display: true,
        title: {
          display: true,
          text: 'Authentication Counts'
        },
        min: 0,
      }
    },
  };

  return (
    <div style={{ marginBottom: "1rem", width: "100%", margin: "0 auto" }}>
      <Typography
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          margin: "0 auto",
        }}
        sx={{ fontFamily: 'Jost', fontSize: '20px', color: '#000000' }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h4>Last 24 Hours Authentication Report</h4>
          <FormControl size="small">
            <InputLabel>
              {authReportData[selectApp]?.appName ?? "Application Not Found"}
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
        </div>
      </Typography>
      <div>
        <div>
          {
            loading ? <Loader /> :
              (
                <>
                  {
                    tokenDataReport
                    &&
                    <Line
                      width={300}
                      height={100}
                      options={options}
                      data={tokenDataReport}
                    />
                  }
                  <br />
                  {
                    accessDataReport
                    &&
                    <Line
                      width={300}
                      height={100}
                      options={options}
                      data={accessDataReport}
                    />
                  }
                </>
              )
          }

        </div>
      </div>
    </div>
  );
}
