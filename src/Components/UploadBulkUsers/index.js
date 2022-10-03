import { Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import UploadUserFile from "./UploadUserFile";
import LoadingButton from "@mui/lab/LoadingButton";
import UserDataTable from './SuccessListTable';
import Server from '../APIUrl'
import Swal from "sweetalert2";
import ButtonGroup from "@mui/material/ButtonGroup";

import FailedListTable from "./FailedListTable";
export default function UploadBulkUsers() {
  const [loading, setLoading] = useState(false);
  const [CSVFile, setCSVFile] = useState("");
  const [usersData, setUsersData] = useState([])
  const authToken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");

  const [isSuccessList, setIsSuccessList] = useState(true)
  const [isResultSuccess, setIsResultSuccess] = useState(true);
  const [successListData, setSuccessListData] = useState([]);
  const [failedListData, setFailedListData] = useState([]);  

  console.log({ CSVFile });
  const handleUsersDataImport = async () => {
    if (CSVFile) {
      let data = new FormData();
      data.append("file", CSVFile)
      setLoading(true)
      try {
        const res = await Server.post(
          `/account/bulkAccountCreate?accountId=${accountId}`,
          data,
          {
            headers: {
              "content-type": "multipart/form-data",
              authToken,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
            },
          }
        );
        console.log(res?.data?.resultData?._failedOTPENTRIES)
        if (res?.data?.resultCode === 0) {
          setSuccessListData(res?.data?.resultData?._successOTPENTRIES);
          setFailedListData(res?.data?.resultData?._failedOTPENTRIES);
        } else {
          Swal.fire("Warning", res.data.resultMessage, "warning");
        }
        setLoading(false);
      } catch (error) {
        //Swal.fire("Error", error, "error")
        setLoading(false);

      }
    } else {
      setLoading(false);
      Swal.fire("Warning", "Please upload text file", "warning")
    }
  }
  return (
    <div style={{ marginTop: "5rem", width: "100vw", marginLeft: "1.5rem" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", pt: 1 }}>
        {" "}
        Creating Bulk Users
      </Typography>
      <br />
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold" }}
        color="primary"
      >
        Upload User Details:
      </Typography>
      <ul style={{ width: "60%" }}>
        <li>
          {" "}
          Please select the comma separated values(CVS) formatted file that
          contained the card details.
        </li>
        <li>You can upload multiple card details into system.</li>
        <li>
          If bank user id is specified then bank user id is checked with
          authentication system for token presence. If no bank user id is
          associated then unique card id is created in authentication system
          and SMS token is assigned to the card user
        </li>
      </ul>
      <form >
        <UploadUserFile setCSVFile={setCSVFile} />
        <LoadingButton
          loading={loading}
          variant="contained"
          size="small"
          onClick={handleUsersDataImport}
          sx={{ textTransform: "capitalize", mt: 1 }}
        >
          Import Users
        </LoadingButton>
      </form>
      <br />

      {(successListData && successListData.length > 0) || (failedListData && failedListData.length > 0) ? <div>
        <Typography variant="h6">Users Result: </Typography>
        <ButtonGroup
          variant="outlined"
          size="small"
          aria-label="outlined primary button group"
        >
          <Button
            color="primary"
            variant={isResultSuccess ? "contained" : "outlined"}
            onClick={(e) => setIsResultSuccess(true)}
            sx={{ textTransform: "capitalize", width: 150 }}
          >
            Success List{" "}
          </Button>
          <Button
            color="error"
            variant={isResultSuccess ? "outlined" : "contained"}
            onClick={(e) => setIsResultSuccess(false)}
            sx={{ textTransform: "capitalize", width: 150 }}
          >
            Failed List{" "}
          </Button>
        </ButtonGroup>
      </div> : ""}
      <br/>
      {isResultSuccess ? (<UserDataTable usersData={successListData} />) :
        <FailedListTable usersData={failedListData} />}
    </div>
  );
}
