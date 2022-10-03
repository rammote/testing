import { Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Server from "../../APIUrl";
import { Button } from "@mui/material";

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
} from "chart.js";
import { LoadingButton } from "@mui/lab";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function RiskReportChart({ appId }) {
  const date = new Date();
  const [startDate, setStartDate] = useState(
    new Date(date.getFullYear(), date.getMonth() - 1, 1)
      .toISOString()
      .replaceAll("T", " ")
      .replaceAll("Z", "")
  );
  const [endDate, setEndDate] = useState(
    date.toISOString().replaceAll("T", " ").replaceAll("Z", "")
  );
  const [valueDate, setValueDate] = React.useState([null, null]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highRisk, setHighRisk] = useState([]);
  const [lowRisk, setLowRisk] = useState([]);
  const [mediumRisk, setMediumRisk] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const authToken = sessionStorage.getItem("jwtToken");
  const userId = sessionStorage.getItem("userId");
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");

 
const segregateData = (riskData) => {
  let xlables=[] ,lRiskArr=[],hRiskArr=[], mRiskArr=[];
  for (let i = 0; i < riskData.length ; i++) {
  
      xlables.push(riskData[i].date);
     
      const lowRiskCounts = riskData[i].data.filter((item) => item < 30 && item !== null).length;
      const mediumRiskCounts = riskData[i].data.filter(
          (item) => item > 30 && item < 70 && item !== null
      ).length;
      const highRiskCounts = riskData[i].data.filter(
          (item) => item > 70 && item !== null
      ).length;
      console.log({ lowRiskCounts, highRiskCounts, mediumRiskCounts });
      hRiskArr.push(highRiskCounts);
      mRiskArr.push(mediumRiskCounts);
      lRiskArr.push(lowRiskCounts);
      
  }
  setXLabels(xlables);
  setLowRisk(lRiskArr);
  setHighRisk(hRiskArr);
  setMediumRisk(mRiskArr);
};
  useEffect(() => {
    setLoading(true);
    if (userId && authToken) {
      Server.get(
        `/reports/getAllRBAReportByDate?requestTime=${requestTime}&userId=${userId}`,
        {
          headers: {
            "content-type": "application/json",
            authToken,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      )
        .then((res) => {
          setLoading(false);
          if (res.data.resultCode === 0) {
            if (res.data.resultData && res.data.resultData.length > 0) {
              segregateData(res.data.resultData);
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [appId, userId, authToken]);
  const options = {
    responsive: true,
    elements: {
      line: {
        tension: 0.3,
      },
    },
    plugins: {
      legend: {
        position: "top",
        font: {
          size: 21,
        },
      },
      title: {
        display: true,
        text: "Risk Report",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Dates",
          font: {
            size: 16,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Counts",
          font: {
            size: 16,
          },
        },
        beginAtZero: true,
      },
    },
  };
  // console.log({highRisk, lowRisk, mediumRisk, xLabels})
  const data = {
    labels: xLabels,
    datasets: [
      {
        label: "High Risk",
        data: highRisk,
        fill: false,
        backgroundColor: "#ff2b2bd4",
        borderColor: "#ff2b2bd4",
      },
      {
        label: "Low Risk",
        data: lowRisk,
        fill: false,
        backgroundColor: "#2bff5ad4",
        borderColor: "#2bff5ad4",
      },
      {
        label: "Medium Risk",
        data: mediumRisk,
        fill: false,
        backgroundColor: "skyblue",
        borderColor: "skyblue",
      },
    ],
  };


  return (
    <div>
     <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Risk Report
        </Typography>
      <div style={{ height: "200", width: "100%" }}>
        {xLabels.length > 0 ? (
          <Line options={options} height="100" data={data} />
        ) : (
          <div style={{ paddingTop: "3rem" }}>
            <center>No Data Found</center>
          </div>
        )}
      </div>
    </div>
  );
}
