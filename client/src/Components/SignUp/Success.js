import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh',
  },
  alert: {
    
  },
}));

const Success = () => {
  const classes = useStyles();

  return (  
    <div className={classes.container}>
      <Alert 
        severity="success"
        className={classes.alert}
      >
        <AlertTitle>
          Email verification success! You may now sign in with your account.
        </AlertTitle>
        To Sign in, click the 'SIGN IN' button above this page.
      </Alert> 
    </div>
    
  );
}
 
export default Success;