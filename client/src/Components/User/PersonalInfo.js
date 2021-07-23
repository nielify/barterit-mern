import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';

import StarBorderIcon from '@material-ui/icons/StarBorder';

import AraBackground from '../../Images/ara_background.jpg';
import AraMerillo from '../../Images/ara_merillo.jpg';

const useStyles = makeStyles((theme) => ({
  bgContainer: {
    width: '100%',
    position: 'relative',
    height: 200,
    overflow: 'hidden',
    borderRadius: 5,
    marginBottom: theme.spacing(2),
  },
  background: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.42)), url(${AraBackground})`,
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
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    border: 'solid 2px #ccc',
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

  const [ picture, setPicture ] = useState(AraMerillo);
  const [ background, setBackground ] = useState(AraBackground);
  const [ name, setName ] = useState('Ara Merillo');
  const [ rating, setRating ] = useState(3.5);
  const [ town, setTown ] = useState('Lucena');

  return ( 
    <>
      <div className={classes.bgContainer}>
        <div className={classes.background}></div>
        <div className={classes.info}>
          <div className={classes.avatarContainer}>
            <Avatar src={picture} className={classes.avatar} />
          </div>
          <div className={classes.innerInfo}>
            <Typography
              className={classes.name}
            >
              { name }
            </Typography>
            <Box component="fieldset" mb={2} borderColor="transparent" style={{padding: 0, margin: 0, position: 'relative'}}>
              <Rating 
                name="half-rating-read"
                value={rating} 
                precision={0.5} 
                readOnly 
                size="small" 
                style={{color:'#33ab9f', }}
                emptyIcon={<StarBorderIcon fontSize="inherit" style={{color:'#fff'}}/>}
              />
              <span className={classes.number}>(23)</span>
            </Box>
            <Typography
              className={classes.location}
            >
              { town }
            </Typography>
          </div>
        </div>    
      </div>          
    </>
  );
}
 
export default PersonalInfo;