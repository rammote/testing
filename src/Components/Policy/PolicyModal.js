import { Input } from "@mui/material";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//import Select from '@mui/material/Select';
import Select from 'react-select';
import Swal from 'sweetalert2';
import Server from '../APIUrl';
import Popup from './Popup';
import './style.css';
   import Loader2 from '../Loader2'

export default function PolicyModal({togglePopup}) {
    const history = useHistory();
  const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
  const requestTime = escape(requestTimess);
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([])

  const [roles, setRoles] = React.useState("");
  const [auth, setAuth] = React.useState("");
  const [country, setCountry] = React.useState("");
  // const [blackcountry, setBlackCountry] = React.useState("");
  const [countryaccess, setCountryaccess] = React.useState("");
  const [myip, setMyip] = React.useState("");
  const [mfaip, setMfaip] = React.useState("");
  const [pname, setPname] = React.useState("");

  const [deviceTracking,setDeviceTracking] = React.useState({checked: false})
  const [geoFencing, setGeoFencing] = React.useState({checked: false})

  const [allowAllBrowsers, setAllowAllBrowers] = React.useState({checked: false})
  const [allowAndroid, setAllowAndroid] = React.useState({checked: false})
  const [allowAndroidDeviceFDE, setAllowAndroidDeviceFDE] = React.useState({checked: false})
  const [allowBiometricVerif, setAllowBiometricVerif] = React.useState({checked: false})
  const [allowBlackberryD, setAllowBlackberryD] = React.useState({checked: false})
  const [allowChromeDevice, setAllowChromeDevice] = React.useState({checked: false})
  const [allowChromeMD, setAllowChromeMD] = React.useState({checkedd: false})
  const [allowEdgeDevice, setAllowEdgeDevice] = React.useState({checkedd: false})
  const [allowFirefox, setAllowFirefox] = React.useState({checkedd: false})
  const [allowIE, setAllowIE] = React.useState({checkedd: false})
  const [allowIOS, setAllowIOS] = React.useState({checked: false})
  const [allowLinux, setAllowLinux] = React.useState({checked: false})
  const [allowMac, setAllowMac] = React.useState({checked: false})
  const [allowMobileSafari, setAllowMobileSafari] = React.useState({checked: false})
  const [allowSafari, setAllowSafari] = React.useState({checked: false})
  const [allowTampDevice, setAllowTampDevice] = React.useState({checked: false})
  const [allowWindows, setAllowWindows] = React.useState({checked: false})
  const [allowWindowsPhone, setAllowWindowsPhone] = React.useState({checked: false})
  const [allowOtherOS, setAllowOtherOS] = React.useState({checked: false})

  var cromeosallow="false",allaccessdeny="false",androidallow="false",bballow="false",iosallow="false",linuxallow="false",macallow="false",otherallow="false",windowallow="false",windowphoneallow="false",allv="false",cromev="false",cromemobilev="false",edgev="false",firefoxv="false",iev="false",mobilrsafariv="false",safariv="false";

  // const requestTime = escape(new Date().toISOString().replaceAll("T", " ").replaceAll("Z", ""));

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };


