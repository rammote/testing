import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Server from "../../APIUrl";
import Loader from '../../Loader';
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
export default function DeviceReportChart({duration}) {
    const accountId = sessionStorage.getItem("accountId");
    const authtoken = sessionStorage.getItem("jwtToken");
    const requestTime = new Date()
      .toISOString()
      .replaceAll("T", " ")
      .replaceAll("Z", "");
    console.log({ accountId, requestTime, authtoken });
    const [deviceReport, setDeviceReport] = useState({datasets:[], labels:[]});
const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        async function fetchData() {
          setLoading(true);
          await Server.get(
            `/reports/getDeviceReport?accountId=${accountId}&duration=${duration}&requestTime=${requestTime}`,
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
              setDeviceReport(response?.data?.resultData && response?.data?.resultData);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        }
        return fetchData();
      }, [duration]);

    console.log({ deviceReport });
      const options = {
        responsive: true,
        elements: {
          line: {
              tension:0.2
          }
        },
        plugins: {
          legend: {
            position: 'right' ,
          },
          title: {
            display: true,
            text: 'Device Report by Dates',
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
                  text: 'Count'
              },
            beginAtZero:true,
            

          }
      }    
        
      };
    return (
        <div style={{width:"100%"}}>
            {
                loading ? <Loader/> :
                (<Line width={200} height={60} options={options} data={ deviceReport && deviceReport ? deviceReport : {} } />)
            }
        </div>
    )
}
