import { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';

import useRequireAdminAuth from '../../../CustomHooks/useRequireAdminAuth';

//admin cover
import { AdminCoverContext } from '../../../Context/AdminCoverContext';
import AdminCover from '../AdminCover';

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
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    //padding: theme.spacing(3, 3,),
    borderRadius: 10,
    minWidth: 300,
    maxWidth: 450,
    position: 'relative',
  },
  mainDialog: {
    padding: theme.spacing(3, 3,),
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
  {
    field: 'isBanned',
    headerName: 'Banned',
    width: 130,
    editable: false,
  },
  {
    field: 'isActive',
    headerName: 'Active',
    width: 120,
    editable: false,
  },
 
];

const Users = () => {
  const classes = useStyles();
  useRequireAdminAuth();

  const [ adminCover ] = useContext(AdminCoverContext);

  //for data
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});

  //for confirmation dialogs
  const [verifyConfirmationOpen, setVerifyConfirmationOpen] = useState(false);
  const [banConfirmationOpen, setBanConfirmationOpen] = useState(false);
  const [showMainDialog, setShowMainDialog] = useState(true);

  //for confirmation buttons
  const [disableBan, setDisableBan] = useState(false);
  const [disableVerify, setDisableVerify] = useState(false);

  //for confirmation popups
  const [banPopupOpen, setBanPopupOpen] = useState(false);
  const [verifyPopupOpen, setVerifyPopupOpen] = useState(false);


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
      setRows(renamedId);
    })
    .catch(err => console.log('an error has occured'));
  }, []);

  const handleBanUser = async () => {
    setDisableBan(true);
    
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/ban/${selectedRow.id}`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })

    const data = await res.json();

    //setSelectedRow(data);
    setRows((prevRows) => {
      prevRows.forEach((prevRow) => {
        if (prevRow.id === data._id) {
          prevRow.isBanned = data.isBanned;
        }
      });
      return prevRows;
    });
    setBanConfirmationOpen(false);
    setBanPopupOpen(true);
    setDisableBan(false);
  }

  const handleVerifyUser = async () => {
    setDisableVerify(true);
    
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/verify/${selectedRow.id}`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })

    const data = await res.json();

    //setSelectedRow(data);
    setRows((prevRows) => {
      prevRows.forEach((prevRow) => {
        if (prevRow.id === data._id) {
          prevRow.isVerified = data.isVerified;
        }
      });
      return prevRows;
    });

    setVerifyConfirmationOpen(false);
    setVerifyPopupOpen(true);
    setDisableVerify(false); 
  }

  return (  
    <>
      <AdminCover/>
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
      <div className={classes.buttons}>
        <Button 
          variant='contained'
          style={{backgroundColor: !selectedRow.id ? '#bbb' : '#b2102f', color:'#fff', marginRight: 16}}
          onClick={() => setBanConfirmationOpen(true)}
          disabled={!selectedRow.id}
        >
          Ban
        </Button>
        <Button 
          variant={'contained'}
          style={{backgroundColor: !selectedRow.id ? '#bbb' : '#007bb2', color:'#fff',marginRight: 16}}
          onClick={() => setVerifyConfirmationOpen(true)}
          disabled={!selectedRow.id}
        >
          Verify
        </Button>
      </div>

      {banConfirmationOpen && 
        <BanConfirmation 
          open={banConfirmationOpen} 
          setOpen={setBanConfirmationOpen} 
          selectedRow={selectedRow}
          showMainDialog={showMainDialog}
          disableBan={disableBan}
          handleBanUser={handleBanUser}
        />}
      
      {verifyConfirmationOpen && 
        <VerifyConfirmation
          open={verifyConfirmationOpen} 
          setOpen={setVerifyConfirmationOpen} 
          selectedRow={selectedRow}
          showMainDialog={showMainDialog}
          disableVerify={disableVerify}
          handleVerifyUser={handleVerifyUser}
        />}

      {banPopupOpen && 
        <BanConfirmPopup 
          open={banPopupOpen}
          setOpen={setBanPopupOpen}
          selectedRow={selectedRow}
        />
      }

      {verifyPopupOpen && 
        <VerifyConfirmPopup 
          open={verifyPopupOpen}
          setOpen={setVerifyPopupOpen}
          selectedRow={selectedRow}
        />
      }
    </>
  );
}

const BanConfirmation = ({ open, setOpen, selectedRow, showMainDialog, disableBan, handleBanUser }) => {
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
            Ban User?
          </Typography>
          <Divider />
          <Typography
            variant="subtitle1"
            style={{ marginTop: 16, marginBottom: 16, fontSize: '.95rem', lineHeight: '1.3rem'}}
          >
            Are you sure you want to ban user <b>{selectedRow.firstName + ' ' + selectedRow.lastName}</b> with {selectedRow.sex == 'Male' ? 'his' : 'her'} email <b>{selectedRow.email}</b>? <br/><br/>This user will not be able to access {selectedRow.sex == 'Male' ? 'his' : 'her'} account on {selectedRow.sex == 'Male' ? 'his' : 'her'} next login.
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
              style={{backgroundColor: disableBan ? '#bbb' : '#b2102f', color:'#fff',marginRight: 16}}
              disabled={disableBan}
              onClick={handleBanUser}
            >
              {disableBan ? 'Continue...' : 'Continue'}
            </Button>
          </div>
        </div>}

      </div>
    </Modal>
  )
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
            Are you sure you want to verify user <b>{selectedRow.firstName + ' ' + selectedRow.lastName}</b> with {selectedRow.sex == 'Male' ? 'his' : 'her'} email <b>{selectedRow.email}</b>? <br/><br/>This user will have a green check mark appear beside {selectedRow.sex == 'Male' ? 'his' : 'her'} name.
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

const BanConfirmPopup = ({ open, setOpen, selectedRow }) =>{
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
        <Alert severity="info">
          <Typography
            variant="subtitle1"
            style={{ marginTop: 16, marginBottom: 16, fontSize: '.95rem', lineHeight: '1.3rem'}}
          >
            User <b>{selectedRow.firstName + ' ' + selectedRow.lastName}</b> with {selectedRow.sex == 'Male' ? 'his' : 'her'} email <b>{selectedRow.email}</b> is now <em>banned</em> from using BarterIT.
          </Typography>
        </Alert>
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
            User <b>{selectedRow.firstName + ' ' + selectedRow.lastName}</b> with {selectedRow.sex == 'Male' ? 'his' : 'her'} email <b>{selectedRow.email}</b> is now a <em>verified</em> BarterIT user.
          </Typography>
        </Alert>
      </div>
    </Modal>
  )
}
 
export default Users;