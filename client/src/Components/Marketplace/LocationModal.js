import { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


import towns from '../../others/towns';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3, 4),
    margin: theme.spacing(0, 2),
    maxHeight: '80vh',
    minWidth: 250,
    overflowY: 'auto',
    borderRadius: 15
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
})); 

const FilterModal = ({ open, setOpen }) => {
  const classes = useStyles();

  const kilometers = [ 2, 5, 10, 20, 30, 40, 50 ];

  const handleClose = () => {
    setOpen(false);
  };

  return (  
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }} 
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography
            variant="h6"
            gutterBottom
            style={{textAlign: 'center'}}
          >
            Change Location
          </Typography>
          <Divider style={{marginBottom: 16}}/>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel>Location</InputLabel>
            <Select 
              className={classes.location}
            >
              {towns.map((town) => (
                <MenuItem value={town} key={town}>{town}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Radius</InputLabel>
            <Select 
              className={classes.kilometer}
            >
              <MenuItem value={1} key={1}>{1} kilometer</MenuItem>
              {kilometers.map((km) => (
                <MenuItem value={km} key={km}>{km} kilometers</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{
              marginTop: 24
            }}
          >
            Apply
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}
 
export default FilterModal;