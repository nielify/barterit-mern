import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';


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
    maxWidth: 600,
  },
  newPassword: {
    margin: theme.spacing(2.3, 0),
  },
  confirmNewPassword: {
    marginBottom: theme.spacing(3),
  },
  paragraph: {
    marginBottom: theme.spacing(2),
  }
}));

const ResetPassword = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const [ email, setEmail ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');
  const [ confirmNewPassword, setConfirmNewPassword ] = useState('');

  const [ newPasswordError, setNewPasswordError ] = useState(false);
  const [ confirmNewPasswordError, setConfirmNewPasswordError ] = useState(false);

  const [ newPasswordHelperText, setNewPasswordHelperText ] = useState('Password must contain at least 8 characters with 1 symbol[!@#$%^&*], 1 lowercase letter, 1 uppercase letter, and a number');
  const [ confirmNewPasswordHelperText, setConfirmNewPasswordHelperText ] = useState('');

  const [ showError, setShowError ] = useState(false);
  const [ alertText, setAlertText ] = useState('');

  const [ submitting, setSubmitting ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false);
    setNewPasswordError(false);
    setConfirmNewPasswordError(false);
    setNewPasswordHelperText('Password must contain at least 8 characters with 1 symbol[!@#$%^&*], 1 lowercase letter, 1 uppercase letter, and a number');
    setConfirmNewPasswordHelperText('');

    if (submitting) {
      console.log('you clicked while submitting');
      return
    }
    setSubmitting(true);

    if (passwordIsValid(newPassword)) {
      if (newPassword === confirmNewPassword) {
        try {
          const res = await fetch(`http://localhost:3001/api/user/${params.userId}/reset-password/${params.token}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ newPassword, confirmNewPassword })
          });

          const data = await res.json();
          
          if (data.error) {
            history.push('/forgot-password/expired');
          }

          if (!data.success) {
            setAlertText(data.message);
            setShowError(true);
          }

          if (data.success) {
            history.push('/forgot-password/success');
          }

          setSubmitting(false);

        } catch (err) {
          console.log(err);
          setSubmitting(false);
        }   
      } else {
        setNewPasswordError(true);
        setConfirmNewPasswordError(true);
        setConfirmNewPasswordHelperText('Password does not match');
        setNewPasswordHelperText('Password does not match');
        setSubmitting(false);
      }
    } else {
      setNewPasswordError(true);
      setConfirmNewPasswordError(true);
      setSubmitting(false);
    }
    
  }

  const passwordIsValid = (password) => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  }

  useEffect(() => {
    fetch(`http://localhost:3001/api/user/${params.userId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEmail(data.email);
      })
      .catch((err) => console.log(err));
      
  }, []);

  return (
    <form className={classes.form}>
      <Paper className={classes.paper} elevation={5}>
        <Typography className={classes.title} component="h1" variant="h6">
          Enter your new password
        </Typography>
        <Typography className={classes.paragraph} variant="body1">
          Set your new password for your account, <em>{email}</em>
        </Typography>
        {showError && <Alert severity="error">
          <AlertTitle>
            Error changing password
          </AlertTitle>
          {alertText}
        </Alert>}
        <TextField 
          className={classes.newPassword}
          fullWidth
          variant="outlined"
          size="small"
          label="New Password"
          type="password"
          onChange={e => setNewPassword(e.target.value)}
          error={newPasswordError}
          helperText={newPasswordHelperText}
        />
        <TextField 
          className={classes.confirmNewPassword}
          fullWidth
          variant="outlined"
          size="small"
          label="Confirm New Password"
          type="password"
          onChange={e => setConfirmNewPassword(e.target.value)}
          error={confirmNewPasswordError}
          helperText={confirmNewPasswordHelperText}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          onClick={handleSubmit}
        >
          Confirm new password
        </Button>
      </Paper>
    </form>
  );
}
 
export default ResetPassword;