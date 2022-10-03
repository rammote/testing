import EditIcon from "@mui/icons-material/Edit";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Server from "../../APIUrl";
import { LoadingButton } from "@mui/lab";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const requestTimess = new Date()
  .toISOString()
  .replaceAll("T", " ")
  .replaceAll("Z", "");
const requestTime = escape(requestTimess);

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

const osNames = [
  "Windows 10",
  "Windows 8.1",
  "Windows 8",
  "Windows 7",
  "Windows Vista",
  "Windows XP",
  "Windows 2000",
  "Mac/iOS",
  "UNIX",
  "Linux",
  "Android",
];

const blackListedCountries = [
  "Andorra",
  "United Arab Emirates",
  "Afghanistan",
  "Antigua and Barbuda",
  "Anguilla",
  "Albania",
  "Armenia",
  "Angola",
  "Antarctica",
  "Argentina",
  "American Samoa",
  "Austria",
  "Australia",
  "Aruba",
  "Alland Islands",
  "Azerbaijan",
  "Bosnia and Herzegovina",
  ,
  "Barbados",
  "Bangladesh",
  "Belgium",
  "Burkina Faso",
  "Bulgaria",
  "Bahrain",
  "Burundi",
  "Benin",
  "Saint Barthelemy",
  "Bermuda",
  "Brunei Darussalam",
  "Bolivia",
  "Brazil",
  "Bahamas",
  "Bhutan",
  "Bouvet Island",
  "Botswana",
  "Belarus",
  "Belize",
  "Canada",
  "Central African Republic",
  "Switzerland",
  "Cook Islands",
  "Chile",
  "Cameroon",
  "China",
  "Colombia",
  "Czech Republic",
  "Germany",
  "Denmark",
  "Algeria",
  "Estonia",
  "Egypt",
  "Eritrea",
  "Spain",
  "Ethiopia",
  "Finland",
  "France",
  "United Kingdom",
  "Georgia",
  "Greece",
  "Hungary",
  "Indonesia",
  "Ireland",
  "India",
  "Israel",
  "Iraq",
  "Italy",
  "Iceland",
  "Jersey",
  "Jordan",
  "Japan",
  "Kenya",
  "Cambodia",
  "Korea",
  "Kuwait",
  "Sri Lanka",
  "Liberia",
  "Lesotho",
  "Morocco",
  "Madagascar",
  "Myanmar",
  "Mauritania",
  "Mauritius",
  "Maldives",
  "Mexico",
  "Malaysia",
  "Nigeria",
  "Netherlands",
  "Norway",
  "Nepal",
  "New Zealand",
  "Philippines",
  "Pakistan",
  "Poland",
  "Sweden",
  "Singapore",
  "Thailand",
  "Turkey",
  "United States",
  "Vietnam",
  "South Africa",
  "Zimbabwe",
];

