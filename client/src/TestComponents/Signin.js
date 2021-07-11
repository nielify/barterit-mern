import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(15),
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
    fontWeight: 500,
    marginBottom: theme.spacing(3),
  },
  alert: {
    marginBottom: theme.spacing(3),
  },
  textfield: {
    marginBottom: theme.spacing(3),
  },
  login: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
}));

/*const FacebookButton = withStyles((theme) => ({
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
}))(Button);*/

const Signin = ({ setShowProgress }) => {
  const classes = useStyles();
  const history = useHistory();

  const [ showAlert, setShowAlert ] = useState(false);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailError, setEmailError ] = useState(false);
  const [ passwordError, setPasswordError ] = useState(false);
  const [ emailTextHelper, setEmailTextHelper ] = useState('');
  const [ passwordTextHelper, setPasswordTextHelper ] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setShowAlert(false);
    setEmailTextHelper('');
    setPasswordTextHelper('');
    setShowProgress(true);

    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    }); 
    const data = await res.json();
    console.log(data);
    setShowProgress(false);
    if (data.email) {
      setEmailError(true);
      setEmailTextHelper(data.email);
    }
    if (data.password) {
      setPasswordError(true);
      setPasswordTextHelper(data.password);
    }
    if (data.loginSuccess) {
      history.push('/');
    }
    if (data.loginSuccess === false) {
      setShowAlert(true);
    }
  }

  return (
    <Container className={classes.container} maxWidth="xs">
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className={classes.typography}
        component="h1" 
        variant="h4"
        color="primary"
      >
        Sign in to Barter.it
      </Typography>
      {showAlert && <Alert 
        severity="warning"
        className={classes.alert}  
      >
        <AlertTitle>
          Failed to sign in!
        </AlertTitle>
        The email is already registered but not yet verified. Please check your email inbox.
      </Alert>}
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          //margin="dense"
          size="small"
          fullWidth
          label="Email Address"
          error={emailError}
          helperText={emailTextHelper}
          className={classes.textfield}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          //margin="dense"
          size="small"
          fullWidth
          label="Password"
          type="password"
          error={passwordError}
          helperText={passwordTextHelper}
          className={classes.textfield}
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
            <Link to="/forgot-password" variant="body2" className={classes.link}>
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
      </form>
    </Container>
  );
}
 
export default Signin;