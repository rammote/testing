import React, { useState, useEffect, useMemo, useRef } from 'react'
import Button from '@mui/material/Button';
import Server from '../APIUrl';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { v1 } from "uuid";

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet tellus tortor. ";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
  const requestTime = escape(requestTimess);


  const NetworkStatus = () => {
    const [status, setStatus] = useState(true);
  
    useEffect(() => {
      function changeStatus() {
        setStatus(navigator.onLine);
      }
      window.addEventListener("online", changeStatus);
      window.addEventListener("offline", changeStatus);
      return () => {
        window.removeEventListener("online", changeStatus);
        window.removeEventListener("offline", changeStatus);
      };
    }, []);
  
    return status ? "Online" : "Offline";
  };

const TypingSpeed = () => {
  const [textToType] = useState(text);
  const [typedText, setTypedText] = useState("");
  const [timer, setTimer] = useState();
  const [elapsedMs, setElapsedMs] = useState(0);
  const [started, setStarted] = useState(false);
  const [wpm, setWpm] = useState(0);

  const parts = useMemo(() => {
    const splitTextToType = textToType.split("");
    let endIndexMatch = 0;
    for (const [index, s] of splitTextToType.entries()) {
      if (s !== typedText[index]) {
        endIndexMatch = index;
        break;
      }
    }
    return {
      matchedPart: textToType.slice(0, endIndexMatch),
      unmatchedPart: textToType.slice(endIndexMatch)
    };
  }, [textToType, typedText]);

  const start = () => {
    const timer = setInterval(() => {
      setElapsedMs((elapsedMs) => elapsedMs + 1);
      if (!started) {
        setStarted(true);
      }
    }, 1000);
    setTimer(timer);
  };

  const restart = () => {
    setStarted(started);
    setElapsedMs(0);
    setTypedText("");
  };

  useEffect(() => {
    if (parts.unmatchedPart.length === 1) {
      clearInterval(timer);
      setWpm(textToType.split(" ").length / (elapsedMs / (60 * 1000)));
    }
  }, [parts, textToType, timer, elapsedMs]);

  if (parts.unmatchedPart.length > 1) {
    return (
      <div>
        <div>
          <b>{parts.matchedPart}</b>
          {parts.unmatchedPart}
        </div>
        <button onClick={start}>start</button>
        <textarea
          disabled={!started}
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
          style={{ width: "90vw", height: "300px" }}
        ></textarea>
      </div>
    );
  } else {
    return (
      <div>
        Your words per minute is {wpm}
        <button onClick={restart}>restart</button>
      </div>
    );
  }
}

export default function AdaptiveAuthData(data,appId) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [geoLocationData, setgeoLocationData] = React.useState({

    isLoading: true,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,

})

const location = useLocation();
const authtoken = sessionStorage.getItem("jwtToken");
const accountId = sessionStorage.getItem("accountId");
// const [page, setPage] = React.useState(0);
// const [rowsPerPage, setRowsPerPage] = React.useState(5);
 const [rows, setRows] = React.useState([])
// const handleChangePage = (event, newPage) =>  setPage(newPage);
// const handleChangeRowsPerPage = (event) => {
//   setRowsPerPage(parseInt(event.target.value));
//   setPage(0);
// };

