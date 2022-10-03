import { Button } from '@mui/material'
import React from 'react'
import Accountsuccess from '../../../Assets/Accountsuccess.gif'
import { useHistory } from 'react-router-dom';
export default function Success() {
  const history=  useHistory();
  return (
    <div style={{textAlign:"center"}}>
      <h2  style={{ color:"#1976d2"}}>Account Successfully Activated</h2>
       <img src={Accountsuccess} alt="Success" />
       <div>
       <Button size="small" variant='contained' style={{textTransform:"capitalize"}} onClick={(e)=>history.push("/")}>Login Now</Button>

       </div>
    </div>
  )
}
