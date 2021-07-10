import { useState } from 'react';
import { useEffect } from 'react';

import { loadCSS } from 'fg-loadcss';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: theme.spacing(0, 2),
    maxHeight: '80vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
      borderRadius: '150px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'inherit',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'inherit',
      borderRadius: '10px',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      background: '#bbb',
    },
  },
  listItemIcon: {
    marginLeft: '-17px', 
    //minWidth: '50px',
  },
  icon: {
    width: '35px',
    textAlign: 'center',
  }
}));

const CategoryModal = ({ open, setOpen }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

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
            Select Category
          </Typography>
          <Divider />
          <List component="nav" className={classes.list}>
            {Category(`fas fa-object-group ${classes.icon}`, 'Antiques & Collections', classes.listItemIcon)}
            {Category(`fas fa-palette ${classes.icon}`, 'Arts & Crafts', classes.listItemIcon)}
            {Category(`fas fa-car-alt ${classes.icon}`, 'Auto Parts & Accessories', classes.listItemIcon)}
            {Category(`fas fa-baby-carriage ${classes.icon}`, 'Baby Products', classes.listItemIcon)}
            {Category(`fas fa-suitcase-rolling ${classes.icon}`, 'Bags & Luggage', classes.listItemIcon)}
            {Category(`fas fa-mobile-alt ${classes.icon}`, 'Phones and Accessories', classes.listItemIcon)}
            {Category(`fas fa-tshirt ${classes.icon}`, 'Clothing, Shoes, & Accessories', classes.listItemIcon)}
            {Category(`fas fa-plug ${classes.icon}`, 'Electronics', classes.listItemIcon)}
            {Category(`fas fa-chair ${classes.icon}`, 'Furniture', classes.listItemIcon)}
            {Category(`fas fa-heart ${classes.icon}`, 'Health & Beauty', classes.listItemIcon)}
            {Category(`fas fa-couch ${classes.icon}`, 'Home & Kitchen', classes.listItemIcon)}
            {Category(`far fa-gem ${classes.icon}`, 'Jewelry & Watches', classes.listItemIcon)}
            {Category(`fas fa-toolbox ${classes.icon}`, 'Miscellaneous', classes.listItemIcon)}
            {Category(`fas fa-drum ${classes.icon}`, 'Musical Instruments', classes.listItemIcon)}
            {Category(`fas fa-mail-bulk ${classes.icon}`, 'Office Supplies', classes.listItemIcon)}
            {Category(`fas fa-seedling ${classes.icon}`, 'Patio Garden', classes.listItemIcon)}
            {Category(`fas fa-paw ${classes.icon}`, 'Pet Supplies', classes.listItemIcon)}
            {Category(`fas fa-futbol ${classes.icon}`, 'Sporting Goods', classes.listItemIcon)}
            {Category(`fas fa-hammer ${classes.icon}`, 'Tools & Home Improvements', classes.listItemIcon)}
            {Category(`fas fa-chess ${classes.icon}`, 'Toys & Games', classes.listItemIcon)}
            {Category(`fas fa-gamepad ${classes.icon}`, 'Video Games & Consoles', classes.listItemIcon)}
          </List>
        </div>
      </Fade>
    </Modal>
  );
}
 
function Category(icon, text, cssClass) {
  return (
    <ListItem button>
      <ListItemIcon className={cssClass}>
        <Icon className={icon} />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

export default CategoryModal;