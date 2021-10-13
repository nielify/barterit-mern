import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import useStyles from './FaceScanCSS';
import Webcam from "react-webcam";
import useRequireAuth from '../../../CustomHooks/useRequireAuth';

import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import CameraIcon from '@material-ui/icons/Camera';

const WebcamComponent = () => <Webcam />;

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  width: { ideal: 1280 },
  height: { ideal: 720 },
  facingMode: FACING_MODE_USER
};

const FaceScan = () => {
  useRequireAuth();
  const classes = useStyles();

  const webcamRef = useRef(null);
  const [image, setImage] = useState('');

  const [noCameraModalOpen, setNoCameraModalOpen] = useState(false);
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot(/* {width: 1280, height: 720} */);
      setImage(imageSrc);
    },
    [webcamRef]
  );

  const handleRetake = () => {
    setImage('');
  }

  const switchCamera = () => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }

  useEffect(() => {
    //for initializing and detecting camera
    navigator.getMedia = ( navigator.getUserMedia || 
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );

    navigator.getMedia({video: true}, 
      () => {
        setTimeout(() => {
          switchCamera();
        }, 500)
      } , 
      () => {
        setTimeout(() => {
          setNoCameraModalOpen(true);
        }, 500);
      }
    );  
  }, []);

  return (  
    <Container maxWidth="md" className={classes.root}> 
      {facingMode === 'environment' && image == '' &&
        <div
          style={{
            width: '360px',
            height: '360px',
            marginTop: 32,
            marginBottom: 150,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'solid 5px #009688',
            borderRadius: '50%',
            
          }}
        >
          <Webcam
            forceScreenshotSourceSize={true}
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={{
              ...videoConstraints,
              facingMode
            }}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              width: '360px',
              height: '360px',
            }}
          />
        </div>
      }

      {facingMode !== 'environment' && <div style={{height: '360px', width: '360px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 160, marginTop: 32,}}>
        <Typography
          variant="subtitle2"
        >
          Preparing camera...
        </Typography>  
      </div>}

      {image != '' && facingMode === 'environment' &&
        <div style={{width: '360px', height: '360px', marginBottom: 160, marginTop:32, border: 'solid 5px #009688', borderRadius: '50%', overflow: 'hidden',}}>
          <img 
            src={image} 
            style={{
              width: '360px',
              height: '360px',
              objectFit: 'cover'
            }} 
          /> 
        </div>
      }

      {image == '' && <IconButton onClick={capture} style={{background: 'rgb(0, 0, 0, .15)'}}> 
        <CameraIcon fontSize="large" style={{color: '#009688'}} />      
      </IconButton>}

      {image != '' && <div
        style={{
          width:'100%', 
          display:'flex',
          justifyContent:'center',
          marginTop:16
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          style={{marginRight:32, width:'30%',}}
          onClick={handleRetake}
        >
          Retake
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to='/user-verification/face-scan'
          style={{
            width:'30%',
          }}
        >
          Proceed
        </Button>
      </div>}

    </Container>
  );
}
 
export default FaceScan;