import React from 'react'

export default function PolicyCharts() {
    const accountId = sessionStorage.getItem("accountId");
    const authtoken = sessionStorage.getItem("jwtToken");
    const requestTime = new Date()
      .toISOString()
      .replaceAll("T", " ")
      .replaceAll("Z", "");
    return (
        <div>
            
        </div>
    )
}
