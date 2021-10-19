import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import useStyles from './FaceScanCSS';
import Webcam from "react-webcam";
import useRequireAuth from '../../../CustomHooks/useRequireAuth';

import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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

  //loader
  const [loader, setLoader] = useState(false);

  const handleProceed = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setSuccessModal(true);
    }, 2000)
  }

  //modal
  const [successModal, setSuccessModal] = useState(false);

  //window height
  const widthRef = useRef(window.innerWidth);
  const [width, setWidth] = useState(widthRef.current);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    
    return () => {
      window.removeEventListener('resize', () => {});
    }
  },[width]);

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
        /* setTimeout(() => {
          switchCamera();
        }, 500) */
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
      { facingMode == 'user' && image == '' &&
        <div
          style={{
            width: width * .8,
            height: width * .8,
            maxWidth: 420,
            maxHeight: 420,
            marginTop: 32,
            marginBottom: 150,
            overflow: 'hidden',
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
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)',
            }}
          />
        </div>
      }

      {/* {facingMode !== 'user' && <div style={{width: width * .8, height: width * .8, maxWidth: 420, maxHeight: 420, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 160, marginTop: 32,}}>
        <Typography
          variant="subtitle2"
        >
          Preparing camera...
        </Typography>  
      </div>} */}

      {image != '' && /* facingMode === 'environment' && */
        <div 
          className={classes.capturedImageContainer} 
          style={{ width: width * .8, height: width * .8, }}
        >
          <img 
            src={image} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)',
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
          /* component={Link}
          to='/user-verification/face-scan' */
          onClick={handleProceed}
          style={{
            width:'30%',
          }}
        >
          Proceed
        </Button>
      </div>}

      {loader && <Loader />}
      {successModal && <SuccessModal open={successModal} setOpen={setSuccessModal} />}
    </Container>
  );
}
 
function Loader() {
  const classes = useStyles();

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'black',
      position: 'absolute',
      opacity: .7,
      top: 0,
      left: 0,
      zIndex: '9999',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CircularProgress 
         style={{color: '#999', marginTop: '-5%'}}
      />
    </div>
  );
}

function SuccessModal({ open, setOpen }) {
  const classes = useStyles();

  const handleClose = () => {
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
            Verification request sent
          </Typography>
          <Divider /> 
          <Typography
            variant="subtitle1"
            style={{marginTop: 16, marginBottom: 16}}
          > 
            You have sent a request for your the validation of your account. BarterIT admin is now reviewing your request.
          </Typography>
          <div className={classes.buttonsContainer}>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to='/profile'
              onClick={() => {
                handleClose();
              }}
            >
              Done
            </Button>
          </div>
        </div>
    </Modal>
  )
}

export default FaceScan;