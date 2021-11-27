import useStyles from './DeletedConfirmationCSS';

import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

const DeletedConfirmation = ({ open, setOpen, setOpenMain }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpenMain(false);
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
        <div className={classes.paper} style={{ padding: 0 }}>
          <Alert severity="info">
            <Typography
              variant="subtitle1"
              style={{ marginTop: 16, marginBottom: 16, fontSize: '.95rem', lineHeight: '1.3rem' }}
            >
              The post has been deleted
            </Typography>
          </Alert>
        </div>
      </Modal>
    </>
  );
}

export default DeletedConfirmation;