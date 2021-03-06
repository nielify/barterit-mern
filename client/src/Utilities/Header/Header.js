import { useHistory, Link } from 'react-router-dom';
import { useState, useContext, useRef, useEffect } from 'react';

import MessageBadge from './MessageBadge';

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
import Divider from '@material-ui/core/Divider';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import StorefrontIcon from '@material-ui/icons/Storefront';

import { UserContext } from '../../Context/UserContext';
import { ActiveChatContext } from '../../Context/ActiveChatContext';

import { io } from "socket.io-client";

import logo from '../../Images/logoreal.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 64
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
  },
  logoimage: {
    height: theme.spacing(7.2),
    width: theme.spacing(7.2),
    marginTop: -5
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

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();

  //user
  const [ user, setUser ] = useContext(UserContext);

  //active chat
  const [activeChat, setActiveChat] = useContext(ActiveChatContext);
  
  //messageNotification
  const socketRef = useRef(null); 

  //onFirstRender
  useEffect(() => {
    //create new socket and assign to socketRef
    const newSocket = io(`${process.env.REACT_APP_SERVER_DOMAIN}`); 
    socketRef.current = newSocket; 
    
    //join personal room
    socketRef.current.emit('join-self', {
      user_id: user._id
    });

    //notif when someone sends a message
    socketRef.current.on('notify', (data) => { 
      // get the last notification from the array
      const negotiationNotif = data.notifications[data.notifications.length - 1].negotiation; 
      const newNotif = data.notifications[data.notifications.length - 1]
      
      // update the cached user data(notif data) if the negotiation is not active
      if (negotiationNotif !== activeChat) {
        setUser(data); 
      } 
      else {
        //emit pop event to delete the current notif for active chat
        socketRef.current.emit('pop-notif', ({user: user._id, newNotif})); 
      }   
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect(); 
    }
  }, [user, activeChat]);

  //sizing
  const [showLogoText, setShowLogoText] = useState(true);
  useEffect(() => {
    if (window.innerWidth <= 380) {
      setShowLogoText(false);
    } else {
      setShowLogoText(true);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 380) {
        setShowLogoText(false);
      } else {
        setShowLogoText(true);
      }
    });

    return () => {
      window.removeEventListener('resize', () => {});
    }
  }, []);

  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const toggleAccountPopper = (event) => {
    setAccountAnchorEl(accountAnchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAccountAnchorEl(null);
  };

  const handleLogout = async () => { 
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/logout`, { credentials: 'include' }); 
    const data = await res.json(); 
    
    if (data.logoutSuccess) { 
      setUser({});
      history.push('/signin'); 
    } 
  } 

  return (   
    <AppBar /* ref={appbarHeightRef} */ className={classes.root} position="sticky">     
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
              <Avatar className={classes.logoimage} src={logo} />
              {showLogoText && <div style={{display: 'flex'}}>
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
              </div>}
            </Button>
            <div className={classes.right}>
              <Avatar 
                className={classes.avatar} 
                src={user.profilePicture}
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
                            <PersonOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="My Profile" />
                        </ListItem>
                        <ListItem 
                          onClick={toggleAccountPopper}
                          component={Link}
                          to="/"
                          button 
                          className={classes.listItem}
                        >
                          <ListItemIcon className={classes.listItemIcon}>
                            <StorefrontIcon />
                          </ListItemIcon>
                          <ListItemText primary="Marketplace" />
                        </ListItem>
                        <ListItem 
                          onClick={toggleAccountPopper}
                          component={Link}
                          to="/negotiations"
                          button 
                          className={classes.listItem}
                        >
                          <ListItemIcon className={classes.listItemIcon}>
                            <MessageBadge notifContent={user.notifications.length} />
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
                            <BookmarkBorderOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Saved Items" />
                        </ListItem>
                      </List>
                      <Divider />
                      <List component="nav">
                        {(!user.isVerified && !user.isVerificationPending) && <ListItem 
                          onClick={toggleAccountPopper}
                          component={Link}
                          to="/user-verification/id-selection"
                          button 
                          className={classes.listItem}
                        >
                          <ListItemIcon className={classes.listItemIcon}>
                            <VerifiedUserOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Verify Account" />
                        </ListItem>}
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