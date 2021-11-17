import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { UserContext } from '../Context/UserContext';

import useRemoveCover from '../CustomHooks/useRemoveCover';

import signinLogo from '../Images/noletterlogogreen.svg'

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',

  },
  avatar: {
    textAlign: 'center',
    width: theme.spacing(13.5),
    height: theme.spacing(13.5),
    marginBottom: -6
  },
  typography: {
    textAlign: 'center',
    fontWeight: 'bold',
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    //padding: theme.spacing(3, 3,),
    borderRadius: 10,
    minWidth: 300,
    maxWidth: 450,
    position: 'relative',
  },
}));

const Signin = ({ setShowProgress }) => {
  useRemoveCover();

  const classes = useStyles();
  const history = useHistory();

  const [ user, setUser ] = useContext(UserContext);

  const [ showAlert, setShowAlert ] = useState(false);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailError, setEmailError ] = useState(false);
  const [ passwordError, setPasswordError ] = useState(false);
  const [ emailTextHelper, setEmailTextHelper ] = useState('');
  const [ passwordTextHelper, setPasswordTextHelper ] = useState('');

  const [openBannedModal, setOpenBannedModal] = useState(false);
  
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
    if (data.loginSuccess === false) {
      setShowAlert(true);
    }
    
    if (data.user && data.user.isBanned) {
      setOpenBannedModal(true);
    }
    else if (data.user) {
      setUser(data.user);
      history.push('/');
    }
  }

  const [ showPassword, setShowPassword] = useState(false);
  const [ showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Container className={classes.container} maxWidth="xs">
      <Avatar className={classes.avatar} src={signinLogo} >
      </Avatar>
      <Typography className={classes.typography}
        component="h1" 
        variant="h4"
        color="primary"
      >
        Sign in to BarterIT
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
        <FormControl variant="outlined" className={classes.textfield} size="small" helperText={passwordTextHelper} error={passwordError} fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            type={showConfirmPassword ? 'text' : 'password'}
            onChange={e => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  tabIndex={-1}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          <FormHelperText>{passwordTextHelper}</FormHelperText>
        </FormControl>
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
      {openBannedModal && <BannedModal 
        open={openBannedModal}
        setOpen={setOpenBannedModal}
        user={user}
      />}
    </Container>
  );
}
 
const BannedModal = ({ open, setOpen, user }) =>{
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      disableEnforceFocus
    >
      <div className={classes.paper} style={{padding: 0}}>
        <Alert severity="error">
          <Typography
            variant="subtitle1"
            style={{ marginTop: 16, marginBottom: 16, fontSize: '.95rem', lineHeight: '1.3rem'}}
          >
            This is user {user.email} is banned from using this platform.<br/> <br/>
            Please contact <b style={{color: '#009688'}}>BarterIT</b> admins at <i>teamrealme333@gmail.com</i> for more information
          </Typography>
        </Alert>
      </div>
    </Modal>
  )
}

export default Signin;