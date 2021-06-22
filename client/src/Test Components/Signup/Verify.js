import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const useStyles = makeStyles({
  div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh',
  },
});

const Verify = () => {
  const classes = useStyles();
  const location = useLocation();

  //const [ email, setEmail ] = useState(location.state.email);

  return (
    <div className={classes.div} >
      {location.state && <Alert severity="success">
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