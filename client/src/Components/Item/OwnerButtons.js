import { useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
    padding: theme.spacing(4, 4,),
  },
  question: {
    marginBottom: theme.spacing(2),
  },
}));

const OwnerButtons = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleDeleteConfirmationOpen = () => {
    setOpen(true);
  }

  return (  
    <div className={classes.root}>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        startIcon={<EditIcon />}
        style={{marginRight: 16}}
      >
        Edit Post
      </Button>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        startIcon={ <DeleteIcon /> }
        onClick={handleDeleteConfirmationOpen}
        style={{padding: '0 30px'}}
      >
        Delete
      </Button>
      <DeleteConfirmation open={open} setOpen={setOpen} />
    </div>
    
  );
}
 
const DeleteConfirmation = ({ open, setOpen }) => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const handleDelete = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/${params.id}`, { 
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
    })
    const data = await res.json()
    console.log(data);
    if (data.message == 'Success') history.push('/profile');
  }

  const handleClose = () => {
    setOpen(false);
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
          gutterBottom
          variant="subtitle1"
          className={classes.question}
        >
          Are you sure you want to delete this post?
        </Typography>
        <Grid container>
          <Grid item xs={5}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleDelete}
            >
              Yes
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}

export default OwnerButtons;