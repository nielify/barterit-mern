import { useHistory } from 'react-router-dom';
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

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    //backgroundColor: '#f0f0f0',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  brand: {
    //marginLeft: theme.spacing(2),
  },
  barter: {
    fontSize: '1.5rem',
    fontWeight: 500,
    //color: '#009688',
    color: '#fff',
    marginRight: 2,
    textTransform: 'capitalize',
  },
  it: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    //color: '#00897b',
    color: '#fff',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  firstName: {
    //color: '#1f1f1f',
    marginRight: theme.spacing(1.5),
    fontWeight: 'bold',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  logout: {
    marginRight: theme.spacing(1),
    backgroundColor: '#26a69a',
    color: '#fff',
    padding: 11,
  },
  dropdown: {
    marginRight: theme.spacing(1),
    color: '#fff',
    
  },
  accountMenu: {
    marginTop: theme.spacing(1.5),
  },
  listItem: {
    paddingRight: theme.spacing(17),
  },
  listItemIcon: {
    minWidth: '40px',
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  
  //const [ email, setEmail ] = useState('');
  const [ profilePicture, setProfilePicture ] = useState('');
  const [ firstName, setFirstName ] = useState('Niel');

  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const toggleAccountPopper = (event) => {
    setAccountAnchorEl(accountAnchorEl ? null : event.currentTarget);
  };

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  useEffect(() => {
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
          setFirstName(data.firstName);
          setProfilePicture(data.profilePicture);
        }
      })
      .catch(err => {
        console.log(err.message);
        //history.push('/signin');
      });
  }, [])

  const handleLogout = async () => { 
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/logout`, { credentials: 'include' }); 
    const data = await res.json(); 
    
    if (data.logoutSuccess) { 
      history.push('/signin'); 
    } 
  } 

  return (   
      <AppBar className={classes.root} position="static">     
        <Grid container>
          <Grid item lg={1}></Grid>
          <Grid item xs={12} lg={10}> 
            <Toolbar className={classes.toolbar}>
              
              <Button
                tabIndex={-1}
                className={classes.brand}
                //startIcon={<img href="qwe.jpg" alt="BIT" />}
              >
                <Typography
                  className={classes.barter}
                  variant="h6"
                >
                  Barter
                </Typography>
                <Typography
                  className={classes.it}
                  variant="h6"
                >
                  IT
                </Typography>   
              </Button>
              <div className={classes.right}>
                { firstName && <Typography variant="subtitle2" className={classes.firstName}>
                  {firstName}
                </Typography> }
                <Avatar className={classes.avatar} src={profilePicture}>{ firstName[0] }</Avatar>
                <IconButton 
                  className={classes.dropdown} 
                  onClick={toggleAccountPopper} 
                  size="small" 
                >
                  <ArrowDropDownIcon fontSize="large" />
                </IconButton>
                <Popper open={Boolean(accountAnchorEl)} anchorEl={accountAnchorEl}>
                  <Paper className={classes.accountMenu} elevation={6}>
                    <List component="nav">
                      <ListItem 
                        button 
                        className={classes.listItem}
                      >
                        <ListItemIcon className={classes.listItemIcon}>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Profile" />
                      </ListItem>
                      <ListItem 
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
                        onClick={handleLogout} 
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
            </Toolbar>
          </Grid>
          <Grid item lg={1}></Grid>
        </Grid>
      </AppBar>
  );
}
 
export default Header;