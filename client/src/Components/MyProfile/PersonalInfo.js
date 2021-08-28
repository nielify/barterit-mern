import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';

import { UserContext } from '../../Context/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    height: 200,
    overflow: 'hidden',
    borderRadius: 5,
    marginBottom: theme.spacing(2),
  },
  background: {
    height: '100%',
    width: '100%',
  },
  backgroundImg: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  backgroundOverlay: { 
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'black',
    opacity: .35,
  },
  backgroundLoader: {
    background: 'black',
    width: '100%',
    height: '100%',
    display: 'flex',
    opacity: .5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: '15px 20px',
    display: 'flex',
    alignItems: 'center',
    width: 350,
  },
  innerInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1.5),
    position: 'relative',
    width: '100%',
  },
  avatarContainer: {
    position: 'relative',
    borderRadius: '50%',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    border: 'solid 2px #00695f',
  },
  avatarLoader: { 
    position: 'absolute',
    background: 'black',
    opacity: .5,
    width: '100%',
    height: '100%',
    top: 0,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    left: 6,
  },
  location: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: '.75rem',
    position: 'absolute',
    bottom: '-50%',
    left: 6,
  },
  editBackground: {
    position: 'absolute',
    bottom: 12,
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
    background: '#33ab9f',
  },
  saveContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'flex-end',
    top: 0,
    right: 0,
    background: 'rgba(0,0,0,.6)',
    width: '100%',
    padding: theme.spacing(1, 2),
  }
}));

const PersonalInfo = () => {
  const classes = useStyles();
  const history = useHistory();

  const [ user, setUser ] = useContext(UserContext);

  const [ pictureHolder, setPictureHolder ] = useState('');
  const [ backgroundHolder, setBackgroundHolder ] = useState('');

  const [ rating, setRating ] = useState(0);
  const [ rates, setRates ] = useState(0);

  const [ showBackgroundSave, setShowBackgroundSave ] = useState(false);
  const [ showPictureSave, setShowPictureSave ] = useState(false);
  const [ showEditPicture, setShowEditPicture ] = useState(true);
  const [ showEditBackground, setShowEditBackground ] = useState(true);

  const [ showAvatarLoader, setShowAvatarLoader ] = useState(false);
  const [ showBackgroundLoader, setShowBackgroundLoader ] = useState(false);

  const handlePictureFileChange = (e) => { 
    if (e.target.files[0]) { 
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => { 
        setPictureHolder(reader.result);
      }
    }
    setShowPictureSave(true);
    setShowEditBackground(false);
    e.target.value = null;
  } 

  const handleBackgroundFileChange = (e) => { 
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => { 
        setBackgroundHolder(reader.result);
      }
    }
    setShowBackgroundSave(true);
    setShowEditPicture(false);
    e.target.value = null;
  } 

  const handleCancelPicture = () => {
    setPictureHolder('');
    setShowEditBackground(true);
    setShowPictureSave(false);
  }

  const handleCancelBackground = () => {
    setBackgroundHolder('');
    setShowEditPicture(true);
    setShowBackgroundSave(false);
  }

  const handleSavePicture = async () => {
    setTimeout(() => {
      setShowAvatarLoader(true);
      setShowPictureSave(false);
    }, [300]);

    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/change-picture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ pictureHolder })
    });

    const data = await res.json();
    
    if (data.redirect) {
      setUser({});
      history.push(data.url);
    }
    else {
      setUser(data);
      setShowAvatarLoader(false);
      setShowEditBackground(true);
    }
  }

  const handleSaveBackground = async () => {
    setTimeout(() => {
      setShowBackgroundLoader(true);
      setShowBackgroundSave(false);
    }, [300]);

    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/change-background`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ backgroundHolder })
    });

    const data = await res.json();
    
    setUser(data);
    setShowBackgroundLoader(false);
    setShowEditPicture(true);
  }

  return ( 
    <div className={classes.root}>
      <div className={classes.background}>
        <img src={backgroundHolder ? backgroundHolder : user.backgroundPicture} alt="background" className={classes.backgroundImg} style={{display: user.backgroundPicture || backgroundHolder ? 'inline' : 'none'}}/>
        <div className={classes.backgroundOverlay}></div>
        { showBackgroundLoader && <div className={classes.backgroundLoader}>
          <CircularProgress />
        </div>} 
      </div>
      <div className={classes.info}>
        <div className={classes.avatarContainer}>
          <Avatar src={pictureHolder ? pictureHolder : user.profilePicture} className={classes.avatar} />
          { showAvatarLoader && <div className={classes.avatarLoader}>
            <CircularProgress size={28} />
          </div>}
          <form>
            <input  
              type="file" 
              name="pictureFile" 
              id="pictureFile" 
              accept="image/*" 
              className={classes.file}
              onChange={handlePictureFileChange}
            />
            { showEditPicture && <IconButton className={classes.editPicture}>
              <label htmlFor="pictureFile" style={{cursor: 'pointer'}}>
                <Avatar className={classes.pictureIcon}>
                  <CameraAltIcon fontSize="small"/>
                </Avatar>
              </label>
            </IconButton> }
          </form>
        </div>
        <div className={classes.innerInfo}>
          <Typography
            className={classes.name}
          >
            { user.firstName + ' ' + user.middleName + ' ' + user.lastName }
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
            <span className={classes.number}>({ rates })</span>
          </Box>
          <Typography
            className={classes.location}
          >
            { user.town }
          </Typography>
        </div>
      </div>    
      <form>
        <input 
          type="file" 
          name="backgroundFile" 
          id="backgroundFile" 
          accept="image/*" 
          //multiple 
          className={classes.file}
          onChange={handleBackgroundFileChange}
        />
        { showEditBackground && <IconButton className={classes.editBackground}>
          <label htmlFor="backgroundFile" style={{cursor: 'pointer'}}>  
            <Avatar style={{background: '#33ab9f'}}>
              <PhotoSizeSelectActualIcon />
            </Avatar>
          </label>
        </IconButton> }
      </form>
      
      {showPictureSave && <div className={classes.saveContainer}>
        <Button
          variant="outlined"
          color="primary"
          style={{marginRight: 16}}
          onClick={handleCancelPicture}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSavePicture}
        >
          Save Profile Picture
        </Button>
      </div> }
      {showBackgroundSave && <div className={classes.saveContainer}>
        <Button
          variant="outlined"
          color="primary"
          style={{marginRight: 16}}
          onClick={handleCancelBackground}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveBackground}
        >
          Save Profile Background
        </Button>
      </div> }
    </div>          
  );
}
 
export default PersonalInfo;