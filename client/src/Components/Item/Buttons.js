import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from '../../Context/UserContext';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import ForumIcon from '@material-ui/icons/Forum';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', 
    marginTop: theme.spacing(3),
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
    padding: theme.spacing(3, 4,),
    borderRadius: 10,
    width: '50%',
    minWidth: 300,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
}));

const Buttons = ({ post, isSaved, setIsSaved, user_id }) => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const [ user ] = useContext(UserContext);
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const handleNegotiateClick = async () => {
    const negotiationData = {
      name: '',
      post: '',
      owner: '',
      notOwner: ''
    };

    negotiationData.name = post.title;
    negotiationData.post = post._id;
    negotiationData.owner = post.userId._id;
    negotiationData.notOwner = user._id;

    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/negotiation`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
      body: JSON.stringify(negotiationData)
    })
    .then(res => res.json())
    .then(data => {
      history.push(`/negotiations`);
    })
    .catch(err => {
      console.log(err);
    });

  }

  const handleRemoveSaveClick = async () => { 
    if (isSubmitting) return console.log('already submitting');
    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/saved-items/${params.id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'include', 
      })
      const data = await res.json()
      setIsSaved(false);
    } catch (err) {
      console.log(err);
    }

    setIsSubmitting(false);
  }

  const handleSaveClick = async () => {
    if (isSubmitting) return console.log('already submitting');
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/saved-items/${params.id}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'include', 
      })
      const data = await res.json();
      setIsSaved(true);
    } catch (err) {
      console.log(err);
    }

    setIsSubmitting(false);
  }


  const [openReportModal, setOpenReportModal] = useState(false);
  const handleOpenReportModal = () => {
    setOpenReportModal(true)
  }

  return (  
    <div className={classes.root}>
      <Button
        color="primary"
        variant="contained"
        startIcon={<ForumIcon />}
        style={{marginRight: 8, width: '66%', minWidth: 130}}
        onClick={handleNegotiateClick}
      >
        Negotiate
      </Button>
      <Button
        color={ isSaved ? 'primary' : 'secondary'}
        variant="contained"
        startIcon={ isSaved ? <TurnedInIcon /> : <TurnedInNotIcon /> }
        onClick={ isSaved ? handleRemoveSaveClick : handleSaveClick }
        style={{padding: '0 30px', marginRight: 8, width: '17%', minWidth: 100}}
      >
        { isSaved ? 'Saved' : 'Save' }
      </Button>
      <Button
        color="primary"
        variant="contained"
        startIcon={<ReportProblemIcon />}
        style={{padding: '0 30px', width: '17%', minWidth: 100}}
        onClick={handleOpenReportModal}
      >
        Report
      </Button>
      <ReportModal openReportModal={openReportModal} setOpenReportModal={setOpenReportModal} user_id={user_id} post_id={post._id} /> 
    </div>
    
  );
}

function ReportModal(props) {
  const classes = useStyles();

  const [body, setBody] = useState('');
  const [showSubmission, setShowSubmission] = useState(false);

  const handleClose = () => {
    setBody('');
    props.setOpenReportModal(false);
    setShowSubmission(false);
  };

  const [isSending, setIsSending] = useState(false);
  const handleSubmitReport = async () => {
    if (isSending) return;
    if (body.trim() === '') {
      setBody('');
      return;
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/report/`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'include', 
        body: JSON.stringify({
          sender: props.user_id,
          post: props.post_id,
          body: body
        })
      });
      const data = await res.json()
      if (data.message === 'report sent') {
        setBody('');
        setShowSubmission(true);
        setIsSending(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal
      className={classes.modal}
      open={props.openReportModal}
      onClose={handleClose}
      disableEnforceFocus 
    >
      <div className={classes.paper}>
        { !showSubmission && <div>
          <Typography 
            variant="h6"
            style={{textAlign: 'center'}}
            gutterBottom
          >
            Report
          </Typography>
          <Divider /> 
          <Typography 
            variant="subtitle1"
            style={{fontSize: '.85rem', marginTop: 16}}
            gutterBottom
          >
            Tell us what's wrong with this post.
          </Typography>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Type here..."
            style={{marginBottom: 16}}
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
          <div className={classes.buttonsContainer}>
            <Button
              color="primary"
              variant="outlined"
              style={{marginRight: 16}}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmitReport}
            >
              Submit
            </Button>
          </div>
        </div> }
        { showSubmission && <div className={classes.paper2}>
          <Typography 
            variant="h6"
            style={{textAlign: 'center'}}
            gutterBottom
          >
            Report Sent
          </Typography>
          <Divider /> 
          <Typography
            variant="subtitle1"
            style={{marginTop: 16, marginBottom: 16}}
          > 
            Thank you for providing us your feedback.
          </Typography>
          <div className={classes.buttonsContainer}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                handleClose();
                setShowSubmission(false);
              }}
            >
              Done
            </Button>
          </div>
        </div> }
      </div>
    </Modal>
  )
}
 
export default Buttons;