/**********************************************************************************/
const data = [
  {
    value: "Andorra",
    label: "Andorra"
  },
  {
    value: "United Arab Emirates",
    label: "United Arab Emirates"
  },
  {
    value: "Afghanistan",
    label: "Afghanistan"
  },
  {
    value: "Antigua and Barbuda",
    label: "Antigua and Barbuda"
  },
  {
    value: "Anguilla",
    label: "Anguilla"
  },
  {
    value: "Albania",
    label: "Albania"
  },
  {
    value: "Armenia",
    label: "Armenia"
  },
  {
    value: "Angola",
    label: "Angola"
  },
  {
    value: "Antarctica",
    label: "Antarctica"
  },
  {
    value: "Argentina",
    label: "Argentina"
  },
  {
    value: "American Samoa",
    label: "American Samoa"
  },
  {
    value: "Austria",
    label: "Austria"
  },
  {
    value: "Australia",
    label: "Australia"
  },
  {
    value: "Aruba",
    label: "Aruba"
  },
  {
    value: "Alland Islands",
    label: "Alland Islands"
  },
  {
    value: "Azerbaijan",
    label: "Azerbaijan"
  },
  {
    value: "Bosnia and Herzegovina",
    label: "Bosnia and Herzegovina"
  },
  {
    value: "Barbados",
    label: "Barbados"
  },
  {
    value: "Bangladesh",
    label: "Bangladesh"
  },
  {
    value: "Belgium",
    label: "Belgium"
  },
  {
    value: "Burkina Faso",
    label: "Burkina Faso"
  },
  {
    value: "Bulgaria",
    label: "Bulgaria"
  },
  {
    value: "Bahrain",
    label: "Bahrain"
  },
  {
    value: "Burundi",
    label: "Burundi"
  },
  {
    value: "Benin",
    label: "Benin"
  },
  {
    value: "Saint Barthelemy",
    label: "Saint Barthelemy"
  },
  {
    value: "Bermuda",
    label: "Bermuda"
  },
  {
    value: "Brunei Darussalam",
    label: "Brunei Darussalam"
  },
  {
    value: "Bolivia",
    label: "Bolivia"
  },
  {
    value: "Brazil",
    label: "Brazil"
  },
  {
    value: "Bahamas",
    label: "Bahamas"
  },
  {
    value: "Bhutan",
    label: "Bhutan"
  },
  {
    value: "Bouvet Island",
    label: "Bouvet Island"
  },
  {
    value: "Botswana",
    label: "Botswana"
  },
  {
    value: "Belarus",
    label: "Belarus"
  },
  {
    value: "Belize",
    label: "Belize"
  },
  {
    value: "Canada",
    label: "Canada"
  },
  {
    value: "Central African Republic",
    label: "Central African Republic"
  },
  {
    value: "Switzerland",
    label: "Switzerland"
  },
  {
    value: "Cook Islands",
    label: "Cook Islands"
  },
  {
    value: "Chile",
    label: "Chile"
  },
  {
    value: "Cameroon",
    label: "Cameroon"
  },
  {
    value: "China",
    label: "China"
  },
  {
    value: "Colombia",
    label: "Colombia"
  },
  {
    value: "Czech Republic",
    label: "Czech Republic"
  },
  {
    value: "Germany",
    label: "Germany"
  },
  {
    value: "Denmark",
    label: "Denmark"
  },
  {
    value: "Algeria",
    label: "Algeria"
  },
  {
    value: "Estonia",
    label: "Estonia"
  },
  {
    value: "Egypt",
    label: "Egypt"
  },
  {
    value: "Eritrea",
    label: "Eritrea"
  },
  {
    value: "Spain",
    label: "Spain"
  },
  {
    value: "Ethiopia",
    label: "Ethiopia"
  },
  {
    value: "Finland",
    label: "Finland"
  },
  {
    value: "France",
    label: "France"
  },
  {
    value: "United Kingdom",
    label: "United Kingdom"
  },
  {
    value: "Georgia",
    label: "Georgia"
  },
  {
    value: "Greece",
    label: "Greece"
  },
  {
    value: "Hungary",
    label: "Hungary"
  },
  {
    value: "Indonesia",
    label: "Indonesia"
  },
  {
    value: "Ireland",
    label: "Ireland"
  },
  {
    value: "India",
    label: "India"
  },
  {
    value: "Israel",
    label: "Israel"
  },
  {
    value: "Iraq",
    label: "Iraq"
  },
  {
    value: "Italy",
    label: "Italy"
  },
  {
    value: "Iceland",
    label: "Iceland"
  },
  {
    value: "Jersey",
    label: "Jersey"
  },
  {
    value: "Jordan",
    label: "Jordan"
  },
  {
    value: "Japan",
    label: "Japan"
  },
  {
    value: "Kenya",
    label: "Kenya"
  },
  {
    value: "Cambodia",
    label: "Cambodia"
  },
  {
    value: "Korea",
    label: "Korea"
  },
  {
    value: "Kuwait",
    label: "Kuwait"
  },
  {
    value: "Sri Lanka",
    label: "Sri Lanka"
  },
  {
    value: "Liberia",
    label: "Liberia"
  },
  {
    value: "Lesotho",
    label: "Lesotho"
  },
  {
    value: "Morocco",
    label: "Morocco"
  },
  {
    value: "Madagascar",
    label: "Madagascar"
  },
  {
    value: "Myanmar",
    label: "Myanmar"
  },
  {
    value: "Mauritania",
    label: "Mauritania"
  },
  {
    value: "Mauritius",
    label: "Mauritius"
  },
  {
    value: "Maldives",
    label: "Maldives"
  },
  {
    value: "Mexico",
    label: "Mexico"
  },
  {
    value: "Malaysia",
    label: "Malaysia"
  },
  {
    value: "Nigeria",
    label: "Nigeria"
  },
  {
    value: "Netherlands",
    label: "Netherlands"
  },
  {
    value: "Norway",
    label: "Norway"
  },
  {
    value: "Nepal",
    label: "Nepal"
  },
  {
    value: "New Zealand",
    label: "New Zealand"
  },
  {
    value: "Philippines",
    label: "Philippines"
  },
  {
    value: "Pakistan",
    label: "Pakistan"
  },
  {
    value: "Poland",
    label: "Poland"
  },
  {
    value: "Sweden",
    label: "Sweden"
  },
  {
    value: "Singapore",
    label: "Singapore"
  },
  {
    value: "Thailand",
    label: "Thailand"
  },
  {
    value: "Turkey",
    label: "Turkey"
  },
  {
    value: "United States",
    label: "United States"
  },
  {
    value: "Vietnam",
    label: "Vietnam"
  },
  {
    value: "South Africa",
    label: "South Africa"
  },
  {
    value: "Zimbabwe",
    label: "Zimbabwe"
  },
];

  const [selectedValue, setSelectedValue] = useState([]);

  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  const options = [
    {
      value: "Andorra",
      label: "Andorra"
    },
    {
      value: "United Arab Emirates",
      label: "United Arab Emirates"
    },
    {
      value: "Afghanistan",
      label: "Afghanistan"
    },
    {
      value: "Antigua and Barbuda",
      label: "Antigua and Barbuda"
    },
    {
      value: "Anguilla",
      label: "Anguilla"
    },
    {
      value: "Albania",
      label: "Albania"
    },
    {
      value: "Armenia",
      label: "Armenia"
    },
    {
      value: "Angola",
      label: "Angola"
    },
    {
      value: "Antarctica",
      label: "Antarctica"
    },
    {
      value: "Argentina",
      label: "Argentina"
    },
    {
      value: "American Samoa",
      label: "American Samoa"
    },
    {
      value: "Austria",
      label: "Austria"
    },
    {
      value: "Australia",
      label: "Australia"
    },
    {
      value: "Aruba",
      label: "Aruba"
    },
    {
      value: "Alland Islands",
      label: "Alland Islands"
    },
    {
      value: "Azerbaijan",
      label: "Azerbaijan"
    },
    {
      value: "Bosnia and Herzegovina",
      label: "Bosnia and Herzegovina"
    },
    {
      value: "Barbados",
      label: "Barbados"
    },
    {
      value: "Bangladesh",
      label: "Bangladesh"
    },
    {
      value: "Belgium",
      label: "Belgium"
    },
    {
      value: "Burkina Faso",
      label: "Burkina Faso"
    },
    {
      value: "Bulgaria",
      label: "Bulgaria"
    },
    {
      value: "Bahrain",
      label: "Bahrain"
    },
    {
      value: "Burundi",
      label: "Burundi"
    },
    {
      value: "Benin",
      label: "Benin"
    },
    {
      value: "Saint Barthelemy",
      label: "Saint Barthelemy"
    },
    {
      value: "Bermuda",
      label: "Bermuda"
    },
    {
      value: "Brunei Darussalam",
      label: "Brunei Darussalam"
    },
    {
      value: "Bolivia",
      label: "Bolivia"
    },
    {
      value: "Brazil",
      label: "Brazil"
    },
    {
      value: "Bahamas",
      label: "Bahamas"
    },
    {
      value: "Bhutan",
      label: "Bhutan"
    },
    {
      value: "Bouvet Island",
      label: "Bouvet Island"
    },
    {
      value: "Botswana",
      label: "Botswana"
    },
    {
      value: "Belarus",
      label: "Belarus"
    },
    {
      value: "Belize",
      label: "Belize"
    },
    {
      value: "Canada",
      label: "Canada"
    },
    {
      value: "Central African Republic",
      label: "Central African Republic"
    },
    {
      value: "Switzerland",
      label: "Switzerland"
    },
    {
      value: "Cook Islands",
      label: "Cook Islands"
    },
    {
      value: "Chile",
      label: "Chile"
    },
    {
      value: "Cameroon",
      label: "Cameroon"
    },
    {
      value: "China",
      label: "China"
    },
    {
      value: "Colombia",
      label: "Colombia"
    },
    {
      value: "Czech Republic",
      label: "Czech Republic"
    },
    {
      value: "Germany",
      label: "Germany"
    },
    {
      value: "Denmark",
      label: "Denmark"
    },
    {
      value: "Algeria",
      label: "Algeria"
    },
    {
      value: "Estonia",
      label: "Estonia"
    },
    {
      value: "Egypt",
      label: "Egypt"
    },
    {
      value: "Eritrea",
      label: "Eritrea"
    },
    {
      value: "Spain",
      label: "Spain"
    },
    {
      value: "Ethiopia",
      label: "Ethiopia"
    },
    {
      value: "Finland",
      label: "Finland"
    },
    {
      value: "France",
      label: "France"
    },
    {
      value: "United Kingdom",
      label: "United Kingdom"
    },
    {
      value: "Georgia",
      label: "Georgia"
    },
    {
      value: "Greece",
      label: "Greece"
    },
    {
      value: "Hungary",
      label: "Hungary"
    },
    {
      value: "Indonesia",
      label: "Indonesia"
    },
    {
      value: "Ireland",
      label: "Ireland"
    },
    {
      value: "India",
      label: "India"
    },
    {
      value: "Israel",
      label: "Israel"
    },
    {
      value: "Iraq",
      label: "Iraq"
    },
    {
      value: "Italy",
      label: "Italy"
    },
    {
      value: "Iceland",
      label: "Iceland"
    },
    {
      value: "Jersey",
      label: "Jersey"
    },
    {
      value: "Jordan",
      label: "Jordan"
    },
    {
      value: "Japan",
      label: "Japan"
    },
    {
      value: "Kenya",
      label: "Kenya"
    },
    {
      value: "Cambodia",
      label: "Cambodia"
    },
    {
      value: "Korea",
      label: "Korea"
    },
    {
      value: "Kuwait",
      label: "Kuwait"
    },
    {
      value: "Sri Lanka",
      label: "Sri Lanka"
    },
    {
      value: "Liberia",
      label: "Liberia"
    },
    {
      value: "Lesotho",
      label: "Lesotho"
    },
    {
      value: "Morocco",
      label: "Morocco"
    },
    {
      value: "Madagascar",
      label: "Madagascar"
    },
    {
      value: "Myanmar",
      label: "Myanmar"
    },
    {
      value: "Mauritania",
      label: "Mauritania"
    },
    {
      value: "Mauritius",
      label: "Mauritius"
    },
    {
      value: "Maldives",
      label: "Maldives"
    },
    {
      value: "Mexico",
      label: "Mexico"
    },
    {
      value: "Malaysia",
      label: "Malaysia"
    },
    {
      value: "Nigeria",
      label: "Nigeria"
    },
    {
      value: "Netherlands",
      label: "Netherlands"
    },
    {
      value: "Norway",
      label: "Norway"
    },
    {
      value: "Nepal",
      label: "Nepal"
    },
    {
      value: "New Zealand",
      label: "New Zealand"
    },
    {
      value: "Philippines",
      label: "Philippines"
    },
    {
      value: "Pakistan",
      label: "Pakistan"
    },
    {
      value: "Poland",
      label: "Poland"
    },
    {
      value: "Sweden",
      label: "Sweden"
    },
    {
      value: "Singapore",
      label: "Singapore"
    },
    {
      value: "Thailand",
      label: "Thailand"
    },
    {
      value: "Turkey",
      label: "Turkey"
    },
    {
      value: "United States",
      label: "United States"
    },
    {
      value: "Vietnam",
      label: "Vietnam"
    },
    {
      value: "South Africa",
      label: "South Africa"
    },
    {
      value: "Zimbabwe",
      label: "Zimbabwe"
    },
  ];

  const [selectedOption, setSelectedOption] = useState([]);
  const handleChangeCountry = (e) => {
    setSelectedOption(e);
  }

  /**********************************************************************************/


  React.useEffect(() => {

    Server.get(`/policy/getAll?accountId=${accountId}&requestTime=${requestTime}`, {
      headers: {
        'content-type': 'application/json',
        authToken: authtoken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"

      },
    })
      .then((response) => {
        console.log(response.data)
        
        if(!(response.data.resultCode == -2 || response.data.resultMessage=="No Policies found")) {
          setRows(response.data.resultData)
        }

      }).catch((err) => {
        console.log(err)
        setRows([])
      })
  }, [])


