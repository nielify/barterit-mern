import { useEffect, useState } from 'react';

import useStyles from './VerificationsCSS';
import { DataGrid } from '@mui/x-data-grid';

import useRequireAdminAuth from '../../../CustomHooks/useRequireAdminAuth';

const columns = [
  { field: 'id', headerName: 'ID', width: 100, hide: false },
  {
    field: 'fullName',
    headerName: 'Trader Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (params) => {
      return `${params.row?.user?.firstName} ${params.row?.user?.lastName}`
    }
  },
  {
    field: 'idImage',
    headerName: 'ID Image',
    width: 170,
    editable: false,
  },
  {
    field: 'selfieImage',
    headerName: 'Selfie Image',
    width: 170,
    editable: false,
  },
  {
    field: 'createdAt',
    headerName: 'Date of Request',
    width: 200,
    editable: false,
    //value getter
  },
];

const Verifications = () => {
  useRequireAdminAuth();
  const classes = useStyles();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/verification/all`, {
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      const renamedId = data.map((row) => {
        const { _id, ...rest } = row;
        return { id: _id, ...rest };
      });
      setRows(renamedId);
    })
    .catch(err => console.log('an error has occured'));
  }, []);

  return (  
    <div className={classes.root}>  
      <div className={classes.datagrid}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={100}
          disableSelectionOnClick={false}
          disableExtendRowFullWidth={false}
          hideFooter
          //hideFooterRowCount
          //hideFooterSelectedRowCount
          /* onRowClick={(e) => {
            setSelectedRow(e.row) 
          }} */
        />
      </div>
    </div>
  );
}
 
export default Verifications;