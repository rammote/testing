import React, { useState, useEffect, useLayoutEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Server from "../../APIUrl";
import Loader from '../../Loader'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserChart({duration}) {
  const [totalAndEnrollUsersData, setTotalAndEnrollUsersData] = useState("");
  const [activeAndOtherUsersData, setActiveAndOtherUsersData] = useState("");
  const [usersData, setUsersData] = useState("");
  const accountId = sessionStorage.getItem("accountId");
  const authtoken = sessionStorage.getItem("jwtToken");
  const requestTime = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
  const [loading, setLoading] = useState(false);
  const res = {
    resultMessage: "Success",
    resultData: {
      labels: [
        "All Users",
        "Enroll Users",
        "Suspended Users",
        "Active Users",
        "Locked Users",
      ],
      datasets: [
        {
          data: [13, 2, 0, 11, 0],
        },
      ],
    },
  };
  useEffect(()=>{
    setLoading(true)
    async function fetchData() {
     await Server.get(
         `/reports/getUsersCountByStatus?accountId=${accountId}&requestTime=${requestTime}&duration=${duration}`,
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
           const res=response.data
          setUsersData(res.resultData)
           setLoading(false)
   
         })
         .catch((err) => {
           console.log(err);
           setLoading(false)
         });
    }

    return fetchData();
  },[duration])

  useEffect(() => {
    setLoading(true);
    setTotalAndEnrollUsersData(sortTotalAndEnrollData());
    setActiveAndOtherUsersData(sortActiveAndOtherData());
    setLoading(false);
  }, [usersData]);
  function sortTotalAndEnrollData() {
    setLoading(true);
    const labels =usersData && usersData?.labels.slice(0, 2);
    const data =usersData && usersData?.datasets[0].data.slice(0, 2);
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ["#0077b6", "#f8961e"],
          borderColor: ["#fff"],
        },
      ],
    };
  }
  function sortActiveAndOtherData() {
    const labels =usersData && usersData?.labels.slice(2, usersData && usersData?.labels.length);
    const data =usersData && usersData?.datasets[0].data.slice(
      2,
      usersData && usersData.datasets[0].data.length
    );
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ["#e63946", "#2196f3", "#03071e"],
          borderColor: ["#fff"],
        },
      ],
    };
  }
  console.log({ totalAndEnrollUsersData });
  console.log({ activeAndOtherUsersData });
console.log({usersData})
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };
  return (
    <>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Loader/>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "85%",
              margin: "0 auto",
              flex:1
            }}
          >
            {
              usersData ? (
                <>
                <div>
              <Pie
                width={400}
                options={options}
                data={totalAndEnrollUsersData && totalAndEnrollUsersData}
              />
            </div>
            <div>
              <Pie
                width={400}
                options={options}
                data={activeAndOtherUsersData && activeAndOtherUsersData}
              />
            </div>
          
          </>
              ): <h3 >No Users Data found </h3>
            }
            </div>
        </>
      )}
    </>
  );
}
