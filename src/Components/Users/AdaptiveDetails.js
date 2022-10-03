import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import appleAppStore from '../../Assets/appleAppStore.png';
import googlePlayStore from '../../Assets/googlePlayStore.png';
import Server from '../APIUrl';
import AdaptiveDetailCom from './AdaptiveDetailCom';
import GetAdaptiveQRCode from './GetAdaptiveQRCode';
const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  bgcolor: 'background.paper',
  //border: 'rgba(20, 20, 20, 0.21)',
  //backgroundColor: "rgba(20, 20, 20, 0.21)",
  boxShadow: 10,
  p: 4,
};

const downloadContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}
export default function AdaptiveDetails({ appId }) {

  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const location = useLocation();
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const userId = sessionStorage.getItem("userId");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([])
  const [applicationData, setApplicationData] = React.useState({

    isLoading: true,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,

  })

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }


  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  React.useEffect(() => {
    // setApplicationData({ ...applicationData,isLoading: true })
    console.log(authtoken)
    Server.get(`/reports/getAdaptiveReport?accountId=${accountId}&appId=${appId}&userId=${location.state.row.userid}&requestTime=${requestTime}`, {
      headers: {
        'content-type': 'application/json',
        authToken: authtoken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"

      },
    })
      .then((response) => {
        setApplicationData({ ...applicationData, isLoading: false })

        if (!(response.data.resultCode == -1 || response.data.resultMessage == "Unable to get applications")) {
          const sortData=response?.data?.resultData.length>0 && response?.data?.resultData.sort((f,s)=> new Date(s?.createdon)-new Date(f?.createdon))
          setRows(sortData)

        }

      }).catch((err) => {
        console.log(err)
        setRows([])

        setApplicationData({

          isLoading: false,
          isSuccess: false,
          isError: true,
          isSnackbarOpen: true,
        })

      })
  }, [])
  return (
    <>

      <div>
        <h4 style={{ color: '#0D4990', borderColor: '#0D4990' }}>Download app from app store and scan the QR code.</h4>

        <Stack spacing={2}>
          <Alert sx={{ width: 'fit-content' }} icon={false}>
            <div style={downloadContainerStyle}>
              <a href='https://play.google.com/store/apps/details?id=com.mollatech.adaptiveauth' target="_blank" rel="noopner noreferrer">
                <img src={googlePlayStore} alt="googlePlayStore" width="120" />
              </a>

              <a href='https://apps.apple.com/us/app/adaptive-auth/id1575352071' target="_blank" rel="noopner noreferrer">
                <img src={appleAppStore} alt="appleAppStore" width="120" />
              </a>

              <GetAdaptiveQRCode userID={location.state.row.userid} appId={appId} />

            </div>
            {/* <Button variant="outlined" onClick={() => openInNewTab('https://play.google.com/store/apps/details?id=com.mollatech.adaptiveauth 2.0')}>Download IOS App</Button> */}
            {/* &nbsp;&nbsp; */}

          </Alert>
        </Stack>
      </div>
      <br />
    <div style={{width:"100%"}}>
    <AdaptiveDetailCom appId={appId} rbaReportData={rows}/>
    </div>
      <br/>
  
    </>
  )
}