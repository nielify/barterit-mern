import { useState } from "react";
import useStyles from "../DeleteModal/DeleteModalCSS";
import DeletedConfirmation from "./DeletedConfirmation/DeletedConfirmation";

import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const DeleteModal = ({open, setOpen, post, setRows}) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const [showMain, setShowMain] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openDeletedConfirmation, setOpenDeleteConfirmation] = useState(false);

  const handleDeletePost = async (e) => {
    setSubmitting(true);

    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/${post.id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })
    const data = await res.json();

    if (data.message === 'Success') {
      setRows(prevRows => {
        return prevRows.filter((prevRow) => prevRow.id !== post.id);
      });
    }
    
    setOpenDeleteConfirmation(true);
    setShowMain(false);
    setSubmitting(false);
  }

  return (  
    <>
      {showMain && <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        disableEnforceFocus
      >
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
            Delete Post?
          </Typography>
          <Divider />
          <Typography
            variant="subtitle1"
            style={{ marginTop: 16, marginBottom: 16, fontSize: '.95rem', lineHeight: '1.3rem'}}
          >
            Are you sure you want to remove the post <b>{post.title}</b> by <b>{`${post.userId.firstName} ${post.userId.lastName}`}</b>? This will also remove all the negotiations that involve this post.
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
              style={{backgroundColor: submitting ? '#bbb' : '#b2102f', color:'#fff',marginRight: 16}}
              onClick={handleDeletePost}
              disabled={submitting}
            >
              {submitting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>}

      {DeletedConfirmation && 
        <DeletedConfirmation 
          open={openDeletedConfirmation} 
          setOpen={setOpenDeleteConfirmation}
          setOpenMain={setOpen} 
        />}
    </>
  );
}
 
export default DeleteModal;