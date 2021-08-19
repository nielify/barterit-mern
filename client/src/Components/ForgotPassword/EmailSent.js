import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import useRemoveCover from '../../CustomHooks/useRemoveCover';



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh',
  },
  alert: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    maxWidth: 500,
  }
}));


const EmailSent = () => {
  useRemoveCover();

  const classes = useStyles();
  const location = useLocation();

  return (  
    <div className={classes.container}>
      <Alert 
        severity="success"
        className={classes.alert}
      >
        <AlertTitle>
          Password reset email sent to {location.state ? location.state.email : ''}
        </AlertTitle>
          Check your email to continue resetting your password
      </Alert>
    </div>
    
  );
}
 
export default EmailSent;