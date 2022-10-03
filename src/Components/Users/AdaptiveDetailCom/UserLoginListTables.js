import React, { useState } from "react";
import { Chip, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  DataGrid,
  gridClasses,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import moment from "moment";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { ExportToJson } from "../../ExportFunc";
import { SaveAlt } from "@mui/icons-material";

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

export default function UserLoginListTable({ usersData }) {
  const [colType, setColType] = useState("");
  const [search, setSearch] = useState("");

  const handleSearchOnChange = (e) => {
    setSearch(e.target.value);
  };

  const filterList = usersData?.filter((row) => {
    if (search === "") {
      return row;
    }
    if (row?.deviceid?.toLowerCase().includes(search.toLowerCase())) {
      return row;
    }
    if (row?.typingspeed?.toLowerCase().includes(search.toLocaleLowerCase())) {
      return row;
    }
    if (row?.axiomconfidance === Number(search)) {
      return row;
    }
    if (row?.axiomriskscore === Number(search)) {
      return row;
    }
    return null;
  });

  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{ margin: "0.5rem 0" }}>
        <Stack spacing={1} direction="row">
          <Button
            style={{ textTransform: "capitalize", width: "150px" }}
            color="primary"
            variant="contained"
            size="small"
            startIcon={<SaveAlt />}
            onClick={(e) => ExportToJson(e, filterList, "UsersDetails")}
          >
            Export to JSON
          </Button>
          <GridToolbarExport variant="contained" />
        </Stack>
      </GridToolbarContainer>
    );
  }

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
          "Connection": data?.carrierName || "NA",
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
  //console.log("details",details)
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
  const columns = [
    {
      field: "deviceid",
      headerName: "Device Id",
      minWidth: 120,
      flex: 1,
      headerClassName: "bg-color",
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
      field: "typingspeed",
      headerName: "Typing Speed",
      minWidth: 70,
      flex: 1,
      headerClassName: "bg-color",
      renderCell: (params) => (params.value === null ? "NA" : params?.value),
    },
    {
      field: "axiomriskscore",
      headerName: "Risk Score",
      minWidth: 70,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => (params.value === null ? "NA" : params?.value),
    },
    {
      field: "axiomconfidance",
      headerName: "Confidence Score",
      minWidth: 70,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => (params.value === null ? "NA" : params?.value),
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 70,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => (params.value === null ? "NA" : params?.value),
    },
    {
      field: "country",
      headerName: "Country",
      minWidth: 70,
      headerClassName: "bg-color",
      flex: 1,
      renderCell: (params) => (params.value === null ? "NA" : params?.value),
    },

    // {
    //   field: "transactiondetails",
    //   headerName: "Transaction Details",
    //   minWidth: 70,
    //   flex: 1,
    //   headerClassName: "bg-color",
    //   renderCell: (params) =>
    //     params.value === null ? (
    //       "NA"
    //     ) : (
    //       <Chip
    //         sx={{ cursor: "pointer" }}
    //         onClick={(e) => handleOpen(params)}
    //         label="view"
    //         size="small"
    //         variant="outlined"
    //         color="primary"
    //       />
    //     ),
    // },
    // {
    //   field: "merchantdetails",
    //   headerName: "Merchant Details",
    //   minWidth: 70,
    //   flex: 1,
    //   headerClassName: "bg-color",
    //   renderCell: (params) =>
    //     params.value === null ? (
    //       "NA"
    //     ) : (
    //       <Chip
    //         sx={{ cursor: "pointer" }}
    //         onClick={(e) => handleOpen(params)}
    //         label="view"
    //         size="small"
    //         variant="outlined"
    //         color="primary"
    //       />
    //     ),
    // },
    // {
    //   field: "userdetails",
    //   headerName: "User Details",
    //   minWidth: 70,
    //   flex: 1,
    //   headerClassName: "bg-color",
    //   renderCell: (params) =>
    //     params.value === null ? (
    //       "NA"
    //     ) : (
    //       <Chip
    //         sx={{ cursor: "pointer" }}
    //         onClick={(e) => handleOpen(params)}
    //         label="view"
    //         size="small"
    //         variant="outlined"
    //         color="primary"
    //       />
    //     ),
    // },
    // {
    //   field: "acsdetails",
    //   headerName: "Acs Details",
    //   minWidth: 70,
    //   flex: 1,
    //   headerClassName: "bg-color",
    //   renderCell: (params) =>
    //     params.value === null ? (
    //       "NA"
    //     ) : (
    //       <Chip
    //         sx={{ cursor: "pointer" }}
    //         onClick={(e) => handleOpen(params)}
    //         label="view"
    //         size="small"
    //         variant="outlined"
    //         color="primary"
    //       />
    //     ),
    // },
    {
      field: "sdkdetails",
      headerName: "SDK Details",
      minWidth: 70,
      flex: 1,
      headerClassName: "bg-color",
      renderCell: (params) =>
        params.value === null ? (
          "NA"
        ) : (
          <Chip
            sx={{ cursor: "pointer" }}
            onClick={(e) => handleOpen(params, "SDK")}
            label="view"
            size="small"
            variant="outlined"
            color="primary"
          />
        ),
    },
    {
      field: "passingRules",
      headerName: "Rules Details",
      minWidth: 70,
      flex: 1,
      headerClassName: "bg-color",
      renderCell: (params) =>
        params.value === null ? (
          "NA"
        ) : (
          <Chip
            sx={{ cursor: "pointer" }}
            onClick={(e) => handleOpen(params, "Rules")}
            label="view"
            size="small"
            variant="outlined"
            color="primary"
          />
        ),
    },
    {
      field: "createdon",
      headerName: "Created On",
      minWidth: 120,
      flex: 1.5,
      headerClassName: "bg-color",
      renderCell: (params) => moment(params?.value).format("lll"),
    },
  ];

  console.log("adaptive details", usersData);

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">RBA Report</Typography>
        {/* <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Number Of Request
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={noOfRequest}
              label="Number Of Request"
              onChange={handleChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Box> */}

        <input
          type="search"
          placeholder="Search By Device Id, Risk Score and Confidence Score..."
          value={search}
          onChange={handleSearchOnChange}
          style={{
            borderRadius: "8px 8px",
            border: "1px solid",
            outline: "none",
            padding: 12,
            width: 390,
          }}
        />
      </Stack>
      <br />
      <div style={{ width: "calc(90vw - 160px)" }}>
        <Box
          sx={{
            height: 400,
            width: 1,
            "& .bg-color": {
              backgroundColor: "#0D4990",
              color: "#fff",
            },
          }}
        >
          {
            <DataGrid
              rows={filterList ?? []}
              columns={columns}
              height={600}
              getRowId={(row) => row?.trackingid}
              pageSize={6}
              autoHeight={true}
              style={{
                width: "99%",
                margin: "0 auto",
                backgroundColor: "white",
              }}
              componentsProps={{
                columnMenu: { background: "red" },
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          }
        </Box>
        <br/>
      </div>
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
            {colType === "SDK" ? (
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
                          width: "260px",
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
                        keyName === "Is VPN Used" ||
                        keyName === "Cookies Enabled" ||
                        keyName === "Is Mobile" ? (
                          <div>
                            {details[keyName] === true ? (
                              <CheckCircleIcon
                                sx={{ fontSize: "1rem" }}
                                color="primary"
                              />
                            ) : (
                              <CancelIcon
                                sx={{ fontSize: "1rem" }}
                                color="error"
                              />
                            )}
                          </div>
                        ) : (
                          details[keyName]
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : colType == "Rules" ? (
              <>
                <b>Rules Details</b>
                <hr />
                {Object.keys(details).map((keyName, i) => {
                  return (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                      key={i}
                    >
                      <div
                        style={{
                          width: "80%",
                          fontWeight: "bold",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {keyName}
                        <p>
                          {details[keyName].toLowerCase() == "fail" ? (
                            <Chip
                              label="Fail"
                              color="error"
                              variant="outlined"
                              style={{ width: "55px" }}
                            />
                          ) : details[keyName].toLowerCase() == "not enabled" ? (
                            <Chip
                              label="Not Enabled"
                              style={{ width: "55px" }}
                            />
                          ) : (
                            <Chip
                              label="Pass"
                              color="success"
                              variant="outlined"
                            />
                          )}
                        </p>
                      </div>
                      {/* <div
                        style={{
                          width: "360px",
                        }}
                      >
                        {keyName === "Is Rooted" ||
                          keyName === "Is VPN Used" || keyName === "Cookies Enabled" || keyName === "Is Mobile" ? (
                          <div>
                            {
                              details[keyName] === true ? <CheckCircleIcon sx={{ fontSize: "1rem" }} color="primary" /> : <CancelIcon sx={{ fontSize: "1rem" }} color="error" />
                            }
                          </div>
                        ) : (
                          details[keyName]
                        )}
                      </div> */}
                    </div>
                  );
                })}
              </>
            ) : (
              <Typography variant="p" sx={{ width: 200 }}>
                {details}
              </Typography>
            )}
          </Stack>
          <br />

          <center>
            <Button size="small" variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </center>
        </Box>
      </Modal>

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
                    {keyName === "Is VPN Used" || keyName === "Is WIFI Used" ? (
                      <div>
                        {deviceDetails[keyName] === true ? (
                          <CheckCircleIcon
                            sx={{ fontSize: "1rem" }}
                            color="primary"
                          />
                        ) : (
                          <CancelIcon sx={{ fontSize: "1rem" }} color="error" />
                        )}
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
            <Button
              size="small"
              variant="outlined"
              onClick={handleCloseDeviceModal}
            >
              Close
            </Button>
          </center>
        </Box>
      </Modal>
    </div>
  );
}
