import { Link } from 'react-router-dom';
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
  },
  login: {
    marginTop: theme.spacing(1),
    display: 'block',
  },
  link: {
    color: '#009688',
  },
}));

const ResetPasswordSuccess = () => {
  useRemoveCover();

  const classes = useStyles();

  return (  
    <div className={classes.container}>
      <Alert 
        severity="success"
        className={classes.alert}
      >
        <AlertTitle>
          Password changed successfully
        </AlertTitle>
          You have successfully changed your password to a new one.<br />
          You may now <Link to="/signin" className={classes.link}>log in</Link> with your new password.
      </Alert> 
    </div>
    
  );
}
 
export default ResetPasswordSuccess;