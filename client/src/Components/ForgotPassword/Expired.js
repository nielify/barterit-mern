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

const Expired = () => {
  useRemoveCover();

  const classes = useStyles();

  return (  
    <div className={classes.container}>
      <Alert 
        severity="error"
        className={classes.alert}
      >
        <AlertTitle>
          Your token has expired
        </AlertTitle>
          The token for resetting your password has already expired. 
          Try requesting for a new one in forgot password page.
      </Alert>
    </div>
  );
}
 
export default Expired
