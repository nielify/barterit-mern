import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

import JakeRebullo from '../../Images/jake_rebullo.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  owner: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    marginRight: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
    '&:hover':{
      cursor: 'pointer',
    }
  },
  name: {
    fontSize: '.95rem',
    marginTop: theme.spacing(.3),
    marginLeft: theme.spacing(.8),
    '&:hover':{
      textDecoration: 'underline',
      cursor: 'pointer',
    }
  }
}));

const Owner = () => {
  const classes = useStyles();

  return (  
    <div className={classes.root}>
      <Avatar src={JakeRebullo} className={classes.avatar}/>
      <div className={classes.owner}>
        <Typography
          variant="h6"
          className={classes.name}
        >
          Jake Rebullo
        </Typography>
        <Box component="fieldset" mb={2} borderColor="transparent" style={{padding: 0, margin: 0, }}>
          <Rating name="half-rating-read" value={4.5} precision={0.5} readOnly style={{color:'#009688'}}/>
        </Box>
      </div>
    </div>
  );
}
 
export default Owner;