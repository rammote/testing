import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography, Button, Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Server from "../APIUrl";
import Loader from "../Loader";
import Swal from "sweetalert2";
import RiskReportChart from "./RBARiskChart";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ExportToJson } from "../ExportFunc";
import { SaveAlt } from "@mui/icons-material";

const StyledBreadcrumb = styled(Chip)(
  ({ theme }) => {
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
  },
  { index: 1 }
);
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "hidden",
  p: 4,
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflowY: "scroll",
  p: 4,
};
export default function Reports() {
  const [colType, setColType] = useState('');
  const [search, setSearch] = useState('');
  const accountId = sessionStorage.getItem("accountId");
  const authToken = sessionStorage.getItem("jwtToken");
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");
  const history = useHistory();
  const [duration, setDuration] = useState(7);
  const [pushReport, setPushReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = (params, type) => {
    setColType(type);
    console.log({ params: params?.value });
    setOpen(true);
    console.log("type", type);
    function average(arr) {
      let convertIntoArr;
      if (typeof arr === "string") {
        convertIntoArr = JSON.parse(arr);
      } else {
        convertIntoArr = arr;
      }
      console.log({ convertIntoArr });
      return (
        (convertIntoArr.reduce((a, b) => a + b, 0) / convertIntoArr.length)
          .toFixed(2)
          .toString() + "ms"
      );
    }
    if (type === "SDK") {
      let data = params?.value;
      console.log({ PARSE_DATA: data });

      if (data?.osName === "Android") {
        console.log("ANDROID");
        let typingSpeedParseData;
        if (typeof (data?.typingSpeed === "string")) {
          typingSpeedParseData = JSON.parse(data?.typingSpeed);
        } else if (data?.typingSpeed === "object") {
          typingSpeedParseData = data?.typingSpeed;
        } else {
          typingSpeedParseData = {};
        }
        console.log({ typingSpeedParseData });

        setDetails({
          "App Version": data?.appVersion || "NA",
          "Battery Level": data?.batteryLevel || "NA",
          "Battery Status": data?.batteryStatus || "NA",
          "Build Brand": data?.buildBrand || "NA",
          "Build Device": data?.buildDevice || "NA",
          "Build Display": data?.buildDisplay || "NA",
          "Build FingerPrint": data?.buildFingerPrint || "NA",
          "Build Hardware": data?.buildHardware || "NA",
          "Build Host": data?.buildHost || "NA",
          "Build ID": data?.buildID || "NA",
          "Build Manufacturer": data?.buildManufacturer || "NA",
          "Build Model": data?.buildModel || "NA",
          "Build Product": data?.buildProduct || "NA",
          "Build Time": data?.buildTime || "NA",
          "Build Type": data?.buildType || "NA",
          "Build Version": data?.buildVersion || "NA",
          "Carrier Name": data?.carrierName || "NA",
          "Default Language": data?.defaultLanguage || "NA",
          "Device ID": data?.deviceId || "NA",
          "Device Velocity": data?.deviceVelocity || "NA",
          Gravity: data?.gravity || "NA",
          Gyroscope: data?.gyroscope || "NA",
          Inclination: data?.inclination || "NA",
          "Installed Apps": data?.installedApps || "NA",
          "IP Address": data?.ipAddress,
          "Is Rooted": data?.isRooted,
          "Is VPN Used": data?.isVpnUsed,
          Latitude: data?.latitude || "NA",
          Longitude: data?.longitude || "NA",
          "MAC Address": data?.macAddress || "NA",
          "Magnetic Field": data?.magneticField || "NA",
          "OS Name": data?.osName || "NA",
          "Rotation Vector": data?.rotationVector || "NA",
          "Screen Resolution": data?.screenResolution || "NA",
          TimeStamp: data?.timeStamp || "NA",
          TimeZone: data?.timeZone || "NA",
          "Avg. Date of Birth  downDown Time":
            average(typingSpeedParseData?.etDob?.downDownTime) || "NA",
          "Avg. Date of Birth  downUp Time":
            average(typingSpeedParseData?.etDob?.downUpTime) || "NA",
          "Avg. Date of Birth  Key Hold Time":
            average(typingSpeedParseData?.etDob?.keyHoldTime) || "NA",
          "Avg. Date of Birth Key Length":
            typingSpeedParseData?.etDob?.keyLength || "NA",
          "Avg. Date of Birth  keyUpTime":
            average(typingSpeedParseData?.etDob?.keyHoldTime) || "NA",
          "Avg. Date of Birth Typing Speed":
            typingSpeedParseData?.etDob?.typingSpeed || "NA",
          "Avg. Date of Birth  upDownTime":
            average(typingSpeedParseData?.etDob?.upDownTime) || "NA",
          "Avg. Date of Birth  upUpTime":
            average(typingSpeedParseData?.etDob?.upUpTime) || "NA",

          "Avg. Mobile No.  downDown Time":
            average(typingSpeedParseData?.mobileNo?.downDownTime) || "NA",
          "Avg. Mobile No.  downUp Time":
            average(typingSpeedParseData?.mobileNo?.downUpTime) || "NA",
          "Avg. Mobile No.  Key Hold Time":
            average(typingSpeedParseData?.mobileNo?.keyHoldTime) || "NA",
          "Avg. Mobile No. Key Length":
            typingSpeedParseData?.mobileNo?.keyLength || "NA",
          "Avg. Mobile No.  keyUpTime":
            average(typingSpeedParseData?.mobileNo?.keyHoldTime) || "NA",
          "Avg. Mobile No. Typing Speed":
            typingSpeedParseData?.mobileNo?.typingSpeed || "NA",
          "Avg. Mobile No.  upDownTime":
            average(typingSpeedParseData?.mobileNo?.upDownTime) || "NA",
          "Avg. Mobile No.  upUpTime":
            average(typingSpeedParseData?.mobileNo?.upUpTime) || "NA",

          "Avg. Name  downDown Time":
            average(typingSpeedParseData?.name?.downDownTime) || "NA",
          "Avg. Name  downUp Time":
            average(typingSpeedParseData?.name?.downUpTime) || "NA",
          "Avg. Name  Key Hold Time":
            average(typingSpeedParseData?.name?.keyHoldTime) || "NA",
          "Avg. Name Key Length": typingSpeedParseData?.name?.keyLength || "NA",
          "Avg. Name  keyUpTime":
            average(typingSpeedParseData?.name?.keyHoldTime) || "NA",
          "Avg. Name Typing Speed":
            typingSpeedParseData?.name?.typingSpeed || "NA",
          "Avg. Name  upDownTime":
            average(typingSpeedParseData?.name?.upDownTime) || "NA",
          "Avg. Name  upUpTime":
            average(typingSpeedParseData?.name?.upUpTime) || "NA",
          "User Id": data?.userId || "NA",
          "Version Release": data?.versionRelease || "NA",
          "Wifi SSID": data?.wifiSsid || "NA",
        });
      } else {
        let typingDetails = data?.typingSpeed?.text;
        console.log({ authDetails: data, typingDetails });
        setDetails({
          "User Id": data?.userId || "NA",
          "Device ID": data?.deviceId || "NA",
          "Browser ID": data?.browserId || "NA",
          Browser: data?.buildManufacture || "NA",
          "Conncetion Type": data?.carrierName || "NA",
          "Cookies Enabled": data?.cookiesEnabled,
          "Default Language": data?.defaultLanguage || "NA",
          "Battery Level": data?.batteryLevel || "NA",
          "Battery Status": data?.batteryStatus || "NA",
          "IP Address": data?.ipAddress || "NA",
          "Is Mobile": data?.isMobile,
          Latitude: data?.latitude || "NA",
          Longitude: data?.longitude || "NA",
          "OS Name": data?.os || "NA",
          "Screen Resolution": data?.screenResolution || "NA",
          TimeStamp: data?.timestamp || "NA",
          TimeZone: data?.timeZone || "NA",
          "Typing Speed":
            Number(typingDetails?.typingSpeed).toFixed(2) + "milli Sec." ||
            "NA",
          "Typing Down Time": average(typingDetails?.downDownTime) || "NA",
          "Typing Up Time": average(typingDetails?.downUpTime) || "NA",
          "Key Down Time": average(typingDetails?.keyDownTime) || "NA",
          "Key Hold Time": average(typingDetails?.keyHoldTime) || "NA",
          "Key Length": typingDetails?.keyLength || "NA",
          "Key Up Time": average(typingDetails?.keyUpTime) || "NA",
          Sentence: typingDetails?.sentence || "NA",
          "Up Down Time": average(typingDetails?.upDownTime) || "NA",
          "Up Time": average(typingDetails?.upUpTime) || "NA",
        });
      }
    } else if (type === "Rules") {
      setDetails(params?.value);
      console.log("Rules", params?.value);
    } else {
      setDetails(params?.value);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setDetails("");
  };
  const [openDeviceDetails, setOpenDeviceDetails] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState([]);
  const handleCloseDeviceModal = () => {
    setOpenDeviceDetails(false);
  };
  const handleOpenDeviceModal = (data) => {
    setOpenDeviceDetails(true);
    setDeviceDetails({
      "Account Number": data?.accountnumber || "NA",
      "Purchase Amount":
        data?.purchaseamount === null ? "NA" : data?.purchaseamount,
      "Purchase Currency":
        data?.purchasecurrancy === null ? "NA" : data?.purchasecurrancy,
      "Device ID": data?.deviceid,
      "Device Velocity": data?.devicevelocity,
      "Ip Address": data?.ipaddress,
      "Is VPN Used": data?.isvpnused,
      "Is WIFI Used": data?.iswifiused,
    });
  };
  const handleChangeDuration = (event) => {
    setDuration(event.target.value);
  };

  const handleSearchOnChange = (e) => {
    setSearch(e.target.value);
  }
  const filterList = pushReport?.filter((row) => {
    if (search === '') {
      return row;
    }
    if (row?.deviceid?.toLowerCase().includes(search.toLowerCase())) {
      return row;
    }
    if (row?.userid?.toLowerCase().includes(search.toLowerCase())) {
      return row;
    }
    if (row?.trackingid?.toLowerCase().includes(search.toLowerCase())) {
      return row;
    }
    return null;
  });
  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{ margin: "0.5rem 0" }}>
        <Stack spacing={1} direction="row">
          <Button
            style={{ textTransform: "capitalize", width:'150px' }}
            color="primary"
            variant="contained"
            size="small"
            startIcon={<SaveAlt />}
            onClick={(e) => ExportToJson(e, filterList, "RBA_Report")}
          >
            Export to JSON
          </Button>
          <GridToolbarExport variant="contained" />
        </Stack>
      </GridToolbarContainer>
    );
  }

  console.log({ duration });
  const columns = [
    {
      field: "deviceid",
      headerName: "Device Id",
      sortable: true,
      minWidth: 100,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) =>
      params.value === null ? (
        "NA"
      ) : (
        <Button onClick={(e) => handleOpenDeviceModal(params.row)}>
          {params.value}
        </Button>
      ),
    },
    {
      field: "userid",
      headerName: "User Id",
      sortable: true,
      minWidth: 100,
      headerClassName: "bg-color",
      flex: 1,
    },
    {
      field: "trackingid",
      headerName: "Tracking Id",
      sortable: true,
      minWidth: 100,
      headerClassName: "bg-color",
      flex: 1,
    },

    {
      field: "userdetails",
      headerName: "User Details",
      sortable: true,
      minWidth: 100,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) =>
        params.value === null ? (
          "NA"
        ) : (
          <Chip
            sx={{ cursor: "pointer" }}
            onClick={(e) => handleOpen(params)}
            label="view"
            size="small"
            variant="outlined"
            color="primary"
          />
        ),
    },
    {
      field: "transactiondetails",
      headerName: "Transaction Details",
      sortable: true,
      minWidth: 100,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) =>
      params.value === null ? (
        "NA"
      ) : (
        <Chip
          sx={{ cursor: "pointer" }}
          onClick={(e) => handleOpen(params)}
          label="view"
          size="small"
          variant="outlined"
          color="primary"
        />
      ),
    },
    {
      field: "merchantdetails",
      headerName: "Merchant Details",
      sortable: true,
      minWidth: 100,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) =>
      params.value === null ? (
        "NA"
      ) : (
        <Chip
          sx={{ cursor: "pointer" }}
          onClick={(e) => handleOpen(params)}
          label="view"
          size="small"
          variant="outlined"
          color="primary"
        />
      ),
    },
    {
      field: "sdkdetails",
      headerName: "SDK Details",
      sortable: true,
      minWidth: 100,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) =>
        params.value === null ? (
          "NA"
        ) : (
          <Chip
            sx={{ cursor: "pointer" }}
            onClick={(e) => handleOpen(params,'SDK')}
            label="view"
            size="small"
            variant="outlined"
            color="primary"
          />
        ),
    },
    {
      field: "acsdetails",
      headerName: "ACS Details",
      sortable: true,
      minWidth: 100,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) =>
      params.value === null ? (
        "NA"
      ) : (
        <Chip
          sx={{ cursor: "pointer" }}
          onClick={(e) => handleOpen(params)}
          label="view"
          size="small"
          variant="outlined"
          color="primary"
        />
      ),
    },
    {
      field: "axiomriskscore",
      headerName: "Risk Score",
      sortable: true,
      minWidth: 100,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => (params.value === null ? "NA" : params?.value),
    },
    {
      field: "typingspeed",
      headerName: "Typing Speed",
      sortable: true,
      minWidth: 100,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => (params.value === null ? "NA" : params?.value),
    },
    {
      field: "createdon",
      headerName: "Created On",
      sortable: true,
      minWidth: 100,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => moment(params.value).format("lll"),
    },
  ];
  console.log({ pushReport });
  useEffect(() => {
    setLoading(true);
    if (accountId && authToken) {
      Server.get(
        `/reports/getRBAReport?requestTime=${requestTime}&accountId=${accountId}`,
        {
          headers: {
            "content-type": "application/json",
            authToken,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      )
        .then((res) => {
          setLoading(false);
          console.log({ Response: res.data });
          if (res.data.resultCode === 0) {
            const sortData=res?.data?.resultData.length>0 && res?.data?.resultData.sort((f,s)=> new Date(s?.createdon)-new Date(f?.createdon))
            setPushReport(sortData)
           
          } else {
            Swal.fire(
              "Error",
              res?.data?.resultMessage || "Failed to get data",
              "error"
            );
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [accountId, authToken]);

  return (
    <div style={{ paddingTop: "90px", marginLeft: "20px", paddingBottom:"3rem" }}>
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
              component="a"
              onClick={useCallback(() => history.push("/AxiomProtect/Reports"))}
              label="Reports"
              deleteIcon={<ExpandMoreIcon />}
            />
            <StyledBreadcrumb
              label="RBA Reports"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </Grid>
      </Grid>
      <br />
      <RiskReportChart />
      <br />

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography 
            style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"100%", alignItems:"center"}}
            sx={{fontFamily: 'Jost', fontSize: '20px', color: '#000000'}}
          >
            <h4>RBA Reports</h4>

        {/* <div>
          <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
            <InputLabel>Select Date</InputLabel>

            <Select
              value={duration}
              label="Select Date"
              onChange={handleChangeDuration}
              MenuProps={{
                getContentAnchorEl: null,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
              }}
            >
              <MenuItem value={7}>Last 7 days</MenuItem>
              <MenuItem value={14}>Last 2 weeks</MenuItem>
              <MenuItem value={30}>Last 1 month</MenuItem>
              <MenuItem value={90}>Last 3 months</MenuItem>
            </Select>
          </FormControl>
        </div> */}
            <input
              type="search"
              placeholder="Search by Device Id, User Id and Tracking Id"
              value={search}
              onChange={handleSearchOnChange}
              style={{
                borderRadius: "8px 8px",
                border: "1px solid",
                outline: "none",
                padding: 12,
                width: 350,
              }}
            />
          </Typography>
        </Grid>
      </Grid>

      <div
        style={{
          display: "grid",
          width: "calc(100vw - 260px)",
          placeItems: "center",
          marginRight: "0px",
        }}
      >
        <Box
          sx={{
            // height: 500,
            width: 1,
            "& .bg-color": {
              backgroundColor: "#0D4990",
              color: "#ffffff",
            },
          }}
        >
          {loading ? (
            <Loader />
          ) : (
            <DataGrid
              style={{
                width: "100%",
                margin: "0 auto",
                backgroundColor: "white",
                border: "none",
              }}
              rows={filterList ?? []}
              columns={columns}
              pageSize={8}
              //  rowsPerPageOptions={[7, 14, 30, 90]}
              getRowId={(row) => row?.trackingid}
              autoHeight={true}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          )}
        </Box>
      </div>

      <Modal
        open={openDeviceDetails}
        onClose={handleCloseDeviceModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {Object.keys(deviceDetails).map((keyName, i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={i}
                >
                  <div
                    style={{
                      width: "150px",
                      fontWeight: "bold",

                    }}
                  >
                    {keyName}:{" "}
                  </div>
                  <div>
                    {keyName === "Is VPN Used" ||
                      keyName === "Is WIFI Used" ? (
                      <div>
                        {
                          deviceDetails[keyName] === true ? <CheckCircleIcon sx={{ fontSize: "1rem" }} color="primary" /> : <CancelIcon sx={{ fontSize: "1rem" }} color="error" />
                        }
                      </div>
                    ) : (
                      deviceDetails[keyName]
                    )}
                  </div>
                </div>
              );
            })}
          </Stack>
          <br />
          <center>

            <Button size="small" variant="outlined" onClick={handleCloseDeviceModal} >Close</Button>
          </center>

        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            { colType === 'SDK' ?
              <>
            {Object.keys(details).map((keyName, i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                  key={i}
                >
                  <div
                    style={{
                      width: "160px",
                      fontWeight: "bold",
                    }}
                  >
                    {keyName}:{" "}
                  </div>
                  <div
                    style={{
                      width: "360px",
                    }}
                  >
                    {keyName === "Is Rooted" ||
                      keyName === "Is VPN Used" ? (
                      <div>
                        {
                          details[keyName] === true ? <CheckCircleIcon sx={{ fontSize: "1rem" }} color="primary" /> : <CancelIcon sx={{ fontSize: "1rem" }} color="error" />
                        }
                      </div>
                    ) : (
                      details[keyName]
                    )}
                  </div>
                </div>
              );
            })}</>
            : 
            <Typography variant="p" sx={{ width:200 }}>
              {details}
            </Typography>}
          </Stack>
          <br />

          <center>

            <Button size="small" variant="outlined" onClick={handleClose} >Close</Button>
          </center>
        </Box>
      </Modal>
    </div>
  );
}
