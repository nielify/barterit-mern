import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import { loadCSS } from 'fg-loadcss';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';

import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import towns from '../../others/towns';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: 'solid 1px #bbb',
    position: 'fixed',
    top: '8.4vh',
  },
  scrollable: {
    maxHeight: '69.5vh',
    padding: theme.spacing(2.5, 2.5),
    display: 'flex',
    justifyContent: 'center',
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
  forms: {
    padding: theme.spacing(2.5, 2.5, 0 ,2.5),
  },
  search: {
    marginBottom: theme.spacing(2.5),
  },
  create: {
    marginBottom: theme.spacing(2.5),
  },
  divider: {
    background: '#bbb',
  },
  location: {
    marginBottom: theme.spacing(1),
  },
  typographyCategories: {
    marginTop: theme.spacing(2.5),
  },
  categories: {
    padding: theme.spacing(0, 0),
    marginBottom: theme.spacing(2),
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

const MarketplaceSidebar = () => {
  const classes = useStyles();

  const kilometers = [ 2, 5, 10, 20, 30, 40, 50 ];

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
    <Hidden smDown>
      <Grid container item md={4} lg={3}></Grid>
      <Grid container item md={4} lg={3} className={classes.root} style={{ display: "table" }}>
        <Grid item xs={12}>
          <div className={classes.forms}>
            <form className={classes.search}>
              <TextField
                className={classes.searchBox}
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search for items"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
            <form className={classes.create}>
            <Button
              component={Link}
              to="/create-post"
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth
              startIcon={<AddIcon />}
            >
              Create New Post
            </Button>
            </form>        
            <Divider className={classes.divider}/>  
          </div>
        </Grid>
        <Grid item xs={12}> 
          <div className={classes.scrollable}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.typographyFilters}>Filters</Typography>
                <FormControl fullWidth>
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
              </Grid>
              <Grid item xs={12}>	
                <Typography variant="h6" className={classes.typographyCategories}>Categories</Typography>
                <List component="nav" className={classes.categories}>
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
              </Grid>
            </Grid>
          </div>  
        </Grid>
      </Grid>
    </Hidden>
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

export default MarketplaceSidebar;