useEffect(() => {
    // setApplicationData({ ...applicationData,isLoading: true })

    Server.get(`/geotrack/getByUserId?accountId=${accountId}&userId=${location.state.row.userid}&appId=${data.appId}&requestTime=${requestTime}`, {
        headers: {
            'content-type': 'application/json',
            authToken: authtoken,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"

        },
    })
        .then((response) => {
           console.log(response.data)
        //    setgeoLocationData({ ...geoLocationData,isLoading: false })

           if((response.data.resultCode == 0 || response.data.resultMessage == "Success")){
            setRows(response.data.resultData[0])
            console.log(rows)
           }
            
        }).catch((err) => {
            console.log(err)
           setRows([])

           setgeoLocationData({
            
            isLoading: false,
            isSuccess: false,
            isError: true,
            isSnackbarOpen: true,
        })

        })
  }, [])

  const [interval,setInterval] = useState(0);

  // window.addEventListener('devicemotion',(e)=>{
  //   console.log('int',e)
  // }, false)

  console.log(data.appId)
  var uuid = v1();
  const gl = document.createElement("canvas").getContext("webgl");

  var dbName = IDBDatabase.name;

  function listFonts() {
    let { fonts } = document;
    const it = fonts.entries();
  
    let arr = [];
    let done = false;
  
    while (!done) {
      const font = it.next();
      if (!font.done) {
        arr.push(font.value[0].family);
      } else {
        done = font.done;
      }
    }
    console.log(...new Set(arr));
  
    // converted to set then arr to filter repetitive values
    return [...new Set(arr)];
    
  }

  var hasFlash = false;
  try {
    var fo = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    if(fo) hasFlash = true;
  }catch(e){
  if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) 
      hasFlash = true;
  }


  function getBrowserLocales(options = {}) {
    const defaultOptions = {
      languageCodeOnly: false,
    };
    const opt = {
      ...defaultOptions,
      ...options,
    };
    const browserLocales =
      navigator.languages === undefined
        ? [navigator.language]
        : navigator.languages;
    if (!browserLocales) {
      return undefined;
    }
    return browserLocales.map(locale => {
      const trimmedLocale = locale.trim();
      return opt.languageCodeOnly
        ? trimmedLocale.split(/-|_/)[0]
        : trimmedLocale;
    });
  }

  const bluetoothUI = document.querySelector('#bluetoothUI');
  navigator.bluetooth.getAvailability().then(isAvailable => {
    bluetoothUI.hidden = !isAvailable;
  });
  navigator.bluetooth.addEventListener('availabilitychanged', e => {
    bluetoothUI.hidden = !e.value;
  });

  /*********************************************************************************************/
  /*********************************************************************************************/

  // define the time limit
let TIME_LIMIT = 60;

// define quotes to be used
let quotes_array = [
  "Push yourself, because no one else is going to do it for you.",
  "Failure is the condiment that gives success its flavor.",
  "Wake up with determination. Go to bed with satisfaction.",
  "It's going to be hard, but hard does not mean impossible.",
  "Learning never exhausts the mind.",
  "The only way to do great work is to love what you do."
];

// selecting required elements
// let timer_text = document.querySelector(".curr_time");
// let accuracy_text = document.querySelector(".curr_accuracy");
// let error_text = document.querySelector(".curr_errors");
// let cpm_text = document.querySelector(".curr_cpm");
// let wpm_text = document.querySelector(".curr_wpm");
// let quote_text = document.querySelector(".quote");
// let input_area = document.querySelector(".input_area");
// let restart_btn = document.querySelector(".restart_btn");
// let cpm_group = document.querySelector(".cpm");
// let wpm_group = document.querySelector(".wpm");
// let error_group = document.querySelector(".errors");
// let accuracy_group = document.querySelector(".accuracy");

// let timeLeft = TIME_LIMIT;
// let timeElapsed = 0;
// let total_errors = 0;
// let errors = 0;
// let accuracy = 0;
// let characterTyped = 0;
// let current_quote = "";
// let quoteNo = 0;
// let timer = null;

// function updateQuote() {
//   quote_text.textContent = null;
//   current_quote = quotes_array[quoteNo];

//   // separate each character and make an element 
//   // out of each of them to individually style them
//   current_quote.split('').forEach(char => {
//     const charSpan = document.createElement('span')
//     charSpan.innerText = char
//     quote_text.appendChild(charSpan)
//   })

//   // roll over to the first quote
//   if (quoteNo < quotes_array.length - 1)
//     quoteNo++;
//   else
//     quoteNo = 0;
// }

// function processCurrentText() {

//   // get current input text and split it
//   curr_input = input_area.value;
//   curr_input_array = curr_input.split('');

//   // increment total characters typed
//   characterTyped++;

//   errors = 0;

//   quoteSpanArray = quote_text.querySelectorAll('span');
//   quoteSpanArray.forEach((char, index) => {
//     let typedChar = curr_input_array[index]

//     // characters not currently typed
//     if (typedChar == null) {
//       char.classList.remove('correct_char');
//       char.classList.remove('incorrect_char');

//       // correct characters
//     } else if (typedChar === char.innerText) {
//       char.classList.add('correct_char');
//       char.classList.remove('incorrect_char');

//       // incorrect characters
//     } else {
//       char.classList.add('incorrect_char');
//       char.classList.remove('correct_char');

//       // increment number of errors
//       errors++;
//     }
//   });

//   // display the number of errors
//   error_text.textContent = total_errors + errors;

//   // update accuracy text
//   let correctCharacters = (characterTyped - (total_errors + errors));
//   let accuracyVal = ((correctCharacters / characterTyped) * 100);
//   accuracy_text.textContent = Math.round(accuracyVal);

//   // if current text is completely typed
//   // irrespective of errors
//   if (curr_input.length == current_quote.length) {
//     updateQuote();

