import { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadCSS } from 'fg-loadcss';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { faPlusSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  div: {
    //background: '#009688',
    background: '#fff', 
    borderBottom: 'solid 1px #bbb', 
    flexGrow: 1,
    textAlign: 'center', 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1.5, 1.5), 
    position: "sticky",
    top: 0,
  },
  search: {
    flexGrow: 1,
    marginRight: theme.spacing(3),
  },
  sticky: {
    position: "sticky",
    top: 0,
    zIndex: 99999,
  },
  icon: {
    color: '#009688'
  }
}));

const MarkpetPlaceHeader = () => {
  const classes = useStyles();

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
    <Hidden mdUp >
      <Grid container item xs={12} className={classes.sticky}>
        <div className={classes.div}>
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
          <div> 
          <IconButton 
              className={classes.icon} 
              //onClick={toggleAccountPopper} 
              //size="small"
            >
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
            <IconButton 
              className={classes.icon} 
              //onClick={toggleAccountPopper} 
              //size="small"
            >
              <Icon className="fas fa-sliders-h" />
            </IconButton>
            <IconButton 
              className={classes.icon} 
              //onClick={toggleAccountPopper} 
              //size="small"
            >
              <Icon className="fa fa-list-alt" />
            </IconButton>
          </div>
        </div>
      </Grid>
    </Hidden>
    
  );
}
 
export default MarkpetPlaceHeader;