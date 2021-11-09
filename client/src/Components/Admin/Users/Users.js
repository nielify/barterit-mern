import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';

import useRequireAuth from '../../../CustomHooks/useRequireAuth';

const useStyles = makeStyles((theme) => ({
  datagrid:{
    height: '80vh',
    width: '100vw',
  },
  buttons: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
  
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 230 },
  {
    field: 'fullName',
    headerName: 'Full Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 150,
    editable: false,
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 150,
    editable: false,
  },
  {
    field: 'middleName',
    headerName: 'Middle Name',
    width: 180,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: false,
  },
  {
    field: 'isVerified',
    headerName: 'Verified',
    width: 130,
    editable: false,
  },
 
];

const Users = () => {
  const classes = useStyles();
  useRequireAuth();

  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/all-users`, {
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      const renamedId = data.map((row) => {
        const { _id, ...rest } = row;
        return { id: _id, ...rest };
      });
      console.log(renamedId);
      setRows(renamedId);
    })
    .catch(err => alert('an error has occured'));
  }, []);

  return (  
    <>
      <div className={classes.datagrid}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={100}
          disableSelectionOnClick={false}
          disableExtendRowFullWidth={false}
          disableColumnResize={false}
          hideFooter
          onRowClick={(e) => setSelectedRow(e.row)}
        />
      </div>
      <div className={classes.buttons}>
        <Button 
          variant='contained'
          style={{backgroundColor: '#b2102f', color:'#fff', marginRight: 16}}
        >
          Ban
        </Button>
        <Button 
          variant='contained'
          style={{backgroundColor: '#007bb2', color:'#fff',marginRight: 16}}
        >
          Verify
        </Button>
      </div>
    </>
  );
}
 
export default Users;