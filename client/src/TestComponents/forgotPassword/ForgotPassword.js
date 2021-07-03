import { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
  error: {
    marginTop: theme.spacing(2.3),
  },
  email: {
    margin: theme.spacing(2.3, 0),
  },
}));

const ForgotPassword = ({ setShowProgress }) => {
  const classes = useStyles();
  const history = useHistory();

  const [ submitting, setSubmitting ] = useState(false);
  const [ showWarning, setShowWarning ] = useState(false);
  const [ showError, setShowError ] = useState(false);

  const [ email, setEmail ] = useState('');
  const [ emailError, setEmailError ] = useState(false);
  const [ emailHelperText, setEmailHelperText ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowProgress(true);

    if (submitting) {
      console.log('clicked while submitting');
      return;
    }

    setEmailError(false);
    setEmailHelperText('');
    setShowWarning(false);
    setShowError(false);
    setSubmitting(true); 

    if (emailIsValid(email)) {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/forgot-password`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({email})
        });

        const data = await res.json();
        setShowProgress(false);

        //if the email is not yet verified or not yet registered
        if (data.error) { 
          setEmailHelperText(data.error);
          setEmailError(true);
        }

        if (data.success) { 
          history.push({
            pathname: '/forgot-password/email-sent', 
            state: {
              email
            }
          });
        }

        setSubmitting(false);
      } catch (err) {
        console.log(err);
        setSubmitting(false);
        setShowProgress(false);
      }
      
    } else {
      setShowProgress(false);
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
        <Typography className={classes.paragraph} variant="body1">
          Please enter the email of your account that you wish to recover.
        </Typography>
        {showWarning && <Alert severity="warning" className={classes.warning}>
          <AlertTitle>Failed To Send Email</AlertTitle>
          The account you are trying to recover is not yet verified.
        </Alert>}
        {showError && <Alert severity="error" className={classes.error}>
          <AlertTitle>Error sending email</AlertTitle>
          The account you are trying to recover does not exist.
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