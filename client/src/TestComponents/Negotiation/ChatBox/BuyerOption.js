import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  sellerOptionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
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
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column'
  },
}));

const BuyerOptions = (props) => {
  const classes = useStyles();
  
  const [modalOpen, setModalOpen] = useState(false); //rate modal
  const [submittedModalOpen, setSubmittedModalOpen] = useState(false); //submittedModal

  const [rated, setRated] = useState(false);

  return (  
    <div className={classes.sellerOptionContainer}>
      <Button
        color="primary"
        variant="contained"
        style={{width: '45%', marginRight: 24}}
        disabled={props.negotiation.isRated === true && props.negotiation.post.status === 'bartered' || props.negotiation.post.status !== 'bartered'}
        onClick={() => setModalOpen(true)}
      >
        {props.negotiation.isRated ? 'Rated' : 'Rate User'}
      </Button>
      {/* props.negotiation.post.status !== 'bartered' &&  */<Button
        color="primary"
        variant="outlined"
        style={{width: '45%'}}
        component={Link}
        to={`/item/${props.negotiation.post._id}`}
      >
        See Post
      </Button>}

      {modalOpen && 
        <RateModal 
          open={modalOpen} 
          setOpen={setModalOpen} 
          setSubmittedModalOpen={setSubmittedModalOpen} 
          negotiation={props.negotiation}
          setNegotiation={props.setNegotiation}
        />}

      {submittedModalOpen && <SubmittedModal open={submittedModalOpen} setOpen={setSubmittedModalOpen} />}
    </div>
  );
}

const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

function RateModal({ open, setOpen, setSubmittedModalOpen, negotiation, setNegotiation }) {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async () => {
    setSubmitting(true);

    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/rate/${negotiation.owner._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ negotiation_id: negotiation._id, stars: value})
    });
    const data = await res.json();
    console.log(data);

    setOpen(false);
    setSubmittedModalOpen(true);
    setNegotiation(data);
  }

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
        <Typography gutterBottom style={{marginBottom: 16}}> 
          How is your experience with this user?
        </Typography>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Rating
            name="customized-empty"
            defaultValue={0}
            precision={1}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            size="large"
            style={{alignSelf: 'center'}}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          <Box style={{height: 32}} ml={1}>{labels[hover !== -1 ? hover : value]}</Box>
        </div>  
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 16}}>
          <Button variant="outlined" color="primary" style={{marginRight: 16}} onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            disabled={!value || submitting} 
            onClick={handleSubmit}
          >
            { submitting ? 'Submitting...' : 'Submit' }
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function SubmittedModal({ open, setOpen }) {
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
        Rating submitted!
      </Alert>
    </Modal>
  )
}
 
export default BuyerOptions;