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

const InReturn = ({ post }) => {
  const classes = useStyles();

  return (  
    <>
      <Typography
        variant="subtitle2"
        className={classes.title}
      >
        In Return:
      </Typography>
      <ul className={classes.list}>
        {post._id && post.inReturn.map((inReturn, i) => (
          <li className={classes.li} key={i}>
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