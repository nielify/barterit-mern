import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.0rem',
  },
  list: {
    margin: theme.spacing(0),
  },
  li: {
    '&::before': {
      content: '\\2022',
      color: 'red',
    },
  },
}));

const InReturn = () => {
  const classes = useStyles();

  const [ inReturns, setInReturns ] = useState([
    '1pc Tender juicy hotdog',
    '2pcs Eggs',
  ]);

  return (  
    <>
      <Typography
        variant="subtitle2"
        className={classes.title}
      >
        In Return:
      </Typography>
      <ul className={classes.list}>
        {inReturns.map((inReturn, i) => (
          <li className={classes.li}>
            <Typography
              variant="body2"
            >
              {inReturn}
            </Typography>  
          </li>
        ))}
      </ul>
    </>
  );
}
 
export default InReturn;