export default function EditRule({ data, rows, handleRules }) {
  const history = useHistory();
  const location = useLocation();
  const [selectedValue, setSelectedValue] = useState([]);
  // const [selectedOption, setSelectedOption] = useState([]);
  // const [selectedOS, setSelectedOS] = useState([]);
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [open, setOpen] = React.useState(false);
  const [enabled, setEnabled] = useState("");
  const [mustMatch, setMustMatch] = useState("");
  const [clickScreen, setClickScreen] = React.useState([
    { screenName: "", value: "" },
  ]);
  const [editRuleForm, setEditRuleForm] = React.useState({
    name: data?.name || "",
    //value: data?.value.length > 0 ? multiVal.join(",")  : data?.value ?? "",
    value: data?.value ?? "",
    id: data?.id,
    mustMatch: data?.mustMatch ?? false,
    enabled: data?.enabled ?? false,
    threshold: data?.threshold ?? "",
  });

  const theme = useTheme();

  const merchantCodes = [
    { code: "0742", description: "Veterinary Services" },
    { code: "0763", description: "Agricultural Cooperatives" },
    { code: "0780", description: "Horticultural and Landscaping Services" },
    {
      code: "1520",
      description: "General Contractors–Residential and Commercial",
    },
    {
      code: "1711",
      description: "Air Conditioning, Heating and Plumbing Contractors",
    },
    { code: "1731", description: "Electrical Contractors" },
    {
      code: "1740",
      description:
        "Insulation, Masonry, Plastering, Stonework and Tile Setting Contractors",
    },
    { code: "1750", description: "Carpentry Contractors" },
    {
      code: "1761",
      description: "Roofing and Siding, Sheet Metal Work Contractors",
    },
    { code: "1771", description: "Concrete Work Contractors" },
    {
      code: "1799",
      description:
        "Contractors, Special Trade Contractors–not elsewhere classified",
    },
    { code: "2741", description: "Miscellaneous Publishing and Printing" },
    {
      code: "2791",
      description: "Typesetting, Plate Making and Related Services",
    },
    {
      code: "2842",
      description: "Sanitation, Polishing and Specialty Cleaning Preparations",
    },
    { code: "4011", description: "Railroads–Freight" },
    {
      code: "4111",
      description:
        "Transportation–Suburban and Local Commuter Passenger, including Ferries",
    },
    { code: "4112", description: "Passenger Railways" },
    { code: "4119", description: "Ambulance Services" },
    { code: "4121", description: "Taxicabs and Limousines" },
    { code: "4131", description: "Bus Lines" },

    {
      code: "4215",
      description: "Courier Services–Air and Ground, Freight Forwarders",
    },

    {
      code: "4225",
      description:
        "Public Warehousing–Farm Products, Refrigerated Goods, Household Goods Storage",
    },

    { code: "4411", description: "Cruise Lines" },

    { code: "4457", description: "Boat Leases and Boat Rentals" },

    { code: "4468", description: "Marinas, Marine Service/Supplies" },
    {
      code: "4511",
      description: "Air Carriers, Airlines–not elsewhere classified",
    },

    { code: "4582", description: "Airports, Airport Terminals, Flying Fields" },

    { code: "4722", description: "Travel Agencies and Tour Operators" },
    { code: "4723", description: "Package Tour Operators (Germany Only)" },

    { code: "4784", description: "Bridge and Road Fees, Tolls" },

    {
      code: "4789",
      description: "Transportation Services Not Elsewhere Classified",
    },
  ];

  useEffect(() => {
    if (data) {
      setEditRuleForm({
        name: data?.name || "",
        //value: data?.value?.length > 0 ? selectedValue(data?.value.split(",")) : data?.value ?? "",
        value: data?.value ?? "",
        id: data?.id,
        mustMatch: data?.mustMatch ?? false,
        enabled: data?.enabled ?? false,
        threshold: data?.threshold ?? "",
      });
      if (data?.value?.length > 0) {
        setSelectedValue(data?.value.split(","));
      }
      console.log("use", setSelectedValue);
      // if(data?.value.length > 0) {
      //   setSelectedOption(data?.value.split(","))
      // }
      // if(data?.value?.length > 0) {
      //   setSelectedOS(data?.value.split(","))
      // }
    }
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("data", data);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (editRuleForm?.threshold > 0 || editRuleForm?.threshold < 16) {
      await Server.post(
        `/adaptivetoken/editRules?accountId=${accountId}&appId=${location.state.row.appid}&requestTime=${requestTime}`,
        editRuleForm,
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
          handleClose();
          console.log(response.data);
          if (response.data.resultCode === 0) {
            Swal.fire({
              title: "Success!",
              text: response.data.resultMessage,
              icon: "success",
              confirmButtonText: "OK",
            });
            // return toast.success('Success !', {
            //   position: toast.POSITION.TOP_RIGHT
            // });
            setEditRuleForm({ ...editRuleForm });
            handleRules();
          } else {
            handleClose();
            setLoading(false);

            Swal.fire({
              title: "Error!",
              text: response.data.resultMessage,
              icon: "error",
            });
            setEditRuleForm({ ...editRuleForm });
          }
          // history.push("/AxiomProtect/Applications");
          /*window.location.href="/Setpassword";*/
          //    setEditCustomForm({
          //         appname: "",
          //         applogo: "",

          //     })
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Error..",
            text: err,
            icon: "error",
          });
          setEditRuleForm({ ...editRuleForm });
        });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Threshold value must be between 0 to 15",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log("Selected", setSelectedValue);
    console.log("Sdet", selectedValue);
  };

  var multiVal = selectedValue;
  console.log("!!!!!!!!!!!!", multiVal.join(","));

  // const handleChangeCountry = (e) => {
  //     setSelectedOption(e);
  // }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...editRuleForm.value];
    list[index][name] = value;
    setEditRuleForm(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...editRuleForm.value];
    list.splice(index, 1);
    setEditRuleForm(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setEditRuleForm([...editRuleForm.value, { firstName: "", lastName: "" }]);
  };

  const handleDeleteIp = (item, index) => {
    let arr = [...editRuleForm.value];
    arr.splice(index, 1);
    console.log(item);
    setEditRuleForm({ ...editRuleForm, value: [...arr] });
  };

  const handleDeleteOS = (item, index) => {
    let arr = [...editRuleForm.value];
    arr.splice(index, 1);
    console.log({ arr });
    setEditRuleForm({ ...editRuleForm, value: [...arr] });
  };
  const [ips, setIps] = useState([]);
  const [currIp, setCurrIp] = useState("");
  const handleKeyUp = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 32 || e.key === "Enter") {
      const ipsArr = editRuleForm.value;
      setEditRuleForm({ ...editRuleForm, value: [...ipsArr, e.target.value] });
      setCurrIp("");
    }
  };
  const handleChangeIp = (e) => {
    setCurrIp(e.target.value);
  };
  const addRestrictIps = (e) => {
    setCurrIp(e.target.value.join(","));
  };
  const updateTimeValue = (index, e) => {
    if (index === 0) {
      let value = editRuleForm?.value;
      if (value?.split(",").length > 0) {
        let startValue = e.target.value.split(":")[0];
        let oldValueArr = editRuleForm?.value?.split(",");
        oldValueArr[0] = startValue;
        setEditRuleForm({ ...editRuleForm, value: oldValueArr.join(",") });
      } else {
        let startValue = e.target.value.split(":")[0];
        setEditRuleForm({ ...editRuleForm, value: `${startValue},` });
      }
    }
    if (index === 1) {
      let value = editRuleForm?.value;
      if (value?.split(",").length > 0) {
        let endTime = e.target.value.split(":")[0];
        let oldValueArr = editRuleForm?.value?.split(",");
        oldValueArr[1] = endTime;
        setEditRuleForm({ ...editRuleForm, value: oldValueArr.join(",") });
      } else {
        let endTime = e.target.value.split(":")[0];
        setEditRuleForm({ ...editRuleForm, value: `,${endTime}` });
      }
    }
  };
  const updateDayValue = (index, e) => {
    if (index === 0) {
      let value = editRuleForm?.value;
      if (value?.split(",").length > 0) {
        let startValue = e.target.value;
        let oldValueArr = editRuleForm?.value?.split(",");
        oldValueArr[0] = startValue;
        setEditRuleForm({ ...editRuleForm, value: oldValueArr.join(",") });
      } else {
        let startValue = e.target.value;
        setEditRuleForm({ ...editRuleForm, value: `${startValue},` });
      }
    }
    if (index === 1) {
      let value = editRuleForm?.value;
      if (value?.split(",").length > 0) {
        let endTime = e.target.value;
        let oldValueArr = editRuleForm?.value?.split(",");
        oldValueArr[1] = endTime;
        setEditRuleForm({ ...editRuleForm, value: oldValueArr.join(",") });
      } else {
        let endTime = e.target.value;
        setEditRuleForm({ ...editRuleForm, value: `,${endTime}` });
      }
    }
  }
  function valueFields() {
    return (
      <>
        {editRuleForm.id == 1 ? (
          <Select
            fullWidth
            size="small"
            value={editRuleForm?.value}
            name="subType"
            id="subType"
            onChange={(e) =>
              setEditRuleForm({
                ...editRuleForm,
                value: Number(e.target.value),
              })
            }
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
          </Select>
        ) : editRuleForm.id == 2 ? (
          <Select
            fullWidth
            size="small"
            value={editRuleForm?.value}
            name="subType"
            id="subType"
            onChange={(e) =>
              setEditRuleForm({
                ...editRuleForm,
                value: Number(e.target.value),
              })
            }
          >
            <MenuItem value={90}>90</MenuItem>
            <MenuItem value={180}>180</MenuItem>
            <MenuItem value={270}>270</MenuItem>
            <MenuItem value={360}>360</MenuItem>
          </Select>
        ) : editRuleForm.id == 3 ? (
          <TextField
            inputProps={{
              min: 0,
              max: 10
            }}
            size="small"
            margin="dense"
            id="name"
            label="Value"
            type="number"
            fullWidth
            variant="outlined"
            value={editRuleForm?.value}
            onChange={(e) =>
              setEditRuleForm({
                ...editRuleForm,
                value: Number(e.target.value),
              })
            }
          />
        ) : editRuleForm.id == 4 ? (
          <TextField
            inputProps={{
              min: 0,
              max:100
            }}
            size="small"
            margin="dense"
            id="name"
            label="Value"
            type="number"
            fullWidth
            variant="outlined"
            value={editRuleForm?.value}
            onChange={(e) =>
              setEditRuleForm({ ...editRuleForm, value: Number(e.target.value) })
            }
          />
        ) : editRuleForm.id == 5 ? (
          <TextField
            inputProps={{
              min:0
            }}
            size="small"
            margin="dense"
            id="name"
            label="Value"
            type="number"
            fullWidth
            variant="outlined"
            value={editRuleForm?.value}
            onChange={(e) =>
              setEditRuleForm({ ...editRuleForm, value: Number(e.target.value) })
            }
          />
        ) : editRuleForm.id == 6 ? (
          <Select
            fullWidth
            size="small"
            value={editRuleForm?.value}
            name="subType"
            id="subType"
            onChange={(e) =>
              setEditRuleForm({ ...editRuleForm, value: e.target.value })
            }
          >
            <MenuItem value={false}>False</MenuItem>
            <MenuItem value={true}>True</MenuItem>
          </Select>
        ) : /******************************************DEVICE***********************************************************/
          editRuleForm.id == 7 ? (
            <h4>
              <Checkbox
                checked={editRuleForm?.value}
                onChange={(e) =>
                  setEditRuleForm({ ...editRuleForm, value: e.target.checked })
                }
                {...label}
                size="medium"
              />
              {editRuleForm?.name}
            </h4>
          ) : editRuleForm.id == 8 ? (
            <>
              <Typography> (Add comma separated values) </Typography>
              <TextField
                size="small"
                margin="dense"
                id="name"
                label="Value"
                type="text"
                fullWidth
                variant="outlined"
                value={editRuleForm?.value}
                onChange={(e) =>
                  setEditRuleForm({ ...editRuleForm, value: e.target.value })
                }
              />
            </>
          ) : editRuleForm.id == 9 ? (
            <h4>
              <Checkbox
                checked={editRuleForm?.value}
                onChange={(e) =>
                  setEditRuleForm({ ...editRuleForm, value: e.target.checked })
                }
                {...label}
                defaultUnChecked
                size="medium"
              />
              {editRuleForm?.name}
            </h4>
          ) : editRuleForm.id == 10 ? (
            <h4>
              <Checkbox
                checked={editRuleForm?.value}
                onChange={(e) =>
                  setEditRuleForm({ ...editRuleForm, value: e.target.checked })
                }
                {...label}
                defaultUnChecked
                size="medium"
              />
              {editRuleForm?.name}
            </h4>
          ) : editRuleForm.id == 11 ? (
            <TextField
              size="small"
              margin="dense"
              id="name"
              label="Value"
              type="number"
              fullWidth
              variant="outlined"
              value={editRuleForm?.value}
              onChange={(e) =>
                setEditRuleForm({
                  ...editRuleForm,
                  value: Number(e.target.value),
                })
              }
            />
          ) : editRuleForm.id == 12 ? (
            // <Select
            //   fullWidth
            //   size="small"
            //   value={editRuleForm?.value}
            //   name="subType"
            //   id="subType"
            //   onChange={(e) =>
            //     setEditRuleForm({ ...editRuleForm, value: e.target.value })
            //   }
            // >
            //   <MenuItem value={"Windows"}>Windows</MenuItem>
            //   <MenuItem value={"Android"}>Android</MenuItem>
            //   <MenuItem value={"Linux"}>Linux</MenuItem>
            //   <MenuItem value={"MacOS"}>MacOS</MenuItem>
            //   <MenuItem value={"Kali"}>Kali</MenuItem>
            //   <MenuItem value={"Redhat"}>RedHat</MenuItem>
            // </Select>

            <FormControl fullWidth>
              <InputLabel id="demo-multiple-chip-label">Outdated OS</InputLabel>
              <Select
                size="small"
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={editRuleForm?.value.split(",")}
                
                onChange={(e) =>
                  setEditRuleForm({
                    ...editRuleForm,
                    value: e.target.value.join(","),
                  })
                }
                input={
                  <OutlinedInput id="select-multiple-chip" label="Outdated OS" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value, index) => (
                      <Chip
                        key={value}
                        label={value}
                        size="small"
                        sx={{ fontSize: "0.7rem" }}
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {osNames.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, editRuleForm?.value, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : editRuleForm.id == 13 ? (
            <>
              <Typography> (Add comma separated values) </Typography>
              <TextField
                size="small"
                margin="dense"
                id="name"
                label="Value"
                type="text"
                fullWidth
                variant="outlined"
                value={editRuleForm?.value}
                onChange={(e) =>
                  setEditRuleForm({ ...editRuleForm, value: e.target.value })
                }
              />
            </>
          ) : editRuleForm.id == 14 ? (
            <>
              {/* <Button onClick={(e) => handleClickScreen(e)}>Add Value</Button>
            {clickScreen == true && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth size="small" name="email" id="email" label="Screen Name" variant="outlined"
                      value={editRuleForm?.value}
                      inputProps={{ maxLength: 30 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth size="small" name="phone" id="phone" label="Value" variant="outlined"
                      inputProps={{ maxLength: 13 }}
                      value={editRuleForm?.value}
                    />
                  </Grid>
                </Grid>
            )} */}
              <TextField
                size="small"
                margin="dense"
                id="name"
                InputProps={{
                  min:0
                }}
                label="Value"
                type="number"
                fullWidth
                variant="outlined"
                value={editRuleForm?.value}
                onChange={(e) =>
                  setEditRuleForm({ ...editRuleForm, value: Number(e.target.value) })
                }
              />
            </>
          ) : /******************************************LOCATION***********************************************************/
            editRuleForm.id == 15 ? (
              <TextField
                inputProps={{
                  min: 0,
                  max: 20,
                }}
                size="small"
                margin="dense"
                id="name"
                label="Value"
                type="number"
                fullWidth
                variant="outlined"
                value={editRuleForm?.value}
                onChange={(e) =>
                  setEditRuleForm({
                    ...editRuleForm,
                    value: Number(e.target.value),
                  })
                }
              />
            ) : editRuleForm.id == 16 ? (
              <Select
                fullWidth
                size="small"
                value={editRuleForm?.value}
                name="subType"
                id="subType"
                onChange={(e) =>
                  setEditRuleForm({ ...editRuleForm, value: e.target.value })
                }
              >
                <MenuItem value={false}>False</MenuItem>
                <MenuItem value={true}>True</MenuItem>
              </Select>
            ) : editRuleForm.id == 17 ? (
              <TextField
                inputProps={{
                  min:0
                }}
                size="small"
                margin="dense"
                id="name"
                label="Value"
                type="number"
                fullWidth
                variant="outlined"
                value={editRuleForm?.value}
                onChange={(e) =>
                  setEditRuleForm({ ...editRuleForm, value: Number(e.target.value) })
                }
              />
            ) : editRuleForm.id == 18 ? (
              <Select
                fullWidth
                size="small"
                value={editRuleForm?.value}
                name="subType"
                id="subType"
                onChange={(e) =>
                  setEditRuleForm({ ...editRuleForm, value: Number(e.target.value) })
                }
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={100}>more than 10</MenuItem>
              </Select>
            ) : editRuleForm.id == 19 ? (
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">
                  Black Listed Countries
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={editRuleForm?.value.split(",")}
                  onChange={(e) =>
                    setEditRuleForm({
                      ...editRuleForm,
                      value: e.target.value.join(","),
                    })
                  }
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Black Listed Countries"
                    />
                  }
                  renderValue={(arr) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {arr.length > 0 &&
                        arr?.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            size="small"
                            sx={{ fontSize: "0.7rem" }}
                          />
                        ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {blackListedCountries.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, editRuleForm?.value, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : editRuleForm.id == 20 ? (
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">Home Country</InputLabel>
                <Select
                  size="small"
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  value={editRuleForm?.value}
                  onChange={(e) =>
                    setEditRuleForm({ ...editRuleForm, value: e.target.value })
                  }
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Black Listed Countries"
                    />
                  }
                  // renderValue={(selected) => (
                  //   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  //     {selected.map((value) => (
                  //       <Chip key={value} label={value} />
                  //     ))}
                  //   </Box>
                  // )}
                  MenuProps={MenuProps}
                >
                  {blackListedCountries.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, editRuleForm?.value, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : /******************************************MERCHANT***********************************************************/
              editRuleForm.id == 21 ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-chip-label">
                    Merchant Codes
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={editRuleForm?.value.split(",")}
                    onChange={(e) =>
                      setEditRuleForm({
                        ...editRuleForm,
                        value: e.target.value.join(","),
                      })
                    }
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Black Listed Countries"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {merchantCodes.map((item) => (

                      <MenuItem
                        sx={{ fontSize: "0.9rem" }}
                        key={item?.code}
                        value={item?.code}
                        style={getStyles(item?.code, editRuleForm?.value, theme)}
                      >
                        <Tooltip
                          title={`${item?.code} ${item?.description}`}
                          placement="top-start"
                        >
                        <Typography sx={{ fontSize: "0.8rem" }}> {item?.code} {item?.description}</Typography>
                      </Tooltip> 
                  </MenuItem>
              ))}
                </Select>
          </FormControl>
    ) : editRuleForm.id == 22 ? (
      <TextField
        size="small"
        margin="dense"
        id="name"
        label="Value"
        type="text"
        fullWidth
        variant="outlined"
        value={editRuleForm?.value}
        onChange={(e) =>
          setEditRuleForm({ ...editRuleForm, value: e.target.value })
        }
      />
    ) : /******************************************TRANSACTION***********************************************************/
      editRuleForm.id == 23 ? (
        <h4>
          <Checkbox
            checked={editRuleForm?.value}
            onChange={(e) =>
              setEditRuleForm({ ...editRuleForm, value: e.target.checked })
            }
            {...label}
            defaultUnChecked
            size="medium"
          />
          {editRuleForm?.name}
        </h4>
      ) : editRuleForm.id == 24 ? (
        <TextField
          size="small"
          margin="dense"
          InputProps={{
            min:0
          }}
          id="name"
          label="Value"
          type="number"
          fullWidth
          variant="outlined"
          value={editRuleForm?.value}
          onChange={(e) =>
            setEditRuleForm({ ...editRuleForm, value: Number(e.target.value) })
          }
        />
      ) : editRuleForm.id == 25 ? (
        <Select
          fullWidth
          size="small"
          value={editRuleForm?.value}
          name="subType"
          id="subType"
          onChange={(e) =>
            setEditRuleForm({ ...editRuleForm, value: e.target.value })
          }
        >
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"INR"}>INR</MenuItem>
          <MenuItem value={"EUR"}>EUR</MenuItem>
          <MenuItem value={"JPY"}>JPY</MenuItem>
          <MenuItem value={"AUD"}>AUD</MenuItem>
          <MenuItem value={"CHF"}>CHF</MenuItem>
          <MenuItem value={"NZD"}>NZD</MenuItem>
        </Select>
      ) : editRuleForm.id == 26 ? (
        <TextField
          size="small"
          margin="dense"
          id="name"
          label="Value"
          type="text"
          fullWidth
          variant="outlined"
          value={editRuleForm?.value}
          onChange={(e) =>
            setEditRuleForm({ ...editRuleForm, value: e.target.value })
          }
        />
      ) : editRuleForm.id == 27 ? (
        <Select
          fullWidth
          size="small"
          value={editRuleForm?.value}
          name="subType"
          id="subType"
          onChange={(e) =>
            setEditRuleForm({ ...editRuleForm, value: e.target.value })
          }
        >
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"INR"}>INR</MenuItem>
          <MenuItem value={"EUR"}>EUR</MenuItem>
          <MenuItem value={"JPY"}>JPY</MenuItem>
          <MenuItem value={"AUD"}>AUD</MenuItem>
          <MenuItem value={"CHF"}>CHF</MenuItem>
          <MenuItem value={"NZD"}>NZD</MenuItem>
        </Select>
      ) : editRuleForm.id == 28 ? (
        <Stack direction="column">
          <Typography
            sx={{ display: "block", color: "#000", fontWeight: "bold" }}
          >
            {" "}
            Select request time{" "}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ marginRight: "1rem" }}>
              <Typography
                sx={{ display: "block", color: "#000", fontSize: "0.9rem" }}
              >
                {" "}
                Start Time{" "}
              </Typography>

              <input
                value={
                  editRuleForm?.value && editRuleForm?.value?.split(",")[0] + ":00"
                }
                onChange={(e) => updateTimeValue(0, e)}
                type="time"
                style={{ padding: "0.5rem 1rem" }}
              />
            </div>
            <div>
              <Typography
                sx={{ display: "block", color: "#000", fontSize: "0.9rem" }}
              >
                {" "}
                End Time{" "}
              </Typography>

              <input
                value={
                  editRuleForm?.value && editRuleForm?.value?.split(",")[1] + ":00"
                }
                onChange={(e) => updateTimeValue(1, e)}
                type="time"
                style={{ padding: "0.5rem 1rem" }}
              />
            </div>
          </Stack>
        </Stack>
      ) : // <LocalizationProvider dateAdapter={AdapterDateFns}>
        //   <TimePicker
        //     fullWidth
        //     size="small"
        //     label="Select time"

        //     onChange={(e) => setEditRuleForm({ ...editRuleForm, value: e.target.value })}
        //     renderInput={(params) => <TextField {...params} />}
        //   />
        // </LocalizationProvider>
        editRuleForm.id == 29 ? (
          <>
            {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item xs={5}>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography> (To) </Typography>
                      </Grid>
                      <Grid item xs={6}> */}
            <Stack direction="column">
              <Typography
                sx={{ display: "block", color: "#000", fontWeight: "bold" }}
              >
                {" "}
                Select request days{" "}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <div style={{ marginRight: "1rem" }}>
                  <Typography
                    sx={{ display: "block", color: "#000", fontSize: "0.9rem" }}
                  >
                    {" "}
                    Start Day{" "}
                  </Typography>

                  <input
                    min={0}
                    max="30"
                    value={
                      editRuleForm?.value && editRuleForm?.value?.split(",")[0]
                    }
                    onChange={(e) => updateDayValue(0, e)}
                    type="number"
                    style={{ padding: "0.5rem 1rem", }}
                  />
                </div>
                <div>
                  <Typography
                    sx={{ display: "block", color: "#000", fontSize: "0.9rem" }}
                  >
                    {" "}
                    End Day{" "}
                  </Typography>

                  <input
                    min="1"
                    max="31"
                    value={
                      editRuleForm?.value && editRuleForm?.value?.split(",")[1]
                    }
                    onChange={(e) => updateDayValue(1, e)}
                    type="number"
                    style={{ padding: "0.5rem 1rem" }}
                  />
                </div>
              </Stack>
            </Stack>
            {/* </Grid>
                    </Grid> */}

            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                          calendars={1}
                          renderInput={(startProps, endProps) => (
                            <>
                              <TextField {...startProps} />
                              <Box sx={{ mx: 2 }}> to </Box>
                              <TextField {...endProps} />
                            </>
                          )}
                        />

                      </LocalizationProvider> */}
          </>
        ) : editRuleForm.id == 30 ? (
          <>
            <Typography> (Add comma separated values) </Typography>
            <TextField
              size="small"
              margin="dense"
              id="name"
              label="Value"
              type="text"
              fullWidth
              variant="outlined"
              value={editRuleForm?.value}
              onChange={(e) =>
                setEditRuleForm({ ...editRuleForm, value: e.target.value })
              }
            />
          </>
        ) : // <FormControl fullWidth >
          //   <div className={"container"}>
          //     {editRuleForm.value.split(",") && editRuleForm.value.split(",")?.map((item, index) => (
          //       <Chip
          //         size="small"
          //         onDelete={() => handleDeleteIp(item, index)}
          //         label={item}
          //       />
          //     ))}
          //   </div>
          //   <Input

          //     fullWidth
          //     variant="contained"
          //     value={currIp}
          //     onChange={addRestrictIps}
          //     onKeyDown={handleKeyUp}
          //   />
          // </FormControl>
          editRuleForm.id == 31 ? (
            <Select
              fullWidth
              size="small"
              value={editRuleForm?.value}
              name="subType"
              id="subType"
              onChange={(e) =>
                setEditRuleForm({ ...editRuleForm, value: e.target.value })
              }
            >
              <MenuItem value={"IST"}>IST</MenuItem>
              <MenuItem value={"ACT"}>ACT</MenuItem>
              <MenuItem value={"ADT"}>ADT</MenuItem>
              <MenuItem value={"AET"}>AET</MenuItem>
              <MenuItem value={"ALMT"}>ALMT</MenuItem>
              <MenuItem value={"AMT"}>AMT</MenuItem>
              <MenuItem value={"GMT"}>GMT</MenuItem>
              <MenuItem value={"HOVT"}>HOVT</MenuItem>
            </Select>
          ) : editRuleForm.id == 32 ? (
            <TextField
              size="small"
              margin="dense"
              id="name"
              label="Value"
              type="text"
              fullWidth
              variant="outlined"
              value={editRuleForm?.value}
              onChange={(e) =>
                setEditRuleForm({ ...editRuleForm, value: e.target.value })
              }
            />
          ) : /******************************************USERS***********************************************************/
            editRuleForm.id == 33 ? (
              <TextField
                inputProps={{
                  min:0
                }}
                size="small"
                margin="dense"
                id="name"
                label="Value"
                type="number"
                fullWidth
                variant="outlined"
                value={editRuleForm?.value}
                onChange={(e) =>
                  setEditRuleForm({ ...editRuleForm, value: Number(e.target.value) })
                }
              />
            ) : editRuleForm.id == 34 ? (
              <TextField
                inputProps={{
                  min:0
                }}
                size="small"
                margin="dense"
                id="name"
                label="Value"
                type="number"
                fullWidth
                variant="outlined"
                value={editRuleForm?.value}
                onChange={(e) =>
                  setEditRuleForm({ ...editRuleForm, value: Number(e.target.value) })
                }
              />
            ) : editRuleForm.id == 35 ? (
              <h4>
                <Checkbox
                  checked={editRuleForm?.value}
                  onChange={(e) =>
                    setEditRuleForm({ ...editRuleForm, value: e.target.checked })
                  }
                  {...label}
                  defaultUnChecked
                  size="medium"
                />
                {editRuleForm?.name}
              </h4>
            ) : editRuleForm.id == 36 ? (
              <h4>
                <Checkbox
                  checked={editRuleForm?.value}
                  onChange={(e) =>
                    setEditRuleForm({ ...editRuleForm, value: e.target.checked })
                  }
                  {...label}
                  defaultUnChecked
                  size="medium"
                />
                {editRuleForm?.name}
              </h4>
            ) : (
              <>
                <Typography> (Add comma separated values) </Typography>
                <TextField
                  size="small"
                  margin="dense"
                  id="name"
                  label="Value"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={editRuleForm?.value}
                  onChange={(e) =>
                    setEditRuleForm({ ...editRuleForm, value: e.target.value })
                  }
                />
              </>
            )
  }
      </>
    );
}

