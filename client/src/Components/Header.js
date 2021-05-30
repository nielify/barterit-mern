import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    marginLeft: theme.spacing(1)
  },
  iconButton: {
    color: '#fff'
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  
  const [ email, setEmail ] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/', { credentials: 'include' })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.redirect) {
          history.push(data.url);
        }
        else {
          setEmail(data.email || data.firstName);
          setProfilePicture(data.profilePicture);
        }
      })
      .catch(err => {
        console.log(err.message);
        history.push('/signin');
      });
  }, [])

  const handleLogout = async () => { 
    const res = await fetch('http://localhost:3001/auth/logout', { credentials: 'include' }); 
    const data = await res.json(); 
    
    if (data.logoutSuccess) { 
      history.push('/signin'); 
    } 
  } 

  return ( 
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Barter.it
        </Typography>
        { email && <Typography variant="subtitle2">
          {email}
        </Typography> }
        <Avatar className={classes.avatar} src={profilePicture}></Avatar>
        <IconButton 
          className={classes.iconButton}
          onClick={handleLogout}
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
 
export default Header;