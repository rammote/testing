import { Stack, Typography, Divider, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import XMLFileUpload from "./XMLFileUpload";
import PasswordFileUpload from "./PasswordFileUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import Server from "../APIUrl";
import ValidTokensTable from "./ValidTokensTable";
import ButtonGroup from "@mui/material/ButtonGroup";
import InvalidTokensTable from "./InvaliedTokensTable";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function UploadToken() {
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const accountId = sessionStorage.getItem("accountId");
  const [XMLFile, setXMLFile] = useState("");
  const [password, setPassword] = useState("");
  const [xmlPasswordFile, setXmlPasswordFile] = useState("");
  const authToken = sessionStorage.getItem("jwtToken");
  const [unitList, setUnitList] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [isResultSuccess, setIsResultSuccess] = useState(true);
  const [successOTPEntriesData, setSuccessOTPEntriesData] = useState([]);
  const [failedOTPEntriesData, setFailedOTPEntriesData] = useState([]);

  const handleChange = (e) => {
    setSelectedUnit(e.target.value);
  };
  console.log({ selectedUnit });
  useEffect(() => {
    return getUnitList();
  }, []);
  const getUnitList = async () => {
    try {
      const response = await Server.get(
        `/unit/getAll?accountId=${accountId}&requestTime=${requestTime}`,
        {
          headers: {
            "content-type": "application/json",
            authToken,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      );
      setUnitList(response?.data?.resultData ?? []);
      console.log({ res: response?.data?.resultData });
      if (response?.data?.resultData.length > 0) {
        setSelectedUnit(response?.data?.resultData[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log({ password, XMLFile });
  async function handleUploadToken(e) {
    e.preventDefault();

    if (!password && !XMLFile && !XMLFile) {
      Swal.fire("Error", "Please fill all the input fields", "error")
      return;
    }
    if (password && xmlPasswordFile) {
      Swal.fire(
        "Warning",
        "Please use either xml/txt Password file or password input value. Don't use both of them at the same time",
        "warning"
      );
      return;
    } else {
      if (password && !xmlPasswordFile) {
        setIsLoading(true);
        let data = new FormData();
        data.append("otpXmlFile", XMLFile);
        try {
          const res = await Server.post(
            `/token/improtHardwareTokens?unitId=${selectedUnit?.unitid}&password=${password}`,
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
          console.log({ res });
          if (res?.data?.resultCode === 0) {
            setSuccessOTPEntriesData(res?.data?.resultData?._successOTPENTRIES);
            setFailedOTPEntriesData(res?.data?.resultData?._failedOTPENTRIES);
          } else {
            Swal.fire("Warning", res.data.resultMessage, "warning");
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);

          Swal.fire("Error", "Failed to submit", "error");
        }
      } else if (!password && xmlPasswordFile) {
        setIsLoading(true);
        const data = new FormData();
        data.append("otpXmlFile", XMLFile);
        data.append("passwordXmlFile", xmlPasswordFile)
        try {
          const res = await Server.post(
            `/token/ImprotHardwareTokens?unitId=${selectedUnit?.unitid}`,
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
          console.log({ res });
          if (res?.data?.resultCode === 0) {
            setSuccessOTPEntriesData(res?.data?.resultData?._successOTPENTRIES);
            setFailedOTPEntriesData(res?.data?.resultData?._failedOTPENTRIES);
          } else {
            Swal.fire("Warning", res.data.resultMessage, "warning");
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);

          Swal.fire("Error", "Failed to submit", "error");
        }
      }
    }

  }
  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: "bold" }} color="primary">
        Hardware OTP Token Uploader:
      </Typography>
      <ol style={{ width: "60%" }}>
        <li>
          Please select PSKC file(XML File) having hardware token.
        </li>
        <li>
          Please select password file to access the token secrets.{" "}
        </li>
      </ol>
      <Divider />
      <br />
      <div>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={3}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={10}
          >
            <Typography variant="p" sx={{ fontSize: "1rem" }}>
              Unit Name:{" "}
            </Typography>

            <FormControl sx={{ m: 1, minWidth: 300 }} size="small" required>
              <InputLabel id="demo-simple-select-label">Unit Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
                label="Unit Name"
              >
                {unitList &&
                  unitList.map((item, index) => {
                    return <MenuItem value={item}>{item?.name}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Stack>
          <XMLFileUpload setXMLFile={setXMLFile} />
          <PasswordFileUpload
            setPassword={setPassword}
            setXmlPasswordFile={setXmlPasswordFile}
          />
          <LoadingButton
            loading={isLoading}
            variant="contained"
            size="small"
            color="primary"
            onClick={handleUploadToken}
            sx={{ textTransform: "capitalize" }}
          >
            Import Token Secret
          </LoadingButton>
        </Stack>
      </div>
      <br />
      {(successOTPEntriesData && successOTPEntriesData.length > 0) || (failedOTPEntriesData && failedOTPEntriesData.length > 0) ? <div>
        <Typography variant="h6">Tokens Result: </Typography>
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
            Success{" "}
          </Button>
          <Button
            color="error"
            variant={isResultSuccess ? "outlined" : "contained"}
            onClick={(e) => setIsResultSuccess(false)}
            sx={{ textTransform: "capitalize", width: 150 }}
          >
            Failed{" "}
          </Button>
        </ButtonGroup>
      </div> : ""}
      <br />
      {isResultSuccess ? (
        <ValidTokensTable successOTPEntriesData={successOTPEntriesData} />
      ) : (
        <InvalidTokensTable failedOTPEntriesData={failedOTPEntriesData} />
      )}
    </div>
  );
}
