import React, { useState } from "react";
import Server from "../APIUrl";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function AdminCertficate(data) {
  const location = useLocation();
  // console.log(location.state.row.userid);
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [rows, setRows] = React.useState({});
  const [certificateData, setCertificateData] = React.useState({
    isLoading: true,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,
    isShow: false,
  });

  const [resultCode, setResultCode] = useState(0);
  console.log("cData : ",location.state.row)
  React.useEffect(() => {
    // setApplicationData({ ...applicationData,isLoading: true })

    Server.get(
      `/certificate/getByUserId?accountId=${accountId}&userId=${location.state.row.operatorid}&appId=${location.state.row.appid}&requestTime=${requestTime}`,
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
        setCertificateData({ ...certificateData, isLoading: false });
        setResultCode(response.data.resultCode);

        if (response.data.resultCode === 0) {
          setRows(response.data.resultData);
        } else {
        setRows([])
        }
      })
      .catch((err) => {
        console.log(err);
        setRows([]);

        setCertificateData({
          isLoading: false,
          isSuccess: false,
          isError: true,
          isSnackbarOpen: true,
        });
      });
  }, []);

  const generateCertificateByUserId = () => {
    //e.preventDefault();
    //console.log("Please delete Specific Row", row);
    // console.log(row.unitid);

    Server.post(
      `/certificate/generate?accountId=${accountId}&appId=${location.state.row.appid}&userId=${location.state.row.operatorid}&requestTime=${requestTime}`,
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
        if (
          response.data.resultCode === 0
        ) {
          setResultCode(response.data.resultCode);
          Swal.fire({
            title: "Success",
            text: response.data.resultMessage,
            icon: "success",
          })
        }else{
            Swal.fire({
                title: "Error",
                text: response.data.resultMessage,
                icon: "error",
            })
        }
    
      })
      .catch((err) => {
        console.log(err);
        setRows([]);
        Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
        })
      });
  };

  const handleRevokeCertificate = () => {
    //e.preventDefault();
    //console.log("Please delete Specific Row", row);
    // console.log(row.unitid);

    Server.delete(
      `/certificate/delete?accountId=${accountId}&userId=${location.state.row.operatorid}&appId=${location.state.row.appid}&requestTime=${requestTime}`,
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
      if(response.data.resultCode===0){
        setResultCode(response.data.resultCode);
        //setRows(rows.filter((item)=>item.userid != rows.userid))
       Swal.fire({
        title: "Success",
        text: response.data.resultMessage,
        icon: "success",
       })
      }else{
        Swal.fire({
            title: "Error",
            text: response.data.resultMessage,
            icon: "error",
        })
      }
      })
      .catch((err) => {
        console.log(err);
        // setRows([])
        Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
        })
      });
  };

  const handleRenewCertificate = () => {
    //e.preventDefault();
    //console.log("Please delete Specific Row", row);
    //console.log(row.unitid);

    Server.post(
      `/certificate/renew?accountId=${accountId}&userId=${location.state.row.operatorid}&appId=${location.state.row.appid}&requestTime=${requestTime}`,
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
        if(response.data.resultCode===0){
          setResultCode(response.data.resultCode);
          
          Swal.fire({
            title: "Success",
            text: response.data.resultMessage,
            icon: "success",
          })
        }else{
            Swal.fire({
                title: "Error",
                text: response.data.resultMessage,
                icon: "error",
            })
        }
      })
      .catch((err) => {
        console.log(err);
        // setRows([])
        Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
        })
      });
  };

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          {resultCode == 0 ? (
            <>
              <Grid item xs={3} md={3}>
                Serial Number
              </Grid>

              <Grid item xs={8} md={7}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="srno"
                  id="srno"
                  variant="outlined"
                  value={rows.srNo}
                  readonly
                />
              </Grid>

              <Grid item xs={3} md={3}>
                Algorithm
              </Grid>

              <Grid item xs={8} md={7}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="srno"
                  id="srno"
                  variant="outlined"
                  value={rows.algoName}
                  readonly
                />
              </Grid>

              <Grid item xs={3} md={3}>
                User Details
              </Grid>

              <Grid item xs={8} md={7}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="srno"
                  id="srno"
                  variant="outlined"
                  value={rows.issuerDetails}
                  readonly
                />
              </Grid>

              <Grid item xs={3} md={3}>
                Issued On
              </Grid>

              <Grid item xs={8} md={7}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="creationdatetime"
                  id="creationdatetime"
                  variant="outlined"
                  value={rows.issuedOn}
                  readonly
                />
              </Grid>

              <Grid item xs={3} md={3}>
                Valid till
              </Grid>

              <Grid item xs={8} md={7}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="srno"
                  id="srno"
                  variant="outlined"
                  value={rows.validTill}
                  readonly
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={3} md={3}>
                Action
              </Grid>

              <Grid item xs={8} md={2}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ padding: "6px" }}
                  onClick={(e) => generateCertificateByUserId()}
                >
                  Assign
                </Button>
              </Grid>

              <Grid item xs={3} md={7}></Grid>
            </>
          )}
          <Grid item xs={8} md={3}></Grid>

          <Grid item xs={8} md={4}>
            <Button type="text" onClick={(e) => handleRenewCertificate()}>
              Renew Certificate
            </Button>
          </Grid>

          <Grid item xs={8} md={4}>
            <Button type="text" onClick={(e) => handleRevokeCertificate()}>
              Revoke Certificate
            </Button>
          </Grid>
        </Grid>
      </Box>

      <br />
      <br />
      <br />
    </>
  );
}

export default AdminCertficate;
