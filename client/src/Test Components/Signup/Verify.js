import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useState } from 'react';


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

  const [ email, setEmail ] = useState(location.state.email);

  return (
    <div className={classes.div} >
      <Alert severity="success">
        <AlertTitle>
          Registration email sent to {email}
        </AlertTitle>
        Verify your email to complete the registration
      </Alert>
    </div>
  );
}
 
export default Verify;