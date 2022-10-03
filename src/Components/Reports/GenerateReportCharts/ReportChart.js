import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import Server from "../../APIUrl";
import Loader from '../../Loader'
import { Grid } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function ReportChart({ responseData }) {
  const [chartLabelCount, setChartLabelCount] = useState({
    Active:0,
    Assigned:0,
    Locked:0,
    Suspended:0,
    Free:0,
    Lost:0
  });
  const [loading, setLoading] = useState(false);

  function getCountStatus() {
    setLoading(true);
    const Active = responseData.filter(item => item.status === 1).length;
    const Locked = responseData.filter(item => item.status === -1).length;
    const Assigned = responseData.filter(item => item.status === 0).length;
    const Free = responseData.filter(item => item.status === -10).length;
    const Suspended = responseData.filter(item => item.status === -2).length;
    const Lost = responseData.filter(item => item.status === -5).length;
    setChartLabelCount({
      Active: Active,
      Assigned: Assigned,
      Locked: Locked,
      Suspended: Free,
      Free: Suspended,
      Lost: Lost
    });
    setLoading(false);
  }

  useEffect(() => {
    getCountStatus();

    return () => {}
  }, [responseData]);

  const optionsDoughnut = {
    responsive: true,
    plugins: {
      legend: {
        // display: false,
        position: "top",
      },
    },
  };

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Loader/>
        </div>
      ):(
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
          {responseData.length>0 ? (
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <Doughnut
                  // width={400}
                  options={optionsDoughnut}
                  data={{
                    labels: Object.keys(chartLabelCount),
                    datasets: [
                      {
                        data: Object.values(chartLabelCount),
                        backgroundColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Bar
                  // width={400}
                  options={optionsBar}
                  data={{
                    labels: Object.keys(chartLabelCount),
                    datasets: [
                      {
                        data: Object.values(chartLabelCount),
                        backgroundColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </Grid>
            </Grid>
          ):(
            <h3>No Report Data found </h3>
          )}
        </div>
      )}
    </>
  );
}
