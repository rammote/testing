import React, { useCallback, useState } from "react";
import Server from "../APIUrl";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F4F6FA",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function CreateTeamUnit() {
  const history = useHistory();
  const location = useLocation();
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");

  const [creatteamunitForm, setcreatteamunitForm] = React.useState({
    name: "",
    discription: "",
  });
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if ( !creatteamunitForm?.name  && !creatteamunitForm?.discription) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please add valid text",
      });
      setLoading(false)
      return
    } else {
      await Server.post(
        `/unit/add?accountId=${accountId}&name=${creatteamunitForm.name}&discription=${creatteamunitForm.discription}&requestTime=${requestTime}`,
        {},
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
          setLoading(false)
          if (response.data.resultCode === 0) {
            /*window.location.href="/Setpassword";*/
            console.log(response.data);

            setcreatteamunitForm({
              name: "",
              discription: "",
            });
            Swal.fire({
              icon: "success",
              title: "Success",
              text: response.data.resultMessage,
            });
            history.push("/AxiomProtect/Teams");
          } else {
            Swal.fire({
              icon: "error",
              title: "Warning...",
              text: response.data.resultMessage,
            });
          }
        })
        .catch((err) => {
          setLoading(false)
          console.log(err);
          setcreatteamunitForm({
            name: "",
            discription: "",
          });
        });
    }
  };
  return (
    <>
      <div style={{ paddingTop: "90px", marginLeft: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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
                onClick={useCallback(() => history.push("/AxiomProtect/Teams"))}
                label="Teams"
                deleteIcon={<ExpandMoreIcon />}
              />
              <StyledBreadcrumb
                // onClick={useCallback(() => history.push('/Teams'))}
                label="Create Team Unit"
                deleteIcon={<ExpandMoreIcon />}
              />
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ fontFamily: "Jost", fontSize: "20px", color: "#000000" }}
            >
              <h4>Create Team Unit</h4>
            </Typography>
          </Grid>
        </Grid>
        <form
          onSubmit={handleSubmit}
          style={{ paddingLeft: "0px", lineHeight: "25px", width: "1100px" }}
        >
          <div>
            {/* <h2 style={{ color:'#5C5C5C' }}>Create Team Unit</h2> */}
            <p style={{ color: "#5C5C5C" }}>General</p>
            <hr />
            <table style={{ width: "2000px", float: "left" }}>
              <tr>
                <td>
                  <p>Team Unit name*</p>
                </td>
                <td>
                  {" "}
                  <TextField
                    style={{ height: "30px", width: "750px" }}
                    required

                    name="name"
                    id="name"
                    InputProps={{
                      min: 2,
                      max: 50,
                      
                    }}
                    label="Team Unit name"
                    value={creatteamunitForm.name}
                    onChange={(e) =>
                      setcreatteamunitForm({
                        ...creatteamunitForm,
                        name: e.target.value.trimStart(),
                      })
                    }

                  />
                </td>
              </tr>
              <br />
              <tr>
                <td>
                  <p>Description*</p>
                </td>
                <td>
                  {" "}
                  <TextField
                    name="discription"
                    id="discription"
                    label="Description"
                    required
                    InputProps={{
                      min: 1,
                      max: 300,
                     
                    }}
                    multiline
                    rows={5}
                    style={{ height: "30px", width: "750px" }}
                    value={creatteamunitForm.discription}
                    onChange={(e) =>
                      setcreatteamunitForm({
                        ...creatteamunitForm,
                        discription: e.target.value.trimStart(),
                      })
                    }
                  />{" "}
                </td>
              </tr>
              <br />
            </table>

            {/* <p style={{ color:'#5C5C5C', marginTop: 300 }}>Team Member</p>
                        <hr/> */}

            {/* <div style={{marginTop:12,display:"grid",placeItems:"center"}}>
          
                            <TableContainer component={Paper} >
                                <Table md={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{color: 'black'}}>Team Member</StyledTableCell>
                                        <StyledTableCell style={{color: 'black'}}>Role</StyledTableCell>
                                        <StyledTableCell align="center" style={{color: 'black'}}>Permissions</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <StyledTableRow >
                                            <StyledTableCell align="center"></StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div> */}

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
              <center>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  style={{ color: "#FFFFFF", backgroundColor: "#206BC4" }}
                  type="submit"
                >
                  Add Team Unit
                </LoadingButton>
              </center>
              {/* <Button style={{color:'#FFFFFF', backgroundColor:'#206BC4'}} onClick={this.addApp}>Create custom integration</Button> */}
            </div>
            <br />
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateTeamUnit;
