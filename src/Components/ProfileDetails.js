import React, { useCallback, useState } from 'react'
import Server from './APIUrl';
import { useLocation, useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { emphasize } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Swal from 'sweetalert2';

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
}, { index: 1 });

const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function ProfileDetails() {

    const history = useHistory();
    const location = useLocation();
    const authToken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");
    const userId = sessionStorage.getItem("userid");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([])
    const [data, setData] = React.useState([])
    const [userData, setUserData] = React.useState({

        isLoading: true,
        isSuccess: false,
        isError: false,
        isSnackbarOpen: false,

    })

    React.useEffect(() => {
        setUserData({ ...userData, isLoading: true })
        Server.get(`/account/getAccountDetails?id=${accountId}&requestTime=${requestTime}`, {
            headers: {
                'content-type': 'application/json',
                authToken,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"

            },
        })
            .then((response) => {
                console.log(response.data)
                setData(response.data.resultData)

                setUserData({ ...userData, isLoading: false })

                if (!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get user")) {
                    setRows(response.data.resultData)

                }

            }).catch((err) => {
                console.log(err)
                setRows([])

                setUserData({

                    isLoading: false,
                    isSuccess: false,
                    isError: true,
                    isSnackbarOpen: true,
                })

            })
    }, []);
    const [loading, setLoading] = useState(false)
    const DeleteAccount = async () => {
        setLoading(true);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! Once deleted, you won't be able to recover this account!",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Server.delete(`/account/delete?accountId=${accountId}&requestTime=${requestTime}`, {
                    headers: {
                        'content-type': 'application/json',
                        authToken,
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*"

                    },
                })
                    .then((res) => {
                        if (res.data.resultCode === 0) {
                            // clear session storage
                            sessionStorage.clear();
                            window.location.href = "/";
                        }else{
                            Swal.fire("Error", res.data.resultMessage, "error");
                        }

                    }).catch((err) => {
                        console.log(err)
                        Swal.fire("Error", err, "error");

                    })
            }
        })
    }
    return (
        console.log("Profile", data),
        <div style={{ paddingTop: '90px', marginLeft: '20px' }}>
            <Grid container spacing={3} >
                <Grid item xs={12} md={6}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <StyledBreadcrumb
                            component="a"
                            //href="/DashBoard"
                            onClick={useCallback(() => history.push('/AxiomProtect/DashBoard'))}
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            label="Profile Details"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ fontFamily: 'Jost', fontSize: '20px', color: '#000000' }}>
                        <h4>Profile Details</h4>
                    </Typography>
                </Grid>
            </Grid>
            <Divider sx={{ borderColor: '#BABABA', width: '800px' }} />
            <br />
            <Grid container spacing={3}>
                <Grid item xs={3} md={3}>
                    Name
                </Grid>
                <Grid item xs={8} md={4}>
                    <TextField fullWidth size="small" type="text" name="username" id="username" inputProps={{ readOnly: true, }} variant="outlined" value={data.fname} placeholder="First Name..." ></ TextField>
                </Grid>
                <Grid item xs={8} md={4}>
                    <TextField fullWidth size="small" type="text" name="username" id="username" inputProps={{ readOnly: true, }} variant="outlined" value={data.lanme} placeholder="Last Name..." ></ TextField>
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={3} md={3}>
                    Account ID
                </Grid>
                <Grid item xs={8} md={8}>
                    <TextField fullWidth size="small" type="text" name="username" id="username" inputProps={{ readOnly: true, }} variant="outlined" value={accountId} placeholder="Email..." />
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={3} md={3}>
                    Email
                </Grid>
                <Grid item xs={8} md={8}>
                    <TextField fullWidth size="small" type="text" name="username" id="username" inputProps={{ readOnly: true, }} variant="outlined" value={data.email} placeholder="Email..." />
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={3} md={3}>
                    Phone no
                </Grid>
                <Grid item xs={8} md={8}>
                    <TextField fullWidth size="small" type="text" name="username" id="username" inputProps={{ readOnly: true, }} variant="outlined" value={data.phone} placeholder="Phone no..." />
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={3} md={3}>
                    Company
                </Grid>
                <Grid item xs={8} md={8}>
                    <TextField fullWidth size="small" type="text" name="username" id="username" inputProps={{ readOnly: true, }} variant="outlined" value={data.company} placeholder="Company..." />
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={3} md={3}>
                    User Count
                </Grid>
                <Grid item xs={8} md={8}>
                    <TextField fullWidth size="small" type="text" name="username" id="username" inputProps={{ readOnly: true, }} variant="outlined" value={data.userCount} placeholder="Count..." />
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={3} md={3}>
                    License ID
                </Grid>
                <Grid item xs={8} md={8}>
                    <TextField fullWidth size="small" type="text" name="username" id="username" inputProps={{ readOnly: true, }} variant="outlined" value={data.license} placeholder="License Id..." />
                </Grid>
            </Grid>
            <br /><br />
            <h3 style={{ color: "red", marginBottom: "0" }}>Danger Zone:</h3>
            <p style={{ width: "50%", textAlign: "justify" }}>Once you delete the account, you'll no longer use this platform and all of your data you'll be deleted.</p>
            <Button color="error" variant='contained' style={{ textTransform: "capitalize" }} onClick={DeleteAccount}>Delete Account</Button>
        </div>
    )
}