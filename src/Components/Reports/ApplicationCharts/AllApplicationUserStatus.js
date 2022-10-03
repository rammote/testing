import React,{useState, useEffect} from 'react'
import Grid from "@mui/material/Grid";
import Server from "../../APIUrl";

import { Bar } from 'react-chartjs-2';

export default function AllApplicationUserStatusChart() {
    const [applicationsData, setApplicationsData] = useState({});
    const [xAxisLabels, setXAxisLabels] = useState([]);
    const [mapData, setmapData] = useState([]);
    const [dataSet, setDataSet] = useState([]);
    const accountId = sessionStorage.getItem("accountId");
    const authtoken = sessionStorage.getItem("jwtToken");
    const [loading, setLoading] = useState(false)
    const requestTime = new Date()
      .toISOString()
      .replaceAll("T", " ")
      .replaceAll("Z", "");

  // console.log({requestTime})
  useEffect( () => {
    setLoading(true)
   async function fetchData() {
    setLoading(true)
     await Server.get(
        `/reports/getAllUserCountByApplication?accountId=${accountId}&requestTime=${requestTime}`,
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
          // console.log(response.data)
          const res=response.data
          setApplicationsData(res);
          setLoading(false)
  
        })
        .catch((err) => {
          console.log(err);
        });
   }
   setLoading(false)
   return fetchData();
  }, []);
useEffect(()=>{
  setLoading(true)
  setXAxisLabels(applicationsData && applicationsData?.resultData?.applicationList);
  setmapData(applicationsData && applicationsData?.resultData?.userCounts);
  setLoading(false)
},[applicationsData]);

async function mapDataFun(data){
  const newMapData = await data && data.map((app)=>{
      const active="#009c55";
      const suspended="#d00000";
    return {
      label: app?.label,
      data: app?.data,
      backgroundColor: app?.label==="active"? active : suspended,
      borderColor: app?.label==="active"? active : suspended,
    }
  }); 
  // console.log({newDaataa: newMapData})
  setDataSet(newMapData && newMapData);
}
  useEffect(()=>{
      if(mapData){
         mapDataFun(mapData);
      }
  },[mapData]);

  const labels=xAxisLabels && xAxisLabels;
  const datasets=dataSet && dataSet;
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Application Reports By User Status',
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
                  text: 'Applications Name'
              }
          },
          y: {
            type: 'linear',
              display: true,
              ticks: {
                precision: 0
            },
              beginAtZero: true,
              title: {
                  display: true,
                  text: 'Application User Status Count'
              }
          }
      }    
      };
       
    const data = {
        labels,
        datasets,
      };
    return (
        <>
                  <Grid container spacing={3}>
        <Grid item xs={8} md={11}>
      {/* Line Chart */}
      {
    loading ? <div style={{textAlign:"center"}}>Loading...</div> :
      <Bar  width={100} height={35} options={options} data={data} />
      }
        </Grid>
      </Grid>
        </>
    )
}
