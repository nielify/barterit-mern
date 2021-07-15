import { useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    border: 'solid 1px #bbb',
    padding: theme.spacing(.5),
    marginBottom: theme.spacing(2),
    borderRadius: 5,
  },
  red: {
    color: 'red',
  },
  card: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    overflow: 'hidden',
    background: '#eee',
    "&:hover": {
      cursor: 'pointer',
    }
  },
  inputfile: {
    width: 0.1,
	  height: 0.1,
	  opacity: 0,
	  overflow: 'hidden',
	  position: 'absolute',
	  zIndex: -1,
  },
  imageCard: {
    height: 100,
    position: 'relative',
  },
  iconButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '5%',
    right: '5%',
    background: 'black',
    padding: theme.spacing(.5),
    color: 'white',
    opacity: .7,
    borderRadius: '50%',
    "&:hover": {
      color: '#009688',
      cursor: 'pointer',
    },
  }
}));

const AddPhotos = () => {
  const classes = useStyles();

  //const imageFiles = useRef([]);
  const [ imageFiles, setImagesFiles ] = useState([]);
  const imageFilesKey = useRef(0);

  const handleRemovePhoto = (key) => {
    setImagesFiles(imageFiles.filter(imageFile => imageFile.key !== key));
  }

  const handleInputChange = (e) => {
    Array.prototype.forEach.call(e.target.files, (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => { 
        const imageFile = {
          key: imageFilesKey.current,
          image: reader.result,
        }
        setImagesFiles(oldImageFiles => [...oldImageFiles, imageFile]);
        imageFilesKey.current = imageFilesKey.current + 1;
      }
    });
  }

  return (  
    <Grid container>
      <Grid>
        <Typography
          gutterBottom
          variant="body2"
          className={imageFiles.length > 10 ? classes.red : ''}
        >
          Add Photos { imageFiles.length }/10 - You can add up to 10 photos.
        </Typography>
      </Grid>
      <Grid container item spacing={1} className={classes.root}>
        { imageFiles && imageFiles.map((imageFile) => (
          <PreviewImage image={imageFile.image} index={imageFile.key} handleRemovePhoto={handleRemovePhoto} key={imageFile.key}/>
        ))}
        <Grid item xs={3} sm={2}>
          <input 
            type="file" 
            name="file" 
            id="file" 
            accept="image/*" 
            multiple 
            className={classes.inputfile}
            onChange={handleInputChange}
          />
          <label htmlFor="file">
            <Card className={classes.card}>
              <AddPhotoAlternateOutlinedIcon color="primary" style={{fontSize:24}} />
              <Typography
                variant="subtitle1"
                style={{fontSize:12}}
              >
                Add Photo
              </Typography>
            </Card>
          </label>
        </Grid>
      </Grid>
    </Grid>
  );
}
 
function PreviewImage({ image, index, handleRemovePhoto }) {
  const classes = useStyles();

  return (
    <Grid item xs={3} sm={2}> 
      <Card className={classes.imageCard}>
        <CardMedia
          component="img"
          image={image}
          style={{height:'100%'}}
        />
      <div className={classes.iconButton} onClick={() => handleRemovePhoto(index) }>
        <CloseIcon fontSize="small" />
      </div>
      </Card>
    </Grid>
  )
}

export default AddPhotos;