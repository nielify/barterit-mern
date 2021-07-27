import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';

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
    position: 'relative',
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
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    border: 'solid 2px #00695f',
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
    background: '#000',
    width: '100%',
    opacity: .6,
    padding: theme.spacing(1, 2),
  }
}));

const PersonalInfo = ({ user }) => {
  const classes = useStyles();

  const [ picture, setPicture ] = useState('');
  const [ background, setBackground ] = useState('');
  const [ name, setName ] = useState(user.firstName + ' ' + user.middleName + ' ' + user.lastName);
  const [ rating, setRating ] = useState(0);
  const [ rates, setRates ] = useState(0);
  const [ town, setTown ] = useState(user.town);

  const [ showBackgroundSave, setShowBackgroundSave ] = useState(false);
  const [ showPictureSave, setShowPictureSave ] = useState(false);
  const [ showEditPicture, setShowEditPicture ] = useState(true);
  const [ showEditBackground, setShowEditBackground ] = useState(true);



  const handlePictureFileChange = (e) => { 
    if (e.target.files[0]) { 
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => { 
        setPicture(reader.result);
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
        setBackground(reader.result);
      }
    }
    setShowBackgroundSave(true);
    setShowEditPicture(false);
    e.target.value = null;
  } 

  const handleCancelPicture = () => {
    setPicture('');
    setShowEditBackground(true);
    setShowPictureSave(false);
  }

  const handleCancelBackground = () => {
    setBackground('');
    setShowEditPicture(true);
    setShowBackgroundSave(false);
  }

  const handleSavePicture = () => {
    alert('submitting picture' + picture);
  }

  const handleSaveBackground = () => {
    alert('submitting background' + background);
  }

  return ( 
    <div className={classes.root}>
      <div className={classes.background}>
        { background && <img src={background} alt="background" className={classes.backgroundImg} /> }
        <div className={classes.backgroundOverlay}></div>
      </div>
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
          { showEditPicture && <IconButton className={classes.editPicture}>
            <label htmlFor="pictureFile" style={{cursor: 'pointer'}}>
              <Avatar className={classes.pictureIcon}>
                <CameraAltIcon fontSize="small"/>
              </Avatar>
            </label>
          </IconButton> }
          
        </div>
        <div className={classes.innerInfo}>
          <Typography
            className={classes.name}
          >
            { user.firstName !== undefined ? name : '' }
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
      { showEditBackground && <IconButton className={classes.editBackground}>
        <label htmlFor="backgroundFile" style={{cursor: 'pointer'}}>  
          <Avatar style={{background: '#33ab9f'}}>
            <PhotoSizeSelectActualIcon />
          </Avatar>
        </label>
      </IconButton> }
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