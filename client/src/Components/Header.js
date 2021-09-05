import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    paddingTop: 0,
  },
  title: {
    flexGrow: 1, 
    marginLeft: theme.spacing(2),
  },
  firstName: {
  },
  avatar: {
    marginLeft: theme.spacing(1),
  },
  iconButton: {
    color: '#fff',
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  
  //const [ email, setEmail ] = useState('');
  const [ profilePicture, setProfilePicture ] = useState('');
  const [ firstName, setFirstName ] = useState('');

  useEffect(() => {
    fetch('/api/marketplace', { credentials: 'include' })
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
    const res = await fetch('/auth/logout', { credentials: 'include' }); 
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
              <Typography variant="h6" className={classes.title}>
                Barter.it
              </Typography>
              { firstName && <Typography variant="subtitle2" className={classes.firstName}>
                {firstName}
              </Typography> }
              <Avatar className={classes.avatar} src={profilePicture}>{ firstName[0] }</Avatar>
              <IconButton 
                className={classes.iconButton}
                onClick={handleLogout}
              >
                <ExitToAppIcon />
              </IconButton>
            </Toolbar>
          </Grid>
          <Grid item lg={1}></Grid>
        </Grid>
      </AppBar>
  );
}
 
export default Header;