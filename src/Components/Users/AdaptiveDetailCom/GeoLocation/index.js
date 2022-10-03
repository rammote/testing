import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { MyMapComponent } from '../../Test';
import Server from '../../../APIUrl';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


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

const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
const requestTime = escape(requestTimess);

function SimpleMap({ appId }) {


  const [geoLocationData, setgeoLocationData] = React.useState({

    isLoading: true,
    isSuccess: false,
    isError: false,
    isSnackbarOpen: false,

  })

  const location = useLocation();
  const authtoken = sessionStorage.getItem("jwtToken");
  const accountId = sessionStorage.getItem("accountId");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([])
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };


  React.useEffect(() => {
    // setApplicationData({ ...applicationData,isLoading: true })

    Server.get(`/geotrack/getByUserId?accountId=${accountId}&userId=${location.state.row.userid}&appId=${appId}&requestTime=${requestTime}`, {
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

        if ((response.data.resultCode == 0 || response.data.resultMessage == "Success")) {
          setRows(response.data.resultData)

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

  console.log({rows: rows})
  return (
    // Important! Always set the container height explicitly
    <>
      <div style={{  width: '100%' }}>
        <br />
        {rows.length == "0" ?
          <div ><center></center></div>
          : <MyMapComponent
            isMarkerShown
            rows={rows}
          />}
        {/* <LoadScript
                        googleMapsApiKey='AIzaSyBIG7NI90M-f2RFWXxwWwCZL9tpowvBrKA'>
                            <GoogleMap
                            mapContainerStyle={mapStyles}
                            zoom={13}
                            center={defaultCenter}
                            defaultCenter={{ lat: -34.397, lng: 150.644 }}

                            />
                            {markers.map((marker,idx)=>(
                              <Marker key={idx}
                              position={{ lat: -34.397, lng: 150.644 }}              
                              // position={{ lat: marker.latitude, lng: marker.longitude }}

                            />  
                            ))}
                            
                        </LoadScript>
                 */}

      </div>
    </>
  );
}

export default SimpleMap;