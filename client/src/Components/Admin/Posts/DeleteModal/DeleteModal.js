import useStyles from "../DeleteModal/DeleteModalCSS";

import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const DeleteModal = ({open, setOpen, post}) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (  
    <>
      <Modal
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
            Are you sure you want to delete this post?
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
              style={{backgroundColor: '#b2102f', color:'#fff',marginRight: 16}}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
 
export default DeleteModal;