import { Stack, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import Grid from '@mui/material/Grid';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Server from "../../APIUrl";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
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
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export default function RiskReportChart() {
    const profitChartRef = useRef()
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
    const accountId = sessionStorage.getItem("accountId");

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
        let xlables = [], lRiskArr = [], hRiskArr = [], mRiskArr = [];
        for (let i = 0; i < riskData.length; i++) {

            xlables.push(riskData[i].date);
            // setXLabels([...xLabels, riskData[i].date]);
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
            // setHighRisk([...highRisk, highRiskCounts]);
            // setMediumRisk([...mediumRisk, mediumRiskCounts]);
            // setLowRisk([...lowRisk, lowRiskCounts]);
        }
        setXLabels(xlables);
        setLowRisk(lRiskArr);
        setHighRisk(hRiskArr);
        setMediumRisk(mRiskArr);
    };
    console.log({ lowRisk, highRisk, mediumRisk })
    useEffect(() => {
        setLoading(true);

        if (accountId && authToken) {
            Server.get(
                `/reports/getAllRBAReportByDateByAccountId?requestTime=${requestTime}&accountId=${accountId}&startDate=${startDate}&endDate=${endDate}`,
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
                            return segregateData(res.data.resultData);
                        }
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
    }, [accountId, authToken]);
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
            ticks: {
                precision: 0
            },
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

const data = {
    labels: xLabels,
    datasets: [
        {
            label: "High Risk",
            data: highRisk,

            backgroundColor: "#ff2b2bd4",
            borderColor: "#ff2b2bd4",
        },
        {
            label: "Low Risk",
            data: lowRisk,

            backgroundColor: "#2bff5ad4",
            borderColor: "#2bff5ad4",
        },
        {
            label: "Medium Risk",
            data: mediumRisk,

            backgroundColor: "skyblue",
            borderColor: "skyblue",
        },
    ],
};

const handleGetData = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (accountId && authToken && startDate && endDate) {
        setHighRisk([]);
        setLowRisk([]);
        setMediumRisk([]);
        setXLabels([]);
        setLoading(true);
        console.log({ lowRisk, highRisk, mediumRisk, xLabels })
        await Server.get(
            `/reports/getAllRBAReportByDateByAccountId?requestTime=${requestTime}&accountId=${accountId}&startDate=${startDate}&endDate=${endDate}`,
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
                    } else {
                        Swal.fire("Warning", "No data found", "warning");
                    }
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    } else {
        Swal.fire("Warning", "Some Fields are missing", "warning");
    }
};
return (
    <>
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>

                <Typography
                    style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}
                    sx={{ fontFamily: 'Jost', fontSize: '20px', color: '#000000' }}>
                    <h4>Risk Reports</h4>

                    <div style={{ display: "flex" }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateRangePicker
                                calendars={1}
                                value={valueDate}
                                onChange={(newValue) => {
                                    setValueDate(newValue);
                                }}
                                renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                        <TextField size="small" {...startProps} />
                                        <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField size="small" {...endProps} />
                                    </React.Fragment>
                                )}
                            />
                        </LocalizationProvider>
                        <LoadingButton
                            loading={loading}
                            size="small"
                            onClick={(e) => handleGetData(e)}
                            variant="contained"
                            sx={{ width: 80, p: 0, ml: 2, textTransform: "capitalize" }}
                        >
                            Submit
                        </LoadingButton>
                    </div>
                </Typography>
            </Grid>
        </Grid>

        {/* <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Risk Report
                </Typography>
                <div style={{ display: "flex" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            calendars={1}
                            value={valueDate}
                            onChange={(newValue) => {
                                setValueDate(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField size="small" {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField size="small" {...endProps} />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                    <LoadingButton
                        loading={loading}
                        size="small"
                        onClick={(e) => handleGetData(e)}
                        variant="contained"
                        sx={{ width: 80, p: 0, ml: 2, textTransform: "capitalize" }}
                    >
                        Submit
                    </LoadingButton>
                </div>
            </Stack> */}
        <div style={{ height: "100", width: "100%" }}>

            {loading ? <Loader /> : <Line options={options} height={100} data={data} />}

        </div>
    </>
);
}
