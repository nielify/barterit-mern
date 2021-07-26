import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import JakeBackground from '../../Images/jake_background.jpg';
import JakeRebullo from '../../Images/jake_rebullo.jpg';

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
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.42)), url(${JakeBackground})`,
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
  editBackground: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 0,
    cursor: 'pointer',
  },
  file: {
    width: 0.1,
	  height: 0.1,
	  opacity: 0,
	  overflow: 'hidden',
	  position: 'absolute',
	  zIndex: -1, 
  },
  editPicture: {
    padding: 0,
    cursor: 'pointer',
    position: 'absolute',
    bottom: 0,
    right: -3,
  },
  pictureIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
}));

const PersonalInfo = () => {
  const classes = useStyles();

  const [ picture, setPicture ] = useState(JakeRebullo);
  const [ background, setBackground ] = useState(JakeBackground);
  const [ name, setName ] = useState('Jake Rebullo');
  const [ rating, setRating ] = useState(3.5);
  const [ town, setTown ] = useState('Sariaya');

  const handlePictureFileChange = () => {
    alert('Picture changed');
  }

  const handleBackgroundFileChange = () => {
    alert('Background changed');
  }

  return ( 
    <>
      <div className={classes.bgContainer}>
        <div className={classes.background}></div>
        <div className={classes.info}>
          <div className={classes.avatarContainer}>
            <Avatar src={picture} className={classes.avatar} />
            <input  
              type="file" 
              name="pictureFile" 
              id="pictureFile" 
              accept="image/*" 
              className={classes.file}
              onChange={handlePictureFileChange}
            />
            <IconButton className={classes.editPicture}>
              <label htmlFor="pictureFile" style={{cursor: 'pointer'}}>
                <Avatar className={classes.pictureIcon}>
                  <CameraAltIcon fontSize="small"/>
                </Avatar>
              </label>
            </IconButton> 
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
              <span className={classes.number}>(12)</span>
            </Box>
            <Typography
              className={classes.location}
            >
              { town }
            </Typography>
          </div>
        </div>    
          <input 
            type="file" 
            name="backgroundFile" 
            id="backgroundFile" 
            accept="image/*" 
            //multiple 
            className={classes.file}
            onChange={handleBackgroundFileChange}
          />
          <IconButton className={classes.editBackground}>
            <label htmlFor="backgroundFile" style={{cursor: 'pointer'}}>  
              <Avatar>
                <CameraAltIcon />
              </Avatar>
            </label>
          </IconButton> 
      </div>          
    </>
  );
}
 
export default PersonalInfo;