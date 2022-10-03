import React from 'react'
import UserLoginListTable from './UserLoginListTables'
import RiskReportChart from './RiskReportChart'
import DeviceReportListTable from './DeviceReportListTable'
import GeoLocation from './GeoLocation';
export default function index({appId, rbaReportData}) {
  return (
    <div style={{width:"100%"}}>
      <UserLoginListTable appId={appId} usersData={rbaReportData}/>
      <br/><br/>
      <GeoLocation appId={appId}/>
      <br/><br/>
      <RiskReportChart appId={appId}/>
    </div>
  )
}
