import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 'bold',
    fontSize:'1.4rem',
    margin: 0,
    padding: 0,
  },
  posted: {
    fontSize: '.8rem',
    marginLeft: theme.spacing(.2),
  }
}));

const Title = () => {
  const classes = useStyles();

  const [ title, setTitle ] = useState('Some random shits');

  return (  
    <>
      <Typography
        variant="subtitle2"
        className={classes.root}
        color="primary"
      >
        {title}
      </Typography>
      <Typography
        className={classes.posted}
      >
        Posted 3 hours ago in Sariaya
      </Typography>
    </>
  );
}
 
export default Title;