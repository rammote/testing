import React, { useEffect, useCallback, useState } from "react";
import Server from "../../APIUrl";
import { useHistory, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoadingButton from "@mui/lab/LoadingButton";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);

export default function AddUser() {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  // const handleOnClick = useCallback(() => history.push('/Addgroup'), [history]);
  const authToken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");

  // const [groupData, setGroupData] = React.useState({

  //     isLoading: true,
  //     isSuccess: false,
  //     isError: false,
  //     isSnackbarOpen: false,

  // })
  // const [addUser, setUser] = React.useState({
  //     username: "",
  //     email: "",
  //     phone: "",
  //     accountId: sessionStorage.getItem("accountId"),
  // })
  const [username, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    console.log(requestTime);
    return () => {};
  }, []);

  // React.useEffect(() => {
  //     setGroupData({ ...groupData,isLoading: true })
  //     Server.get(`/group/getAll?accountId=${accountId}&requestTime=${requestTime}`, {
  //       headers: {
  //         'content-type': 'application/json',
  //         authToken: authToken,
  //       },
  //     })
  //       .then((response) => {

  //         console.log(response.data)
  //         setGroupData({ ...groupData,isLoading: false })

  //         if(!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get applications")){
  //             setRows(response.data.resultData)
  //         }

  //       }).catch((err) => {
  //         console.log(err)
  //         setRows([])

  //         setGroupData({
  //             isLoading: false,
  //             isSuccess: false,
  //             isError: true,
  //             isSnackbarOpen: true,
  //         })
  //       })
  // }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(accountId);
    // console.log(email);
    // console.log(username);
    // console.log(phone);
    // console.log(requestTime);
    if (re.test(email)) {
      Server.post(
        `/user/create?requestTime=${requestTime}`,
        {
          accountid: accountId,
          email: email,
          phone: phone,
          username: username,
        },
        {
          headers: {
            "content-type": "application/json",
            authToken: authToken,
          },
        }
      )
        .then((response) => {
          console.log(response.data);
          setLoading(false);
          if (response.data.resultCode === 0) {
            console.log(response.data);

            Swal.fire({
              title: "Success",
              text: response.data.resultMessage,
              icon: "success",
              showCancelButton: false,
            });
            history.push({
              pathname: "/AxiomProtect/Users",
            });
          } else {
            Swal.fire({
              title: response.data.resultMessage,
              icon: "error",
              showCancelButton: false,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setLoading(false);
      Swal.fire({
        title: "Please enter valid email",
        icon: "error",
      });
    }
  };

  // const groupList = rows.map((row,index) =>
  //     <option key={index}>{rows.groupname}</option>
  // );

  return (
    <form
      style={{ paddingTop: "90px", paddingLeft: "20px" }}
      onSubmit={handleSubmit}
    >
      {/* <Container sx={{width: '1620px'}}> */}
      <Grid container>
        <Grid item>
          {/* <Typography sx={{fontFamily: 'Jost', fontSize: '18px', color: '#5C5C5C'}}>
                            Dashboard /  Users  /  Add Users
                        </Typography> */}
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              //href="/DashBoard"
              onClick={useCallback(() =>
                history.push("/AxiomProtect/DashBoard")
              )}
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              component="a"
              //href="/Users"
              onClick={useCallback(() => history.push("/AxiomProtect/Users"))}
              label="Users"
              style={{ cursor: "pointer" }}
            />
            <StyledBreadcrumb
              label="Add User"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >
            <h4>Add User</h4>
          </Typography>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "18px", color: "#5C5C5C" }}
          >
            Most applications allow users to enroll themselves after they
            complete primary authentication.
          </Typography>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Name*
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            inputProps={{ max: 30 }}
            fullWidth
            size="small"
            type="text"
            name="userName"
            id="userName"
            label="Name"
            variant="outlined"
            onChange={(e) => setUserName(e.target.value.trimStart())}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Email*
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            inputProps={{ maxLength: 30 }}
            fullWidth
            size="small"
            type="email"
            name="email"
            id="email"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Phone*
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            inputProps={{
              minLength: 10,
              maxLength: 14,
              pattern: "[1-9]{1}[0-9]{9}",
            }}
            fullWidth
            size="small"
            type="number"
            name="phoneNo"
            id="phoneNo"
            label="Phone Number"
            variant="outlined"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
      </Grid>
      <br />
      {/* <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Group</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            size="small"
                            options={groupList}
                            renderInput={(params) => <TextField {...params} label={<Typography sx={{fontFamily: 'Jost'}}>Select Group</Typography>}/>}
                        />
                    </Grid>
                </Grid>
                <br /> */}
      {/* <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Application</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            size="small"
                            // options={dropdowntypes}
                            renderInput={(params) => <TextField {...params} label={<Typography sx={{fontFamily: 'Jost'}}></Typography>}/>}
                        />
                    </Grid>
                </Grid>
                <br /> */}
      <br />
      <Divider sx={{ borderColor: "#BABABA", width: "800px" }} />
      <br />
      <br />
      <center>
        <LoadingButton
          variant="contained"
          sx={{ fontFamily: "Jost" }}
          //onClick={(e) => handleSubmit(e)}
          type="submit"
          loading={loading}
        >
          Create
        </LoadingButton>
      </center>
      <br />
      <br />
      {/* </Container> */}
    </form>
  );
}
