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

  return (
    <div className={classes.div} >
      <Alert severity="success">
        <AlertTitle>
          Registration email sent to {location.state.email}
        </AlertTitle>
        lorem ipsum freaking shizz
      </Alert>
    </div>
  );
}
 
export default Verify;