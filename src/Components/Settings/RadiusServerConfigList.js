import * as React from 'react';
import Server from '../APIUrl';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import axios from "axios";
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
   
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link, useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { Button } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#728FCE",
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


   

 

export default function CustomizedTables() {
    const history = useHistory();
    const requestTimess = new Date().toISOString().replaceAll("T", " ").replaceAll("Z", "");
    const requestTime = escape(requestTimess);
    const authtoken = sessionStorage.getItem("jwtToken");
    const accountId = sessionStorage.getItem("accountId");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([])


    

   
    // const requestTime = escape(new Date().toISOString().replaceAll("T", " ").replaceAll("Z", ""));

    const handleChangePage = (event, newPage) =>  setPage(newPage);
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
      };

      React.useEffect(() => {
        

        Server.get(`/settings/getRadiusServiceSettings?accountId=${accountId}&requestTime=${requestTime}`, {
            headers: {
              'content-type': 'application/json',
              authToken: authtoken,
              "Access-Control-Allow-Origin":"*",
              "Access-Control-Allow-Methods":"*"

            },
        })
        .then((response) => {
          console.log(response.data)
           setRows([response.data.resultData])

           
       }).catch((err) => {
           console.log(err)
          setRows([])

          

       })
 }, [])

  return (
      <>
      <br /><br /><br />
        <p style={{ color:'#5C5C5C', fontSize: 25, marginLeft:10}}>Radius Server Configuration List <span><Link to="/CreateTeamUnit"><Button variant="contained" style={{color:'#FFFFFF', backgroundColor:'#206BC4', float: 'right'}}>Add Radius Config</Button></Link></span></p>
        <div style={{display:"grid",width:"calc(100vw - 260px)",placeItems:"center", marginLeft:10}}>
           
          <div style={{justifyContent:"flex-end",display:"flex",width:"100%",marginBottom:8, float: 'right'}}><input  onChange={(e)=>setRows(rows.filter((row)=>row.appid == e.target.value))} type="text" placeholder="Search .." style={{borderRadius:"8px 8px",border:"1px solid",outline:"none",padding:12}}/></div>
         
          <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          
                          <StyledTableCell align="center">Account Ip</StyledTableCell>
                          <StyledTableCell align="center">Account Port</StyledTableCell>
                          
                          <StyledTableCell align="center">Auth Ip</StyledTableCell>
                          <StyledTableCell align="center">Auth Port</StyledTableCell>
                          <StyledTableCell align="center">LDAP Search Path</StyledTableCell>
                          <StyledTableCell align="center">LDAP Server Ip</StyledTableCell>
                          <StyledTableCell align="center">LDAP Server Port</StyledTableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                          <StyledTableRow key={index}>
                            
                            <StyledTableCell align="center">{row.accountIp}</StyledTableCell>
                            <StyledTableCell align="center">{row.accountPort}</StyledTableCell>
                            <StyledTableCell align="center">{row.authIp}</StyledTableCell>
                            <StyledTableCell align="center">{row.authPort}</StyledTableCell>
                            <StyledTableCell align="center">{row.ldapSearchPath}</StyledTableCell>
                            <StyledTableCell align="center">{row.ldapServerIp}</StyledTableCell>
                            <StyledTableCell align="center">{row.ldapServerPort}</StyledTableCell>
                          
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                  </TableContainer>
                
        </div>
        </>
  );
}