//     // update total errors
//     total_errors += errors;

//     // clear the input area
//     input_area.value = "";
//   }
// }

// function updateTimer() {
//   if (timeLeft > 0) {
//     // decrease the current time left
//     timeLeft--;

//     // increase the time elapsed
//     timeElapsed++;

//     // update the timer text
//     timer_text.textContent = timeLeft + "s";
//   }
//   else {
//     // finish the game
//     finishGame();
//   }
// }

// function finishGame() {
//   // stop the timer
//   clearInterval(timer);

//   // disable the input area
//   input_area.disabled = true;

//   // show finishing text
//   quote_text.textContent = "Click on restart to start a new game.";

//   // display restart button
//   restart_btn.style.display = "block";

//   // calculate cpm and wpm
//   cpm = Math.round(((characterTyped / timeElapsed) * 60));
//   wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

//   // update cpm and wpm text
//   cpm_text.textContent = cpm;
//   wpm_text.textContent = wpm;

//   // display the cpm and wpm
//   cpm_group.style.display = "block";
//   wpm_group.style.display = "block";
// }


// function startGame() {

//   resetValues();
//   updateQuote();

//   // clear old and start a new timer
//   clearInterval(timer);
//   timer = setInterval(updateTimer, 1000);
// }

// function resetValues() {
//   timeLeft = TIME_LIMIT;
//   timeElapsed = 0;
//   errors = 0;
//   total_errors = 0;
//   accuracy = 0;
//   characterTyped = 0;
//   quoteNo = 0;
//   input_area.disabled = false;

//   input_area.value = "";
//   quote_text.textContent = 'Click on the area below to start the game.';
//   accuracy_text.textContent = 100;
//   timer_text.textContent = timeLeft + 's';
//   error_text.textContent = 0;
//   restart_btn.style.display = "none";
//   cpm_group.style.display = "none";
//   wpm_group.style.display = "none";
// }

   /*********************************************************************************************/
  /*********************************************************************************************/
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Modal
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Adaptive Web Data
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <Typography component="div">
                Device No :  {data?.data?.deviceno}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography component="div">
                Device memory :  {navigator.deviceMemory}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography component="div">
                App Code Name :  {navigator.appCodeName}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography component="div">
                AppName :  {navigator.appName}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography component="div">
                Appversion :  {navigator.appVersion}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography component="div">
                Cookies Enabled :  {navigator.cookieEnabled}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography component="div">
                Platform :  {navigator.platform}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography component="div">
                Browser language :  {navigator.language}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography component="div">
                Product :  {navigator.product}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography component="div">
                userAgent :  {navigator.userAgent}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography component="div">
                Finger Print :  {uuid}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography component="div">
                Touchpoint :  {navigator.maxTouchPoints}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                OS :  {data?.data?.allowedOS}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                OS Details :  {data?.data?.osdetails}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Device Details :  {data?.data?.deviceDetails}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Device Location :  {data?.data?.devicelocation}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                IP Address :  {data?.data?.extIP}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Last Access :  {data?.data?.lastaccess}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Rooted :  {data?.data?.rooted === true ? 'YES' : 'NO'}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Timezone :  {data?.data?.timezone}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
            WifiSsid :  {<NetworkStatus />}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Mac Address :  {data?.data?.macaddress}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Geotrack ID:  {rows?.geotrackid}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Geo IP :  {rows?.ip}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Latitude :  {rows?.lattitude}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Longitude :  {rows?.longitude}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                State :  {rows?.state}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Screen resolution : {window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Carrier Name : {navigator.userAgent}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Typing Speed : 
                {/* {<TypingSpeed/>} */}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
            WebGL : {gl.getParameter(gl.VERSION)}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Plugins : {navigator.plugins.length}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Indexed DB : {dbName}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Java Enabled : {navigator.javaEnabled() == true ? 'true' : 'false'}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Fonts :  {listFonts().join(" ,")}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Flash Enabled :  {hasFlash == false ? 'false' : 'true'}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                CPU :  {navigator.hardwareConcurrency}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                CSSVendorPrefix :  {gl.getParameter(gl.VENDOR)}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Do Not Track :  {navigator.doNotTrack === "1" ? 'true' : 'false'}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Avail Width :  {window.innerHeight}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Avail height:  {window.innerWidth}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Locale :  {getBrowserLocales()}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem >
            <Typography component="div">
                Bluetooth :  {bluetoothUI == false ? 'false' : 'true'}
            </Typography>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}


