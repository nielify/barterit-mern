import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';



const useStyles = makeStyles((theme) => ({
  container: {
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
  }
}));


const EmailSent = () => {
  const classes = useStyles();
  const location = useLocation();

  return (  
    <div className={classes.container}>
      {location.state && <Alert 
        severity="success"
        className={classes.alert}
      >
        <AlertTitle>
          Password reset email sent to {location.state ? location.state.email : ''}
        </AlertTitle>
          Check your email to continue resetting your password
      </Alert> }
      {!location.state && <h2>Error 404: Page not found</h2>}
    </div>
    
  );
}
 
export default EmailSent;