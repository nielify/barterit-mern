import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FacebookIcon from '@material-ui/icons/Facebook';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    textAlign: 'center',
    marginBottom: theme.spacing(1.5)
  },
  typography: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  login: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  or: {
    textAlign: 'center',
    marginTop: theme.spacing(1.5),
    color: '#c5c5c5',
  },
  facebook: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },
  google: {
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
  fbLink: {
    textDecoration: 'none',
    display: 'block',
    width: '100%',
  },

}));

const FacebookButton = withStyles((theme) => ({
  root: {
    color: '#fff',
    backgroundColor: '#4267B2',
    '&:hover': {
      backgroundColor: '#31559e',
    },
  },
}))(Button);

const GoogleButton = withStyles((theme) => ({
  root: {
    color: '#292929',
    backgroundColor: '#d1d1d1',
    '&:hover': {
      backgroundColor: '#b1b1b1',
    },
  },
}))(Button);

const Signin = () => {
  const classes = useStyles();
  const history = useHistory();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    }); 
    const data = await res.json();

    console.log(data);
    
    if (data.loginSuccess) {
      history.push('/');
    }
  }

  const handleGoogle = async (e) => {
    e.preventDefault();
    console.log('Logging in with Google');
    //fetch('http://localhost:3001/');
  }

  return (
    <Container className={classes.container} maxWidth="xs">
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className={classes.typography}
        component="h1" 
        variant="h5"
        color="primary"
      >
        Sign in to Barter.it
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          size="small"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          size="small"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.login}
          onClick={handleLogin}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="#" variant="body2" className={classes.link}>
              <Typography variant="body2" color="primary">
                Forgot password?
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/signup" variant="body2" className={classes.link}>
              <Typography variant="body2" color="primary">
                Don't have an account? Sign up
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Typography variant="subtitle2" className={classes.or}>Or</Typography>
      </form>
      <a href="http://localhost:3001/auth/facebook" variant="body2" className={classes.fbLink} >
      <FacebookButton
        fullWidth
        startIcon={<FacebookIcon />}
        className={classes.facebook}
        
      >
        Sign in with facebook
      </FacebookButton>
      </a>
      <GoogleButton
        fullWidth
        
        className={classes.google}
        onClick={handleGoogle}
      > 
        <i className="fab fa-google fa-1x"></i>
        Sign in with Google
      </GoogleButton>
    </Container>
  );
}
 
export default Signin;