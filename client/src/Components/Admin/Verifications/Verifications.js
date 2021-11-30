import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useStyles from './VerificationsCSS';
import { DataGrid } from '@mui/x-data-grid';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';

import useRequireAdminAuth from '../../../CustomHooks/useRequireAdminAuth';

import moment from 'moment';

const Verifications = () => {
  useRequireAdminAuth();
  const classes = useStyles();
  
  const columns = [
    { field: 'id', headerName: 'Request ID', width: 220, hide: false },
    { 
      field: 'User ID', 
      headerName: 'User ID', 
      width: 220, 
      hide: false,
      valueGetter: (params) => {
        return `${params.row?.user?._id}`
      }
    },
    {
      field: 'fullName',
      headerName: 'Name',
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
      renderCell: (params) => (
        <strong>
          <Link to={{pathname: params.row.idImage}} target="_blank" style={{textDecoration: 'none'}}>
            {`Open ${params.row.user.firstName}'s ID`}
          </Link>
        </strong>
      ),
    },
    {
      field: 'selfieImage',
      headerName: 'Selfie Image',
      width: 170,
      editable: false,
      renderCell: (params) => (
        <strong>
          <Link to={{pathname: params.row.selfieImage}} target="_blank" style={{textDecoration: 'none'}}>
            {`Open ${params.row.user.firstName}'s picture`}
          </Link>
        </strong>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Date of Request',
      width: 230,
      editable: false,
      valueGetter: (params) => {
        return moment(params.row.createdAt).format('LLL')
      }
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      editable: false,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            size="small"
            style={{marginRight: 3, backgroundColor: '#007bb2', color: '#fff'}}
            onClick={() => setVerifyConfirmationOpen(true)}
          >
            Verify
          </Button>
        </strong>
      ),
    }
  ];

  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [verifyConfirmationOpen, setVerifyConfirmationOpen] = useState(false);
  const [verifyPopupOpen, setVerifyPopupOpen] = useState(false);
  const [disableVerify, setDisableVerify] = useState(false);

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

  const handleVerifyUser = async () => {
    setDisableVerify(true);
    
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/verify/${selectedRow.user._id}`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        verification_id: selectedRow.id
      })
    })

    const data = await res.json();

    //setSelectedRow(data);
    setRows((prevRows) => {
      return prevRows.filter((prevRow) => prevRow.user.id != selectedRow.user.id);
    });

    setVerifyConfirmationOpen(false);
    setVerifyPopupOpen(true);
    setDisableVerify(false); 
  }

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
          onRowClick={(e) => {
            setSelectedRow(e.row) 
          }}
        />
      </div>

      {verifyConfirmationOpen && <VerifyConfirmation 
        open={verifyConfirmationOpen} 
        setOpen={setVerifyConfirmationOpen} 
        selectedRow={selectedRow} 
        showMainDialog={true} 
        disableVerify={disableVerify}
        handleVerifyUser={handleVerifyUser}
      />}

      {verifyPopupOpen && <VerifyConfirmPopup 
        open={verifyPopupOpen} 
        setOpen={setVerifyPopupOpen} 
        selectedRow={selectedRow} 
      />}

    </div>
  );
}

const VerifyConfirmation = ({ open, setOpen, selectedRow, showMainDialog, disableVerify, handleVerifyUser }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      disableEnforceFocus
    >
      <div className={classes.paper}>
        {showMainDialog && <div className={classes.mainDialog}>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
            Verify User?
          </Typography>
          <Divider />
          <Typography
            variant="subtitle1"
            style={{ marginTop: 16, marginBottom: 16, fontSize: '.95rem', lineHeight: '1.3rem'}}
          >
            Are you sure you want to verify user <b>{selectedRow.user.firstName + ' ' + selectedRow.user.lastName}</b> with {selectedRow.user.sex == 'Male' ? 'his' : 'her'} email <b>{selectedRow.user.email}</b>? <br/><br/>This user will have a green check mark appear beside {selectedRow.sex == 'Male' ? 'his' : 'her'} name.
          </Typography>
          <div className={classes.buttons}>
            <Button 
              variant='outlined'
              color="primary"
              style={{marginRight: 16}}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button 
              variant='contained'
              style={{backgroundColor: disableVerify ? '#bbb' : '#007bb2', color:'#fff',marginRight: 16}}
              disabled={disableVerify}
              onClick={handleVerifyUser}
            >
              {disableVerify ? 'Continue...' : 'Continue'}
            </Button>
          </div>
        </div>}
          
      </div>
    </Modal>
  )
}
 
const VerifyConfirmPopup = ({ open, setOpen, selectedRow }) =>{
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      disableEnforceFocus
    >
      <div className={classes.paper} style={{padding: 0}}>
        <Alert severity="success">
          <Typography
            variant="subtitle1"
            style={{ marginTop: 16, marginBottom: 16, fontSize: '.95rem', lineHeight: '1.3rem'}}
          >
            User <b>{selectedRow.user.firstName + ' ' + selectedRow.user.lastName}</b> with {selectedRow.user.sex == 'Male' ? 'his' : 'her'} email <b>{selectedRow.user.email}</b> is now a <em>verified</em> BarterIT user.
          </Typography>
        </Alert>
      </div>
    </Modal>
  )
}

export default Verifications;