const allowandroid = (e) => {
  if(e.checked)
  { 
    androidallow = "true"
  }
  else
  {
    androidallow = "false"
  }
}
const allowbb = (e) => {
  if(e.checked)
  { 
    bballow = "true"
  }
  else
  {
    bballow = "false"
  }
}

const allowcromeos = (e) => {
  if(e.checked)
  { 
    cromeosallow = "true"
  }
  else
  {
    cromeosallow = "false"
  }
}

const allowios = (e) => {
  if(e.checked)
  { 
    iosallow = "true"
  }
  else
  {
    iosallow = "false"
  }
}

const allowlinux = (e) => {
  if(e.checked)
  { 
    linuxallow = "true"
  }
  else
  {
    linuxallow = "false"
  }
}

const allowmac = (e) => {
  if(e.checked)
  { 
    macallow = "true"
  }
  else
  {
    macallow = "false"
  }
}

const allowwindow = (e) => {
  if(e.checked)
  { 
    windowallow = "true"
  }
  else
  {
    windowallow = "false"
  }
}

const allowwindowphone = (e) => {
  if(e.checked)
  { 
    windowphoneallow = "true"
  }
  else
  {
    windowphoneallow = "false"
  }
}
const allowother = (e) => {
  if(e.checked)
  { 
    otherallow = "true"
  }
  else
  {
    otherallow = "false"
  }
}



