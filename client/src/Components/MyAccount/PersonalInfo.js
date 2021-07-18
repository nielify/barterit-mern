import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

import StarBorderIcon from '@material-ui/icons/StarBorder';

import JakeBackground from '../../Images/jake_background.jpg';
import JakeRebullo from '../../Images/jake_rebullo.jpg';

const useStyles = makeStyles((theme) => ({
  bgContainer: {
    width: '100%',
    position: 'relative',
    height: 200,
    overflow: 'hidden',
    borderRadius: 5,
  },
  background: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${JakeBackground})`,
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  },
  info: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    display: 'flex',
    alignItems: 'center',
  },
  innerInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1.5),
    position: 'relative',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    border: 'solid 2px #fff',
  },
  number: {
    color: '#fff',
    display: 'inline',
    fontSize: '.75rem',
    position: 'absolute',
    top: '.5px',
    marginLeft: theme.spacing(.3),
  },
  name: {
    color: '#fff',
    fontSize: '.95rem',
    position: 'absolute',
    top: '-70%',
    left: '5%',
  },
  location: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: '.75rem',
    position: 'absolute',
    bottom: '-50%',
    left: '5%',
  },
}));

const PersonalInfo = () => {
  const classes = useStyles();

  return ( 
    <>
      <div className={classes.bgContainer}>
        <div className={classes.background}></div>
        {/* <div className={classes.overlay}></div> */}
        <div className={classes.info}>
          <Avatar src={JakeRebullo} className={classes.avatar}/>
          <div className={classes.innerInfo}>
            <Typography
              className={classes.name}
            >
              Jake Rebullo
            </Typography>
            <Box component="fieldset" mb={2} borderColor="transparent" style={{padding: 0, margin: 0, position: 'relative'}}>
              <Rating 
                name="half-rating-read"
                value={4.5} precision={0.5} 
                readOnly 
                size="small" 
                style={{color:'#33ab9f', }}
                emptyIcon={<StarBorderIcon fontSize="inherit" style={{color:'#fff'}}/>}
              />
              <span className={classes.number}>(12)</span>
            </Box>
            <Typography
              className={classes.location}
            >
              Sariaya
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default PersonalInfo;