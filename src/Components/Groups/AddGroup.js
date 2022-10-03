import React, { useState, useCallback, useLocation, useEffect } from "react";
import Server from "../APIUrl";
import { Link, useHistory } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";

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

export default function AddGroup(props) {
  const history = useHistory();
  // const location = useLocation();
  //const handleOnClick = useCallback(() => history.push('/GroupDetails'), [history]);
  //const { accountId } = (props.location && props.location.state) || { };
  const authToken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [formData, setFormData] = React.useState({
    groupName: "",
    description: "",
  });


  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setLoading(true)
    if (formData.groupName === "" && formData.description === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
      });

    } else {
      await Server.post(
        `/group/add?groupName=${formData.groupName}&description=${formData.description}&requestTime=${requestTime}&accountId=${accountId}`,
        {},
        {
          headers: {
            "content-type": "application/json",
            authToken: authToken,
          },
        }
      )
        .then((response) => {
          setLoading(true)

          // console.log('Hello');
          Swal.fire("New Group Added Successfully!", "success");
          history.push("/AxiomProtect/Groups")
          console.log(response.data);
          setFormData({
            groupName: "",
            description: "",
          });
        })
        .catch((err) => {
          setLoading(true)

          console.log(err);
          setFormData({
            groupName: "",
            description: "",
          });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ paddingTop: "90px", marginLeft: "20px" }}>
      <Grid container spacing={2}>
        <Grid item>
          {/* <Typography sx={{fontFamily: 'Jost', fontSize: '18px', color: '#5C5C5C'}}>
                        Dashboard/Groups/Add Group
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
              onClick={useCallback(() => history.push("/AxiomProtect/Groups"))}
              label="Groups"
              style={{ cursor: "pointer" }}
            />
            <StyledBreadcrumb
              label="Add Group"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
          <Typography
            sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
          >
            <h4> Add Group</h4>
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: "#BABABA", width: "800px" }} />
      <br />
      <Grid container>
        <Grid item xs={12} md={3}>
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Group Name*
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            type="text"
            InputProps={{
              min: 1
            }}
            label="Group Name"
            required
            variant="outlined"
            value={formData.groupName}
            onChange={(e) =>
              setFormData({ ...formData, groupName: e.target.value.trimStart() })
            }
          />
        </Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item xs={12} md={3}>
          <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
            Description*
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            multiline
            InputProps={{
              min: 1
            }}
            rows={5}
            helperText="Optional"
            type="text"
            label="Description"
            variant="outlined"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value.trimStart() })
            }

          />
        </Grid>
      </Grid>
      <br />
      <Divider sx={{ borderColor: "#BABABA", width: "800px" }} />
      <br />
      <center>
        {/* <Button variant="contained" sx={{fontFamily: 'Jost'}} onClick={handleOnClick}>Add</Button> */}
        <LoadingButton
          loading={loading}
          variant="contained"
          sx={{ fontFamily: "Jost" }}
          type="submit"
        >
          Add Group
        </LoadingButton>
      </center>
    </form>
  );
}
