import { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh',
  },
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    display: 'inline-block',
    maxWidth: 500,
  },
  title: {
    fontWeight: 500,
  },
  paragraph: {
    
  },
  warning: {
    marginTop: theme.spacing(2.3),
  },
  email: {
    margin: theme.spacing(2.3, 0),
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();

  const [ submitting, setSubmitting ] = useState(false);
  const [ showWarning, setShowWarning ] = useState(false);

  const [ email, setEmail ] = useState('');
  const [ emailError, setEmailError ] = useState(false);
  const [ emailHelperText, setEmailHelperText ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setEmailHelperText('');
    setShowWarning(false);
    setSubmitting(true);

    if (submitting) {
      console.log('clicked while submitting');
      return;
    }

    if (emailIsValid(email)) {
      const res = await fetch('http://localhost:3001/api/user/forgot-password', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({email})
      });

      const data = await res.json();

      if (data.success === false) {
        setShowWarning(true);
      }

      setSubmitting(false);
    } else {
      setEmailError(true);
      setEmailHelperText('Invalid email address');
      setSubmitting(false);
    }
  }

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return (
    <form className={classes.form}>
      <Paper className={classes.paper} elevation={5}>
        <Typography className={classes.title} component="h1" variant="h6">
          Forgot Password
        </Typography>
        <Typography className={classes.paragraph} variant="p">
          Please enter the email of your account that you wish to recover.
        </Typography>
        {showWarning && <Alert severity="warning" className={classes.warning}>
          <AlertTitle>Failed To Send Email</AlertTitle>
          The account you are trying to recover is not yet verified.
        </Alert>}
        <TextField 
          className={classes.email}
          fullWidth
          variant="outlined"
          size="small"
          label="Email"
          onChange={e => setEmail(e.target.value)}
          error={emailError}
          helperText={emailHelperText}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          onClick={handleSubmit}
        >
          Send recovery email
        </Button>
      </Paper>
    </form>
  );
}
 
export default ForgotPassword;