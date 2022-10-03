import React, { useState, useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Line } from "react-chartjs-2";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Server from "../../APIUrl";
import Loader from '../../Loader'
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
export default function AllAppsUsageChart() {
  const accountId = sessionStorage.getItem("accountId");
  const authtoken = sessionStorage.getItem("jwtToken");
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const [duration, setDuration] = useState(7);
  console.log({ accountId, requestTime, authtoken });
  function handleDuration(e) {
    e.preventDefault();
    setDuration(e.target.value);
  }
  const [applicationsData, setApplicationsData] = useState({});
  const [xAxisLabels, setXAxisLabels] = useState([])
    const [mapData, setmapData] = useState([]);
    const [dataSet, setDataSet] = useState([]);
const [loading, setLoading] = useState(false)
  // console.log({requestTime})
useEffect( () => {
   if(duration){
    getReportData(accountId, duration, requestTime, authtoken);
   }
  }, [duration]);
  
  useEffect(()=>{
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    async function mapDataFun(data){
      const newMapData = await data && data.map((app)=>{
    const colorPattern=getRandomColor()
        return {
          label: `${app?.appName} (${app?.appId})`,
          data:app?.data,
          backgroundColor:colorPattern,
          borderColor: colorPattern,
        }
      });
      console.log({newDaataa: newMapData})
      setDataSet(newMapData && newMapData);
    }
   
      return mapDataFun(mapData);
    
},[mapData]);  

  async function getReportData(accId, du, reqTime, auth) {
      setLoading(true)
    const response= await Server.get(
     `/reports/getAllApplicationUsage?accountId=${accId}&duration=${du}&requestTime=${reqTime}`,
     {
       headers: {
         "content-type": "application/json",
         authToken: auth,
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "*",
       },
     }
   )
     .then( (response) => {
       console.log(response.data)
       const res= response.data.resultData
        setApplicationsData(res);
        setLoading(false);
     
     })
     .catch((err) => {
       console.log(err);
        setLoading(false);
     });
   }
 const options = {
    responsive: true,
    elements: {
      line: {
          tension:0.2
      }
    },
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Application Usage Report',
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
              text: 'Dates'
          }
      },
      y: {
        ticks: {
          precision: 0
      },
          display: true,
          title: {
              display: true,
              text: 'Application User Count'
          },
          beginAtZero: true,
      }
  }    
  };
useEffect(()=>{
    setLoading(true)
    setXAxisLabels(applicationsData && applicationsData?.dates);
     setmapData(applicationsData && applicationsData?.dataSet);
        setLoading(false)
},[applicationsData])


  // console.log({mapData});
  console.log({dataSet});
  console.log({xAxisLabels});
console.log({mapData})
  console.log({applicationsData});
console.log({duration});
  const labels=xAxisLabels ;
  const datasets=dataSet ;
  const  data = {
    labels,
    datasets,
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
            <h4>Application Reports</h4>
            <Grid item xs={8} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Select Date</InputLabel>
                <Select
                  value={duration}
                  label="Select Date"
                  onChange={handleDuration}
                >
                  <MenuItem value={7}>Last 7 Days</MenuItem>
                  <MenuItem value={30}>1 Month</MenuItem>
                  <MenuItem value={90}>Last 3 Months</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={8} md={12}>    
         {
             loading ? <Loader/> :
             <Line  width={100} height={25} options={options} data={data} />
         }
        </Grid>
      </Grid>
    </>
  );
}
