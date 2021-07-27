import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import MessageIcon from '@material-ui/icons/Message';

import JakePhoto from '../Images/jake_rebullo.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  barter: {
    fontSize: '1.5rem',
    fontWeight: 500,
    color: '#fff',
    marginRight: 2,
    textTransform: 'capitalize',
  },
  it: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  firstName: {
    marginRight: theme.spacing(2),
    textDecoration: 'none',
    color: '#fff',
  },
  avatar: {
    marginRight: theme.spacing(1.5),
    textDecoration: 'none',
  },
  logout: {
    marginRight: theme.spacing(1),
    backgroundColor: '#26a69a',
    color: '#fff',
    padding: 11,
  },
  dropdown: {
    color: '#fff',
  },
  accountMenu: {
    marginTop: theme.spacing(0),
  },
  listItem: {
    paddingRight: theme.spacing(10),
  },
  listItemIcon: {
    minWidth: '40px',
  },
  zIndex: {
    zIndex: 9999,
  }
}));

const Header = ({ user, setUser }) => {
  const classes = useStyles();
  const history = useHistory();
  
  const [ profilePicture, setProfilePicture ] = useState('');

  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const toggleAccountPopper = (event) => {
    setAccountAnchorEl(accountAnchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAccountAnchorEl(null);
  };

  /* useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/marketplace`, { credentials: 'include' })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.redirect) {
          history.push(data.url);
        }
        else {
          //setFirstName(data.firstName);
          //setProfilePicture(data.profilePicture); 
        }
      })
      .catch(err => {
        console.log(err.message);
        history.push('/signin');
      });
  }, [history]) */

  const handleLogout = async () => { 
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/logout`, { credentials: 'include' }); 
    const data = await res.json(); 
    
    if (data.logoutSuccess) { 
      setUser({});
      history.push('/signin'); 
    } 
  } 

  return (   
    <AppBar className={classes.root} position="sticky">     
      <Grid container>
        {/* <Grid item lg={1}></Grid> */}
        <Grid item xs={12} /* lg={10} */> 
          <Toolbar className={classes.toolbar}>
            <Button
              component={Link}
              to="/"
              tabIndex={-1}
              className={classes.brand}
              //startIcon={<img href="qwe.jpg" alt="BIT" />}
            >
              <Typography
                className={classes.barter}
                variant="h6"
                style={{letterSpacing: 1}}
              >
                Barter
              </Typography>
              <Typography
                className={classes.it}
                variant="h6"
                style={{letterSpacing: 1}}
              >
                IT
              </Typography>   
            </Button>
            <div className={classes.right}>
              <Avatar 
                className={classes.avatar} 
                src={profilePicture}
                component={Link}
                to="/profile"
              />
              { user.firstName && 
              <Typography 
                variant="subtitle2" 
                className={classes.firstName}
                component={Link}
                to="/profile"
              >
                {user.firstName}
              </Typography> }
              <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                  <IconButton 
                    className={classes.dropdown} 
                    onClick={toggleAccountPopper} 
                    size="small" 
                  >
                    <ArrowDropDownIcon fontSize="large" />
                  </IconButton>
                  <Popper open={Boolean(accountAnchorEl)} anchorEl={accountAnchorEl} className={classes.zIndex}>
                    <Paper className={classes.accountMenu} elevation={6}>
                      <List component="nav">
                        <ListItem 
                          onClick={toggleAccountPopper}
                          component={Link}
                          to="/profile"
                          button 
                          className={classes.listItem}
                        >
                          <ListItemIcon className={classes.listItemIcon}>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText primary="My Profile" />
                        </ListItem>
                        <ListItem 
                          onClick={toggleAccountPopper}
                          component={Link}
                          to="/negotiations"
                          button 
                          className={classes.listItem}
                        >
                          <ListItemIcon className={classes.listItemIcon}>
                            <MessageIcon />
                          </ListItemIcon>
                          <ListItemText primary="Negotiations" />
                        </ListItem>
                        <ListItem 
                          onClick={toggleAccountPopper}
                          component={Link}
                          to="/saved-items"
                          button 
                          className={classes.listItem}
                        >
                          <ListItemIcon className={classes.listItemIcon}>
                            <BookmarkIcon />
                          </ListItemIcon>
                          <ListItemText primary="Saved Items" />
                        </ListItem>
                      </List>
                      <Divider />
                      <List component="nav">
                        <ListItem 
                          button 
                          className={classes.listItem} 
                          onClick={ () => {
                            handleLogout();
                            toggleAccountPopper();
                          }} 
                        >
                          <ListItemIcon className={classes.listItemIcon}>
                            <ExitToAppIcon />
                          </ListItemIcon>
                          <ListItemText primary="Log Out" />
                        </ListItem>
                      </List>
                    </Paper>
                  </Popper>
                </div>
              </ClickAwayListener>
            </div>
          </Toolbar>
        </Grid>
        {/* <Grid item lg={1}></Grid> */}
      </Grid>
    </AppBar>
  );
}
 
export default Header;