//setEditRuleForm(data);
console.log({ editRuleForm });
return (
  //setEditRuleForm(data);
  <div>
    <IconButton
      aria-label="delete"
      onClick={handleClickOpen}
      style={{ marginLeft: 10 }}
    >
      <EditIcon style={{ color: "#9c27b0" }} />
    </IconButton>
    <Dialog open={open} onClose={handleClose} maxWidth="false">
      <form onSubmit={handleSubmit} style={{ width: 500 }}>
        <DialogTitle>Edit Rule</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText style={{ marginLeft: "1rem" }}>
            <br />
            <Grid container spacing={3}>
              <TextField
                autoFocus
                size="small"
                margin="dense"
                id="name"
                label="Rules"
                type="text"
                fullWidth
                variant="outlined"
                value={editRuleForm?.name}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <br />
            <br />
            <Grid container spacing={3}>
              {/* <TextField
                                autoFocus
                                size="small"
                                margin="dense"
                                id="name"
                                label="Value"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={editRuleForm?.value}
                                onChange={(e)=>setEditRuleForm({...editRuleForm, value: e.target.value})}
                            /> */}
              {valueFields()}
            </Grid>
            <br />
            <br />
            <Grid container spacing={3}>
              <TextField
                required
                inputProps={{
                  min: 0,
                  max: 15,
                }}
                size="small"
                id="name"
                label="Threshold min value is 0 and max value is 15"
                type="number"
                InputLabelProps={{
                  style: { color: 'red' },
                }}
                fullWidth
                variant="outlined"
                value={editRuleForm?.threshold}
                onChange={(e) =>
                  setEditRuleForm({
                    ...editRuleForm,
                    threshold: Number(e.target.value),
                  })
                }
              />
            </Grid>
          </DialogContentText>
          <br />
          <Checkbox
            checked={editRuleForm?.enabled}
            onChange={(e) =>
              setEditRuleForm({ ...editRuleForm, enabled: e.target.checked })
            }
          />{" "}
          Enabled
          <br />
          <Checkbox
            checked={editRuleForm?.mustMatch}
            onChange={(e) =>
              setEditRuleForm({
                ...editRuleForm,
                mustMatch: e.target.checked,
              })
            }
          />{" "}
          Must Match
          <br />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton loading={loading} type="submit" variant="contained">
            Save
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  </div>
);
}
