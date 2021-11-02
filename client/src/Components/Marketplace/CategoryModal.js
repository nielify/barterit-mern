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
    borderRadius: 10,
    padding: theme.spacing(3, 0),
  },
  list: {
    padding: theme.spacing(2, 4, 3),
    margin: theme.spacing(0, 1),
    maxHeight: '60vh',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
      borderRadius: '15px',
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

const CategoryModal = ({ open, setOpen, setPosts, setShowLoader, setShowNote, currentCategory, setCurrentCategory, setSearchText }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const renameCategory = (category) => {
    if (category === 'Antiques & Collections') category = 'antiques-and-collections';
    if (category === 'Arts & Crafts') category = 'arts-and-crafts';
    if (category === 'Auto Parts & Accessories') category = 'auto-parts-and-accessories';
    if (category === 'Baby Products') category = 'baby-products';
    if (category === 'Bags & Luggage') category = 'bags-and-luggage';
    if (category === 'Phones & Accessories') category = 'phones-and-accessories';
    if (category === 'Clothing, Shoes, & Accessories') category = 'clothing-shoes-and-accessories';
    if (category === 'Electronics') category = 'electronics';
    if (category === 'Furniture') category = 'furniture';
    if (category === 'Health & Beauty') category = 'health-and-beauty';
    if (category === 'Home & Kitchen') category = 'home-and-kitchen';
    if (category === 'Jewelry & Watches') category = 'jewelry-and-watches';
    if (category === 'Miscellaneous') category = 'miscellaneous';
    if (category === 'Office Supplies') category = 'office-supplies';
    if (category === 'Patio Garden') category = 'patio-garden';
    if (category === 'Pet Supplies') category = 'pet-supplies';
    if (category === 'Sporting Goods') category = 'sporting-goods';
    if (category === 'Tools & Home Improvements') category = 'tools-and-home-improvements';
    if (category === 'Toys & Games') category = 'toys-and-games';
    if (category === 'Video Games & Consoles') category = 'video-games-and-consoles';

    return category;
  }

  const handleCategoryClick = async (category) => {
    setSearchText('');
    setCurrentCategory(category);
    setOpen(false);
    setPosts([]);
    setShowLoader(true);
    setShowNote(false);

    const urlCategory = renameCategory(category);

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/category/${urlCategory}`, { 
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'include', 
      })
      const data = await res.json();
      
      if (!data.posts[0]) setShowNote(true);
      else setShowNote(false);
  
      setPosts(data.posts); 
      setShowLoader(false);
    } catch (err) {
      setShowLoader(false);
    }
  }

  const handleClickAllPost = async (category) => {
    setSearchText('');
    setCurrentCategory(category);
    setOpen(false);
    setPosts([]);
    setShowLoader(true);
    setShowNote(false);

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/availablePosts`, { 
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'include', 
      });

      const data = await res.json();
      console.log(data);
      if (!data.availablePosts[0]) setShowNote(true);
      else setShowNote(false);
  
      setPosts(data.availablePosts); 
      setShowLoader(false);

    } catch (err) {
      setShowLoader(false);
    }
  }

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

          <div style={{padding: '0 44px 0 40px'}}>
            <Divider /> 
          </div>
          
          <List component="nav" className={classes.list}>
            {Category(`fa fa-list-alt ${classes.icon}`, 'All Posts', classes.listItemIcon, handleClickAllPost, currentCategory)}
            {Category(`fas fa-object-group ${classes.icon}`, 'Antiques & Collections', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-palette ${classes.icon}`, 'Arts & Crafts', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-car-alt ${classes.icon}`, 'Auto Parts & Accessories', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-baby-carriage ${classes.icon}`, 'Baby Products', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-suitcase-rolling ${classes.icon}`, 'Bags & Luggage', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-mobile-alt ${classes.icon}`, 'Phones and Accessories', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-tshirt ${classes.icon}`, 'Clothing, Shoes, & Accessories', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-plug ${classes.icon}`, 'Electronics', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-chair ${classes.icon}`, 'Furniture', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-heart ${classes.icon}`, 'Health & Beauty', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-couch ${classes.icon}`, 'Home & Kitchen', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`far fa-gem ${classes.icon}`, 'Jewelry & Watches', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-toolbox ${classes.icon}`, 'Miscellaneous', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-drum ${classes.icon}`, 'Musical Instruments', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-mail-bulk ${classes.icon}`, 'Office Supplies', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-seedling ${classes.icon}`, 'Patio Garden', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-paw ${classes.icon}`, 'Pet Supplies', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-futbol ${classes.icon}`, 'Sporting Goods', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-hammer ${classes.icon}`, 'Tools & Home Improvements', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-chess ${classes.icon}`, 'Toys & Games', classes.listItemIcon, handleCategoryClick, currentCategory)}
            {Category(`fas fa-gamepad ${classes.icon}`, 'Video Games & Consoles', classes.listItemIcon, handleCategoryClick, currentCategory)}
          </List>
        </div>
      </Fade>
    </Modal>
  );
}
 
function Category(icon, text, cssClass, onClickFunction, activeCategory) {
  return (
    <ListItem button onClick={() => onClickFunction(text)} style={{background: activeCategory === text ? '#ccc' : '', borderRadius: 5, paddingLeft: 30}} >
      <ListItemIcon className={cssClass} >
        <Icon className={icon} style={{color: activeCategory === text ? '#009688' : ''}} />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

export default CategoryModal;