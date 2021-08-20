import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import useRemoveCover from '../../CustomHooks/useRemoveCover';

const useStyles = makeStyles(theme => ({
  div: {
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
}));

const Verify = () => {
  useRemoveCover();

  const classes = useStyles();
  const location = useLocation();

  //const [ email, setEmail ] = useState(location.state.email);

  return (
    <div className={classes.div} >
      {location.state && <Alert severity="success" className={classes.alert}>
        <AlertTitle>
          Registration email sent to {location.state ? location.state.email : ''}
        </AlertTitle>
        Verify your email to complete the registration
      </Alert>}
      {!location.state && <h2>Error 404: Page not found</h2>}
    </div>
  );
}
 
export default Verify;