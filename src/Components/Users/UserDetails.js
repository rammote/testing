import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import { Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from "@mui/material/FormControl";
import Grid from '@mui/material/Grid';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';
import { emphasize, styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Server from '../APIUrl';
import Loader from '../Loader/index';
import ViewUserDetail from './ViewUserDetails/ViewUserDetail';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});

const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#0D4990",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function UserDetails() {
    const history = useHistory();
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const location = useLocation();

    const [value, setValue] = React.useState(0);
    const [rowsss, setRowsss] = React.useState([])
    const [selectApp, setSelectApp] = useState("");
    const [appDetails, setAppDetails] = React.useState({
        appId: "",
        subType: 1,
    });
    const [loading, setLoading] = useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };






    const handleSelectApp = (e) => {
        setSelectApp(e.target.value);
        let appid = rowsss[0].appid
        console.log("appid", appid)
        //setAppDetails({appId:event.target.value.appid, subType:event.target.value.subtype})
    };
    const [userData, setUserData] = useState({})
    const [isUserUpdated, setIsUserUpdated] = useState(false)
    useEffect(() => {
        apiCall()
    }, [isUserUpdated])
    const apiCall = async () => {
        await Server.get(
            `/user/get?accountId=${userData?.accountid || location?.state?.row?.accountid}&requestTime=${requestTime}&type=${1}&searchFor=${ userData?.email || location?.state?.row?.email}`,
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

                if (response.data.resultCode == 0) {
                    setUserData(response?.data?.resultData)
                } else {

                    Swal.fire({
                        text: response.data.resultMessage,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        // confirmButtonText: 'Yes, delete it!'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(() => {
        // setApplicationData({ ...applicationData,isLoading: true })

        Server.get(`/user/getAssignedApplications?accountId=${accountId}&userId=${location.state.row.userid}&requestTime=${requestTime}`, {
            headers: {
                'content-type': 'application/json',
                authToken: authtoken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"

            },
        })
            .then((response) => {
                console.log("Application", response.data.resultData)
                //setApplicationData({ ...applicationData,isLoading: false })
                //setAppDetails({appId:response?.data?.resultData[0].appid, subType:response?.data?.resultData[0].subtype})
                setSelectApp(response?.data?.resultData[0])

                if (!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get applications")) {
                    setRowsss(response.data.resultData)
                }
            }).catch((err) => {
                console.log(err)
                setRowsss([])
                setLoading(false);

            })
    }, [])

    console.log("Rowsss", rowsss)

    console.log("SelectedApp", selectApp)

    return (
        <div style={{ paddingTop: '90px', paddingLeft: "20px" }}>
            <Grid container >
                <Grid item>
                    <Breadcrumbs aria-label="breadcrumb">
                        <StyledBreadcrumb
                            component="a"
                            //href="/DashBoard"
                            onClick={useCallback(() => history.push('/AxiomProtect/DashBoard'))}
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            component="a"
                            //href="/Users" 
                            onClick={useCallback(() => history.push('/AxiomProtect/Users'))}
                            label="Users"
                            style={{ cursor: 'pointer' }}
                        />
                        <StyledBreadcrumb
                            label="User Details"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                    <Typography sx={{ fontFamily: 'Jost', fontSize: '20px', color: '#000000' }}>
                        <h6>User Details</h6>
                    </Typography>


                </Grid>
            </Grid>
            <Grid container spacing={2}>

                <Grid item xs={4} md={4}>
                    <Typography sx={{ fontFamily: 'Jost', fontSize: '15px', color: '#5C5C5C' }}>
                        <h3> User : {userData?.username || location?.state?.row?.username}</h3>
                    </Typography>
                </Grid>
                <Grid item xs={4} md={4}>
                    <Typography sx={{ fontFamily: 'Jost', fontSize: '15px', color: '#5C5C5C' }}>
                        <h3>Email : {userData?.email || location?.state?.row?.email}</h3>
                    </Typography>
                </Grid>

                <Grid item xs={4} md={4}>
                    <div style={{ width: "70%" }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>{rowsss[selectApp]?.appname ?? "Select Application"} </InputLabel>
                            <Select
                                id="demo-simple-select"
                                label={"Select Application"}
                                value={selectApp}
                                onChange={handleSelectApp}
                            //onChange={(e)=>handleSelectApp(e, rowsss)}
                            //onChange={() => {setSelectApp({appId: rowsss.appid,subType: rowsss.subtype})}}
                            >
                                {rowsss &&
                                    Object.keys(rowsss)?.map((key) => (
                                        <MenuItem value={rowsss[key]}>
                                            {rowsss[key]?.appname}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
            </Grid>
            <br />
            <Divider sx={{ borderColor: '#BABABA', width: '1000px' }} />
            <br />

            {
                loading ? <Loader /> :
                    (
                        <>

                            {
                                rowsss !== {} || rowsss !== null ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "100%",
                                            margin: "0 auto",
                                            marginTop: "-1rem",
                                            flex: 1
                                        }}
                                    >
                                        <div>
                                            {
                                                rowsss && <ViewUserDetail appData={selectApp} setUserData={setUserData} userData={userData} setIsUserUpdated={setIsUserUpdated}/>
                                            }
                                        </div>
                                    </div>
                                ) : <h3>No Data Found</h3>
                            }

                        </>
                    )
            }

        </div>
    )
}