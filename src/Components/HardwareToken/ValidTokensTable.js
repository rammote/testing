import * as React from 'react';
import {
  DataGrid, GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from '@mui/x-data-grid';
function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport
   
        csvOptions={{
          fields: [
            "strSerialNo",
            "strManufacturer",
            "strTimeInterval",
            "strMAC",
            "MAC",
            "strEncAlgo",
            "strOtpalgo",
          ],
        }}
        printOptions={{
          fields: [
            "strSerialNo",
            "strManufacturer",
            "strTimeInterval",
            "strMAC",
            "MAC",
            "strEncAlgo",
            "strOtpalgo",
          ],
          allColumns: true
        }}
        style={{ margin: "0px 10px", fontSize: "16px", textTransform: "capitalize" }}
      />
    </GridToolbarContainer>
  );
}
const columns = [
  { field: 'strSerialNo', headerName: 'Serial No.', minWidth: 150, flex: 1, },
  { field: 'strManufacturer', headerName: 'Manufacture', minWidth: 130, flex: 1 },
  { field: 'strTimeInterval', headerName: 'Time Interval', minWidth: 130, flex: 1 },

  {
    field: 'strMAC',
    headerName: 'MAC',
    minWidth: 90,
    flex: 1
  },
  {
    field: 'strEncAlgo',
    headerName: 'Enc Algo',
    sortable: true,
    minWidth: 160,
    flex: 1
  },
  {
    field: 'strOtpalgo',
    headerName: 'OTP Algo',
    sortable: true,
    minWidth: 160,
    flex: 1
  },
];


export default function ValidTokensTable({ successOTPEntriesData }) {

  return (
    <div style={{ maxHeight: 600, width: '80%' }}>
      {successOTPEntriesData && successOTPEntriesData.length > 0 && <DataGrid
        rows={successOTPEntriesData ?? []}
        columns={columns}
        getRowId={(row) => row?.strSerialNo}
        pageSize={10}

        rowsPerPageOptions={[10, 25, 50, successOTPEntriesData?.length]}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      }
    </div>
  );
}
