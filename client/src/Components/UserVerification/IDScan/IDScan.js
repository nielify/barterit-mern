import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import useStyles from './IDScanCSS';
import Webcam from "react-webcam";
import useRequireAuth from "../../../CustomHooks/useRequireAuth";

import Container from "@material-ui/core/Container";
import Modal from '@material-ui/core/Modal';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";

import CameraIcon from '@material-ui/icons/Camera';

const WebcamComponent = () => <Webcam />;

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  width: { ideal: 1280 },
  height: { ideal: 720 },
  facingMode: FACING_MODE_USER
};

const IDScan = () => {
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

  const switchCamera = () => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }

  const focusCamera = () => {
    //for focusmode
    navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(gotMedia)
    .catch(err => console.error("getUserMedia() failed: ", err));
  
    function gotMedia(mediastream) {
      const video = document.querySelector("video");
      webcamRef.current.srcObject = mediastream;

      const track = mediastream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();

      // Check whether focus distance is supported or not.
      if (!capabilities.focusDistance) {
        console.log('not focused');
        return;
      }

      // Map focus distance to a slider element.
      track.applyConstraints({
        advanced: [{
          focusMode: "manual",
          focusDistance: 5
        }]
      });
      console.log('focused');
    };
    
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
            width: '100%',
            height: '75%',
            marginBottom: 32,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#33ab9f'
        }}
        >
          <Webcam
            onClick={focusCamera}
            forceScreenshotSourceSize={true}
            audio={false}
            height={1280}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={720}
            videoConstraints={{
              ...videoConstraints,
              facingMode
            }}
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </div>
          
      }

      {image != '' && facingMode === 'environment' &&
        <div style={{width: '100%', height: '75%', marginBottom: 32, backgroundColor: '#00695f'}}>
          <img 
            src={image} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }} 
          /> 
        </div>
        
      }

      {facingMode !== 'environment' && <div style={{height: '75%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 32}}>
        <Typography
          variant="subtitle2"
        >
          Preparing camera...
        </Typography>  
      </div>}
      <IconButton onClick={capture} style={{background: 'rgb(0, 0, 0, .15)'}}> 
        <CameraIcon fontSize="large" style={{color: '#009688'}} />      
      </IconButton>
      <NoCameraModal open={noCameraModalOpen} setOpen={setNoCameraModalOpen} />
    </Container>
  );
}

function NoCameraModal({ open, setOpen }) {
  const classes = useStyles();

  const history = useHistory();

  const handleClose = () => {
    history.push('/');
    setOpen(false);
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      disableEnforceFocus 
    >
      <div className={classes.paper}>
        <Typography 
          variant="h6"
          style={{textAlign: 'center'}}
          gutterBottom
        >
          Error
        </Typography>
        <Divider /> 
        <Typography
          variant="body1"
          style={{marginTop: 16, marginBottom: 16, lineHeight: '1.2rem'}}
        >
          No camera is detected in this device. You will be redirected to Marketplace
        </Typography>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to='/'
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  )
}
 
export default IDScan;