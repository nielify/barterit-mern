import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

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

const Title = ({ post }) => {
  const classes = useStyles();

  const [ title, setTitle ] = useState('Some random shits');

  return (  
    <>
      <Typography
        variant="subtitle2"
        className={classes.root}
        color="primary"
      >
        { post.title }
      </Typography>
      <Typography
        className={classes.posted}
        gutterBottom
      >
        Posted { moment(post.createdAt).fromNow() } in { post.location }, Quezon
      </Typography>
    </>
  );
}
 
export default Title;