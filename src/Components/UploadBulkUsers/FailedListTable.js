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
    { field: 'accountid', headerName: 'Account Id', minWidth: 50, flex: 1 },
    { field: 'username', headerName: 'UserName', minWidth: 50, flex: 1 },
    {
        field: 'email',
        headerName: 'Email',
        minWidth: 50,
        flex: 1,
        //renderCell: (params) => moment(params.value).format("lll"),
    },
   
];


export default function FailedListTable({ usersData }) {

    return (
        <div style={{ maxHeight: 600, width: '80%' }}>
            {usersData && usersData.length > 0 && <DataGrid
                rows={usersData ?? []}
                columns={columns}
                getRowId={(row) => row?.accountid}
                pageSize={10}
                
                rowsPerPageOptions={[7]}
                components={{
                    Toolbar: CustomToolbar,
                  }}
            />
            }
        </div>
    );
}
