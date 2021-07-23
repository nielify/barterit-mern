import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';

import AraMerillo from '../../Images/ara_merillo.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  owner: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    textDecoration: 'none',
    marginRight: theme.spacing(1),
    width: theme.spacing(6),
    height: theme.spacing(6),
    '&:hover':{
      cursor: 'pointer',
    }
  },
  name: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '.95rem',
    marginTop: theme.spacing(.3),
    marginLeft: theme.spacing(.5),
    '&:hover':{
      textDecoration: 'underline',
      cursor: 'pointer',
    }
  }
}));

const Owner = () => {
  const classes = useStyles();

  return (  
    <>
    <div className={classes.root}>
      <Avatar 
        src={AraMerillo} 
        className={classes.avatar}
        component={Link}
        to="/user"
      />
      <div className={classes.owner}>
        <Typography
          variant="h6"
          className={classes.name}
          component={Link}
          to="/user"
        >
          Ara Merillo
        </Typography>
        <Box component="fieldset" mb={2} borderColor="transparent" style={{padding: 0, margin: 0, }}>
          <Rating name="half-rating-read" value={3.5} precision={0.5} readOnly size="small" style={{color:'#009688'}}/>
        </Box>
      </div>
    </div>
    <Divider />
    </>
  );
}
 
export default Owner;