const crome = (e) => {
  if(e.checked)
  { 
    cromev = "true"
  }
  else
  {
    cromev = "false"
  }
}
const cromemobile = (e) => {
  if(e.checked)
  { 
    cromemobilev = "true"
  }
  else
  {
    cromemobilev = "false"
  }
}
const edge = (e) => {
  if(e.checked)
  { 
    edgev = "true"
  }
  else
  {
    edgev = "false"
  }
}
const firefox = (e) => {
  if(e.checked)
  { 
    firefoxv = "true"
  }
  else
  {
    firefoxv = "false"
  }
}
const ie = (e) => {
  if(e.checked)
  { 
    iev = "true"
  }
  else
  {
    iev = "false"
  }
}
const mobilrsafari = (e) => {
  if(e.checked)
  { 
    mobilrsafariv = "true"
  }
  else
  {
    mobilrsafariv = "false"
  }
}
const safari = (e) => {
  if(e.checked)
  { 
    safariv = "true"
  }
  else
  {
    safariv = "false"
  }
}

const all = (e) => {
  if(e.checked)
  { 
    allv = "true"
  }
  else
  {
    allv = "false"
  }
}

const denyallaccess = (e) => {
  if(e.checked)
  { 
    allaccessdeny = "true"
  }
  else
  {
    allaccessdeny = "false"
  }
}

//var  geoFencing;
// const devicetracking = (e) => {
//   if(e.checked) {
//     deviceTracking = "true" 
//   }
//   else {
//     deviceTracking = "false"
//   }
// }

// const geofencing = (e) => {
//   if(e.checked) {
//     geoFencing = "true"
//   }
//   else {
//     geoFencing = "false"
//   }
// }


  // const [isOpen, setIsOpen] = React.useState(false);
 
  // const togglePopup = () => {
  //   setIsOpen(!isOpen);

    
  // }
 
const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    console.log("SCountry",selectedOption.value)
    console.log("BCountry",selectedValue)
    console.log("loc", geoFencing.checked,deviceTracking.checked)
    console.log("--------",cromeosallow,allaccessdeny,androidallow,bballow,iosallow,linuxallow,macallow,otherallow,windowallow,windowphoneallow,allv,cromev,cromemobilev,edgev,firefoxv,iev,mobilrsafariv,safariv,"---------")
    if(roles == '1')
    {
      var allowAccessWithoutMFA= "false"
      var denyAccessForUnenrolledUsers = "false"
      var requiredEnrollment= "true"
    }else if(roles == '2' )
    {
      allowAccessWithoutMFA= "true"
      denyAccessForUnenrolledUsers = "false"
      requiredEnrollment= "false"
    }else if(roles == '3' )
    {
       allowAccessWithoutMFA= "false"
       denyAccessForUnenrolledUsers = "true"
       requiredEnrollment= "false"
    }
    if(auth == '1')
    {
      var denyAccess = "false"
      var enforceMFA = "true"
    }else if(auth == '2' )
    {
       denyAccess = "true"
       enforceMFA = "false"
    }
    console.log("ip address",myip.split(","))
    console.log(allowAccessWithoutMFA,denyAccessForUnenrolledUsers,requiredEnrollment)
    console.log(denyAccess,enforceMFA)
    await Server.post(`/policy/create?accountId=${accountId}&policyName=${pname}&requestTime=${requestTime}`,
    {
      "authPolicy": {
        "bypassMFA": true,
        "denyAccess": denyAccess,
        "enforceMFA": enforceMFA
      },
      "locationPolicy": {
        "blacListedCountries": selectedValue,
        "deviceTracking": deviceTracking.checked,
        "geoFencing": geoFencing.checked,
        "homeCountry": selectedOption.value,
      },
      "networkPolicy": {
        "allowAnonymousNetworks": allaccessdeny,
        "allowedIps": ips,
        "mfaRequiredIps": twoFAIps,
      },
      "osPolicy": {
        "allowAllOtherBrowsers": allowAllBrowsers.checked,
        "allowAndroid": allowAndroid.checked,
        "allowAndroidDevicesfulldiskEncryption": allowAndroidDeviceFDE.checked,
        "allowBiometricVerification": allowBiometricVerif.checked,
        "allowBlackberry": allowBlackberryD.checked,
        "allowChrome": allowChromeDevice.checked,
        "allowChromeMobile": allowChromeMD.checked,
        "allowEdge": allowEdgeDevice.checked,
        "allowFirefox": allowFirefox.checked,
        "allowIE": allowIE.checked,
        "allowIOS": allowIOS.checked,
        "allowLinux": allowLinux.checked,
        "allowMAC": allowMac.checked,
        "allowMobileSafari": allowMobileSafari.checked,
        "allowOtherOS": allowOtherOS.checked,
        "allowSafari": allowSafari.checked,
        "allowTamperedDevices": allowTampDevice.checked,
        "allowWindows": allowWindows.checked,
        "allowWindowsPhone": allowWindowsPhone.checked
      },
      "userPolicy": {
        "allowAccessWithoutMFA": allowAccessWithoutMFA,
        "denyAccessForUnenrolledUsers": denyAccessForUnenrolledUsers,
        "requiredEnrollment": requiredEnrollment
      }
    }
    ,{
      
        headers: {
            authToken: authtoken,
        },
    })
    .then((response) => {
      console.log(response.data.resultMessage)
      var errormsg = response.data.resultMessage
      // Swal.fire(
      //   errormsg,
      // )
      // togglePopup();
      // window.location.reload();
     setLoading(false)
      if(response.data.resultCode === 0){
                    console.log(response.data)
                    // setUser({
                    //     username: "",
                    //     email: "",
                    //     phone: "",
                    // })
                    Swal.fire({
                        title: 'Successfully Added',
                        icon: 'success',
                        showCancelButton: true,
                    })
                    history.push({
                        pathname: "/AxiomProtect/Policy"
                    })
                }else{
                    Swal.fire({
                        title: errormsg,
                        icon: 'error',
                        showCancelButton: true,
                    })
                }
                togglePopup();
            }).catch((err) => {
              setLoading(false)
                console.log(err)
                Swal.fire({

                    title: 'Error',
                    icon: 'error',
                    text:err
                })
    })
    
    // history.push({
    //   pathname: "/Policy"
    // })
    // console.log(result)  
}


