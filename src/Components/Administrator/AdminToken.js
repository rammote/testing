import React, { useState, useCallback } from "react";
import Server from "../APIUrl";
import { useLocation, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NestedMenuItem from "material-ui-nested-menu-item";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AdbIcon from "@mui/icons-material/Adb";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Loader from "../Loader";
// dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
const style = {
  bgcolor: "background.paper",
  //border: '2px solid #000',
};

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AssignToken() {
  const location = useLocation();
  const history = useHistory();
  // console.log(location);
  // const row = location.state.row
  const requestTimess = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const requestTime = escape(requestTimess);
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [statusOT, setstatusOT] = React.useState("");
  const appId = location.state.row.appid;
  const userId = location.state.row.operatorid;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => setAnchorEl(null);


  const [tokenData, setTokenData] = React.useState({
    isLoading: true,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,
  });
  const [loading, setLoading] = useState(false);


  const [otpTokenDetails, setOtpTokenDetails] = useState([
    {
      attempts: "",
      category: 1,
      createOn: "",
      lastaccessOn: "",
      serialnumber: "",
      status: "",
      subcategory: "",
    },
    {
      attempts: "",
      category: 2,
      createOn: "",
      lastaccessOn: "",
      serialnumber: "",
      status: "",
      subcategory: "",
    },
    {
      attempts: "",
      category: 3,
      createOn: "",
      lastaccessOn: "",
      serialnumber: "",
      status: "",
      subcategory: "",
    },
    {
      attempts: "",
      category: 4,
      createOn: "",
      lastaccessOn: "",
      serialnumber: "",
      status: "",
      subcategory: "",
    },
  ]);

  /******************************************************************************************************/

  React.useEffect(() => {
    // setApplicationData({ ...applicationData,isLoading: true })
    // console.log("88888888888888")
    // console.log(location.state.row.userid)
    // console.log(location.state.row.appid)
    const fetchData = async () => {
      setLoading(true);
      await Server.post(
        `/token/getOTPTokens?userId=${userId}&appId=${appId}&requestTime=${requestTime}`,
        {},
        {
          headers: {
            "content-type": "application/json",
            authToken: authtoken,
          },
        }
      )
        .then((response) => {
          // console.log("get", response.data);
          let updatedArray = [...otpTokenDetails];
          setLoading(false);
          for (
            let index = 0;
            index < response.data.resultData.length;
            index++
          ) {
            const element = response.data.resultData[index];
            let updatedTokenIDX = otpTokenDetails.findIndex(
              (item) => item.category == element.category
            );
            updatedArray[updatedTokenIDX] = element;
            setOtpTokenDetails(updatedArray);
          }
          setTokenData({ ...tokenData, isLoading: false });

          if (
            !(
              response.data.resultCode == -1 ||
              response.data.resultMessage == "Unable to get tokens"
            )
          ) {
            setRows(response.data.resultData);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setRows([]);
          setLoading(false);
          setTokenData({
            isLoading: false,
            isSuccess: false,
            isError: true,
            isSnackbarOpen: true,
          });
        });
    };
    return fetchData();
  }, [appId]);
  const [status, setStatus] = React.useState("");

  /******************************************************************************************************/
  console.log({ otpTokenDetails });
  const handleStatusChange = async (e, row) => {
    e.preventDefault();

    //console.log(index)
    //let status = e.target.value == 1 ? "active" : status == -2 ? "suspended" : status == -5 ? "lost" : ""
    // let category = e.target.value ==
    // console.log("selcted value", e.target.value, "seleted row", row, rows);
    await Server.post(
      `/token/changeStatus?userId=${userId}&status=${e.target.value}&appId=${appId}&requestTime=${requestTime}&category=${row.category}&subcategory=${row.subcategory}`,
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
        // console.log(response.data);
        if (response.data.resultCode == 0) {
          Swal.fire("Success", response.data.resultMessage, "success");
          setOtpTokenDetails(otpTokenDetails.map((item) => {
            if (item.category == row.category) {
              item.status = e.target.value;
            }
            return item;
          }))
        } else Swal.fire("Error", response.data.resultMessage, "error");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /******************************************************************************************************/

  const handleAssignToken = async (e, row) => {
    setOpenEdit(false);
    console.log("assign", e.target.value);
    console.log("assign", row);
    e.preventDefault();
    let serialNo = "";
    let subcategory = e.target.value;

    if (row.category == 2) {
      serialNo = "";
    } else {
      serialNo = "56";
    }

    console.log("selcted value", e.target.value, "seleted row", row, rows);
    console.log(row.category);
    console.log(subcategory);
    console.log(serialNo);
    console.log(accountId);
    await Server.post(
      `/token/assign?userId=${userId}&appId=${appId}&requestTime=${requestTime}&category=${row.category}&subcategory=${subcategory}&serailNo=${serialNo}`,
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
        console.log(response);
        if (response.data.resultCode == 0) {
          Swal.fire({
            title: "Success",
            text: response.data.resultMessage,
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        } else {
          Swal.fire("Error", response.data.resultMessage, "error");
        }
      })
      .catch((err) => {
        // console.log(err);
        Swal.fire({
          title: "Error",
          text: err,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok!!!",
        });
      });
  };


  const TOKENS = [
    "Software Token",
    "Hardware Token",
    "OOB Token",
    "Push Token",
  ];

  const [openEdit, setOpenEdit] = React.useState(false);
  const [category, setCategory] = useState(1);
  const [tokenDetails, setTokenDetails] = useState({});
  const handleClickOpenEdit = (token) => {
    setOpenEdit(true);
    setCategory(token.category);
    setTokenDetails(token);
  };
  console.log({ category });
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  console.log({ tokenDetails });

  const [otpDialog, setOtpDialog] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  console.log({ otpValue });
  const openOTPDialogBox = (e, row) => {
    e.preventDefault();
    setOtpDialog(true);
    setTokenDetails(row);
  };
  console.log({ appId });
  const handleVerifyOTP = async (token) => {
    setOtpDialog(false);
    await Server.post(
      `/token/verifyOTP?userId=${userId}&appId=${appId}&requestTime=${requestTime}&category=${token.category}&OTP=${otpValue}`,
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
      .then((res) => {
        console.log(res.data);
        //if(response.data.resultMessage == "SUCCESS"){}
        if (res.data.resultCode == 0) {
          Swal.fire("Success", res.data.resultMessage, "success");
        } else {
          Swal.fire("Error", res.data.resultMessage, "error");
        }
        // history.push({
        //   pathname: "/UserDetails"
        // })
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Something went wrong.!!!",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok!",
        });
      });
  };
  const handleUnassignToken = (row) => {
    console.log("unassign", row);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unassign it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(accountId)
        // console.log(location.state.row.userid)
        // console.log(requestTime)
        // console.log(row.category)
        Server.post(
          `/token/unassign?userId=${userId}&appId=${appId}&requestTime=${requestTime}&category=${row.category}`,
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
            if (response.data.resultCode == 0) {
              
              setRows(rows.filter((item) => item.userid !== userId));
              if(response.data.resultMessage == "Unable to unassign token to user") {
                Swal.fire("Error", response.data.resultMessage, "error");
              }  else {
                Swal.fire("Success", response.data.resultMessage, "success");
              }
            } else {
              Swal.fire("Error", response.data.resultMessage, "error");
            }
          })
          .catch((err) => {
            console.log(err);
            setRows([]);
            Swal.fire("Error", err, "error");
          });
      }
    });
  };
 

  const [type, setType] = useState(0);
  const [regDialog, setRegDialog] = useState(false);
  const handleRegDialogOpen = (e) => {
    setOpenEdit(false);
    setType(e.target.value);
    setRegDialog(true);
  };
  const handleRegistrationCode = async (e) => {
    e.preventDefault();
    setRegDialog(false);
    await Server.post(
      `/token/sendRegistrationCode?userId=${userId}&appId=${appId}&requestTime=${requestTime}&category=${tokenDetails.category}&type=${type}`,
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
      .then((res) => {
        console.log(res.data);
        if (res.data.resultCode == 0) {
          Swal.fire("Success", res.data.resultMessage, "success");
        } else {
          Swal.fire("Error", res.data.resultMessage, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Something went wrong.!!!",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok!",
        });
      });
  };

  const handleChangeTokenType = async (e, row) => {
    console.log("ctt", row);
    e.preventDefault();
    setOpenEdit(false);
    await Server.post(
      `/token/changeTokenType?userId=${userId}&appId=${appId}&requestTime=${requestTime}&category=${row.category}&subcategory=${e.target.value}`,
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
      .then((res) => {
        console.log(res);
        if (res.data.resultCode == 0) {
          Swal.fire({
            title: "Success",
            text: res.data.resultMessage,
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: res.data.resultMessage,
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Something went wrong.!!!",
          text: "",
          icon: "warning",
          showCancelButton: true,
          //confirmButtonColor: '#3085d6',
          cancelButtonColor: "#d33",
          //confirmButtonText: 'Ok!'
        });
      });
  };
  const PushMethodHandle = async (e) => {
    e.preventDefault();
    setOpenEdit(false);
    if (e.target.value === 1) {
      handleAssignToken(e, tokenDetails);
    } else if (e.target.value === 2) {
      handleUnassignToken(e, tokenDetails);
    }
  };
  /******************************************************************************************************/
  return (
    <div style={{ minWidth: "75vw", marginBottom: "1rem", marginTop: "-2rem" }}>
      {/* <TableContainer>
        <Table aria-label="customized table">
          <TableHead style={{ width: "100% !important" }}>
            <TableRow>
              <StyledTableCell>Token Type</StyledTableCell>
              <StyledTableCell align="center">Sub Type</StyledTableCell>
              <StyledTableCell align="center">Serial No</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Attempts</StyledTableCell>
              <StyledTableCell align="center">Access</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {otpTokenDetails.map((token, idx) => (
              <TableRow>
                <>
                  <StyledTableCell>
                    {token.category == 1
                      ? "Software Token"
                      : token.category == 2
                      ? "Hardware Token"
                      : token.category == 3
                      ? "OOB Token"
                      : "Push Token"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {token.category == 1 ? (
                      <SoftwareSub token={token} />
                    ) : token.category == 2 ? (
                      <HardwareSub token={token} />
                    ) : token.category == 3 ? (
                      <OobSub token={token} />
                    ) : (
                      <PushSub token={token} />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {token.serialnumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {token.category == 1 ? (
                      <SoftwareActionDropdown token={token} />
                    ) : token.category == 2 ? (
                      <HardwareActionDropdown token={token} />
                    ) : token.category == 3 ? (
                      <OobActionDropdown token={token} />
                    ) : (
                      <PushActionDropdown token={token} />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // label="Status"
                      value={
                        token.status == 1
                          ? "active"
                          : token.status == -2
                          ? "suspended"
                          : ""
                      }
                      onChange={(e) => handleStatusChange(e, token)}
                      size="small"
                      style={{ width: 130, height: 40 }}
                    >
                      <MenuItem value={"active"}>Active</MenuItem>
                      <MenuItem value={"suspended"}>Suspended</MenuItem>
                    </Select>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {token.attempts}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {token.lastaccessOn.length == 0
                      ? "---"
                      : moment(token.lastaccessOn).format("D-M-YYYY, h:mm:ss")}
                  </StyledTableCell>
                </>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <br />
      <br />
      {/*New Structure */}

      {loading ? (
        <Loader />
      ) : (
        <TableContainer>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Token Type</StyledTableCell>
                <StyledTableCell align="center">Sub Type</StyledTableCell>
                <StyledTableCell align="center">Serial No</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Attempts</StyledTableCell>
                <StyledTableCell align="center">Access</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {otpTokenDetails.map((token, idx) => (
                <TableRow>
                  <StyledTableCell align="center">
                    {TOKENS[idx]}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {token.category == 1 ? (
                      <>
                        {token.subcategory == 1
                          ? "Web"
                          : token.subcategory == 2
                          ? "Mobile"
                          : "NA"}
                      </>
                    ) : token.category == 2 ? (
                      <></>
                    ) : token.category == 3 ? (
                      <>
                        {token.subcategory == 1
                          ? "SMS"
                          : token.subcategory == 2
                          ? "Voice"
                          : token.subcategory == 3
                          ? "USSD"
                          : token.subcategory == 4
                          ? "Email"
                          : ""}
                      </>
                    ) : (
                      <></>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {token?.serialnumber && token.serialnumber.length > 0
                      ? token.serialnumber
                      : "NA"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={token?.status && token?.status}
                        label="Status"
                        size="small"
                        onChange={(e) => handleStatusChange(e, token)}
                      >
                        <MenuItem value={0}>Assigned</MenuItem>
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={-2}>Suspended</MenuItem>
                        <MenuItem value={-1}>Locked</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {token?.attempts}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {token.lastaccessOn.length == 0
                      ? "NA"
                      : moment(token.lastaccessOn).format("D-M-YYYY, h:mm:ss")}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {token.category == 4 ? (
                      <>
                        <Button
                          value={0}
                          onClick={(e) => handleAssignToken(e, token)}
                          color="primary"
                          variant="contained"
                          size="small"
                          style={{
                            marginRight: "0.5rem",
                            textTransform: "capitalize",
                          }}
                        >
                          Assign
                        </Button>
                      </>
                    ) : (
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        style={{ textTransform: "capitalize" }}
                        onClick={() => handleClickOpenEdit(token)}
                        disabled={token.category == 2 ? true : false}
                      >
                        Actions
                      </Button>
                    )}

                    {token.category == 4 ? (
                      ""
                    ) :(
                      <Button
                        style={{
                          margin: "0 0.5rem",
                          textTransform: "capitalize",
                          backgroundColor: token.category == 2 ? "rgba(224, 224, 224, 1)" : "#f7ba2c",
                        }}
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={(e) => openOTPDialogBox(e, token)}
                        disabled={token.category == 2 ? true : false}
                      >
                        Verify OTP
                      </Button>
                    )}
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      style={{ textTransform: "capitalize" }}
                      onClick={() => handleUnassignToken(token)}
                      disabled={token.category == 2 ? true : false}
                    >
                      Unassign
                    </Button>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Edit Token Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Assign or Edit token details
          </DialogContentText>
          {category == 1 ? (
            <div>
              <br />
              <FormControl fullWidth>
                <InputLabel>Assign Token Method</InputLabel>
                <Select
                  label="Assign Token Method"
                  onChange={(e) => handleAssignToken(e, tokenDetails)}
                >
                  <MenuItem value={1}>Web</MenuItem>
                  <MenuItem value={2}>Mobile</MenuItem>
                </Select>
              </FormControl>
              <br />

              <div
                style={{
                  width: "20rem",

                  marginTop: "1rem",
                }}
              >
                <label>(Re)send Registration Code Via Mail/SMS</label>
                <FormControl fullWidth>
                  <InputLabel>(Re)send Registration Code</InputLabel>
                  <Select
                    // value={}
                    label="(Re)send Registration Code"
                    onChange={(e) => handleRegDialogOpen(e)}
                  >
                    <MenuItem value={1}>Via Email</MenuItem>
                    <MenuItem value={2}>Via Text Message</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {/* <br/>
               <div style={{display:"flex", flexDirection:"row", width:"30rem", justifyContent:"space-between"}}>
              <TextField
              sx={{width:"65%"}}
                id="outlined-basic"
                label="Enter OTP"
                variant="outlined"
                size="small"
              />
                  <Button sx={{width:"30%"}} color="primary" variant="contained">
                    Verify OTP
                  </Button>
                
               </div> */}
            </div>
          ) : category == 2 ? (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "30rem",
                  justifyContent: "space-between",
                }}
              >
                <FormControl sx={{ width: "65%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Asssign Hardware Token Methods
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={}
                    label="Assign Hardware Methods"
                    size="small"
                    onChange={setStatus}
                  >
                    <MenuItem value={1}>Assign</MenuItem>
                    <MenuItem value={2}>Unassign</MenuItem>
                    <MenuItem value={3}>Resync Token</MenuItem>
                    <MenuItem value={2}>Replace Token</MenuItem>
                    <MenuItem value={2}>PUK Token</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  sx={{ width: "30%" }}
                  color="secondary"
                  variant="contained"
                >
                  Send OTP
                </Button>
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "30rem",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  sx={{ width: "65%" }}
                  id="outlined-basic"
                  label="Enter OTP"
                  variant="outlined"
                  size="small"
                />
                <Button
                  sx={{ width: "30%" }}
                  color="primary"
                  variant="contained"
                >
                  Verify OTP
                </Button>
              </div>
            </div>
          ) : category == 3 ? (
            <div>
              <br />
              <div
                style={{
                  width: "30rem",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Assign Token Method
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Assign Token Method"
                    value={tokenDetails.subcategory}
                    onChange={(e) => handleAssignToken(e, tokenDetails)}
                  >
                    <MenuItem value={1}>SMS</MenuItem>
                    <MenuItem value={2}>Voice</MenuItem>
                    <MenuItem value={3}>USSD</MenuItem>
                    <MenuItem value={4}>Email</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <br />
              <div
                style={{
                  width: "30rem",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Change Assign Token Method
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label=" Change Assign Token Method"
                    value={tokenDetails.subcategory}
                    onChange={(e) => handleChangeTokenType(e, tokenDetails)}
                  >
                    <MenuItem value={1}>SMS</MenuItem>
                    <MenuItem value={2}>Voice</MenuItem>
                    <MenuItem value={3}>USSD</MenuItem>
                    <MenuItem value={4}>Email</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <br />
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "30rem",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  sx={{ width: "65%" }}
                  id="outlined-basic"
                  label="Enter OTP"
                  variant="outlined"
                  size="small"
                />
                <Button
                  sx={{ width: "30%" }}
                  color="primary"
                  variant="contained"
                >
                  Verify OTP
                </Button>
              </div> */}
            </div>
          ) : (
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Assign/Unassgin Token Method
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={}
                  label="Assign/Unassgin Token Method"
                  size="small"
                  onChange={(e) => PushMethodHandle(e)}
                >
                  <MenuItem value={1}>Assign</MenuItem>
                  <MenuItem value={2}>Unassign</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {/* <Button color="primary" variant="contained" onClick={handleCloseEdit}>Submit</Button> */}
          <Button onClick={handleCloseEdit}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Verify OTP  */}
      <Dialog
        open={otpDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Verify OTP Here"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div
              style={{
                width: "30rem",

                marginTop: "1rem",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter OTP"
                variant="outlined"
                size="small"
                defaultValue={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ width: "30%" }}
            color="primary"
            variant="contained"
            onClick={() => handleVerifyOTP(tokenDetails)}
          >
            Verify OTP
          </Button>
          <Button onClick={() => setOtpDialog(false)}>Cancle</Button>
        </DialogActions>
      </Dialog>

      {/* Reg Dialog */}
      <Dialog
        open={regDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"(Re)send Registration Code"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure? to (Re)send registration code.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={handleRegistrationCode}
          >
            Yes
          </Button>
          <Button onClick={() => setRegDialog(false)} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
