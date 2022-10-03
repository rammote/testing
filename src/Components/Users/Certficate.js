import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Server from "../APIUrl";
import Loader from "../Loader";

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

function Certficate({ appId }) {
  const location = useLocation();
  // console.log(location.state.row.userid);
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [rows, setRows] = React.useState({});
  const [loading, setLoading] = useState(false);
  const [certificateData, setCertificateData] = React.useState({
    isLoading: true,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,
    isShow: false,
  });

  const [resultCode, setResultCode] = useState(0);

  React.useEffect(() => {
    // setApplicationData({ ...applicationData,isLoading: true })

    console.log(location.state.row.userid);
    console.log(appId);
    return fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    Server.get(
      `/certificate/getByUserId?accountId=${accountId}&userId=${location.state.row.userid}&appId=${appId}&requestTime=${requestTime}`,
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
        setCertificateData({
          ...certificateData,
          isLoading: false,
        });
        setResultCode(response.data.resultCode);

        if (
          response.data.resultCode == 0 ||
          response.data.resultMessage == "Success"
        ) {
          setRows(response.data.resultData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setRows([]);
        setLoading(false);
        setCertificateData({
          isLoading: false,
          isSuccess: false,
          isError: true,
          isSnackbarOpen: true,
        });
      });
  };
  const generateCertificateByUserId = async () => {
    //e.preventDefault();
    //console.log("Please delete Specific Row", row);
    // console.log(row.unitid);
    setLoading(true);
    await Server.post(
      `/certificate/generate?accountId=${accountId}&userId=${location.state.row.userid}&appId=${appId}&requestTime=${requestTime}`,
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
        
        setLoading(false);
        if (response.data.resultCode === 0) {
          fetchData();
          setResultCode(response.data.resultCode);

          Swal.fire("Success", response.data.resultMessage, "success");
        } else {
          Swal.fire("Error", response.data.resultMessage, "error");
        }
        //setRows(rows.filter((item)=>item.userid != rows.userid))
      })
      .catch((err) => {
        console.log(err);
        setRows([]);
        Swal.fire("Error", err, "error");
      });
  };

  const handleRevokeCertificate = async () => {
    setLoading(true);
    await Server.delete(
      `/certificate/delete?accountId=${accountId}&userId=${location.state.row.userid}&appId=${appId}&requestTime=${requestTime}`,
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
        setLoading(false);
        fetchData();
        console.log(response.data);
        setResultCode(response.data.resultCode);
        //setRows(rows.filter((item)=>item.userid != rows.userid))
        Swal.fire(
          "Revoke Certificate Successfully!",
          "Your Certificate Revoke Successfully.",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        // setRows([])
      });
  };

  const handleRenewCertificate = async () => {
    //e.preventDefault();
    //console.log("Please delete Specific Row", row);
    // console.log(row.unitid);
    setLoading(true);
    await Server.post(
      `/certificate/renew?accountId=${accountId}&userId=${location.state.row.userid}&appId=${appId}&requestTime=${requestTime}`,
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
        setResultCode(response.data.resultCode);
        setLoading(false);
        //setRows(rows.filter((item)=>item.userid != rows.userid))
        if (response.data.resultCode === 0) {
          fetchData();
          Swal.fire("Success", response.data.resultMessage, "success");
        } else {
          Swal.fire("Error", response.data.resultMessage, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        // setRows([])

        Swal.fire("Error", err, "error");
      });
  };

  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <div>
          <br />{" "}
          {resultCode == 0 ? (
            <>
              <Grid container spacing={3}>
                <Grid item xs={3} md={2}>
                  Serial Number{" "}
                </Grid>
                <Grid item xs={8} md={9}>
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
                </Grid>{" "}
              </Grid>{" "}
              <br />
              <Grid container spacing={3}>
                <Grid item xs={3} md={2}>
                  Algorithm{" "}
                </Grid>
                <Grid item xs={8} md={9}>
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
                </Grid>{" "}
              </Grid>{" "}
              <br />
              <Grid container spacing={3}>
                <Grid item xs={3} md={2}>
                  User Details{" "}
                </Grid>
                <Grid item xs={8} md={9}>
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
                </Grid>{" "}
              </Grid>{" "}
              <br />
              <Grid container spacing={3}>
                <Grid item xs={3} md={2}>
                  Issued On{" "}
                </Grid>
                <Grid item xs={8} md={9}>
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
                </Grid>{" "}
              </Grid>{" "}
              <br />
              <Grid container spacing={3}>
                <Grid item xs={3} md={2}>
                  Valid till{" "}
                </Grid>
                <Grid item xs={8} md={9}>
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
                </Grid>{" "}
              </Grid>{" "}
            </>
          ) : (
            <>
              <br />
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  Action{" "}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      padding: "6px",
                    }}
                    onClick={(e) => generateCertificateByUserId()}
                  >
                    Assign{" "}
                  </Button>{" "}
                </Grid>{" "}
              </Grid>
            </>
          )}{" "}
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}></Grid>

            <Grid item xs={12} md={4}>
              <Button
                color="primary"
                variant="contained"
                type="text"
                onClick={(e) => handleRenewCertificate()}
              >
                {" "}
                Renew Certificate{" "}
              </Button>{" "}
            </Grid>

            <Grid item xs={12} md={4}>
              <Button
                type="text"
                olor="primary"
                variant="contained"
                onClick={(e) => handleRevokeCertificate()}
              >
                {" "}
                Revoke Certificate{" "}
              </Button>{" "}
            </Grid>
          </Grid>{" "}
          <br /> <br /> <br /> <br />
        </div>
      )}{" "}
    </>
  );
}

export default Certficate;