const [ips, setIps] = useState( []);
const [currIp, setCurrIp] = useState("");
const [twoFAIps, setTwoFAIps] = useState( []);
const [currTwoFAIp, setCurrTwoFAIp] = useState("");
 // added text field for mulitple ip
 

 const handleKeyUp = (e) => {
  console.log(e.keyCode);
  if (e.keyCode === 32) {
    setIps((oldState) => [...oldState, e.target.value]);
    setCurrIp("");
  }
};

const handleChangeIp = (e) => {
  setCurrIp(e.target.value);
};

const handleDeleteIp = (item, index) => {
  let arr = [...ips];
  arr.splice(index, 1);
  console.log(item);
  setIps(arr);
};
console.log({rowData: rows && rows[0]})
console.log({ips, twoFAIps})


// added text field for 2FA mulitple ip

const handle2FAKeyUp = (e) => {
  console.log(e.keyCode);
  if (e.keyCode === 32) {
    setTwoFAIps((oldState) => [...oldState, e.target.value]);
    setCurrTwoFAIp("");
  }
};

const handleChangeTwoFAIp = (e) => {
  setCurrTwoFAIp(e.target.value);
};

const handleDeleteTwoFAIp = (item, index) => {
  let arr = [...twoFAIps];
  arr.splice(index, 1);
  console.log(item);
  setTwoFAIps(arr);
};

    return (
        <div style={{overflow:"hidden", margin:"2rem auto"}}>
            <Popup
            style={{overflow:"hidden", height:"80vh"}}
      content={<>
        <b>Create Global Policy</b><br /><hr />
        <div style={{float:'left', width:'23%'}}>
            <a href="#user-policy">New User Policy</a>
            <br /><br />
            <a href="#auth-policy">Authentication Policy</a>
            <br /><br />
           <a href="#user-location"> User Location</a>
            <br /><br />
            {/* Device Health application
            <br /><br />
            Remembered devices
            <br /><br /> */}
            <a href="#operating-system">Browsers And OS</a>
            {/* Plugins
            <br /><br /> */}
            <br/>
            <br/>
            <a href="#auth-networks">Authorized Networks</a>
            <br /><br />
            {/* Anonymous networks
            <br /><br />
            Authentication methods
            <br /><br />
            Mobile app
            <br /><br />
            Tampered devices
            <br /><br />
            Full-disk encryption
            <br /><br />
            Screen lock
            <br /><br />
            Screen lock
            <br /> */}
        </div>
        <div class="vl"></div>
        <div style={{float:'right', width:'75%'}}>
            <div class="inboxbox">
              <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Policy Name</Typography>
              <br />
              {/* <hr /> */}
              <TextField required fullWidth size="small" placeholder="Enter policy name..." onChange={(e)=>setPname(e.target.value)} ></TextField>
            </div>
            <br />
            <hr/>
            <div class="inboxbox" id="newuser">
            <br />
              <Typography id="user-policy" sx={{fontFamily:'Jost', color: '#232E3C'}}>New User Policy</Typography>
              <br />
              {/* <hr /> */}
              <FormControl>
                  <RadioGroup
                    name="Roles"
                    onChange={(e)=>setRoles(e.target.value)}
                    required
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Require enrollment" />
                    <div class="info" style={{paddingLeft:'30px', fontSize:'12px'}}>Prompt unenrolled users to enroll whenever possible.</div>

                    <FormControlLabel value="2" control={<Radio />} label=" Allow access without 2FA" />
                    <div class="info" style={{paddingLeft:'30px', fontSize:'12px'}}>Allow users unknown to   to pass through without two-factor authentication. Users who exist in   and have not enrolled will be required to enroll.</div>
                  
                    <FormControlLabel value="3" control={<Radio />} label="Deny access" />
                    <div class="info" style={{paddingLeft:'30px', fontSize:'12px'}}>Deny authentication to unenrolled users. This controls what happens after an unenrolled user passes primary authentication</div>
                  
                  </RadioGroup>
              </FormControl>
              
            </div>
            <br />
            <hr/>
            <div class="inboxbox">
            <br />
              <Typography id="auth-policy" sx={{fontFamily:'Jost', color: '#232E3C'}}>Authentication Policy</Typography>
              <br />
              <FormControl>
                  <RadioGroup
                    name="Roles"
                    onChange={(e)=>setAuth(e.target.value)}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Enforce 2FA" />
                    <div class="info" style={{paddingLeft:'30px', fontSize:'12px'}}>Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.</div>

                    <FormControlLabel value="2" control={<Radio />} label=" Deny access" />
                    <div class="info" style={{paddingLeft:'30px', fontSize:'12px'}}>Deny authentication to all users.When enabled, this affects all users</div>

                    <FormControlLabel value="3" control={<Radio />} label="Bypass MFA" />
                    <div class="info" style={{paddingLeft:'30px', fontSize:'12px'}}>Bypass MFA</div>
                  
                  </RadioGroup>
              </FormControl>
              
            </div>
            <br />
            <hr/>
            <div class="inboxbox">
              <br />
                <Typography id="user-location" sx={{fontFamily:'Jost', color: '#232E3C'}}>Home Country</Typography>
                <br />
              <Select
                placeholder="Select Country..."
                style={{ minWidth: 350 }}
                value={selectedOption}
                onChange={handleChangeCountry}
                options={options}
              />
              <br />
              <br />
              <br />
                <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Blacklisted Countries</Typography>
                <br />
              <Select
                className="dropdown"
                placeholder="Select Countries..."
                value={data.filter(obj => selectedValue.includes(obj.value))} // set selected values
                options={data} // set list of the data
                onChange={handleChange} // assign onChange function
                isMulti
                isClearable
              />
              <br />
              <br />
              {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 350 }}>
                <InputLabel id="demo-simple-select-filled-label" >No action</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}
              
              <div>
                {/* <TextField
                fullWidth
                size="small"
                width='350px'
                disabled
                id="outlined-disabled"
                label=""
                placeholder="Selected countries..."
                value={blackcountry}
              /> */}
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Device Tracking" checked={deviceTracking.checked} onChange={(e) => setDeviceTracking({ ...deviceTracking, checked: e.target.checked })} />

              </FormGroup>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Geo-Fencing" checked={geoFencing.checked} onChange={(e) => setGeoFencing({ ...geoFencing, checked: e.target.checked })} />
              </FormGroup>
              <br />
              </div>
            </div>

            {/* <div class="inboxbox">
            <br /><br />
            Device Health application
                <br /><br />
                <hr />
                <br /> MAC OS <br />

                <FormControl>
                  <RadioGroup
                    name="macos"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Don't require users to have the app" />
                    
                    <FormControlLabel value="2" control={<Radio />} label=" Require users to have the app" />
                    <div style={{paddingLeft: '20px'}}><FormGroup>
                      <FormControlLabel control={<Checkbox  />} label="Block access if firewall is off." />
                      <FormControlLabel control={<Checkbox  />} label="Block access if FileVault is off." />
                      <FormControlLabel control={<Checkbox  />} label="Block access if system password is not set." />
                      
                    </FormGroup></div>
                  </RadioGroup>
              </FormControl>
              <br />
              <br />
              <br /> WINDOWS <br /><br />

                <FormControl>
                  <RadioGroup
                    name="windowsos"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Don't require users to have the app" />
                    
                    <FormControlLabel value="2" control={<Radio />} label=" Require users to have the app" />
                    <div style={{paddingLeft: '20px'}}><FormGroup>
                      <FormControlLabel control={<Checkbox  />} label="Block access if firewall is off." />
                      <FormControlLabel control={<Checkbox  />} label="Block access if FileVault is off." />
                      <FormControlLabel control={<Checkbox  />} label="Block access if system password is not set." />
                      
                    </FormGroup></div>
                  </RadioGroup>
              </FormControl>

            </div> */}
            {/* <div class="inboxbox">
            <br /><br />
            Remembered devices
                <br /><br />
                <hr />
                <p style={{lineHeight: '20px'}}>Remembered devices allow users to skip subsequent 2FA requests. Remembered devices can only be enabled on browser-based applications.</p>
                <FormControl>
                  <RadioGroup
                    name="rememberdevice"
                  >
                    <FormControlLabel value="1" control={<Radio />} label=" Do not remember devices" />
                    
                    <FormControlLabel value="2" control={<Radio />} label="Users may choose to remember their device for" />
                    
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 100 }}>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Age"
                      >
                        <MenuItem value={10}>1</MenuItem>
                        <MenuItem value={20}>2</MenuItem>
                        <MenuItem value={30}>3</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-filled-label">Days</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>1</MenuItem>
                        <MenuItem value={20}>2</MenuItem>
                        <MenuItem value={30}>3</MenuItem>
                      </Select>
                    </FormControl>

                    <div style={{paddingLeft: '20px'}}><RadioGroup
                      name="dd"
                      >
                        <FormControlLabel value="11" control={<Radio />} label=" Per each application" />
                      
                        <FormControlLabel value="12" control={<Radio />} label="For all protected web applications" />
                      
                      </RadioGroup></div>
                  </RadioGroup>
              </FormControl>
            </div> */}
            <hr/>
            <div class="inboxbox">
            <br />
            <Typography id="operating-system" sx={{fontFamily:'Jost', color: '#232E3C'}}>Operating systems</Typography>
                <br />
                {/* <hr /> */}
              <Stack sx={{ width: '98%' }} spacing={2}>
                <Alert icon={false}>This section affects devices used to access applications protected by 's browser-based authentication prompt, and mobile devices using Mobile as a second factor. Learn more about operating system policies .</Alert>
              </Stack>
              
              <br />
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Allow All Other Browers" onChange={(e) => setAllowAllBrowers({ ...allowAllBrowsers, checked: e.target.checked })}/>
                <FormControlLabel control={<Checkbox />} label="Allow android Devices" onChange={(e) => setAllowAndroid({ ...allowAndroid, checked: e.target.checked })}/>
                {/* <FormControlLabel control={<Checkbox />} label="Allow android device full disk encryption" onChange={(e) => setAllowAndroidDeviceFDE({ ...allowAndroidDeviceFDE, checked: e.target.checked })}/> */}
                <FormControlLabel control={<Checkbox />} label="Allow biometric verification" onChange={(e) => allowBiometricVerif({ ...setAllowBiometricVerif, checked: e.target.checked })}/>                
                {/* <FormControlLabel control={<Checkbox />} label="Allow blackberry devices" onChange={(e) => setAllowBlackberryD({ ...allowBlackberryD, checked: e.target.checked })} /> */}
                <FormControlLabel control={<Checkbox />} label="Allow chrome os devices" onChange={(e) => setAllowChromeDevice({ ...allowChromeDevice, checked: e.target.checked })} />
                <FormControlLabel control={<Checkbox />} label="Allow chrome mobile devices" onChange={(e) => setAllowChromeMD({ ...allowChromeMD, checked: e.target.checked })} />
                <FormControlLabel control={<Checkbox />} label="Allow Edge devices" onChange={(e) => setAllowEdgeDevice({ ...allowEdgeDevice, checked: e.target.checked })} />
                <FormControlLabel control={<Checkbox />} label="Firefox" onChange={(e) => setAllowFirefox({ ...allowFirefox, checked: e.target.checked })} />
                <FormControlLabel control={<Checkbox />} label="Internet explore" onChange={(e) => setAllowIE({ ...allowIE, checked: e.target.checked })} />
                <FormControlLabel control={<Checkbox />} label="Allow ios devices" onChange={(e) => setAllowIOS({ ...allowIOS, checked: e.target.checked })} />
                <FormControlLabel control={<Checkbox />} label="Allow linux device" onChange={(e) => setAllowLinux({ ...allowLinux, checked: e.target.checked })} />
                <FormControlLabel control={<Checkbox />} label="Allow mac os devices" onChange={(e) => setAllowMac({ ...allowMac, checked: e.target.checked })} />
                <FormControlLabel control={<Checkbox />} label="Mobile safari" onChange={(e) => setAllowMobileSafari({ ...allowMobileSafari, checked: e.target.checked })} />
                <FormControlLabel control={<Checkbox />} label="Safari" onChange={(e) => setAllowSafari({ ...allowSafari, checked: e.target.checked })}/>
                <FormControlLabel control={<Checkbox />} label="Allow tampered devices" onChange={(e) => setAllowTampDevice({ ...allowTampDevice, checked: e.target.checked })} />
                <FormControlLabel control={<Checkbox />} label="Allow windows devices" onChange={(e) => setAllowWindows({ ...allowWindows, checked: e.target.checked })} />
                <FormControlLabel control={<Checkbox />} label="Allow windows phone devices" onChange={(e) => setAllowWindowsPhone({ ...allowWindowsPhone, checked: e.target.checked })} />
                <FormControlLabel control={<Checkbox />} label="Allow other os devices" onChange={(e) => setAllowOtherOS({ ...allowOtherOS, checked: e.target.checked })} />
              </FormGroup>
            </div> 
            {/* <br />
            <hr/>
            <div class="inboxbox">
            <br />
            <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Browsers</Typography>
                <br />
              <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}><Alert icon={false}>Always block</Alert></Typography>
              <br />
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Crome" onClick={(e)=>crome(e.target.value)} />
                <FormControlLabel control={<Checkbox />} label="Crome mobile" onClick={(e)=>cromemobile(e.target.value)} />
                <FormControlLabel control={<Checkbox />} label="Edge " onClick={(e)=>edge(e.target.value)} />
                <FormControlLabel control={<Checkbox />} label="Firefox" onClick={(e)=>firefox(e.target.value)} />
                <FormControlLabel control={<Checkbox />} label="Internet explore" onClick={(e)=>ie(e.target.value)} />
                <FormControlLabel control={<Checkbox />} label="Mobile safari" onClick={(e)=>mobilrsafari(e.target.value)} />
                <FormControlLabel control={<Checkbox />} label="Safari" onClick={(e)=>safari(e.target.value)} />
                <FormControlLabel control={<Checkbox />} label="All other browsers" onClick={(e)=>all(e.target.value)} />
              </FormGroup> */}
              {/* <hr color="#CECECE"/>
              <FormGroup><div>
                <FormControlLabel control={<Checkbox />} label="Wran user if browser is out of date" /><br />
                <FormControlLabel control={<Checkbox />} label="And block them if more than" />

                
                  <Select
                  size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{width: '50px'}}
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                  </Select>Out of date</div>
              </FormGroup> */}
            {/* </div>  */}
            {/* <div class="inboxbox">
            <br /><br />
              Plugins
              <br /><br />
              <hr />
              Flash <br /><br />
              <FormControl>
                  <RadioGroup
                    name="flash"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow all versions" />

                    <FormControlLabel value="2" control={<Radio />} label=" Warn user if there browser out of date " />
                  
                        <FormGroup><div>
                          <FormControlLabel control={<Checkbox />} label="And block them if more than" />

                          
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              style={{width: '50px'}}
                            >
                              <MenuItem value={10}>1</MenuItem>
                              <MenuItem value={20}>2</MenuItem>
                              <MenuItem value={30}>3</MenuItem>
                            </Select>Out of date</div>
                        </FormGroup>

                    <FormControlLabel value="3" control={<Radio />} label="Block all versions" />
                    
                  
                  </RadioGroup>
              </FormControl>
              <br /><br />
              java<br /><br />
              <FormControl>
                  <RadioGroup
                    name="flash"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow all versions" />

                    <FormControlLabel value="2" control={<Radio />} label=" Warn user if there browser out of date " />
                  
                        <FormGroup><div>
                          <FormControlLabel control={<Checkbox />} label="And block them if more than" />

                          
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              style={{width: '50px'}}
                            >
                              <MenuItem value={10}>1</MenuItem>
                              <MenuItem value={20}>2</MenuItem>
                              <MenuItem value={30}>3</MenuItem>
                            </Select>Out of date</div>
                        </FormGroup>

                    <FormControlLabel value="3" control={<Radio />} label="Block all versions" />
                    
                  
                  </RadioGroup>
              </FormControl>
              
            </div> */}
            <br />
            <hr/>
            <div class="inboxbox">
            <br />
            <Typography id="auth-networks" sx={{fontFamily:'Jost', color: '#232E3C'}}>Authorized Networks</Typography>
              <br />
              <Stack sx={{ width: '98%' }} spacing={2}>
                <Alert icon={false}>Specify networks using a space-separated list of IP addresses, IP ranges, or CIDRs. These must be public IP addresses, and not local or private IP addresses.</Alert>
              </Stack>
              <br />
              <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Allowed IP address (Enter space separated multiple IP address)</Typography>
              <br/>
              <FormControl fullWidth >
            <div className={"container"}>
              {ips && ips?.map((item, index) => (
                <Chip
                  size="small"
                  onDelete={() => handleDeleteIp(item, index)}
                  label={item}
                />
              ))}
            </div>
            <Input
           
            fullWidth
            variant="contained"
              value={currIp}
              onChange={handleChangeIp}
              onKeyDown={handleKeyUp}
            />
          </FormControl>
              {/* <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Requires enrollment from these users" />
              </FormGroup> */}
              <br/>
              <br/>
              <br />
              <Typography sx={{fontFamily:'Jost', color: '#232E3C'}}>Require 2FA from these networks  (Enter space separated multiple IP address)</Typography>
              <FormControl fullWidth >
            <div className={"container"}>
              {twoFAIps && twoFAIps?.map((item, index) => (
                <Chip
                  size="small"
                  onDelete={() => handleDeleteTwoFAIp(item, index)}
                  label={item}
                />
              ))}
            </div>
            <Input
            fullWidth
            variant="contained"
              value={currTwoFAIp}
              onChange={handleChangeTwoFAIp}
              onKeyDown={handle2FAKeyUp}
            />
          </FormControl>

              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Deny access from all the other users"  onClick={(e)=>denyallaccess(e.target)} />
              </FormGroup>

            </div>
              <hr />
            {/* <div class="inboxbox">
            <br /><br />
            Anonymous networks<br /><br />
            <hr />
            For users that request access through proxies, Tor, or VPN: 
            <FormGroup><div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{width: '60%'}}
                >
                 <MenuItem value={10}>proxies</MenuItem>
                 <MenuItem value={20}>Tor</MenuItem>
                 <MenuItem value={30}>VPN</MenuItem>
                </Select></div>
            </FormGroup>

            </div> */}

            {/* <div class="inboxbox">
            <br /><br />
            Authentication methods<br /><br />
            <hr />
            <p>Only allow users to authenticate with:</p>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Push" />
                <FormControlLabel control={<Checkbox />} label="Mobile passcode" />
                <FormControlLabel control={<Checkbox />} label="SMS passcode" />
                <FormControlLabel control={<Checkbox />} label="Security key U2F" />
                <FormControlLabel control={<Checkbox />} label="Web Authn" />
                <FormControlLabel control={<Checkbox />} label="Touch ID" style={{paddingLeft: '30px'}}/>
                <FormControlLabel control={<Checkbox />} label="Security Keys (WebAuthn)" style={{paddingLeft: '30px'}}/>
                <FormControlLabel control={<Checkbox />} label="Hardware tokens" />
              </FormGroup>

            </div>

            <div class="inboxbox">
            <br /><br />
            Mobile app<br /><br />
            <hr />
            <FormControl>
                  <RadioGroup
                    name="mobile app"
                  >
                    <FormControlLabel value="1" control={<Radio />} label=" Require up-to-date security patches for axiom Mobile." />

                    <FormControlLabel value="2" control={<Radio />} label=" Don't require up-to-date security patches for axiom Mobile. " />
                
                  </RadioGroup>
              </FormControl>
            </div> */}

            {/* <div class="inboxbox">
            <br /><br />
            Tampered devices<br /><br />
            <hr />
            <FormControl>
                  <RadioGroup
                    name="tempered devices"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow authentication from tampered devices." />

                    <FormControlLabel value="2" control={<Radio />} label="Don't allow authentication from tampered devices.." />

                    Only applies to iOS and Android.
                
                  </RadioGroup>
              </FormControl>
            </div>

            <div class="inboxbox">
            <br /><br />
            Full-disk encryption<br /><br />
            <hr />
            <FormControl>
                  <RadioGroup
                    name="full disk"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow authentication from Android devices without full-disk encryption." />

                    <FormControlLabel value="2" control={<Radio />} label="Don't allow authentication from Android devices without full-disk encryption.." />

                    Only applies to Android.
                
                  </RadioGroup>
              </FormControl>
            </div> */}

            {/* <div class="inboxbox">
            <br /><br />
            Screen lock<br /><br />
            <hr />
            <FormControl>
                  <RadioGroup
                    name="full disk"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow authentication from devices without a screen lock." />

                    <FormControlLabel value="2" control={<Radio />} label="Don't allow authentication from devices without a screen lock." />

                    Only applies to iOS and Android.
                
                  </RadioGroup>
              </FormControl>
            </div>

            <div class="inboxbox">
            <br /><br />
            Mobile device biometrics<br /><br />
            <hr />
            <p style={{lineHeight: '20px'}}>Apple Touch ID, Face ID and Android Fingerprint can be required as an additional verification when approving Push login requests on supported devices. Any device's passcode can be used as a fallback when biometric verification fails or is unavailable.</p>
            <FormControl>
                  <RadioGroup
                    name="full disk"
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Allow authentication from devices without a screen lock." />

                    <FormControlLabel value="2" control={<Radio />} label="Don't allow authentication from devices without a screen lock." />
                    Only applies to iOS and Android.
                
                  </RadioGroup>
              </FormControl>
            </div> */}
        <br />
        </div>
        <br />
        <div style={{textAlign:"center"}}>
       {loading ? <Loader2/> : <center>
         <Button type="submit" variant="contained" onClick={handleSubmit} align>Submit</Button>
        </center>}
        <br />
        <br /><br /><br /><br />
        </div>
      </>}
      handleClose={togglePopup}
    />
        </div>
    )
}