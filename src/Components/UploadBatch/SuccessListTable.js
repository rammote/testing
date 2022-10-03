import * as React from 'react';
import { DataGrid,GridToolbarContainer,
    GridToolbarExport,
    gridClasses, } from '@mui/x-data-grid';
import moment from "moment";

function CustomToolbar() {

    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport
          
          style={{ margin: "0px 10px", fontSize: "16px", textTransform:"capitalize" }}
        />
      </GridToolbarContainer>
    );
  }
const columns = [
    { field: 'userId', headerName: 'User Id', minWidth: 130, flex: 1 },
    { field: 'serialNo', headerName: 'Token Serial No', minWidth: 130, flex: 1 },
    {
        field: 'assignedOn',
        headerName: 'Assigned On',
        minWidth: 90,
        flex: 1,
        renderCell: (params) => moment(params.value).format("lll"),
    },
  //   {
  //     field: 'reason',
  //     headerName: 'Reason',
  //     minWidth: 130,
  //     flex: 1,

  // },
   
];


export default function SuccessTableList({ usersData }) {

    return (
        <div style={{ maxHeight: 600, width: '80%' }}>
            {usersData && usersData.length > 0 && <DataGrid
                rows={usersData ?? []}
                columns={columns}
                getRowId={(row) => row?.userId}
                pageSize={10}
                
                rowsPerPageOptions={[10, 25, 50, usersData?.length]}
                components={{
                    Toolbar: CustomToolbar,
                  }}
            />
            }
        </div>
    );
}
