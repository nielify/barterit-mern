import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  sellerOptionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    width: '100%',
    borderBottom: 'solid 2px #eee' 
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
    padding: theme.spacing(4, 4,),
    borderRadius: 10,
    maxWidth: 400
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const SellerOptions = (props) => {
  const classes = useStyles();

  //barterit modal
  const [confirmModal, setConfirmModal] = useState(false);
  const handleOpenConfirmModal = () => {
    setConfirmModal(true);
  }

  //barter success modal
  const [openBarterSucess, setOpenBarterSuccess] = useState(false);

  //barter item request
  const handleBarterItem = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/barter/${props.negotiation.post._id}/${props.negotiation.notOwner._id}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    const newPost = await res.json();

    //update negotiation.post bartered fields
    props.setNegotiation((prevNego) => ({...prevNego, post: {
      ...prevNego.post,
      status: newPost.status,
      barteredTo: newPost.barteredTo
    }}));

    setConfirmModal(false);
    setOpenBarterSuccess(true);
  }

  useEffect(() => {
    console.log(props.negotiation);
  }, [props.negotiation])

  return (  
    <div className={classes.sellerOptionContainer}>
      <Button
        color="primary"
        variant="contained"
        style={{width: '45%', marginRight: 24}}
        onClick={handleOpenConfirmModal}
        disabled={props.isBartered}
      >
        { props.isBartered ? 'Bartered' : 'Barter IT' }
      </Button>
      {!props.isBartered && <Button
        color="primary"
        variant="outlined"
        style={{width: '45%'}}
      >
        See Post
      </Button>}
      {confirmModal && <ConfirmBarteritModal 
        open={confirmModal} 
        setOpen={setConfirmModal} 
        itemName={props.negotiation.name} 
        buyerName={props.negotiation.notOwner.firstName + ' ' + props.negotiation.notOwner.lastName}
        handleBarterItem={handleBarterItem}
      />}
      {openBarterSucess && <BarterSuccessModal open={openBarterSucess} setOpen={setOpenBarterSuccess} />}
    </div>
  );
}
 
function ConfirmBarteritModal({ open, setOpen, itemName, buyerName, handleBarterItem }) {
  const classes = useStyles();

  const [disabled, setDisabled] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleBarteritChange = (e) => {
    if (e.target.value === 'Barter IT') {
      setDisabled(true);
      setShowLoader(true);
      handleBarterItem();
    }
  }

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      disableEnforceFocus 
    >
      <div className={classes.paper}>
        <Typography 
          variant="h6"
          style={{textAlign: 'center'}}
          gutterBottom
        >
          Barter IT?
        </Typography>
        <Divider /> 
        <Typography
          variant="subtitle1"
          style={{marginTop: 16, marginBottom: 16, fontSize: '.95rem', lineHeight: '1.5rem'}}
        >
          Doing this action means your item <b>{itemName}</b> is already bartered to <b>{buyerName}</b>. This will also allow <b>{buyerName}</b> to rate you. Additionally, this will cause this item to be removed from the marketplace and other negotiations with this item to be deleted. 
        </Typography>

        <Typography
          variant="subtitle1"
          style={{marginTop: 16, marginBottom: 24, fontSize: '.95rem', lineHeight: '1.5rem'}}
        >
          If you want to continue, type "<span style={{color: '#009688', fontWeight: 'bold'}}>Barter IT</span>" in the text field.
        </Typography>

        <div className={classes.inputContainer}>
          <TextField 
            inputProps={{ style:{textAlign: 'center'} }}
            placeholder="Barter IT"
            onChange={handleBarteritChange}
            disabled={disabled}
          />
          { showLoader && <CircularProgress 
            color="primary" 
            style={{position: 'absolute'}}
          />}
        </div>
        
      </div>
    </Modal>
  )
}

function BarterSuccessModal({ open, setOpen }) {
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
      <Alert severity="success">
        You bartered an item successfully. 
      </Alert>
    </Modal>
  )
}

export default SellerOptions;