import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadCSS } from 'fg-loadcss';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  div: {
    width: '100vw',
    background: '#fff', 
    //background: 'orange', 
    borderBottom: 'solid 1px #bbb', 
    textAlign: 'center', 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1.5, 1.5), 
    width: '100vw',

  },
  search: {
    flexGrow: 1,
    marginRight: theme.spacing(3),
  },
  sticky: {
    position: "sticky",
    top: 0,
    zIndex: 1100,
  },
  icons: {
    minWidth: 141,
    display: 'flex', 
    justifyContent: 'flex-end'
  },
  icon: {
    color: '#009688'
  },
}));

const MarketplaceHeader = ({ setOpenCategoryModal, setOpenLocationModal, searchText, handleSearchTextChange, handleSearchEnter }) => {
  const classes = useStyles();

  const handleOpenCategoryModal = () => {
    setOpenCategoryModal(true);
  };

  const handleOpenLocationModal = () => {
    setOpenLocationModal(true);
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
              onKeyDown={handleSearchEnter}
              onChange={handleSearchTextChange} 
              value={searchText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>
          <div className={classes.icons}> 
            <IconButton 
              component={Link}
              to="/create-post"
              className={classes.icon} 
              //onClick={toggleAccountPopper} 
              //size="small"
            >
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
            {/* <IconButton 
              className={classes.icon} 
              onClick={handleOpenLocationModal} 
              //size="small"
            >
              <Icon className="fa fa-map-marker" />
            </IconButton>  */}
            <IconButton 
              className={classes.icon} 
              onClick={handleOpenCategoryModal} 
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
 
export default MarketplaceHeader;