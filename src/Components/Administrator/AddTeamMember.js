import React, { useCallback, useState } from "react";
import Server from "../APIUrl";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Link, useHistory } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Loader from "../Loader";
import { LoadingButton } from "@mui/lab";
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,

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

export default function AddTeamMember() {
  const history = useHistory();
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [loading, setLoading] = useState(false)
  const [sendConfirmEmail, setSendConfirmEmail] = useState(true)
  async function submit(e) {
    e.preventDefault()
    setLoading(true)

    if (name === "" && email === "" && role === "" && mobile === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
      });
    } else {
      await Server.post(
        `/operator/create?requestTime=${requestTime}&sendConfirmation=${sendConfirmEmail}`,
        {
          accountid: accountId,
          emailid: email,
          name: name,
          phone: mobile,
          roleid: role,
        },
        {
          headers: {
            "content-type": "application/json",
            authToken: authtoken,
          },
        }
      )
        .then((response) => {
          setLoading(false)
          if (response.data.resultCode === 0) {

            Swal.fire({
              title: "Team Member Added Successfully",
              text: "",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              //confirmButtonText: 'Yes, delete it!'
            })
            history.push("/AxiomProtect/Administrator")
          } else {
            Swal.fire({
              title: "Warning",
              text: response.data.resultMessage,
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
          Swal.fire({
            title: err.resultMessage,
            text: "",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          });
          history.push({
            pathname: "/AxiomProtect/Administrator",
          });
        });

    }
  }

  return (
    <div style={{ paddingTop: "6rem", marginLeft: "20px" }}>
      {/* <div style={{paddingLeft: '20px', lineHeight:'25px',width: '1100px'}}> */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
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
              label="Administrator"
              onClick={useCallback(() =>
                history.push("/AxiomProtect/Administrator")
              )}
              deleteIcon={<ExpandMoreIcon />}
            />
            <StyledBreadcrumb
              label="Add Admin"
              // onClick={useCallback(() => history.push('/Administrator'))}
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>
      <br />
      <form onSubmit={submit}>
        <div>
          <table style={{ width: "95%", float: "left" }}>
            <tr>
              <td>
                <p>Name*</p>
              </td>
              <td>
                {" "}
                <TextField
                  size="small"
                  type="text"
                  maxLenght={50}
                  style={{ width: "28rem" }}
                  id="outlined-basic"
                  label="Team member Name"
                  placeholder="Team Member Name"
                  onChange={(e) => setName(e.target.value.trimStart())}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>Email Address*</p>
              </td>
              <td>
                {" "}
                <TextField
                  size="small"
                  type="email"
                  maxLenght={90}
                  style={{ width: "28rem" }}
                  id="outlined-basic"
                  label="Email Address"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>Phone Number* </p>
              </td>
              <td>
                <TextField
                  size="small"
                  id="outlined-basic"
                  type="number"
                  required
                  InputProps={{
                    min: 10,
                    max: 15
                  }}
                  label="Phone Number"
                  placeholder="Phone Number..."
                  style={{ width: "28rem" }}

                  onChange={(e) => setMobile(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>
                <p>Send Confirmation Email </p>
              </td>
              <td>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={sendConfirmEmail} onChange={(e) => { setSendConfirmEmail(e.target.checked) }} />}
                    label="After checked, confirmation email will be sent automatically"
                  />
                </FormGroup>
              </td>
            </tr>
            <br />
          </table>
          <div style={{ lineHeight: "5px", width: "100%" }}>
            <FormControl component="fieldset">
              <RadioGroup name="Roles" onChange={(e) => setRole(e.target.value)}>
                <table style={{ width: "100%" }}>
                  <tr>
                    <td style={{ width: "27%" }}>
                      <p>Roles</p>
                    </td>
                    <td>
                      <h3 style={{ marginBottom: "0.1rem" }}>
                        {" "}
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label=""
                        />
                        Owner
                      </h3>

                      <ul>
                        <li style={{ lineHeight: "1" }}>
                          Can create, view, modify and delete anything, including
                          other administrators
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>
                      <h3 style={{ marginBottom: "0.1rem" }}>
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label=""
                        />
                        Administrator
                      </h3>

                      <ul>
                        <li style={{ lineHeight: "1" }}>
                          Can create, view, modify and delete anything
                        </li>
                        <li style={{ lineHeight: "1" }}>
                          create, modify or delete other administrators;
                        </li>
                        <li style={{ lineHeight: "1" }}>
                          {" "}
                          cannot access or modify billing information
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>
                      <h3 style={{ marginBottom: "0.1rem" }}>
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label=""
                        />
                        User Manager
                      </h3>

                      <ul>
                        <li style={{ lineHeight: "1" }}>
                          {" "}
                          Can create, view, modify and delete users, phones,
                          tokens, and bypass codes
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>
                      <h3 style={{ marginBottom: "0.1rem" }}>
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label=""
                        />
                        Help Desk
                      </h3>

                      <ul>
                        <li style={{ lineHeight: "1" }}>
                          Can  view user, application, report
                        </li>




                      </ul>
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>
                      <h3 style={{ marginBottom: "0.1rem" }}>
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label=""
                        />
                        Billing
                      </h3>
                      <ul>
                        <li>Can view and modify only billing information</li>
                      </ul>
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>
                      <h3 style={{ marginBottom: "0.1rem" }}>
                        <FormControlLabel
                          value="6"
                          control={<Radio />}
                          label=""
                        />
                        Read-only
                      </h3>
                      <ul>
                        <li style={{ lineHeight: "1" }}>
                          Can view all settings except billing, but cannot make
                          any modifications
                        </li>
                      </ul>
                    </td>
                  </tr>


                  {/* submit */}
                  <tr style={{ marginBottom: "1rem" }}>
                    <td></td>
                    <td>
                      {
                        loading ? <Loader /> :
                          <h3 style={{ marginBottom: "3rem" }}>
                            <LoadingButton
                              loading={loading}
                              color="primary"
                              variant="contained"
                              size="small"

                              type="submit"
                            >
                              Add Team Member
                            </LoadingButton>
                          </h3>
                      }

                    </td>
                  </tr>
                </table>
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </form>
    </div>
  );
}
